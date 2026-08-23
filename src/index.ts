/**
 * zDSH FileHub host half entry.
 *
 * M0 scaffold: proves the load chain (Loader -> apply) with a typed minimal
 * surface. Domain services land per milestone: upload channel (M1), mention
 * pipeline (M2), document reading (M3), vision waterfall (M4), console and
 * settings (M5) — see plan/filehub/P01 §6 for the binding specifications.
 */

export interface FileHubConfig {
  /** Session-workspace subdirectory name created under the session cwd. */
  storageDirName: string
}

export const filehubConfigDefaults: FileHubConfig = {
  storageDirName: '.filehub',
}

/**
 * Structural seam for the subset of the host context FileHub touches.
 * Concrete service typings arrive with their owning domain; the scaffold
 * only declares what it actually uses so it cannot lie about readiness.
 */
export interface HostContext {
  readonly logger: { info(message: string): void }
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

export function apply(ctx: HostContext, config?: Partial<FileHubConfig>): void {
  const resolved: FileHubConfig = { ...filehubConfigDefaults, ...config }
  ctx.logger.info(`[filehub] scaffold ready (storageDirName=${resolved.storageDirName})`)
}
