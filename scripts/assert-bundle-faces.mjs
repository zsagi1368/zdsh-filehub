/**
 * TC-B3-31C three-face byte assertion (DESIGN §8-ADJ-6 / contract-filehub §5).
 *
 * Run by build.mjs AFTER the two esbuild passes. It fails closed (non-zero exit)
 * if any load-bearing face of the bundle drifted — slimming (minify + dropping
 * sourcemaps) must NEVER silently break the runtime contract:
 *
 *  FACE 1 — client inject list (§2 C5/C1): the five host package names the CJS
 *           client bundle expects the host ModuleLoader to have provided must
 *           still appear as *string literals* in lib/client.js (they are names,
 *           not resolved imports — build.mjs externalises @deepseek-ai/*).
 *           Compared byte-for-byte against package.json dsh.client.inject so the
 *           manifest and the shipped bundle cannot diverge.
 *  FACE 2 — xlsx dynamic specifier (B04 / §3): `read-excel-file/node` is a
 *           DELIBERATE runtime `import()` (kept out of the static graph to dodge
 *           its unzipper -> optional @aws-sdk chain). If esbuild ever inlines or
 *           rewrites it, xlsx reading breaks at runtime. Assert the specifier
 *           string survives verbatim and that read-excel-file was NOT bundled in.
 *  FACE 3 — ModuleLoader CJS banner (§2 C5 / build.mjs:45-49): the handshake
 *           literal `window.__ModuleLoader__.load({ id: 'dsh-filehub', ... })`
 *           at the head and the `return module.exports; } });` tail must be
 *           intact (esbuild banners/footers are not minified). The id tracks the
 *           α-renamed package name `dsh-filehub` (main-repo loader reconciles
 *           the boot graph by package name — see build.mjs banner comment).
 *
 * Also asserts the sourcemap slimming took effect: no lib/*.map emitted and no
 * dangling `sourceMappingURL` comment left behind (P05 release-size offender).
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LIB = join(ROOT, 'lib')

const results = []
const check = (name, pass, detail) => { results.push({ face: name, pass: !!pass, detail: detail ?? '' }) }

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const expectedInject = pkg.dsh?.client?.inject ?? []
const clientJs = readFileSync(join(LIB, 'client.js'), 'utf8')
const indexJs = readFileSync(join(LIB, 'index.js'), 'utf8')

// ---- FACE 1: client inject list (string-literal face, manifest-cross-checked) --
check(
  'face1.inject-list.count',
  expectedInject.length === 5,
  `expected 5 host packages in dsh.client.inject, got ${expectedInject.length}`,
)
for (const name of expectedInject) {
  const occurrences = clientJs.split(name).length - 1
  check(`face1.inject.${name}`, occurrences >= 1, `occurrences=${occurrences}`)
}

// ---- FACE 2: xlsx dynamic specifier preserved + read-excel-file NOT bundled ----
const xlsxSpec = 'read-excel-file/node'
check(
  'face2.xlsx-dynamic-specifier',
  clientJs.includes(xlsxSpec) === false && indexJs.includes(xlsxSpec),
  `index.js contains "${xlsxSpec}"=${indexJs.includes(xlsxSpec)}`,
)
// The deliberate indirection must stay a RUNTIME string import; guard that the
// library body was not statically pulled into the server bundle (would show up
// as a large inlined read-excel-file implementation rather than a bare string).
check(
  'face2.xlsx-not-statically-bundled',
  !indexJs.includes('@aws-sdk') && !indexJs.includes('unzipper'),
  `@aws-sdk present=${indexJs.includes('@aws-sdk')} unzipper present=${indexJs.includes('unzipper')}`,
)

// ---- FACE 3: ModuleLoader CJS banner / footer handshake shape -----------------
const bannerHead = "window.__ModuleLoader__.load({ id: 'dsh-filehub', factory: (require) => { var module = { exports: {} }; var exports = module.exports;"
const footerTail = 'return module.exports; } });'
check('face3.banner-head', clientJs.startsWith(bannerHead), 'client.js must open with the ModuleLoader banner')
check('face3.footer-tail', clientJs.trimEnd().endsWith(footerTail), 'client.js must close with the module.exports footer')

// ---- Slimming took effect: no .map emitted, no dangling sourceMappingURL -------
const mapFiles = existsSync(LIB) ? readdirSync(LIB).filter((f) => f.endsWith('.map')) : []
check('slim.no-map-files', mapFiles.length === 0, `map files in lib/: ${JSON.stringify(mapFiles)}`)
check('slim.no-dangling-sourcemap', !indexJs.includes('//# sourceMappingURL=') && !clientJs.includes('//# sourceMappingURL='),
  'no sourceMappingURL comment may remain after sourcemap:false')

// ---- Report -------------------------------------------------------------------
const allPass = results.every((r) => r.pass)
for (const r of results) {
  console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.face}  ${r.detail}`)
}
const bytes = (f) => (existsSync(f) ? readFileSync(f).length : 0)
console.log(
  `[sizes] lib/index.js=${bytes(join(LIB, 'index.js'))} lib/client.js=${bytes(join(LIB, 'client.js'))} ` +
  `(lib total tracked, .map excluded)`,
)
console.log('THREE_FACE_ASSERT=' + allPass)
process.exit(allPass ? 0 : 1)
