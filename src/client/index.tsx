/**
 * Client half entry, served as /plugins/filehub/client.js and loaded through
 * the ModuleLoader factory handshake (banner/footer in build.mjs).
 *
 * M1 upload domain (P01 §6-A): the composer tool-row upload entry (button +
 * page-wide drag mask + paste) in `conversation.input.left`, and the queue
 * dock in `conversation.input.dock`. Both share one module-level UploadQueue —
 * "三处入口一个队列" (P01 §8 UX-1).
 *
 * Slot facts verified against the host d.ts (integration evidence):
 * - runtime lib/types/client/index.d.ts merges SessionStandardProps:
 *   every session-scope slot component receives `sessionId` plus useSession;
 *   ui-conversation adds `useInput`/`inputActions`.
 * - ui-conversation src/client/contract/slots.ts declares both targets as
 *   `{ kind: 'list'; scope: 'session'; owner: InputZone }`, so registration
 *   uses a list `id` (+ display order) and components may ignore the owner
 *   share entirely.
 * - runtime lib/types/client/slots.d.ts: ctx.slots.inject(key, callback)
 *   waits for the declaration, runs the callback's registrations under the
 *   caller's fiber, and disposes them when the declaration collapses.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
// Type-only: pulls the ui-conversation SlotMap merge (conversation.input.*).
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'

import { FileHubDock } from './upload/dock.js'
import { resolveSessionId, UploadEntries } from './upload/entries.js'
import { UploadQueue } from './upload/queue.js'

/** Client bundles this plugin requires the host to provide first. */
const inject = [
  '@deepseek-ai/dsh-client-runtime',
  '@deepseek-ai/dsh-client-ui-conversation',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-ui-input-trigger',
  '@deepseek-ai/dsh-client-ui-settings',
  '@deepseek-ai/dsh-client-locale',
]

/** Registrant inject face shared by both slot entries. */
interface FileHubInjectFace {
  readonly queue: UploadQueue
}

let queueSingleton: UploadQueue | undefined

function getQueue(): UploadQueue {
  if (queueSingleton === undefined) {
    queueSingleton = new UploadQueue({
      // Consulted per dispatch; null fails items loud as 'sessionMissing'.
      sessionId: () => resolveSessionId(),
    })
  }
  return queueSingleton
}

function apply(ctx: ClientContext): void {
  ctx.logger?.info?.('[filehub] client M1 upload domain loaded')

  const queue = getQueue()

  // Composer tool-row: upload button + drag mask + paste listener.
  ctx.slots.inject('conversation.input.left', () =>
    ctx.slots.register(
      {
        name: 'conversation.input.left',
        id: 'zdsh-filehub-upload-entry',
        order: 40,
        registrant: 'zdsh-filehub',
        inject: (): FileHubInjectFace => ({ queue }),
      },
      UploadEntries,
    ),
  )

  // Under-the-card queue strip.
  ctx.slots.inject('conversation.input.dock', () =>
    ctx.slots.register(
      {
        name: 'conversation.input.dock',
        id: 'zdsh-filehub-dock',
        order: 20,
        registrant: 'zdsh-filehub',
        inject: (): FileHubInjectFace => ({ queue }),
      },
      FileHubDock,
    ),
  )
}

// The ModuleLoader factory wraps this file in `var module = { exports: {} }`,
// so a plain CJS assignment is the handoff contract.
declare const module: { exports: Record<string, unknown> }
module.exports = { apply, inject }
