/**
 * Client half entry, served as /plugins/filehub/client.js and loaded through
 * the ModuleLoader factory handshake (banner/footer in build.mjs). Slot,
 * trigger and console registrations land in M1/M2/M5; M0 only proves the
 * handshake exports the expected { apply, inject } shape.
 */

interface ClientContext {
  readonly logger?: { info(message: string): void }
}

/** Client bundles this plugin requires the host to provide first. */
const inject = [
  '@deepseek-ai/dsh-client-runtime',
  '@deepseek-ai/dsh-client-ui-conversation',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-ui-input-trigger',
  '@deepseek-ai/dsh-client-ui-settings',
  '@deepseek-ai/dsh-client-locale',
]

function apply(ctx: ClientContext): void {
  ctx.logger?.info('[filehub] client scaffold loaded')
}

// The ModuleLoader factory wraps this file in `var module = { exports: {} }`,
// so a plain CJS assignment is the handoff contract.
declare const module: { exports: Record<string, unknown> }
module.exports = { apply, inject }
