# 作品集网站开发规范

更新日期：2026-10-30。

## 目标与范围

- 首版以创意展示为主，优先体现独特视觉和互动体验，同时兼顾移动端体验、性能和维护成本。
- 本文记录已确定的技术选型与开发约束；已完成11件案例的完整网页，发布状态见deployment-status.md。
- 首页采用「展开作品」方向，设计与实施细节见 [homepage-design.md](homepage-design.md)。作品内容来自原版 PDF 与已核验的 GitHub 项目资料。

## 技术栈与职责

| 技术 | 职责 | 使用约束 |
| --- | --- | --- |
| React | 组织组件、界面与交互状态 | 按实际交互需求拆分组件，避免不必要的全局状态和额外依赖。 |
| Vite | 本地开发、资源处理与生产构建 | 生成可供静态托管的构建产物。 |
| TypeScript | 描述组件接口、交互状态与内容数据类型 | 让内容与组件之间的数据约定明确、可检查。 |
| CSS + 原生 Pointer Events | 首版入场、展台拖动和操作反馈 | CSS 负责入场，单一 RAF 负责展台；首版不需要 Motion，后续有复杂转场需求再引入。 |
| 静态内容文件 | 维护项目资料、图片引用和个人信息 | 首版无需后台、数据库或 CMS；具体文件格式在开发时按内容需要确定。 |
| GitHub Actions + GitHub Pages | 自动构建并发布静态网站 | 延续现有托管平台，保留网站分享入口和 PDF 直链。 |

## 界面与动效

- 界面代码与项目内容分开维护，新增作品应尽量通过新增或更新内容文件完成。
- 动效服务于操作反馈和空间关系；核心内容与导航不能依赖动画播放完成后才能使用。
- 支持触屏、键盘操作和系统的减少动态效果设置。
- 动画优先修改 transform 和 opacity，避免持续触发布局计算。
- 所有圆角，包括胶囊形，均使用超椭圆（superellipse）。
- 避免冗余的辅助标签、说明和重复文案，让布局与交互表达结构。

## 内容与资源

- 项目数据使用明确的 TypeScript 类型；可复用的内容结构保持一致。
- 图片、视频和其他大体积资源按需加载，首页不自动下载整份 PDF。
- 保留现有 PDF 作为可独立访问的作品集版本，不自动读取或修改仓库之外的原始 PDF。
- 使用本仓库内的 PDF 副本进行后续维护和发布。

## 构建与部署

- 正式发布使用 .github/workflows/pages.yml：main 更新触发构建并发布 dist/；远端是否已切换以deployment-status.md为准。
- Vite 构建输出 dist/，远端 Pages 必须设为 GitHub Actions。保留 docs/index.html 作为旧版回退入口，不再将源码目录直接部署。
- 构建与资源路径必须适配现有项目子路径 /portfolio-pdf/。
- 保留分享入口：https://mingqing-h.github.io/portfolio-pdf/ 。
- 保留 PDF 直链：https://mingqing-h.github.io/portfolio-pdf/portfolio.pdf 。
- 如后续调整 PDF 的源文件位置，发布结果仍须在上述 PDF 地址提供文件。
- 部署记录见 [deployment-status.md](deployment-status.md)。

## 验证要求

- 发布前完成 TypeScript 类型检查和生产构建检查。
- 验证移动端布局、主要交互、页面导航和 PDF 访问。
- 验证部署后项目子路径下的资源加载；如引入多页面或客户端路由，同时检查直接访问和刷新。
- 首屏传输目标 ≤ 900KB，JS gzip ≤ 100KB，CSS gzip ≤ 15KB；后续线上目标 LCP ≤ 2.5s、CLS ≤ 0.1。实际测试数据见首页设计文档，不将本地数据视为线上验收。
- 实测国内网络和微信内打开的表现，记录测试环境与限制，不以单次代理测速代替真实访问验证。

## 当前实施与后续事项

- 本地概念、结构与视觉已在 homepage-design.md 确定；根据用户预览反馈继续细化。
- 使用 npm 和 package-lock.json；数据维护于 src/content/projects.ts；页面资源放 public/works/。
- 采用单页锚点、#project=slug 与原生 dialog，不引入路由库。线上与真实网络验收分别记录；微信和iOS需真机补验。
