# 黄明清 · 作品集

首版通过 GitHub Pages 直接提供原版 PDF，浏览器使用自身的 PDF 阅读器呈现。

- 分享入口：<https://mingqing-h.github.io/portfolio-pdf/>
- PDF 直链：<https://mingqing-h.github.io/portfolio-pdf/portfolio.pdf>
- 仓库：<https://github.com/Mingqing-H/portfolio-pdf>
- Pages 发布源：`main` 分支的 `/docs` 目录。

## 更新作品集

本仓库中的 `docs/portfolio.pdf` 是独立副本。部署和远端同步仅使用本仓库，不读取或修改原始位置的 PDF。

用新版 PDF 替换 `docs/portfolio.pdf`，然后在本仓库目录执行：

```powershell
git add -- docs/portfolio.pdf
git commit -m "Update portfolio PDF"
git push origin main
```

GitHub Pages 完成部署后，原分享地址保持不变。

## 实现与性能

- 首页仅为极小的 HTML 跳转页，没有框架、第三方脚本或外部字体。
- PDF 原样保留，初版为 8 页、2,417,003 字节，未转为图片或重复压缩。
- 浏览器能否直接预览 PDF 取决于客户端设置；部分移动端可能选择下载或调用外部阅读器。
- 本地调研资产置于 `research/`，不纳入 Git 同步和 Pages 发布。
