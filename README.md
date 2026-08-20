# 张裕霖 — 个人作品集

> AI 应用开发工程师 / 全栈开发者 · 深圳 · 2025 届

线上地址：**https://anson-yuz.github.io/**

纯原生 HTML / CSS / JS，零框架、零构建，托管于 GitHub Pages。
设计基因：深色视觉、绿色强调、中文衬线标题、英文等宽字体、Canvas 动态光场、滚动入场动画。

---

## 技术栈

- **结构 / 样式**：原生 HTML5 + CSS（CSS 变量、`clamp()` 响应式、Grid / Flex）
- **交互**：原生 JavaScript —— `IntersectionObserver`（入场动画、视频懒播放、当前区块高亮）、Canvas 实时光场
- **数据**：单一配置文件 `content.js`，首页与案例页共用，不重复维护
- **部署**：GitHub Pages（`main` 分支根目录，推送即更新）

---

## 目录结构

```
.
├── index.html              首页（只是结构外壳，内容由 JS 注入）
├── content.js              ★ 所有文字 / 项目 / 导航 / SEO 配置都在这里
├── 404.html                404 页面（同款设计）
├── robots.txt              搜索引擎抓取规则
├── sitemap.xml             站点地图（新增页面记得同步）
├── resume.pdf              简历（当前为占位，请替换为真实简历）
├── projects/               案例详情页（每页共用 project.js 渲染）
│   ├── memory-healer.html
│   ├── fund-intelligence.html
│   └── battle-city.html
├── assets/
│   ├── css/main.css        全站样式
│   └── js/
│       ├── app.js          首页装配与交互
│       ├── project.js      案例页装配
│       ├── video.js        视频懒播放 + 控制
│       └── aurora.js       背景光场 + 噪点颗粒
└── images/                 演示视频、封面、OG 分享图
```

---

## 本地预览

直接**双击 `index.html`** 即可预览（纯静态，无需服务器；脚本均为普通 `<script>`，非 ES Module）。

若浏览器对本地 `file://` 限制较严（个别情况下视频/字体不加载），用任意静态服务器：

```bash
python -m http.server 8080
# 然后打开 http://localhost:8080
```

---

## 改网站内容（只改 `content.js`，不用碰 HTML）

所有文字、项目、链接都在 **`content.js`** 一个文件里。可直接在 GitHub 网页上点铅笔图标 ✏️ 编辑，提交后约 1 分钟生效。

| 字段 | 控制 |
|------|------|
| `site` | 站点标题、姓名、SEO 描述、简历路径 |
| `nav` | 顶部导航项（首页 / 项目 / 能力 / 关于 / 简历 / 联系）|
| `hero` | 首屏：岗位定位、简介、口号、求职状态、CTA 按钮 |
| `stats` | 数据带的 4 个数字 |
| `skills` | 核心能力 4 类（能力 + 项目佐证）|
| `cases` | 精选案例（大图交错排版，可增删，自动编号）|
| `works` | 更多作品卡片（可增删；`link` 留空显示「代码暂未公开」）|
| `about` | 关于我：正文、元信息、平台能力 |
| `certificates` | 证书（`hidden:true` 不显示）|
| `contact` | 邮箱、GitHub、跑马灯文字 |
| `seo` | OG 图、主题色等 |

> **空字段规则**：任何留空 `""` 的链接 / 字段都会自动隐藏，不会渲染成死按钮。

### 新增一个「更多作品」卡片
在 `works[]` 里照格式复制一段；私有项目把 `link` 留空 `""`，会显示「代码暂未公开」。

### 新增一个精选案例 + 详情页
1. 在 `content.js` 的 `cases[]` 复制一段，填好 `id`（英文短横线，如 `my-project`）、`title`、各文案、`video`/`image`、`stack`，以及 `caseStudy: "projects/my-project.html"`。
2. 复制 `projects/` 下任一 `.html` 为 `projects/my-project.html`，只改两处：`<title>` 和 `<main id="project" data-id="my-project">`。
3. 在该案例的 `detail{}` 里逐条补充背景 / 职责 / 架构 / 流程 / 难点 / 取舍 / 不足 / 优化（留空的自动隐藏）。
4. 把新页面 URL 加进 `sitemap.xml`。

### 显示证书
`certificates[]` 里两项当前为占位且 `hidden: true`。填好**证书准确全称**后，把对应项的 `hidden` 改为 `false`（或删掉该字段），即会显示在「关于」区。请勿填写不确定的名称。

### 替换简历
把简历命名为 **`resume.pdf`** 放到仓库根目录覆盖占位文件即可（路径由 `content.js` 的 `site.resumeUrl` 控制）。

### 替换 OG 分享图
做一张 **1200×630** 的图，命名 `images/og-cover.jpg` 放进去（`<meta>` 已引用）。建议深色底 + 姓名 + 岗位定位 + 口号，用 Canva / Figma 导出即可。当前未提供，分享链接暂无预览图（不影响页面）。

### 压缩演示视频
演示视频建议 **竖屏手机原生分辨率、15–30 秒、去音轨、< 1 MB**：

```bash
# 压缩（竖屏缩到高 960、去音轨、faststart 便于网页流式播放）
ffmpeg -i 原视频.mp4 -an -vf "scale=-2:960" -c:v libx264 -crf 28 -preset slow -movflags +faststart images/xxx-demo.mp4
# 生成封面
ffmpeg -ss 5 -i images/xxx-demo.mp4 -frames:v 1 -q:v 3 images/xxx-poster.jpg
```

---

## 部署（GitHub Pages）

推送到 **`main`** 分支即自动部署，约 1 分钟生效。无需任何构建步骤。

```bash
git add . && git commit -m "更新内容" && git push
```

> `.gitattributes` 已将 `*.pdf / *.mp4 / *.jpg` 等标记为二进制，避免 Windows 下 CRLF 转换损坏文件。

---

## 性能 / 无障碍 / SEO 要点

- **视频懒播放**：`preload="none"`，进入视口才下载并播放，离开 / 页面隐藏即暂停，同一时间只播一个；触屏与「减弱动态效果」下不自动播放，提供播放 / 暂停按钮。
- **Canvas 光场**：离屏 / 标签页隐藏时暂停 `requestAnimationFrame`，DPR 上限 1.5，移动端降低模糊半径，尊重 `prefers-reduced-motion`，`resize` 防抖。
- **无障碍**：跳到主内容链接、`header/nav/main/section/footer` 语义结构、区块 `aria-label`、导航 `aria-current`、统一 `:focus-visible` 焦点环、装饰 Canvas `aria-hidden`、移动端菜单 `aria-expanded`；小字号文字对比度达到 WCAG AA。
- **SEO**：`canonical`、Open Graph / Twitter Card、`Person/WebSite/ProfilePage` JSON-LD、`sitemap.xml`、`robots.txt`。

---

## 浏览器兼容性

面向现代浏览器（Chrome / Edge / Firefox / Safari 近版本）。使用了 `IntersectionObserver`、CSS `clamp()`、`backdrop-filter`、`svh` 单位等现代特性；旧版浏览器会优雅降级（动画 / 光标等关闭，内容仍可读）。

---

## 已知事项 / 待补素材

- `images/og-cover.jpg`（社交分享图）为占位，待替换；缺失仅表现为分享链接无预览图，不影响页面。
- 三个案例页的 `detail{}`（架构 / 我的职责 / 团队 / 周期 / 技术难点 / 取舍 / 不足 / 优化）多为空，逐步补全后会自动出现在案例页。

## 后续可选优化

- 生成正式 OG 分享图。
- 视情况添加轻量 GitHub Actions（HTML 校验 / 死链检查）——当前作为个人静态站未启用，避免维护负担。
- 接入 Lighthouse CI 跟踪性能（可选）。

---

© 2026 张裕霖 — 手写，无框架。
