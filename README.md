# github-issue-dashboard
Github Issue Dashboard

1) 调用 GitHub REST API 拉取 Issues 列表（默认按最近更新时间降序，最多 50 条）
2) 列表展示关键信息：Issue 标题、编号、创建者、标签、最近更新时间、当前状态（open/closed）
3) 支持根据 Issue 状态过滤（All / Open / Closed）
4) 点击列表项可展开或进入详情页，查看 Issue 正文（Markdown 渲染即可）

技术与功能要求
1. 前端
   a. 使用 React + TypeScript（16.8+，建议 hooks 写法）
   b. 样式自由（可用任意 UI 库或纯 CSS），但需保证基本的可访问性
   c. Loading 与 Error 状态处理完整
   d. 至少写 1–2 个单元/组件测试（Jest + RTL 或其他你熟悉的框架）
2. 数据获取
   a. 直接从浏览器调用 GitHub REST API v3（无需后端代理，注意 rate-limit）
   b. 如需绕过 CORS，可使用 fetch 带上 `Accept: application/vnd.github+json`
3. 组件与状态管理
   - 至少抽象出 2 个以上可复用组件（如 IssueList、IssueItem、FilterTabs 等）
   - 状态管理可选（React Context / Redux / Zustand 等均可）
4. 代码质量
   - 需通过 `npm run lint`（建议提供 ESLint 配置）
   - 严格使用 TypeScript 类型，避免 `any`（除非特别说明并注明原因）
   - 合理拆分文件，保持函数/组件单一职责
5. 额外加分（均为可选）
   - 使用 React Suspense + lazy 做代码分割
   - 本地缓存（localStorage 或 IndexedDB）减少重复请求
   - 响应式布局 / 深色模式
   - 配置 GitHub Actions 进行自动化测试与 Lint