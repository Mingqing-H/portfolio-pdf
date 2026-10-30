export type ProjectGroup = '产品体验' | '效率工具' | '创意实验';

export interface ProjectImage {
  src: string; alt: string; caption: string; width: number; height: number;
}
export interface Project {
  id: number; slug: string; title: string; shortTitle: string; category: string; group: ProjectGroup;
  role: string; description: string; line: string; status: string; color: string; tech: string[];
  cover?: string; image?: ProjectImage; gallery?: ProjectImage[];
  chapters: { title: string; text: string }[]; boundary: string;
  pdfPage?: number; demoUrl?: string; sourceUrl?: string; video?: string; videoPoster?: string;
}

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
export const pdfUrl = asset('portfolio.pdf');
export const githubUrl = 'https://github.com/Mingqing-H';
const pdfImage = (id: number, title: string): ProjectImage => ({
  src: `works/cover-${id}.webp`, alt: `${title}产品界面`, caption: '来自原版作品集的产品界面。',
  width: id === 1 ? 208 : 780, height: id === 1 ? 369 : 440,
});

export const projects: Project[] = [
  {
    id: 1, slug: 'scenic', title: '灵境奇旅', shortTitle: '灵境奇旅', category: '沉浸式交互 / 数字景区', group: '产品体验',
    role: '需求梳理 · 产品设计 · 开发', description: '以杭州西湖为原型，将 3D 场景、虚拟导览与游戏化互动连接起来，也为运营者提供内容配置的入口。',
    line: '把一座景区，变成可以探索的故事。', status: 'Hackday 演示作品', color: '#D5E4CB',
    tech: ['React', 'TypeScript', 'Three.js', 'aHolo Viewer'], cover: 'works/research-scenic-explore.webp',
    image: { src: 'works/research-scenic-explore.webp', alt: '灵境奇旅的 3D 竹林探索界面', caption: '游客端真实界面：跟随导览探索西湖场景。', width: 360, height: 638 },
    gallery: [
      { src: 'works/research-scenic-explore.webp', alt: '灵境奇旅的 3D 竹林探索界面', caption: '3D 场景探索与虚拟导览。', width: 360, height: 638 },
      { src: 'works/research-scenic-collection.webp', alt: '灵境奇旅的数字藏品与个人空间界面', caption: '探索进度与数字藏品。', width: 374, height: 664 },
      { src: 'works/research-scenic-walk.webp', alt: '灵境奇旅的长廊漫游与互动任务界面', caption: '场景漫游与投壶互动入口。', width: 374, height: 663 },
    ], pdfPage: 1, video: 'works/scenic-demo.mp4', videoPoster: 'works/scenic-video-poster.webp',
    chapters: [
      { title: '从观看，到参与', text: '数字景区不止需要一张能拖动的地图。围绕游客的探索过程，将场景漫游、景点故事和互动任务串联，让内容出现在体验真正需要它的地方。' },
      { title: '体验背后，也要有工作台', text: '游客端探索节日主题、猜灯谜、投壶与数字藏品；运营端管理景点资产、主题与互动点。共享的数据协议，让前台体验和后台配置说同一种语言。' },
      { title: '交付一个可演示的闭环', text: '从进入景区、探索场景、参与挑战到领取纪念奖励，完成游客体验，并提供管理端的配置与预览。把空间体验与日常运营放在同一张产品蓝图上。' },
    ], boundary: 'Hackday Demo。管理端使用 Mock 数据与浏览器存储，部分创作、分享功能仍为占位实现。',
  },
  {
    id: 2, slug: 'weekly', title: '周报自动化', shortTitle: '周报自动化', category: '桌面应用 / 业务流程', group: '效率工具',
    role: '流程梳理 · 设计 · 开发', description: '让分散的看板数据、Excel 模板、分析文案与发布步骤，在一个桌面工作流中顺畅衔接。',
    line: '重复的交给工具，判断留给人。', status: '桌面业务工具', color: '#E4DDF0',
    tech: ['Electron', 'React', 'SQLite', 'XLSX / XML'], cover: 'works/research-weekly.webp',
    image: { src: 'works/research-weekly.webp', alt: '周报自动化的报告预览与工作流界面', caption: '真实应用界面，所示数据为虚构演示示例。', width: 1280, height: 771 }, pdfPage: 2,
    chapters: [
      { title: '每周都发生的搬运', text: '导出多个看板、统一计算口径、填写模板、整理报告。面向非技术用户，将这些分散操作组织为可逐项完成的桌面工作流。' },
      { title: '自动化，也尊重原有模板', text: '解析上传的 Excel，计算同比、周进度和过程指标，生成可编辑的分析文案。回写时直接修改 XLSX 内的目标 XML，保留已有公式、样式与图表，让自动化适应业务。' },
      { title: '把交付纳入流程', text: '报告可预览、修改和复制；截图可暂存，经预检与确认后同步到已有 Confluence 页面。数据解析和模板回写支持离线运行。' },
    ], boundary: '同步功能依赖公司环境与授权。看板数据仍由用户下载并上传，未实现全自动取数或 Word / PDF 导出。作品集截图使用演示数据。',
  },
  {
    id: 3, slug: 'lead-review', title: '线索盘点助手', shortTitle: '线索盘点助手', category: 'AI 分析 / 客户运营', group: '产品体验',
    role: '产品设计 · 开发', description: '从通话文本中提取潜客线索与原话证据，将分析结果连接到分配、跟进、回填和座席质检。',
    line: '让一次通话，成为下一步行动。', status: '业务工具实践', color: '#F4E9BA',
    tech: ['Python / FastAPI', 'React', 'MySQL', 'LLM'], cover: 'works/cover-3.webp', image: pdfImage(3, '线索盘点助手'), pdfPage: 3,
    chapters: [
      { title: '让每条判断，都能回到原话', text: 'Excel 导入共享数据库后，由用户明确启动盘点。模型依据转录文本和通话时长识别潜客、整理下一步建议，并附客户原话证据与待复核原因，让结果可以逐项检查。' },
      { title: '分析之后，连接协作', text: '线索进入分配、跟进和结果回填流程；座席复盘覆盖开场、需求探索、基础信息、异议处理、下一步承诺和结束确认。质检结论附转录证据，不适用项单独标记，避免混入通过率。' },
    ], boundary: 'AI 判断需人工复核；HRKG 标签同步与线索盘点为独立处理链路，均由用户明确启动。作品集不接入业务数据库，也不宣称未经测量的准确率。',
  },
  {
    id: 4, slug: 'time-and-tasks', title: 'Bosch 工时与任务协同', shortTitle: '工时与任务协同', category: '工程业务 / 桌面协作', group: '效率工具',
    role: '业务梳理 · 工具设计与实现', description: '将工时记录、测试任务、客户样品和外包排期集中到一处，串联录入、校验、分配与追踪。',
    line: '让工程协作，有迹可循。', status: '工程业务工具', color: '#D9E5EE',
    tech: ['Python', 'Tkinter', 'Pandas / OpenPyXL', 'Excel 工作簿'], cover: 'works/cover-4.webp', image: pdfImage(4, '工时与任务协同'), pdfPage: 4,
    chapters: [
      { title: '把分散的工作放在一起', text: '以 Tkinter 桌面界面连接工时记录、测试任务、客户样品与外包分配，使用 Excel 工作簿保存记录。任务池跟踪待命、进行中和已完成状态，日历提供按日期查看的入口。' },
      { title: '在操作发生时发现问题', text: '正常工时执行每日 8 小时上限校验，加班按起止时间核算；缺少信息的记录可标记为待补全。外包分配检测排期冲突，编辑自动留下字段变更记录，让后续追踪有明确依据。' },
    ], boundary: '案例展示界面与流程设计，内部业务数据和生产环境不在演示范围内。',
  },
  {
    id: 5, slug: 'engineering', title: 'Bosch 工程工具集成平台', shortTitle: '工程工具平台', category: '工程工具 / AI 辅助', group: '效率工具',
    role: '工具平台设计 · 开发', description: '基于 PySide6 的工程工作台，整合文档处理、ECF 测试数据、AI 助手与本地知识库。',
    line: '少一次工具切换，多一点专注。', status: '桌面工具平台', color: '#D5E4D3',
    tech: ['Python', 'PySide6', 'AI 助手', '本地知识库'], cover: 'works/cover-5.webp',
    image: { src: 'works/research-engineering.webp', alt: '工程工具平台的工具中心界面', caption: '来自公开预览仓库的工具中心界面。', width: 1280, height: 691 }, pdfPage: 5,
    sourceUrl: 'https://github.com/Mingqing-H/aggregation-platform-bosch-ETC-preview',
    chapters: [
      { title: '让工具围绕任务组织', text: '文档处理、测试数据整理与知识检索原本分散在不同工具中。用一个桌面入口组织常用工作，将 ECF 数据自动化、文档能力和 AI 辅助整合在同一工作台。' },
      { title: '效率，也需要可控', text: '批量操作提供预览、冲突拦截与撤销。把操作前的判断和操作后的恢复放入工具设计，让自动化更适合真实工程工作。' },
    ], boundary: '公开预览仅包含经过筛选的界面。内部系统、企业数据与生产集成不在演示范围内。',
  },
  {
    id: 6, slug: 'marketing', title: '装企营销工作台', shortTitle: '装企营销工作台', category: '多角色产品 / 营销协作', group: '产品体验',
    role: '产品设计 · 多端交互开发', description: '串联老板、销售、设计师与业主，将内容制作、推广任务和咨询跟进组织为一条流程。',
    line: '从一张营销素材，到一次客户跟进。', status: '多端交互 Demo', color: '#EDDCCF',
    tech: ['React', 'TypeScript', 'Vite', '本地状态管理'], cover: 'works/cover-6.webp', image: pdfImage(6, '装企营销工作台'), pdfPage: 6,
    chapters: [
      { title: '让不同角色各得其所', text: '为管理员、成员与业主提供各自入口，在后台、移动端与咨询页之间连接素材、内容、推广与客户跟进。' },
      { title: '让线索带着上下文流转', text: '内容保存后形成咨询页，提交的线索关联内容、企业与创建成员；团队可跟进、重新分配并查看进度。同一浏览器来源下的各端共享本地状态。' },
    ], boundary: 'Web 交互原型，未接入生产后端、微信授权或小程序发布。模板润色使用本地规则；所示为原版作品集中的早期 Demo。',
  },
  {
    id: 7, slug: 'poollens', title: 'PoolLens AI', shortTitle: 'PoolLens AI', category: 'AI 产品 / 市场洞察', group: '产品体验',
    role: '研究框架 · 产品设计 · 开发', description: '面向泳池机器人命题，将市场信号、产品规格与用户场景整理成证据，连接产品策略和营销行动。',
    line: '让市场信号，抵达产品决策。', status: '2026 AI 未来先锋人才大赛作品', color: '#D2E3EE',
    tech: ['React', 'TypeScript', '飞书妙搭', 'AI 文案与生图'], cover: 'works/research-pool.webp',
    image: { src: 'works/research-pool.webp', alt: 'PoolLens AI 市场洞察与场景研究界面', caption: '参赛应用的市场洞察界面，所示为演示版。', width: 984, height: 447 },
    gallery: [{ src: 'works/research-poolfit.webp', alt: 'PoolFit 根据泳池场景进行产品适配的界面', caption: 'PoolFit 场景适配诊断，以规则展示匹配理由与边界。', width: 984, height: 467 }], pdfPage: 7,
    chapters: [
      { title: '研究需要抵达决策', text: '把公开市场信息、竞品数据与使用场景放进同一条研究链路：公开信号、场景结构化、证据与反证，再到策略建议、实验与指标。' },
      { title: '先讲清理由，再给出匹配', text: 'PoolFit 根据池型、障碍物与清洁需求进行确定性适配，展示匹配理由、风险和能力边界。研究假设与产品实测分开表达，让结论可以被追问。' },
      { title: '让 AI 各司其职', text: '营销工坊衔接文案与概念海报生成；服务不可用时，文案回退到明确标注的本地模板。总览、洞察、矩阵、策略、营销与 PoolFit 共同构成产品原型。' },
    ], boundary: '参赛演示应用。平台数据和 AI 调用依赖妙搭授权，生成内容需人工复核；场景匹配不代表产品实测结论。',
  },
  {
    id: 8, slug: 'muse', title: 'Muse-PI', shortTitle: 'Muse-PI', category: '本地 AI / 智能体工作台', group: '效率工具',
    role: '界面设计 · 工程实践', description: '以项目和会话组织 AI 对话，连接文件引用、模型切换与 Pi CLI 编程任务，并在本地保存工作状态。',
    line: '为自己的 AI 工作方式，做一张桌子。', status: '个人探索项目', color: '#E1E5CF',
    tech: ['Python', 'SQLite', 'JavaScript', 'Pi CLI'], cover: 'works/research-muse.webp',
    image: { src: 'works/research-muse.webp', alt: 'Muse-PI 本地 AI 工作台空状态界面', caption: '实际前端的空状态界面，未接入模型服务。', width: 1280, height: 889 }, pdfPage: 8,
    sourceUrl: 'https://github.com/Mingqing-H/Muse-PI',
    chapters: [
      { title: '从聊天窗口，到工作上下文', text: '将模型配置、流式对话、项目选择和 Pi CLI 入口放在一起。会话中可以切换模型、引用项目文件并显示项目内图片，让编程任务带着上下文继续。' },
      { title: '让工作状态留在本地', text: 'Python 标准库提供 HTTP 服务，SQLite 保存配置与会话；前端以原生 JavaScript 组织工作台。浏览器本地记录可以迁移到服务端状态，项目与会话各自管理。' },
    ], boundary: '个人探索项目。模型访问和 Pi CLI 执行依赖本地配置；本作品集展示界面与设计思路，不提供在线模型调用。',
  },
  {
    id: 9, slug: 'paper-journey', title: '纸上行旅', shortTitle: '纸上行旅', category: '地图交互 / 纸艺视觉', group: '创意实验',
    role: '视觉设计 · 交互开发', description: '纸艺地图、毛毡小人与和纸路线，把一段行程变成一场可以播放的微型旅行。',
    line: '把旅程，放回地图。', status: '个人创意项目', color: '#E9DCC5',
    tech: ['TypeScript', 'Vite', 'IndexedDB', 'Web Audio'], cover: 'works/research-trip.webp',
    image: { src: 'works/research-trip.webp', alt: '纸上行旅的纸艺中国地图、毛毡旅行者与行程界面', caption: '项目实际界面，纸艺地图与旅程播放。', width: 1280, height: 800 },
    demoUrl: 'https://mingqing-h.github.io/MQ_trip-map/',
    chapters: [
      { title: '地图，也可以有手作的温度', text: '让车票和城市成为旅程的线索：层叠地形、和纸路线与毛毡角色构成统一的触感。时间轴支持播放、暂停和变速，沿途镜头也能随时被拖动与缩放接管。' },
      { title: '把旅程里的故事留下来', text: '行程支持增改、删除撤销与 JSON 备份；地点故事和照片保存在 IndexedDB，照片在浏览器内压缩，还能导出纪念印章。地图、字体和素材随站点提供，无需地图服务密钥。' },
    ], boundary: '个人旅行手账。退票不计入旅程统计，缺失时间保留未知；里程按城市大圆距离估算，不代表真实铁路里程。记录保存在当前浏览器，可导出备份。',
  },
  {
    id: 10, slug: 'rain', title: 'Heartfelt Rain', shortTitle: 'Heartfelt Rain', category: 'WebGL / 氛围交互', group: '创意实验',
    role: '视觉探索 · 前端开发', description: '用雨滴、玻璃和光构建一处安静的网页空间。点击，让涟漪回应你的动作。',
    line: '一场可以触碰的雨。', status: '个人交互实验', color: '#BFCDE1',
    tech: ['React', 'TypeScript', 'WebGL2 / GLSL', '双音轨雨声'], cover: 'works/research-rain.webp',
    image: { src: 'works/research-rain.webp', alt: 'Heartfelt Rain 雨幕网页的真实界面', caption: '在线作品的实际界面。', width: 1280, height: 889 },
    demoUrl: 'https://web-mq.vercel.app', sourceUrl: 'https://github.com/Mingqing-H/Web-MQ',
    chapters: [
      { title: '把氛围变成可以回应的界面', text: '选择窗景、调节雨幕与声音，再让点击涟漪回应指尖。玻璃折射、滑落雨滴与循环雨声共同构成一处可以改变的氛围空间。' },
      { title: '用着色器描述一场雨', text: 'React 管理参数与页面状态，独立 WebGL2 渲染器处理雨幕、媒体纹理与指针输入。雨声通过双音轨交叉淡化衔接；切换画面和离开页面时同步管理图形与音频资源。' },
    ], boundary: '视觉交互实验。完整效果依赖浏览器 WebGL2 能力；作品集内使用静态预览，打开在线作品后才加载图形效果。',
  },
  {
    id: 11, slug: 'otpbridge', title: 'OtpBridge 验证码助手', shortTitle: 'OtpBridge', category: '跨端工具 / 日常效率', group: '效率工具',
    role: '产品设计 · 跨端开发', description: '连接 Android 手机与 Windows 电脑，将验证码带到桌面托盘和轻量浮窗，减少反复拿起手机的动作。',
    line: '手机收到的验证码，轻轻落到电脑上。', status: '跨端个人工具', color: '#DDDDE1',
    tech: ['Kotlin', 'Jetpack Compose', '.NET / WPF', 'HTTPS'],
    chapters: [
      { title: '从一个很小的日常摩擦开始', text: '在手机与电脑之间反复查看、抄写验证码。为华为手机和 Windows 设计局域网工具，只传递验证码、来源与时间，由托盘和小浮窗承接复制操作。' },
      { title: '把复杂性放到设置里', text: '二维码简化配对；证书指纹校验、消息去重和过期控制保障传输。日常界面只保留最新验证码和近期记录，让设置退到后台。' },
      { title: '跨过两端，也逐项验证', text: '完成 Android 与 Windows 两端发布构建，并验证协议、提取规则与界面。让一个小工具拥有清晰的数据边界与可以追踪的验证过程。' },
    ], boundary: '已记录指定华为手机亮屏转发的用户确认；熄屏转发、离线补发及部分新版窗口交互仍待真机验收。',
  },
];
export const featuredProjects = [projects[0], projects[1], projects[6]];
export const playgroundProjects = [projects[8], projects[9]];
