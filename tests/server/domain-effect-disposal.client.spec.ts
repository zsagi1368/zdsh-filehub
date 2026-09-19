/**
 * TC-B4-RA1d — FileHub domain disposal wiring locks (cordis effect contract).
 *
 * Root cause (probed on the real cordis source, fiber.ts:251-257): `apply` is a
 * NAMED function, so `isConstructor(apply)` is true and the fiber runner takes
 * the constructor path — `new apply(ctx, config)`. That path collects only
 * `instance[symbols.init]?.()` and DROPS the instance itself, so the returned
 * `FileHubDomain {sweep, dispose}` handle was never torn down on fiber unload:
 * the `/api/filehub` prefix route leaked, a remount hit `duplicate prefix
 * route`, and the sweep interval timer leaked (its only stop point is
 * domain.dispose).
 *
 * The fix (verticals cordis.ts:96 precedent) wires disposal through the fiber
 * effect contract: `ctx.effect(() => () => domain.dispose(), 'filehub-domain')`
 * — setup runs immediately, its RETURN VALUE is the disposer collected for
 * fiber unload. Guarded (`typeof ctx.effect === 'function'`) so plain-object
 * hosts keep the caller-owns-handle contract.
 *
 * Locks:
 *   A. unload leaves no leak — real cordis Context, six service stubs, mount
 *      the SHIPPED {inject, apply} (constructor path), fiber.dispose() →
 *      webServer table has no /api/filehub and the sweep timer count is back
 *      at baseline (fake timers).
 *   B. remount cycle — dispose then mount again over a webServer stub that
 *      throws on a duplicate same-kind/same-path registration (real
 *      WebServer.register isomorph) → second mount reaches ACTIVE, exactly one
 *      route, and its own dispose cleans up again.
 *   C. effect-face semantics on plain hosts — the guarded wiring executes
 *      setup IMMEDIATELY (dispose must NOT run at mount: the immediate-call
 *      trap), collects the returned disposer under the 'filehub-domain' label,
 *      and the disposer plus an explicit domain.dispose() double-run is safe
 *      (dispose idempotency, FileHubDomain contract).
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Context } from '@deepseek-ai/cordis'

import {
  apply,
  inject,
  type FileHubDomain,
} from '../../src/index.js'
import {
  CapturedRoute,
  defaultTestConfig,
  makeFakeContext,
  makeTempDir,
  removeTempDir,
} from './helpers.client.js'

function filehubRoutes(routes: CapturedRoute[]): CapturedRoute[] {
  return routes.filter(route => route.kind === 'prefix' && route.path === '/api/filehub')
}

/**
 * Provide the six injected host services on a real cordis root. The webServer
 * stub mirrors the real WebServer.register duplicate semantics: registering a
 * second route of the same kind+path THROWS (the remount crash the leaked
 * disposer caused pre-fix).
 */
function provideSixServices(root: Context, tmp: string, routes: CapturedRoute[]): void {
  root.provide('fs', {})
  root.provide('sessions', {
    get: (id: string) => (id === 's1' ? { id: 's1', header: { cwd: tmp } } : undefined),
    list: () => [{ id: 's1', header: { cwd: tmp } }],
  })
  root.provide('storage', {
    backend: { names: (): string[] => [], get: (): undefined => undefined },
  })
  root.provide('webServer', {
    register(route: CapturedRoute): () => void {
      if (routes.some(r => r.kind === route.kind && r.path === route.path)) {
        throw new Error(`duplicate ${route.kind} route: ${route.path}`)
      }
      routes.push(route)
      return (): void => {
        const index = routes.indexOf(route)
        if (index >= 0) routes.splice(index, 1)
      }
    },
  })
  root.provide('tools', { register: (): (() => void) => (): void => {} })
  root.provide('systemPrompt', { section: (): (() => void) => (): void => {} })
}

afterEach(() => {
  vi.useRealTimers()
})

describe('RA1d · lock A — fiber unload disposes the domain (no route, no sweep timer)', () => {
  it('reclaims /api/filehub and stops the sweeper when the fiber is disposed', async () => {
    const tmp = await makeTempDir('ra1d-unload')
    const routes: CapturedRoute[] = []
    vi.useFakeTimers()
    try {
      const baselineTimers = vi.getTimerCount()
      const root = new Context()
      provideSixServices(root, tmp, routes)

      // Mount the SHIPPED export through the real plugin path: apply is a named
      // function → cordis takes the constructor branch (`new apply(ctx, cfg)`),
      // the exact path that used to drop the returned domain object.
      const fiber = root.plugin({ inject, apply }, defaultTestConfig())
      await fiber

      expect(filehubRoutes(routes)).toHaveLength(1) // mount registered the prefix route
      expect(vi.getTimerCount()).toBeGreaterThan(baselineTimers) // sweep interval started

      await fiber.dispose()

      expect(filehubRoutes(routes)).toHaveLength(0) // route disposer ran via the effect
      expect(vi.getTimerCount()).toBe(baselineTimers) // sweep timer stopped
    } finally {
      vi.useRealTimers()
      await removeTempDir(tmp)
    }
  })
})

describe('RA1d · lock B — dispose → remount cycle over duplicate-throwing webServer', () => {
  it('remounts cleanly after unload and cleans up again', async () => {
    const tmp = await makeTempDir('ra1d-remount')
    const routes: CapturedRoute[] = []
    vi.useFakeTimers()
    try {
      const root = new Context()
      provideSixServices(root, tmp, routes)

      const first = root.plugin({ inject, apply }, defaultTestConfig())
      await first
      expect(filehubRoutes(routes)).toHaveLength(1)
      await first.dispose()
      expect(filehubRoutes(routes)).toHaveLength(0)

      // Pre-fix this mount THREW `duplicate prefix route` (register isomorph of
      // the real WebServer) because the leaked route was never unregistered.
      const second = root.plugin({ inject, apply }, defaultTestConfig())
      await second // resolving = reached ACTIVE without the duplicate throw
      expect(filehubRoutes(routes)).toHaveLength(1)

      await second.dispose()
      expect(filehubRoutes(routes)).toHaveLength(0)
    } finally {
      vi.useRealTimers()
      await removeTempDir(tmp)
    }
  })
})

describe('RA1d · lock C — guarded effect-face semantics (plain-object host)', () => {
  it('runs setup immediately, defers disposal, and survives a double dispose', () => {
    const fake = makeFakeContext([{ id: 's1', cwd: process.cwd() }])
    const ctx = fake.ctx as unknown as Record<string, unknown>
    const labels: string[] = []
    const collected: Array<() => void> = []
    // Mirror cordis effect semantics: execute IMMEDIATELY, collect the RETURN.
    ctx.effect = (setup: () => (() => void) | void, label?: string): void => {
      labels.push(label ?? 'anonymous')
      const disposer = setup()
      if (typeof disposer === 'function') collected.push(disposer)
    }

    const domain: FileHubDomain = apply(fake.ctx, defaultTestConfig())

    // Wired under the documented label …
    expect(labels).toContain('filehub-domain')
    // … and NOT disposed at mount time (the immediate-call trap: passing
    // `() => domain.dispose()` as the effect body would empty the route table
    // right here).
    expect(filehubRoutes(fake.routes)).toHaveLength(1)
    expect(collected).toHaveLength(1)

    // The collected disposer tears the domain down.
    collected[0]()
    expect(filehubRoutes(fake.routes)).toHaveLength(0)

    // Double-run safety: explicit caller-side dispose after the effect disposer
    // (and a second disposer run) must not throw — dispose is idempotent.
    expect(() => domain.dispose()).not.toThrow()
    expect(() => collected[0]()).not.toThrow()
  })

  it('keeps the caller-owns-handle contract when ctx has no effect face', () => {
    const fake = makeFakeContext([{ id: 's1', cwd: process.cwd() }])
    expect((fake.ctx as unknown as { effect?: unknown }).effect).toBeUndefined()

    const domain = apply(fake.ctx, defaultTestConfig())
    expect(filehubRoutes(fake.routes)).toHaveLength(1)
    domain.dispose()
    expect(filehubRoutes(fake.routes)).toHaveLength(0)
  })
})
