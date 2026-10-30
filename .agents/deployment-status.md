# 部署状态

最后更新：2026-10-30。新版待发布；最新实际状态见下方。


## 当前状态（2026-10-30，发布准备）

- 网页升级与本地验收完成，准备迁移 GitHub Pages 为 Actions 构建发布；此段写入时尚未推送或切换远端。
- 11 件案例、三件精选、可筛选档案、个人实验区、独立案例链接、按需演示视频与分享封面已实现。
- 本地构建通过；JS gzip 83.55KB / CSS gzip 6.49KB。Chrome响应式、全部案例、键盘焦点、视频与PDF一致性通过；详见homepage-design.md。
- 2026-10-30只读核验远端仍为legacy / main / docs，旧PDF页面保持built；本地与origin/main基线均为bc9bef4。
- 新工作流为.github/workflows/pages.yml，Node24执行npm ci和build，仅dist进入Pages。
- 保留入口：https://mingqing-h.github.io/portfolio-pdf/ ；PDF：https://mingqing-h.github.io/portfolio-pdf/portfolio.pdf 。
- 回退路径：保留docs/index.html与docs/portfolio.pdf，可将Pages改回main的/docs；无需恢复或覆盖PDF原文件。
- 未验证：新版线上页面、线上性能、真实微信、Safari/iOS、无代理国内网络。实际发布后更新此段。

## 维护要求

- 执行部署、发布配置调整、站点路径变更、PDF 更新或线上排查后，必须在任务结束时同步维护本文件，包括失败或未完成的情况。
- 更新当前状态与最近验证记录，写明日期、变更内容、目标环境、发布结果、验证方式与结果、遗留问题及下一步；实际部署时同时记录对应提交和工作流运行链接或编号。
- 明确区分“仅本地修改”“已推送待发布”“部署成功”“部署失败”等状态；未进行的检查标为未验证，历史验收只代表当时结果。
- 当前状态置于前部；保留有用的部署历史及问题处理经验，及时修正过时描述。文档更新时间与线上验证时间分别记录。


## 历史本地状态（2026-10-28）

- 本地动效已更新为 V2：独立边高曲面窗口、满幅截图、50 单位/秒连续滚动与惯性；当前构建 JS gzip 75.24KB / CSS gzip 3.46KB，Chrome 3 秒帧间隔采样 P95 17ms。原作对照及本轮交互验证见首页设计文档 V2 章节。
- **仅本地修改，未部署。** 新增 React + Vite + TypeScript 首页与生产构建；未执行提交、推送、远端 Pages 切换或 GitHub Actions 发布。
- 根目录 index.html 为新应用入口，构建到 dist/，base=/portfolio-pdf/；开发服务提供 PDF，构建复制 docs/portfolio.pdf 到 dist/portfolio.pdf。
- docs/index.html 与 docs/portfolio.pdf 保留原状；线上仍以 2026-10-26 的历史发布记录为准，本次未重新验证线上。
- 本地 Chrome 已验证 1440×1080、1366×768、390×844、320×740、1920×1080；主要交互和子路径资源通过。TypeScript 与生产构建通过。
- V1 本地历史验收：PDF HTTP 200、Content-Type 正确，副本 SHA256 一致；首屏约 263KB、无自动 PDF 请求、CLS=0。本轮未改动 PDF、资源地址或部署方式，未将 V1 数据记为 V2 重测。
- 内置浏览器控制启动失败，使用已安装 Chrome 验证；真实微信、iOS 与国内网络未验证。详见 [homepage-design.md](homepage-design.md) 和 [HANDOFF.MD](../HANDOFF.MD)。
- 下一步：用户审阅本地首页后，按正式上线任务迁移 GitHub Actions，并核验远端发布源、分享入口、PDF 直链及线上性能。现有访问地址继续保留如下。


## 历史本地状态（2026-10-27）

- 本地实现仍为 docs/index.html 跳转到 docs/portfolio.pdf，docs/.nojekyll 保留；已核对 docs/ 与本地 HEAD 一致。
- 最近记录的发布配置为 main 分支的 /docs；本次未查询远端配置或重新检查线上可用性。
- 本地 HEAD 为 bc9bef4（2026-10-26）。当前存在尚未提交的目录整理与文档改动，本次未执行提交、推送或部署，不代表这些改动已同步至远端。
- 已将部署记录移至 .agents/，移除 research/，清理对应忽略项与 README 引用，并新增开发规范和 Agent 文档入口。
- React + Vite + TypeScript、CSS + Motion、静态内容与 GitHub Actions 构建发布方案已记录在 [development-guidelines.md](development-guidelines.md)，尚未实施。
- 后续部署需保留下方网站入口与 PDF 直链，完成发布配置、资源路径、文件访问和性能验证后，再更新线上验收结果。

## 最近一次已记录的部署（2026-10-26）

2026-10-26：已创建公开远端仓库并推送本地 `main`，Pages 发布完成。首次部署流程 `40328797901` 的 build、deploy 均成功，Pages API 状态为 `built`。部署采用本地仓库中的独立 PDF 副本，原文件未修改。

- 本地仓库：`D:/A-Justdoit/portfolio-pdf`
- PDF：`docs/portfolio.pdf`，2,417,003 字节，8 页，复制时 SHA256 与原始文件一致。
- 远端：`https://github.com/Mingqing-H/portfolio-pdf`
- 分享入口：`https://mingqing-h.github.io/portfolio-pdf/`
- PDF 直链：`https://mingqing-h.github.io/portfolio-pdf/portfolio.pdf`
- Pages 配置：`main` 分支，`/docs`。

### 首次部署验收结果（2026-10-26）

- 入口 HTTP 200，HTML 325 字节，包含立即打开 `./portfolio.pdf` 的 meta refresh，无框架或第三方资源。
- PDF HTTP 200，`Content-Type: application/pdf`，2,417,003 字节，与本地副本逐字节一致；本地副本也与原文件逐字节一致。
- PDF SHA256：`94851e3f0c75ce3e42266b989fa1e9fac49ca20b06a834ab4ffda1fad1af9d18`。
- Range 请求返回 206，`Content-Range: bytes 0-1023/2417003`，支持按需分段获取。
- 本次代理环境单次观测：入口约 1.31 秒，PDF 完整获取约 2.80 秒；不是跨网络性能保证。
- 本地 `main` 已跟踪 `origin/main`，工作区干净；普通用户权限下的 `git push --dry-run origin main` 返回 Everything up-to-date，远端认证可用。
- GitHub CLI 在正常用户权限下可以读取系统 keyring；此前沙箱的“token invalid”不代表实际凭据失效。
- 已将本仓库精确路径加入普通用户的 Git `safe.directory`，本仓库 credential helper 使用标准 `gh auth git-credential`；未将凭据写入仓库文件。
- 浏览器自动检查存在限制：Codex 浏览器初次打开时发布尚未完成、显示 404；发布完成后的重新加载超时，未取得最终 PDF 渲染截图。因此仅声明 HTTP、文件一致性、发布状态和推送权限验证通过，未验证手机、微信及无代理国内网络表现。

原始 PDF 位于用户指定的毕业求职资料目录，后续远端同步仅从本仓库进行，不会自动读取或覆盖原文件。
