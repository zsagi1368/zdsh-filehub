# Changelog

All notable changes to zDSH FileHub are documented here. Format follows
Keep a Changelog; versioning is SemVer.

## [0.1.0] - 2026-08-24

First public release. Clean-room implementation (zero community code reuse);
design specs: fork repo `PluginR&D/plan/filehub/P01`.

### Added

- **Upload channels** — composer button, full-page drag-drop with recursive
  folder traversal, paste-to-upload; streaming transfer with double size caps,
  concurrency gate (429), per-session quota (507); sha256 dedup with atomic
  writes and race recovery; session-workspace storage `.filehub/<sessionId>/`;
  queue dock with progress, retry and remove.
- **Byte-sniffing layer** (`src/detect.ts`) — magic-bytes authority across
  tools, uploads and metadata; OOXML central-directory discrimination;
  BOM/NUL/gb18030 text heuristics.
- **@ file mentions** — dual-source candidates (bounded workspace index +
  uploaded files), word-start grammar aligned with the host, send-time
  existence validation injecting structured `<workspace-reference>` messages
  (file content never crosses the wire), keyboard-navigable picker with
  disambiguation, chip reference bar, event-driven index invalidation
  (`fs/write-intent`/`fs/edit-intent`) with TTL fallback.
- **AI document reading** — `read_document` tool for text/PDF/DOCX/XLSX with
  probe-then-read sheets, per-format output budgets and explicit truncation
  markers; never-fail parse waterfall; content-addressed LRU cache with
  in-flight dedup; `list_workspace_files`; system-prompt usage guidance.
- **Image captioning waterfall** — multimodal route gate
  (`inputModalities` truth source) passes native images through untouched;
  otherwise explicit endpoint → loopback-only Ollama probe → graceful off;
  URL policy dual lock (local probes locked to loopback, remote endpoints
  locked to public hosts with post-DNS re-check); caption caching.
- **File console** — cross-session "Files" view tab: search/filter, storage
  usage stats, two-step dry-run cleanup, per-session delete.
- **Settings center** — `settings.plugins.tab` panel backed by validated
  KV persistence; zh/en i18n dictionary with host-locale binding.
- **Security hardening** — path sandbox with resolve-then-containment +
  realpath re-check (junction/symlink escape-proof), same-origin hardening,
  SSRF fences, adversarial test suite (5 successful attacks fixed, 27
  hardened regressions) in `tests/adversarial/`.
- **Integration playbook** — `docs/integration-playbook.md` lists every seam
  awaiting first-party branch integration.
