/**
 * TC-B4-RA1c — FileHub llm injection contract lock.
 *
 * RA1b proved a load-time defect: `createFileHubDomain` (reached through
 * `apply`) read the OPTIONAL `llm` host service via `ctx.llm`, but `llm` is
 * deliberately NOT in the exported `inject` list. A real @deepseek-ai/cordis
 * context proxy treats "read a property that is not in `inject`" as a
 * pre-declaration gate and THROWS `cannot get property "llm" without inject`
 * (node_modules/@deepseek-ai/cordis/src/reflect.ts get trap), so FileHub could
 * never reach ACTIVE through the production loading channel — not a harness
 * artifact. The RA1c fix keeps `llm` OUT of `inject` (so it stays optional and
 * an absent llm only degrades the vision route gate, never the whole mount) and
 * reads llm through the guarded `ctx.get('llm')` seam, falling back to a direct
 * property read on plain-object contexts that carry no `get`.
 *
 * These three locks hold the contract end to end:
 *   1. inject/declaration reconciliation — llm is excluded, the other six stay.
 *   2. guard bypass — over a cordis-LIKE context whose `llm` getter throws, the
 *      mount still succeeds because the code reads through `get`, never `ctx.llm`.
 *   3. real-cordis mountable replay — mounting the shipped {inject, apply}
 *      export in a genuine Context (6 services provided, llm absent, tmpdir
 *      session) reaches ACTIVE and registers the /api/filehub prefix route.
 */
import { describe, it, expect } from 'vitest'
import { Context } from '@deepseek-ai/cordis'

import {
  apply,
  inject,
  createFileHubDomain,
  type FileHubDomain,
  type LlmRuntimeFaceLike,
} from '../../src/index.js'
import {
  CapturedRoute,
  defaultTestConfig,
  makeFakeContext,
  makeTempDir,
  removeTempDir,
} from './helpers.client.js'

/** Assert the FileHub prefix route was registered (proof apply ran to :595). */
function hasFilehubRoute(routes: CapturedRoute[]): boolean {
  return routes.some(route => route.kind === 'prefix' && route.path === '/api/filehub')
}

describe('RA1c · llm injection contract (declaration/guard reconciliation)', () => {
  it('keeps llm OUT of inject but retains the six required services', () => {
    // The defect fix MUST NOT promote llm to a hard dependency: cordis keeps a
    // fiber INACTIVE until every injected service resolves, so listing llm
    // would make FileHub unmountable on hosts without an LlmRuntime, violating
    // the documented optional-degrade contract (HostContext.llm?).
    expect(inject).not.toContain('llm')
    expect([...inject].sort()).toEqual(
      ['fs', 'sessions', 'storage', 'systemPrompt', 'tools', 'webServer'].sort(),
    )
  })

  it('reads llm through the get seam, never the raw ctx.llm property', () => {
    // Simulate a cordis context: any undeclared `llm` read THROWS, while the
    // documented `get` escape returns undefined. The fix must route through
    // `get`, so createFileHubDomain completes and registers its route.
    const fake = makeFakeContext([{ id: 's1', cwd: process.cwd() }])
    const ctx = fake.ctx as unknown as Record<string, unknown>
    let rawLlmReads = 0
    Object.defineProperty(ctx, 'llm', {
      enumerable: true,
      get(): never {
        rawLlmReads += 1
        throw new Error('cannot get property "llm" without inject')
      },
    })
    const reads: string[] = []
    ctx.get = (name: string): unknown => {
      reads.push(name)
      return undefined // host provided no llm
    }

    const domain = createFileHubDomain(fake.ctx, defaultTestConfig())

    expect(rawLlmReads).toBe(0) // never touched the throwing getter
    expect(reads).toContain('llm') // routed through the get seam
    expect(hasFilehubRoute(fake.routes)).toBe(true) // reached the register call
    domain.dispose()
  })

  it('degrades to a plain-object ctx that has no get seam (unit-test host)', () => {
    // Bare / test contexts expose llm as an ordinary optional property and
    // carry no cordis `get`; the fallback branch must keep this path working.
    const fake = makeFakeContext([{ id: 's1', cwd: process.cwd() }])
    const ctx = fake.ctx as unknown as { get?: unknown }
    expect(ctx.get).toBeUndefined()

    const domain = createFileHubDomain(fake.ctx, defaultTestConfig())
    expect(hasFilehubRoute(fake.routes)).toBe(true)
    domain.dispose()
  })

  it('accepts a provided llm face through the get seam', () => {
    // Positive companion: when the host DOES provide llm, the guard hands the
    // real face to createImageCapableGate and the mount still completes.
    const fake = makeFakeContext([{ id: 's1', cwd: process.cwd() }])
    const ctx = fake.ctx as unknown as Record<string, unknown>
    const llm: LlmRuntimeFaceLike = {
      resolveModelInfo: async () => ({ inputModalities: ['image'] }),
    }
    Object.defineProperty(ctx, 'llm', {
      enumerable: true,
      get(): never {
        throw new Error('cannot get property "llm" without inject')
      },
    })
    ctx.get = (name: string): unknown => (name === 'llm' ? llm : ctx[name])

    const domain = createFileHubDomain(fake.ctx, defaultTestConfig())
    expect(hasFilehubRoute(fake.routes)).toBe(true)
    domain.dispose()
  })
})

describe('RA1c · manifest mountable replay in a real cordis context (tmpdir)', () => {
  it('reaches ACTIVE with the six services and NO llm provided', async () => {
    const tmp = await makeTempDir('ra1c-mount')
    let domain: FileHubDomain | undefined
    const routes: CapturedRoute[] = []
    try {
      const root = new Context()
      // Provide exactly the six injected host services; deliberately omit llm.
      root.provide('fs', {})
      root.provide('sessions', {
        get: (id: string) => (id === 's1' ? { id: 's1', header: { cwd: tmp } } : undefined),
        list: () => [{ id: 's1', header: { cwd: tmp } }],
      })
      // Storage hub with an empty backend registry: no KV facet → FileHub's
      // meta/settings/library fall back to memory (pickKvFacet returns none),
      // which is the correct degrade path for a mountable-but-stateless host.
      root.provide('storage', {
        backend: { names: (): string[] => [], get: (): undefined => undefined },
      })
      root.provide('webServer', {
        register: (route: CapturedRoute): (() => void) => {
          routes.push(route)
          return (): void => {}
        },
      })
      root.provide('tools', { register: (): (() => void) => (): void => {} })
      root.provide('systemPrompt', { section: (): (() => void) => (): void => {} })

      // Mount the shipped {inject, apply} export through the cordis plugin path.
      // NOTE: production registers FileHub as a SERVICE factory (package.json
      // dsh.capabilities[0].service.factory -> ./lib/index.js, singleton), where
      // apply's FileHubDomain return becomes the service instance. A plain
      // ctx.plugin() instead treats apply's return as an EFFECT (disposer), so
      // we hand back a disposer that tears the domain down — the load path
      // (inject resolution + apply execution, i.e. everything up to and through
      // the llm consumption point) is identical either way.
      const fiber = root.plugin(
        {
          inject,
          apply: (ctx: Parameters<typeof apply>[0], config: unknown): (() => void) => {
            const captured = apply(ctx, config as never)
            domain = captured
            return (): void => captured.dispose()
          },
        },
        defaultTestConfig(),
      )
      await fiber

      // Reaching here without the "without inject" throw — and having observed
      // the prefix route the mount registers only AFTER the llm consumption
      // point (src/index.ts:595) — is the mountable evidence.
      expect(domain).toBeDefined()
      expect(hasFilehubRoute(routes)).toBe(true)
    } finally {
      domain?.dispose()
      await removeTempDir(tmp)
    }
  })
})
