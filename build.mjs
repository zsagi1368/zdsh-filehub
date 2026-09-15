/**
 * zDSH FileHub build: ESM host half + single-file CJS client half.
 *
 * The web server serves exactly one file per plugin (/plugins/filehub/client.js),
 * so the client half is one browser bundle wrapped in the ModuleLoader factory
 * handshake. Host services (@deepseek-ai/*), react and runtime-provided peers
 * stay external; first-party npm deps are bundled so installs need no build.
 *
 * Size discipline (TC-B3-31C / DESIGN §8-ADJ-6, both S-cases):
 * - `sourcemap: false` — the published artifact is the runtime bundle only;
 *   the old `index.js.map` (≈5 MB) was the dominant release-size offender
 *   (contract-filehub §5 P05) and is excluded here AND from `.gitignore`'s
 *   tracked set.
 * - `minify: true` — esbuild minify over the ~91.7% third-party bundle
 *   (pdfjs/zod/mammoth/jszip, contract-filehub §5 P02).
 * Byte-invariance of the three load-bearing faces is asserted post-build by
 * `scripts/assert-bundle-faces.mjs` (client inject string list, the deliberate
 * `read-excel-file/node` dynamic specifier, and the ModuleLoader banner),
 * wired into the build step so a slimming regression is a build failure, not a
 * runtime surprise.
 */
import { build } from 'esbuild'
import { mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

mkdirSync('lib', { recursive: true })

const dshExternal = ['@deepseek-ai/cordis', '@deepseek-ai/dsh-*']

await build({
  entryPoints: ['src/index.ts'],
  outfile: 'lib/index.js',
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: ['node22'],
  sourcemap: false,
  minify: true,
  external: dshExternal,
  logLevel: 'info',
})

await build({
  entryPoints: ['src/client/index.tsx'],
  outfile: 'lib/client.js',
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: ['es2022'],
  sourcemap: false,
  minify: true,
  jsx: 'automatic',
  external: [
    ...dshExternal,
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
    'scheduler',
  ],
  banner: {
    js: "window.__ModuleLoader__.load({ id: 'filehub', factory: (require) => { var module = { exports: {} }; var exports = module.exports;",
  },
  footer: {
    js: 'return module.exports; } });',
  },
  logLevel: 'info',
})

// Fail-closed three-face byte assertion (DESIGN §8-ADJ-6 硬验三面字节不变).
execFileSync(process.execPath, ['scripts/assert-bundle-faces.mjs'], { stdio: 'inherit' })
