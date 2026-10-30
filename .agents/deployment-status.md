# 部署状态

最后更新：2026-10-30。新版已上线，功能验收通过；线上性能限制见下方。


## 当前状态（2026-10-30，已上线并完成在线复测）

- GitHub Pages 已从 legacy / main / docs 切换为 GitHub Actions。正式网站：https://mingqing-h.github.io/portfolio-pdf/ ；原 PDF：https://mingqing-h.github.io/portfolio-pdf/portfolio.pdf 。两者均返回 HTTP 200。
- 当前线上代码提交：`e020f852b1fcebca8a98169729aa519a634daa1f`。发布工作流 [41001286301](https://github.com/Mingqing-H/portfolio-pdf/actions/runs/41001286301) 的 build、deploy 均成功，部署完成于 2026-10-30 04:09:39 UTC（北京时间 12:09:39）。后续仅维护文档的提交不触发重新发布。
- 首轮完整版本提交 `00672ed`，工作流 [40999722657](https://github.com/Mingqing-H/portfolio-pdf/actions/runs/40999722657) 成功；第二轮加入构建期静态预渲染、客户端 hydration 和无脚本 PDF 降级。
- 检索 48 个仓库后选取 11 件有来源支撑的案例，形成三件精选、可筛选档案、两个个人实验、独立案例链接、真实短版视频和分享封面。保留 V2 曲面展台与原 PDF。
- 工作流 `.github/workflows/pages.yml` 使用 Node.js 24，执行 npm ci / build，仅发布 dist。静态 HTML 无需线上 Node 服务；项目内没有新增运行时依赖。

### 当前验证结果（2026-10-30）

- TypeScript 与生产构建通过；JS gzip 83.77KB、CSS gzip 6.53KB。静态响应包含标题、11 件档案和 PDF 链接，无脚本时隐藏依赖交互的展台并显示 PDF 入口。
- 本地 Chrome 在 320、390、768、820、1024、1366、1920px 宽度无横向溢出；全部案例、分类筛选、直接访问/刷新、Tab/Esc、焦点恢复、拖动误触保护、离屏停止及减少动态效果通过。预渲染没有 hydration 或运行时错误。
- 正式网址 Chrome 桌面与390px移动模拟通过：11 个案例、筛选2/11项、独立链接和刷新；无资源404、无运行时错误。视频点击前0请求，点击后成功播放16秒1280×676片段。
- PDF 2,417,003字节，Content-Type正确，SHA256仍为 `94851e3f0c75ce3e42266b989fa1e9fac49ca20b06a834ab4ffda1fad1af9d18`，Range返回206；原文件和地址未变。
- 本地生产预览样本：LCP720ms、CLS0.00075、资源传输628,104字节，动画帧间隔中位数16.7ms / P95 17ms。仅代表本机，不代替线上数据。
- 线上最终三次独立浏览器上下文冷启动：LCP **9.152s / 4.300s / 2.944s**，TTFB **5.730s / 2.948s / 2.472s**，CLS均低于0.001。每次资源636,301字节，加HTML4,692字节，合计约641KB；首屏无PDF或视频请求。体积与CLS预算达标，**LCP尚未稳定达到2.5s目标**。同版本最初复测另有10.268s样本；不能隐藏网络波动或宣称性能完全达标。
- 内置浏览器控制不可用，采用已安装 Chrome 的 Playwright 实例；正式站点截图与验证输出保存在系统临时目录 portfolio-qa-20261030。

### 遗留验证与回退

- 真实 iOS/Safari、微信、无代理国内网络尚未验证；当前环境网络首字节延迟已明显影响在线首屏。后续应在目标设备/网络复测，并在有托管授权时评估国内访问加速。未增加额外托管服务或修改域名。
- 作品集中的公开演示链接已核验；外部项目后端、企业授权与模型服务不属于本站功能保证。原 PDF 是保留的历史版本，新案例在网页阅读。
- 保留 docs/index.html 与 docs/portfolio.pdf，可将 Pages 改回 main 的 /docs 回退；当前发布不使用此旧入口。

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
