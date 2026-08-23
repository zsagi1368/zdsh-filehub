/**
 * Workspace resolution: maps a wire-side session id to the on-disk upload
 * workspace (`<session cwd>/<storageDirName>`), backed by the host `sessions`
 * service (dsh-session SessionStore.get → Session.header.cwd).
 *
 * Host facts this encodes (verified against @deepseek-ai/dsh-session):
 * - `ctx.sessions.get(id)` returns undefined for unknown ids → HTTP 403.
 * - `session.header.cwd` is OPTIONAL; a session without a cwd has no
 *   workspace to anchor uploads → treated as unresolvable (HTTP 403) rather
 *   than silently writing to process.cwd(). TODO(integration): if the shipped
 *   composition guarantees a default cwd for every session, relax this.
 */

import path from 'node:path'

/** Structural subset of the host session store + session object. */
export interface SessionsLike {
  get(id: string): { readonly header: { readonly cwd?: string } } | undefined
  list(): ReadonlyArray<{ readonly id: string; readonly header: { readonly cwd?: string } }>
}

export interface Workspace {
  sessionId: string
  /** The session's working directory (relativePath in responses is relative to this). */
  cwd: string
  /** The upload root: <cwd>/<storageDirName>. */
  root: string
}

export interface WorkspaceResolver {
  resolve(sessionId: string): Workspace | undefined
  /** All live workspaces, for DELETE containment and the lifecycle sweeper. */
  list(): Workspace[]
}

export function createWorkspaceResolver(
  sessions: SessionsLike | undefined,
  storageDirName: string,
): WorkspaceResolver {
  const toWorkspace = (
    sessionId: string,
    header: { readonly cwd?: string },
  ): Workspace | undefined => {
    const cwd = header.cwd
    if (typeof cwd !== 'string' || cwd === '') return undefined
    return { sessionId, cwd, root: path.join(path.resolve(cwd), storageDirName) }
  }
  return {
    resolve(sessionId) {
      const session = sessions?.get(sessionId)
      if (!session) return undefined
      return toWorkspace(sessionId, session.header)
    },
    list() {
      const live = sessions?.list() ?? []
      const workspaces: Workspace[] = []
      for (const session of live) {
        const workspace = toWorkspace(session.id, session.header)
        if (workspace) workspaces.push(workspace)
      }
      return workspaces
    },
  }
}
