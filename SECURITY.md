# Security Policy

zDSH FileHub handles user files; its security specification is versioned with the
design docs (fork repo `PluginR&D/plan/filehub/P01` §9). This file tracks which
claims are implemented and verified — claims are added only together with their
tests, never ahead of them.

## Implemented & verified (M0)

- Nothing security-relevant is implemented yet beyond the inert scaffold.

## Specification backlog (not yet implemented — do not rely on these)

- Path sandbox: resolve-then-containment assertions with absolute-path guard.
- SSRF fence for optional URL import (http/https only; localhost / loopback /
  private / reserved ranges rejected pre-request, re-checked post-DNS).
- Upload limits: streaming size caps, concurrency gate, per-session quota.
- Same-origin hardening: Origin hostname comparison plus remoteAddress loopback
  verification.
- Lifecycle sweeper correctness across ALL active sessions.

## Reporting

Open a GitHub issue with reproduction steps; do not include secrets or real
personal files in reports.
