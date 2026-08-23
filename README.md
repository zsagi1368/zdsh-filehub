# zDSH FileHub · Unified File Center

Unified file center plugin for DeepSeek Harness (zDSH branch): **upload channels, @ file mentions, AI document reading, image captioning and cross-session file management** in one batteries-included cordis plugin.

> Status: `0.1.0` in development (clean-room implementation, zero community code reuse; design specs live in the fork repo under `PluginR&D/plan/filehub/P01`).

## Feature overview

| Domain | Capabilities |
|---|---|
| Upload | picker / drag-drop / paste / folder entries, streaming transfer, sha256 dedup, session workspace storage at `.filehub/<sessionId>/`, visible progress and quotas |
| Mention | `@` dual-source candidates (workspace index + uploaded files), send-time existence validation with structured reference injection (no content crosses the wire), chip reference bar |
| Reading | `read_document` tool: text/PDF/DOCX/XLSX with pagination, per-format output budgets, probe-then-read sheets, content-addressed cache |
| Vision | captioning waterfall: route gate (multimodal models pass through to the official path) → local Ollama probe → explicit endpoint → graceful off; zero external bytes by default |
| Console | cross-session "Files" view tab: search/filter, storage usage stats, one-click cleanup, drag back into a conversation to reference |

## Install

```sh
dsh plugin --profile <your-profile> add https://github.com/zsagi1368/zdsh-filehub
```

The bundled `cordis.patch.yml` wires everything up automatically.

## Development

```sh
pnpm install   # host types resolve via link:../Fork/* (needs a sibling deepseek-harness checkout)
pnpm run check # typecheck + test + build
```

## License

[MIT](./LICENSE)
