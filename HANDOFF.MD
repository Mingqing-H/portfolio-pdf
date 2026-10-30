# HANDOFF

更新：2026-10-30。

## 先读

- .agents/development-guidelines.md：项目规范。
- .agents/homepage-design.md：本次首页方向、内容、交互、性能预算及验收记录。
- .agents/deployment-status.md：本地与线上状态的区分。

## 历史实现（2026-10-28）

React + Vite + TypeScript 本地首页已搭建。入口为根目录 index.html，数据在 src/content/projects.ts，真实图片来自 docs/portfolio.pdf。npm run dev 开发，npm run build 类型检查并构建，npm run preview 预览。base 始终为 /portfolio-pdf/。

docs/index.html 仍是原来的线上 PDF 跳转页；没有提交、推送、部署或变更远端 Pages 配置。dist 是本地生成结果，不能当作线上状态。预览服务本次使用 http://127.0.0.1:4173/portfolio-pdf/。

## 踩坑与规避

1. 本会话默认 exec 与 Node REPL 因 Windows sandbox setup refresh 失败而无法启动；改用经过自动审核的 require_escalated 执行项目内操作。不是仓库代码故障。Desktop Commander 设备离线；不要把这些错误误报为项目构建失败。
2. 内置浏览器 cua 启动报 trusted Node process exited unexpectedly；本次按项目约定使用 Playwright 驱动已安装 Chrome 验证，截图放在授权的可视化目录。内置浏览器面板的打开请求已经排队，不等于已验证面板加载。
3. PowerShell 调用 Python 读取中文 PDF 前设 PYTHONIOENCODING=utf-8，否则输出会乱码。
4. 原生 button 内部内容可能垂直居中；作品卡明确使用 flex column + justify-content:flex-start，避免标题被绝对定位图片遮挡。
5. 截图要等待入场动画完成（本次 1200ms），networkidle 不保证动画结束，否则会误判为低对比度或缺失内容。
6. 指针按下不应触发卡片键盘居中，否则拖动会跳位。用 pointerActive 区分指针与键盘焦点；拖动后 Enter/Space 要清除 click 抑制状态。
7. 模态 dialog 默认键盘导航可能经过浏览器 chrome；对首尾按钮与链接显式循环 Tab，Esc 关闭并将焦点恢复到触发项。
8. 循环总宽必须大于视口加两张卡宽；V2 使用 196 单位 pitch 和双份序列，防止循环端点在屏内跳跃。
9. 多个同源 video 虽可复用下载缓存，但仍有多实例解码/合成成本。当前仅用 136,268 字节的 8 张 WebP 封面；不加载第三方视频。
10. corner-shape 兼容性不完整。用 @supports 和超椭圆 polygon 降级，不能降级成普通圆角；焦点样式需避免被裁切。
11. Vite PDF 插件仅在 build 的 closeBundle 中复制 PDF，不能在开发服务关闭时无条件写 dist。PDF 唯一源为 docs/portfolio.pdf。
12. 本地已有 .gitignore、README.md、.agents 和 Agents.md 改动，本次保留并在其基础上更新，未覆盖或提交他人工作。

## 验证与尚未验证

已通过 TypeScript、Vite 生产构建、Chrome 桌面和移动视口、拖动及惯性、键盘、弹窗、暂停恢复、减少动态效果、离屏停止、PDF HTTP 与 SHA256 一致性验证。细节见首页开发文档的验收记录。
真实 iOS/Safari、微信、国内网络和线上 Web Vitals 尚未验证。首版案例详情复用 PDF 页图；手机可通过 PDF 入口进一步缩放阅读。


13. 触屏有隐式 pointer capture；将捕获从卡片转给展台时，旧子元素会冒泡 lostpointercapture。仅当 event.target 是展台自身才将其作为释放处理，否则拖动会提前结束。触摸 QA 应使用连续移动和真实时间间隔；瞬时 CDP 手势接着立即点击可能出现浏览器抑制合成 click，不能只靠该序列推断实际触摸故障。

## 2026-10-28 曲面动效修订

- 当前依据原作动态视频，不再依据首版生成图制作展台。原视频是 7.2 秒的 1440×1080 录屏；路径和验收见 homepage-design.md 的 V2 章节。
- 不能用「矩形旋转 + 弧线位移」代替内圆柱窗口：两条竖边必须独立计算高度，宽度随距离增加，上下边形成透视倾斜。几何函数在 src/components/railGeometry.ts。
- 保留 170×280 中央比例、196 节距、50 单位/秒速度和每秒消退 95% 的释放速度；不要又退回 208×336 彩色标题卡片。
- 手势、键盘、暂停与速度放在 WorkRail；位置由 Web Animations 时间差驱动。卸载或重建 effect 时必须同时 cancel RAF 和 clock，避免隐藏动画累积。
- 屏外窗口用移到裁剪区域外代替 visibility:hidden，否则键盘无法 focus 到该作品，也无法触发自动居中。
- 目前资源仍为静态作品截图。原作的产品视频不能冒充用户的项目演示。

## 2026-10-30 扩展交接

本轮已将网页扩展为 11 件可阅读案例：三件精选、可筛选档案、纸艺地图与雨幕实验。内容在 src/content/projects.ts，来源见 docs/asset-provenance.md。生成版式概念不进入生产展示，原版 PDF 未修改。已通过 GitHub Actions 发布，线上代码为 e020f85；发布与在线验收见 .agents/deployment-status.md。

14. README 里的历史演示与视频附件 URL 可能已经 404，必须实测再加入口。灵境旧体验地址和两条附件视频本轮失效，未作为可用外链。
15. 原始灵境录屏含概念镜头与真实界面，不能整段称为产品演示。现用64–80秒真实漫游/导览/灯谜片段，独立poster来源67秒；原始154MB文件不进入public。
16. React StrictMode会重放effect。视频cleanup若移除src，setup必须恢复src并load，否则开发模式会出现无法播放；切换案例卸载时停止播放并清理src。
17. 竖屏截图不应在宽画廊中拉成巨大长图。画廊识别高宽比，桌面三列、手机限高并保留原图链接。
18. 移动media规则可能覆盖超椭圆fallback。最终@supports必须仍确保不支持corner-shape的浏览器不退回普通圆角。
19. Windows Node ESM导入绝对盘符路径须使用file:///D:/...；直接D:/...会被识别成不支持的URL协议。
20. 自动审批曾因账号usage limit中断，返回的是审核无法完成，并非安全拒绝。不要绕过；用户继续后正常审批恢复，再执行未完成的收尾。
21. 私有仓库调研报告保留在本地，发布只选必要产品资料与经过筛选的媒体；不要把.local/research、业务数据库、原始视频或临时QA脚本加入提交。

已通过构建、七种响应式宽度、所有案例的直接链接/刷新、筛选、键盘与焦点、按需视频、减少动态效果和PDF一致性。本地性能与具体结果见homepage-design.md新增章节；真实微信/iOS与国内无代理网络仍需真机补验。

22. 仅客户端渲染会让图片发现排在 JS 下载之后。生产构建现用 src/entry-server.tsx 静态预渲染，main.tsx 按是否已有 HTML 选择 hydrateRoot / createRoot；URL hash 和 reduced-motion 的初始状态必须在服务端与客户端一致，再由 effect 同步，避免 hydration mismatch。
23. Vite 的体积日志在 closeBundle 预渲染前打印，不能把日志里的空入口 HTML 大小当最终大小。实际产物含完整内容；React 会输出首屏图片 preload。禁用JS时隐藏尚未计算几何的展台，避免永久空白与无效控制。
24. 单次 GitHub Pages 网络测量不稳定。本次同版本线上 LCP 2.944–10.268s，最终三次冷启动中 TTFB 2.472–5.730s；体积预算达标不等于 LCP 达标。保留失败样本，记录目标未达成，不能拿本地720ms或最快样本替代线上结论。

2026-10-30 收尾：正式站点、全部11个案例、移动模拟、按需视频、PDF200/206与哈希一致性均已复测；工作流41001286301成功。当前仍缺真实微信/iOS/国内无代理网络验证，线上LCP未稳定达到2.5s；详细数字见部署记录。临时验证脚本未进入仓库。