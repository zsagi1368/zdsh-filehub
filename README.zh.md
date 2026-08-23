# zDSH FileHub · 统一文件中心

DeepSeek Harness（zDSH 分支）的统一文件中心插件：把**上传通道、@ 文件提及、AI 文档阅读、图片讲解、跨会话文件管理**收进一个开箱即用的 cordis 插件。

> 状态：`0.1.0` 开发中（净室全新开发，零社区代码复用；设计规格见分支仓 `PluginR&D/plan/filehub/P01`）。

## 功能总览

| 域 | 能力 |
|---|---|
| 上传 | 点击/拖拽/粘贴/文件夹四入口，流式直传、sha256 去重、会话工作区落盘 `.filehub/<sessionId>/`，进度与配额可见 |
| 提及 | `@` 双源候选（工作区索引 + 已上传），发送时存在性校验 + 结构化引用注入（内容不过线），chip 引用条 |
| 阅读 | `read_document` 工具：text/PDF/DOCX/XLSX 分页阅读、格式差异化输出预算、探表后读、内容寻址缓存 |
| 视觉 | 图片讲解瀑布：路由门控（多模态模型自动放行官方链路）→ 本地 Ollama 探测 → 显式端点 → 关闭降级；默认零外发 |
| 控制台 | 跨会话"文件"视图 tab：搜索/过滤/存储占用统计/一键清理/拖回对话即引用 |

## 安装

```sh
dsh plugin --profile <你的profile> add https://github.com/zsagi1368/zdsh-filehub
```

随包 `cordis.patch.yml` 自动完成装配，无需手工改配置。

## 开发

```sh
pnpm install   # 宿主类型经 link:../Fork/* 解析（需同级存在 deepseek-harness 检出）
pnpm run check # typecheck + test + build 三门
```

## License

[MIT](./LICENSE)
