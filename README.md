# Dongwen Tang — Personal Homepage

A static academic homepage built with HTML and CSS. No JavaScript, framework, or build dependencies are required. The design follows the CoSTA style and the personal pages of [Runchuan Zhu](https://zrc007.github.io/) and [Junrui Zhang](https://alniyatrui.github.io/).

## 项目结构

- `index.html`：全部页面内容，依次为 About、News、Selected Publications、Selected Preprints、Experience、Honors & Awards、Other Projects。
- `styles.css`：共享样式、响应式布局、键盘焦点、减少动画与打印样式。
- `assets/costa-favicon.png`：浏览器标签页图标。
- `assets/papers/`：页面实际使用的五张研究配图。
- `assets/sources.md`：图标、配图来源记录。
- `scripts/check.mjs`：静态资源、内部链接、无障碍标签、论文入口与未引用资源检查。
- `.github/workflows/pages.yml`：GitHub Pages 发布工作流。
- `.nojekyll`：让 GitHub Pages 按静态文件发布。

## 本地预览与检查

在项目目录运行：

```sh
python -m http.server 4173
```

打开 http://localhost:4173 。也可以直接打开 `index.html`。在线字体不可用时，页面会使用系统字体。

使用 Node.js 22 或更新版本执行静态检查，无需安装依赖：

```sh
node scripts/check.mjs
```

## 发布到 GitHub Pages

1. 本项目使用仓库 [MTDoven/Personal-Page](https://github.com/MTDoven/Personal-Page)。
2. 将后续更新推送到 `main` 分支。
3. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 在 **Actions → Deploy GitHub Pages → Run workflow** 手动触发，或再次推送更新。

启用 GitHub Pages 并发布成功后的地址为 https://mtdoven.github.io/Personal-Page/ 。

工作流先运行静态检查，再将网页、样式、图标及五张研究配图打包发布。README、来源说明和检查脚本不进入网站发布包。资源使用相对路径，也支持部署到普通项目仓库。

## 后续维护

直接编辑 `index.html` 更新文字和链接，编辑 `styles.css` 调整样式。新增或更换配图时，请同步更新 `assets/sources.md`，并删除被替换后不再使用的资源。发布新样式前更新 HTML 中 `styles.css` 的版本查询参数，避免浏览器沿用旧缓存。

个人资料依据用户提供的简历及后续确认。论文以会议官网或 arXiv 为入口；代码和项目按钮指向对应作者资源。CV、照片、已移除的板块和旧配图均不包含在最终项目中。
