# 黄明清 · 作品集

React + Vite + TypeScript 作品集：可拖动的曲面展台、三件精选案例、11 件作品档案、个人实验区与可分享的案例阅读视图。

- 网站：[mingqing-h.github.io/portfolio-pdf](https://mingqing-h.github.io/portfolio-pdf/)
- PDF：[原版作品集](https://mingqing-h.github.io/portfolio-pdf/portfolio.pdf)
- 最新发布与验证状态：[deployment-status.md](.agents/deployment-status.md)

## 本地开发

使用 Node.js 24 与 npm：

```powershell
npm ci
npm run dev
npm run build
npm run preview
```

开发地址为 http://127.0.0.1:5173/portfolio-pdf/，生产预览为 http://127.0.0.1:4173/portfolio-pdf/。构建输出到 dist/，base 始终为 /portfolio-pdf/。生产构建通过 src/entry-server.tsx 预渲染首页 HTML，再由 React 接管交互；开发模式仍由客户端渲染，无需运行服务端。

## 内容维护

- `src/content/projects.ts`：项目内容、分类、正文、图片、视频、演示与 PDF 页码。
- `public/works/`：经筛选的真实项目截图和短版演示视频。
- `docs/portfolio.pdf`：唯一 PDF 源文件，构建时原样复制到 dist/portfolio.pdf。
- `src/components/railGeometry.ts`：曲面窗口几何；不要用矩形旋转替代独立边高。
- `src/styles.css`、`src/portfolio.css`：首屏与正文视觉。
- `src/components/ProjectDialog.tsx`：可读案例、焦点管理和按需视频。
- `src/hooks/useProjectLocation.ts`：基于 hash 的案例独立链接，刷新不依赖服务器重写。
- [素材出处](docs/asset-provenance.md)、[设计与验收](.agents/homepage-design.md)、[交接记录](HANDOFF.MD)。

新增案例只需维护数据和资源；展示用素材必须区分实际界面、演示数据与概念图。私有源码不作为公众可访问的“源码”入口，未验证的成效和不可用演示链接不写入页面。原版 PDF 保留为历史版本，本次新增项目不自动回写 PDF。

## 发布

工作流 `.github/workflows/pages.yml` 使用 Node.js 24 执行 `npm ci` 与 `npm run build`，然后上传 dist/ 到 GitHub Pages。main 的网站代码、资源与 PDF 更新触发发布；PR 只构建。也可手动运行工作流。远端 Pages 发布源需要设置为 GitHub Actions，实际状态以部署记录为准。

PDF 更新仍只替换本仓库副本，不读取或覆盖仓库外的原始 PDF。构建保留原分享地址与 PDF 直链。

## 体验与性能

字体与媒体本地托管，无运行时 GitHub API、外部字体、统计脚本或后台服务。首屏不请求 PDF 或视频；图片按需加载，视频点击后才请求。展台在离屏、页面隐藏、案例打开、键盘聚焦或用户暂停时停止；遵循系统减少动态效果设置。

预算：首屏 ≤900KB、JS gzip ≤100KB、CSS gzip ≤15KB。当前测量与未验证环境见部署记录。
