/**
 * Test-side replica of the host's ENFORCED raw JSON Schema subset
 * (`@deepseek-ai/dsh-tools` json-schema.ts `assertSupportedJsonSchema`),
 * faithful to mainline zdsh-latest and kept message-for-message identical to
 * the campaign differential probe (sandbox-b3-31/replica.mjs), which pins it
 * byte-for-byte against the REAL compiled rc.1 validator, and to the host
 * source (packages/core/tools/src/json-schema.ts). The tools.client.spec
 * harness registers through the same criteria the real `ctx.tools.register`
 * applies (B01: the old unconditional fake registry was the escape route).
 */

const CONSTRAINT_KEYWORDS = new Set([
  'type', 'oneOf', 'properties', 'required', 'additionalProperties', 'items', 'enum', 'const',
])
const ANNOTATION_KEYWORDS = new Set(['description', 'title', 'default', 'examples'])
const SCHEMA_TYPES = ['object', 'array', 'string', 'number', 'integer', 'boolean', 'null'] as const
const ONE_OF_SIBLING_KEYWORDS = ['properties', 'required', 'additionalProperties', 'items', 'enum', 'const'] as const

type ScalarType = 'string' | 'number' | 'integer' | 'boolean' | 'null'

function isJsonValueReplica(value: unknown): boolean {
  if (value === null) return true
  switch (typeof value) {
    case 'string': case 'boolean': return true
    case 'number': return Number.isFinite(value) && !Object.is(value, -0)
    case 'object': {
      if (Array.isArray(value)) {
        if (!isPlainJsonArrayReplica(value)) return false
        return value.every(entry => isJsonValueReplica(entry))
      }
      if (!isJsonSchemaRecordReplica(value)) return false
      return Object.values(value as Record<string, unknown>).every(entry => isJsonValueReplica(entry))
    }
    default: return false
  }
}

function isPlainObjectProto(value: object): boolean {
  const prototype = Object.getPrototypeOf(value)
  return prototype === null || prototype === Object.prototype
}

function isJsonSchemaRecordReplica(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false
  if (!isPlainObjectProto(value)) return false
  return Reflect.ownKeys(value).every(key => typeof key === 'string' && Object.prototype.propertyIsEnumerable.call(value, key))
}

function isPlainJsonArrayReplica(value: unknown): value is unknown[] {
  if (!Array.isArray(value)) return false
  const array: unknown[] = value
  if (!isPlainObjectProto(Object.getPrototypeOf(array)) || Reflect.ownKeys(array).length !== array.length + 1) return false
  for (let index = 0; index < array.length; index++) {
    if (!Object.hasOwn(array, index)) return false
  }
  return true
}

function isJsonNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && !Object.is(value, -0)
}

function scalarMatches(type: ScalarType, value: unknown): boolean {
  switch (type) {
    case 'string': return typeof value === 'string'
    case 'number': return isJsonNumber(value)
    case 'integer': return isJsonNumber(value) && Number.isInteger(value)
    case 'boolean': return typeof value === 'boolean'
    case 'null': return value === null
  }
}

function checkObjectSchemaTail(node: Record<string, unknown>, path: string, properties: unknown, violations: string[]): void {
  const hasRequired = Object.hasOwn(node, 'required')
  const required = hasRequired ? node.required : undefined
  if (hasRequired) {
    if (!isPlainJsonArrayReplica(required) || required.some(entry => typeof entry !== 'string')) {
      violations.push(`${path}.required must be an array of strings`)
    } else {
      const declared = isJsonSchemaRecordReplica(properties) ? properties : {}
      for (const key of required as string[]) {
        if (!Object.hasOwn(declared, key)) violations.push(`${path}.required names "${key}" which is not in properties`)
      }
    }
  }
  if (Object.hasOwn(node, 'additionalProperties') && typeof node.additionalProperties !== 'boolean') {
    violations.push(`${path}.additionalProperties must be a boolean`)
  }
}

type WalkTask
  = { kind: 'enter'; node: unknown; path: string }
  | { kind: 'leave'; node: object }
  | { kind: 'one-of-tail'; node: Record<string, unknown>; path: string }
  | { kind: 'object-tail'; node: Record<string, unknown>; path: string; properties: unknown }

/** Stack-safe walk mirroring the host task ordering (children, then tail). */
function checkSchemaNode(root: unknown, rootPath: string, violations: string[], seen: Set<object>): void {
  const tasks: WalkTask[] = [{ kind: 'enter', node: root, path: rootPath }]
  for (let task = tasks.pop(); task !== undefined; task = tasks.pop()) {
    if (task.kind === 'leave') {
      seen.delete(task.node)
      continue
    }
    if (task.kind === 'one-of-tail') {
      for (const key of ONE_OF_SIBLING_KEYWORDS) {
        if (Object.hasOwn(task.node, key)) violations.push(`${task.path}.${key} is not supported beside oneOf`)
      }
      continue
    }
    if (task.kind === 'object-tail') {
      checkObjectSchemaTail(task.node, task.path, task.properties, violations)
      continue
    }

    const { node, path } = task
    if (!isJsonSchemaRecordReplica(node)) {
      violations.push(`${path} must be a schema object`)
      continue
    }
    if (seen.has(node)) {
      violations.push(`${path} is circular`)
      continue
    }
    seen.add(node)
    tasks.push({ kind: 'leave', node })

    for (const key of Object.keys(node)) {
      if (CONSTRAINT_KEYWORDS.has(key)) continue
      if (ANNOTATION_KEYWORDS.has(key)) {
        try {
          if (!isJsonValueReplica(node[key])) violations.push(`${path}.${key} annotation must be lossless JSON data`)
        } catch {
          violations.push(`${path}.${key} annotation must be lossless JSON data`)
        }
        continue
      }
      violations.push(`${path}.${key} is not a supported keyword (subset: type/oneOf/properties/required/additionalProperties/items/enum/const + annotations)`)
    }
    if (Object.hasOwn(node, 'description') && typeof node.description !== 'string') {
      violations.push(`${path}.description must be a string`)
    }
    if (Object.hasOwn(node, 'title') && typeof node.title !== 'string') {
      violations.push(`${path}.title must be a string`)
    }

    const hasType = Object.hasOwn(node, 'type')
    const hasOneOf = Object.hasOwn(node, 'oneOf')
    if (hasType && hasOneOf) {
      violations.push(`${path} cannot declare both type and oneOf`)
      continue
    }
    if (!hasType && !hasOneOf) {
      for (const key of ONE_OF_SIBLING_KEYWORDS) {
        if (Object.hasOwn(node, key)) violations.push(`${path}.${key} requires type or oneOf`)
      }
      continue
    }

    if (hasOneOf) {
      const oneOf = node.oneOf
      tasks.push({ kind: 'one-of-tail', node, path })
      if (!isPlainJsonArrayReplica(oneOf) || oneOf.length < 2) {
        violations.push(`${path}.oneOf must be an array of at least two schemas`)
      } else {
        for (let index = oneOf.length - 1; index >= 0; index--) {
          tasks.push({ kind: 'enter', node: oneOf[index], path: `${path}.oneOf[${index}]` })
        }
      }
      continue
    }

    const type = node.type
    if (typeof type !== 'string' || !(SCHEMA_TYPES as readonly unknown[]).includes(type)) {
      violations.push(Array.isArray(type)
        ? `${path}.type must be a single type string (type arrays are not supported)`
        : `${path}.type must be one of ${SCHEMA_TYPES.join('/')}`)
      continue
    }
    const schemaType = type as (typeof SCHEMA_TYPES)[number]
    const allowedFor: Record<string, readonly string[]> = {
      properties: ['object'],
      required: ['object'],
      additionalProperties: ['object'],
      items: ['array'],
      enum: ['string', 'number', 'integer', 'boolean', 'null'],
      const: ['string', 'number', 'integer', 'boolean', 'null'],
    }
    for (const [key, types] of Object.entries(allowedFor)) {
      if (Object.hasOwn(node, key) && !types.includes(schemaType)) {
        violations.push(`${path}.${key} is not supported on type "${schemaType}"`)
      }
    }

    switch (schemaType) {
      case 'object': {
        const properties = Object.hasOwn(node, 'properties') ? node.properties : undefined
        tasks.push({ kind: 'object-tail', node, path, properties })
        if (Object.hasOwn(node, 'properties')) {
          if (!isJsonSchemaRecordReplica(properties)) {
            violations.push(`${path}.properties must be an object of schemas`)
          } else {
            const entries = Object.entries(properties)
            for (let index = entries.length - 1; index >= 0; index--) {
              const entry = entries[index]
              if (entry === undefined) continue
              tasks.push({ kind: 'enter', node: entry[1], path: `${path}.properties.${entry[0]}` })
            }
          }
        }
        break
      }
      case 'array': {
        if (Object.hasOwn(node, 'items')) tasks.push({ kind: 'enter', node: node.items, path: `${path}.items` })
        break
      }
      case 'string': case 'number': case 'integer': case 'boolean': case 'null': {
        const hasEnum = Object.hasOwn(node, 'enum')
        const allowed = hasEnum ? node.enum : undefined
        const enumValid = isPlainJsonArrayReplica(allowed)
          && allowed.length > 0
          && allowed.every(entry => scalarMatches(schemaType, entry))
        if (hasEnum && !enumValid) {
          violations.push(`${path}.enum must be a non-empty array of ${schemaType} values`)
        }
        const hasConst = Object.hasOwn(node, 'const')
        const declaredConst = hasConst ? node.const : undefined
        const constValid = scalarMatches(schemaType, declaredConst)
        if (hasConst) {
          if (!constValid) {
            violations.push(`${path}.const must be a ${schemaType} value`)
          } else if (enumValid && !(allowed as unknown[]).includes(declaredConst)) {
            violations.push(`${path}.const must be one of ${path}.enum when both are declared`)
          }
        }
        break
      }
    }
  }
}

/** Every violation for one raw schema in host walk order; empty means accepted. */
export function collectJsonSchemaViolations(schema: unknown): string[] {
  const violations: string[] = []
  checkSchemaNode(schema, 'schema', violations, new Set())
  return violations
}
