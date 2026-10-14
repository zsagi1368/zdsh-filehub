// @vitest-environment jsdom
/**
 * Scoped-stylesheet injection lock (2026-10-14).
 *
 * `injectStylesOnce` used one module-level boolean for every sheet, so the
 * first caller — the composer upload entry — welded the gate shut and every
 * later sheet was dropped without a trace. The settings panel's CSS
 * (`zdsh-filehub-console-styles`, which defines `.zdsh-filehub-settings`,
 * `-settingrow`, `-switch`, `-select`, `-numberinput`) never reached the
 * document, so the panel rendered as bare DOM: switches collapsed to a 16x6
 * empty button and each label ran straight into its description.
 */
import { afterEach, describe, expect, it } from 'vitest'

import { injectStylesOnce } from '../../src/client/util.js'

const STYLE_IDS = ['zdsh-filehub-styles', 'zdsh-filehub-console-styles']

function styleTags(): HTMLStyleElement[] {
  return [...document.querySelectorAll('style')].filter(tag => tag.id.startsWith('zdsh-filehub'))
}

afterEach(() => {
  for (const tag of styleTags()) tag.remove()
})

// Each case uses its own sheet ids: the module-level "already installed" set is
// process state on purpose (that is the dedupe), so reusing an id across cases
// would couple them rather than test anything.

describe('scoped stylesheet injection', () => {
  it('installs every distinct sheet, not just the first', () => {
    injectStylesOnce(STYLE_IDS[0]!, '.zdsh-filehub-upload{display:flex}')
    injectStylesOnce(STYLE_IDS[1]!, '.zdsh-filehub-switch{width:34px;height:20px}')

    const ids = styleTags().map(tag => tag.id)
    expect(ids).toContain(STYLE_IDS[0])
    expect(ids).toContain(STYLE_IDS[1])
    expect(document.getElementById(STYLE_IDS[1]!)?.textContent).toContain('zdsh-filehub-switch')
  })

  it('stays idempotent per sheet', () => {
    injectStylesOnce('zdsh-filehub-upload-styles', '.zdsh-filehub-upload{display:flex}')
    injectStylesOnce('zdsh-filehub-upload-styles', '.zdsh-filehub-upload{display:flex}')

    expect(styleTags().filter(tag => tag.id === 'zdsh-filehub-upload-styles')).toHaveLength(1)
  })

  it('adopts a sheet a previous module instance already installed', () => {
    const existing = document.createElement('style')
    existing.id = 'zdsh-filehub-adopted-styles'
    existing.textContent = '.zdsh-filehub-settings{display:block}'
    document.head.appendChild(existing)

    injectStylesOnce('zdsh-filehub-adopted-styles', '.zdsh-filehub-settings{display:flex}')

    expect(styleTags().filter(tag => tag.id === 'zdsh-filehub-adopted-styles')).toHaveLength(1)
    expect(document.getElementById('zdsh-filehub-adopted-styles')?.textContent).toContain('display:block')
  })
})
