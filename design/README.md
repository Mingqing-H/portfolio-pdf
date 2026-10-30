# 首页构图参考

- 文件：homepage-concept.png，1448×1086。
- 生成方式：内置 image_gen；仅作视觉参考，不进入生产资源。
- 设计基准：1440×1080；实现规范见 ../.agents/homepage-design.md。
- 生成图中的示意作品和描述已替换为用户 PDF 的真实内容，不将其当作履历事实。

## 生成提示词的核心约束

Use case: ui-mockup. Create a polished desktop portfolio homepage for 黄明清.
Warm mint off-white #F5F8EF, forest green #08482D, black #101410.
Top bar: mq. / 黄明清; 作品 / 关于; 作品集 PDF.
Centered large Chinese headline: 把想法，做成 / 真正可用的作品。
Supporting line: 黄明清 · 产品设计、工具开发与 AI 实践.
Handwritten note 从想法到落地 with an arrow below the note.
An arched, edge-to-edge rail of portrait project cards: central card low and upright, outer cards higher with gentle rotation. Pastel sage, lavender, cream and blue; app screenshots within cards; superellipse corners; no heavy shadows.
Below the rail: 浏览作品 inside a forest green button and a fine dashed outline.
Footer: SELECTED WORKS / 2026 and 产品 · 工具 · 数据.
Generous whitespace, native HTML text and controls. No trust badge, login/signup or invented metrics.
Use actual PDF screenshots in implementation rather than the concept's generated media.


## 2026-10-30 新增版式

featured-concept.png 与 playground-concept.png 为精选作品和个人实验区的设计参考。生产版使用真实项目截图；生成图不作为功能或项目完成度证据。首个精选以三张真实竖屏UI组成宽幅画面，保持图文布局、色彩和比例节奏；实际细节见 expansion-direction.md。

上方首页生成提示词是V1历史记录，旋转矩形不再是展台规范。当前曲面几何以 .agents/homepage-design.md 的 V2 章节为准。
