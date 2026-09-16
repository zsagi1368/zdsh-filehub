/**
 * TC-B3-31E supplementary self-evidence — client loader handshake coupling.
 *
 * WHY THIS EXISTS ON TOP OF assert-bundle-faces.mjs FACE 3:
 * FACE 3 byte-locks the exact banner literal, but the expected value there is a
 * *hard-coded string*. If package.json `name` were ever changed again without a
 * matching banner edit, FACE 3 would still pass (banner literal == assert
 * literal) while the main-repo client loader would reject the bundle at boot.
 *
 * The main-repo client loader reconciles its boot-graph row by the plugin's
 * *package name* and throws if the bundle registers a different module id:
 *   - packages/client/tsdown.client.ts — "@param id - plugin id (package name),
 *     stamped into the __ModuleLoader__.load handoff"
 *   - packages/client/modules/src/client/system.ts:135 —
 *     `bundle ${url} loaded without registering "${id}" via __ModuleLoader__.load`
 *
 * This script closes that gap: it reads the SHIPPED dist head (lib/client.js),
 * extracts the banner module id, and asserts it === package.json name. Pure
 * static string comparison against the built artifact — it does NOT start a web
 * server or touch the real loader. Run it any time; exit non-zero on drift.
 *
 * Usage: node scripts/assert-client-loader-handshake.mjs
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const head = readFileSync(join(ROOT, 'lib', 'client.js'), 'utf8').slice(0, 200)

const match = head.match(/window\.__ModuleLoader__\.load\(\{\s*id:\s*['"]([^'"]+)['"]/)
const bannerId = match ? match[1] : null

const results = [
  { name: 'dist.banner.id.parseable', pass: bannerId !== null, detail: `matched=${JSON.stringify(bannerId)}` },
  {
    name: 'dist.banner.id === package.json.name',
    pass: bannerId !== null && bannerId === pkg.name,
    detail: `bannerId=${JSON.stringify(bannerId)} pkgName=${JSON.stringify(pkg.name)}`,
  },
]

for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}  ${r.detail}`)
const allPass = results.every((r) => r.pass)
console.log('CLIENT_LOADER_HANDSHAKE=' + allPass)
process.exit(allPass ? 0 : 1)
