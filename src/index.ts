/**
 * zDSH FileHub host half entry.
 *
 * M1 upload domain (P01 §6-A): byte-sniffing layer (src/detect.ts), the HTTP
 * upload service with its guard rails (src/server/upload.ts), the path
 * sandbox (src/server/pathPolicy.ts), lifecycle sweeping and deletion
 * (src/server/lifecycle.ts), and the workspace listing (src/server/list.ts),
 * all wired onto the host `webServer` prefix route `/api/filehub`.
 *
 * Later milestones land per domain: mention pipeline (M2), document reading
 * (M3), vision waterfall (M4), console and settings (M5) — see plan P01 §6.
 */

import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'

import { sendError } from './server/httpUtil.js'
import { createLifecycle } from './server/lifecycle.js'
import { createListHandler } from './server/list.js'
import { createMemoryMetaStore, createMetaStore } from './server/meta.js'
import type { StorageHubLike } from './server/meta.js'
import { createUploadHandler } from './server/upload.js'
import type { HttpHandler } from './server/upload.js'
import { DEFAULT_DANGEROUS_EXTENSIONS } from './server/guards.js'
import { createWorkspaceResolver } from './server/workspace.js'
import type { SessionsLike } from './server/workspace.js'

export { sniff } from './detect.js'
export type { SniffKind, SniffResult } from './detect.js'

/** Extension deny list served as the default value of `upload.dangerousExtensions`. */
export { DEFAULT_DANGEROUS_EXTENSIONS }

export interface UploadDomainConfig {
  /** Per-file byte ceiling. Default 50 MiB. */
  maxBytes: number
  /** Simultaneous uploads admitted server-wide. Default 4. */
  maxConcurrent: number
  /** Per-session stored-bytes ceiling. Default 512 MiB. */
  perSessionQuotaBytes: number
  /** Override of the dangerous-extension deny list (lowercase, no dots). */
  dangerousExtensions?: readonly string[]
}

export interface LifecycleDomainConfig {
  /** Upload expiry age. Default 7 days. */
  ttlMs: number
  /** Sweep cadence. Default 1 hour. */
  sweepIntervalMs: number
}

export interface FileHubConfig {
  /** Session-workspace subdirectory name created under the session cwd. */
  storageDirName: string
  upload: UploadDomainConfig
  lifecycle: LifecycleDomainConfig
}

const MIB = 1024 * 1024

export const filehubConfigDefaults: FileHubConfig = {
  storageDirName: '.filehub',
  upload: {
    maxBytes: 50 * MIB,
    maxConcurrent: 4,
    perSessionQuotaBytes: 512 * MIB,
  },
  lifecycle: {
    ttlMs: 7 * 24 * 60 * 60 * 1000,
    sweepIntervalMs: 60 * 60 * 1000,
  },
}

/** Deep-enough merge for the two nested config groups. */
function resolveConfig(overrides?: Partial<FileHubConfig>): FileHubConfig & {
  upload: Required<Omit<UploadDomainConfig, 'dangerousExtensions'>> &
    Pick<UploadDomainConfig, 'dangerousExtensions'>
} {
  return {
    storageDirName: overrides?.storageDirName ?? filehubConfigDefaults.storageDirName,
    upload: {
      ...filehubConfigDefaults.upload,
      ...overrides?.upload,
    },
    lifecycle: {
      ...filehubConfigDefaults.lifecycle,
      ...overrides?.lifecycle,
    },
  }
}

/**
 * Structural seams over the subset of the host context FileHub touches.
 * Every service is optional so a bare context (smoke tests, degraded hosts)
 * still loads the plugin; capabilities degrade loudly instead of crashing.
 */
export interface LoggerLike {
  info(message: string): void
  warn?(message: string): void
  error?(message: string): void
}

export interface WebServerRouteLike {
  kind: 'exact' | 'prefix'
  path: string
  handler: (req: IncomingMessage, res: ServerResponse) => void | Promise<void>
}

export interface WebServerLike {
  register(route: WebServerRouteLike): () => void
}

export interface HostContext {
  readonly logger: LoggerLike
  readonly sessions?: SessionsLike
  readonly webServer?: WebServerLike
  readonly storage?: StorageHubLike
}

/** Host services required by the full feature set (finalized per domain). */
export const inject = [
  'fs',
  'sessions',
  'storage',
  'webServer',
  'tools',
  'systemPrompt',
]

/** The running plugin instance; dispose tears routes + sweeper down. */
export interface FileHubDomain {
  /** Run one TTL sweep immediately (also on the interval when started). */
  sweep(): Promise<{ workspaces: number; scanned: number; deleted: number; prunedDirs: number }>
  /** Stop the sweeper timer and unregister routes. Idempotent. */
  dispose(): void
}

/**
 * Compose the M1 upload domain onto a host context. Exported separately from
 * {@link apply} so tests can drive the real handlers against fake services.
 *
 * TODO(integration): wrap route registration + the sweeper timer in
 * `ctx.effect(...)` once the loader contract for plugin-provided disposers is
 * pinned down; for now callers own disposal through the returned handle.
 */
export function createFileHubDomain(ctx: HostContext, overrides?: Partial<FileHubConfig>): FileHubDomain {
  const resolved = resolveConfig(overrides)
  const logInfo = (message: string): void => ctx.logger.info(message)
  const logWarn = (message: string): void => ctx.logger.warn?.(message)

  const workspaces = createWorkspaceResolver(ctx.sessions, resolved.storageDirName)
  // Metadata: KV-backed when the host storage hub exposes a KV facet,
  // in-memory otherwise (createMetaStore decides; it warns through logWarn).
  const meta =
    ctx.storage !== undefined ? createMetaStore(ctx.storage, logWarn) : createMemoryMetaStore()

  const uploadHandler = createUploadHandler({
    guards: {
      maxBytes: resolved.upload.maxBytes,
      maxConcurrent: resolved.upload.maxConcurrent,
      perSessionQuotaBytes: resolved.upload.perSessionQuotaBytes,
      dangerousExtensions: resolved.upload.dangerousExtensions ?? DEFAULT_DANGEROUS_EXTENSIONS,
    },
    meta,
    workspaces,
    logWarn,
  })

  const lifecycle = createLifecycle({
    ttlMs: resolved.lifecycle.ttlMs,
    meta,
    workspaces,
    storageRootOf: (cwd) => path.join(path.resolve(cwd), resolved.storageDirName),
    logInfo,
    logWarn,
  })

  const listHandler = createListHandler({ meta, workspaces })

  const dispatch: HttpHandler = async (req, res) => {
    let pathname = '/'
    try {
      pathname = new URL(req.url ?? '/', 'http://filehub.invalid').pathname
    } catch {
      sendError(res, 400, 'malformed request target')
      return
    }
    // Safety net: a handler bug must surface as a 500, never as an unhandled
    // rejection that could take the host down.
    const run = (handler: HttpHandler): void => {
      void Promise.resolve()
        .then(() => handler(req, res))
        .catch((error: unknown) => {
          logWarn(`[filehub] handler failure (${req.method} ${pathname}): ${String(error)}`)
          if (!res.writableEnded && !res.destroyed) sendError(res, 500, 'internal filehub error')
        })
    }
    if (pathname === '/api/filehub/upload') {
      if (req.method === 'POST') return run(uploadHandler)
      sendError(res, 405, 'method not allowed')
      return
    }
    if (pathname === '/api/filehub/file') {
      if (req.method === 'DELETE') return run(lifecycle.deleteFile)
      sendError(res, 405, 'method not allowed')
      return
    }
    if (pathname === '/api/filehub/list') {
      if (req.method === 'GET') return run(listHandler)
      sendError(res, 405, 'method not allowed')
      return
    }
    sendError(res, 404, 'unknown filehub endpoint')
  }

  let unregisterRoute: (() => void) | undefined
  if (ctx.webServer !== undefined) {
    unregisterRoute = ctx.webServer.register({
      kind: 'prefix',
      path: '/api/filehub',
      handler: dispatch,
    })
  } else {
    logWarn('[filehub] webServer service unavailable; upload endpoints not registered')
  }

  lifecycle.start(resolved.lifecycle.sweepIntervalMs)

  return {
    sweep: () => lifecycle.sweep(),
    dispose() {
      lifecycle.stop()
      unregisterRoute?.()
      unregisterRoute = undefined
    },
  }
}

/**
 * Loader entry: compose the domain and announce readiness. The first log line
 * stays stable — smoke tests assert the `[filehub]` prefix plus the effective
 * storageDirName.
 */
export function apply(ctx: HostContext, config?: Partial<FileHubConfig>): FileHubDomain {
  const resolved = resolveConfig(config)
  ctx.logger.info(`[filehub] ready (storageDirName=${resolved.storageDirName})`)
  return createFileHubDomain(ctx, config)
}
