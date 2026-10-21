---
name: "neon-tech-ui"
description: "Vue 3 + Element Plus 深空蓝紫 / 青绿霓虹暗色科技风设计系统。开发或改版本项目页面、组件，或需要高端未来感暗色 UI 时调用。"
---

# Neon Tech UI — 深空科技风设计系统

面向 Vue 3 + Element Plus 的暗色科技感页面规范。目标：**高级、克制、有层次**，靠光、层级和留白营造科技感，而不是堆砌特效或模仿某个现成站点。

## 何时使用

- 新建 / 改版本项目中的页面：首页、列表页、详情页、控制台类页面
- 新增业务组件，需要与既有视觉保持一致
- 用户要求「高端 / 科技感 / 未来感 / 暗色 / 赛博」但同时要专业、不廉价

## 风格关键词

深空底色 · 玻璃拟态 · 双色渐变（靛蓝 → 青）· 细描边 · 局部光晕 · 等宽字体点缀 · 大留白 · 轻动效

## 1. 设计令牌

所有颜色、圆角、阴影只允许来自令牌，禁止在组件中随手写十六进制色值。

```css
:root {
  --bg-base: #05060f;          /* 页面底色 */
  --bg-deep: #070a17;
  --bg-panel: rgba(14, 20, 40, 0.62);  /* 玻璃面板 */
  --bg-inset: rgba(8, 12, 26, 0.6);    /* 输入框 / 代码块内凹底 */

  --line-soft: rgba(123, 146, 255, 0.12);
  --line: rgba(123, 146, 255, 0.2);
  --line-strong: rgba(123, 146, 255, 0.34);

  --text-strong: #eef1ff;
  --text: #c3c9e6;
  --text-muted: #8b93b7;
  --text-faint: #616a8c;

  --primary: #6366f1;
  --cyan: #22d3ee;
  --violet: #a855f7;
  --mint: #34d399;

  --grad-brand: linear-gradient(120deg, #6366f1 0%, #22d3ee 100%);
  --grad-text: linear-gradient(100deg, #fff 0%, #c7d0ff 40%, #7de9f7 100%);

  --r-sm: 12px; --r-md: 16px; --r-lg: 22px; --r-pill: 999px;
  --shadow-card: 0 24px 60px -32px rgba(2, 5, 15, 0.95);
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --font-sans: 'Inter', 'HarmonyOS Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  --font-mono: 'JetBrains Mono', 'Cascadia Code', Consolas, monospace;
  --container: 1200px;
  --header-h: 66px;
}
```

令牌的真实来源见 `src/styles/tokens.css`，修改主题时只改这一处。

## 2. 页面骨架

- 容器：`width: min(var(--container), calc(100% - 48px)); margin-inline: auto;`
- 固定顶栏 `66px`，半透明 + `backdrop-filter: blur(18px)`，滚动超过 12px 才加深背景与描边
- 主体区 `padding-top: var(--header-h)`，避免被固定头部遮挡
- 区块间距 `84px`，紧凑区块 `56px`；标题区与内容之间 `36px`
- 移动端断点：`900px` 单列化、`560px` 收窄留白；卡片内部字号最多降 2px

## 3. 组件规范

### 玻璃面板

```css
.panel {
  background: var(--bg-panel);
  border: 1px solid var(--line-soft);
  border-radius: var(--r-lg);
  backdrop-filter: blur(16px) saturate(130%);
  box-shadow: var(--shadow-card);
}
```

需要强调时加渐变描边（`mask-composite` 双层遮罩实现 1px 渐变边），不要用粗边框或大面积亮色填充：

```css
.panel--glow::before {
  content: ''; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
  background: linear-gradient(140deg, rgba(99,102,241,.55), rgba(34,211,238,.18) 45%, transparent 70%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
```

### 按钮

- 主按钮：`--grad-brand` 填充 + 深色文字 `#061018`，胶囊形，hover 上移 2px 并加强青色外发光
- 次按钮：透明底 + `--line` 描边，hover 只提升描边与文字亮度
- 禁止：纯白主按钮、圆角小于 10px 的方块按钮、三个以上不同尺寸的按钮混排

### 标签 / 胶囊

高 `26px`，胶囊形，12px 字号；默认靛蓝 10% 透明底 + 淡描边；强调标签用青绿（`rgba(34,211,238,.08)` + 青绿文字）。同一卡片内标签不超过 3 个。

### 输入框 / 选择器

内凹玻璃底，`inset 0 0 0 1px var(--line)` 描边，聚焦时描边变靛蓝并加 `0 0 0 3px rgba(99,102,241,.12)` 光晕。大号搜索框高度 `58px`、胶囊形，max-width `640px`。

### 卡片

- 内边距 `22px`；标题 18px / 700；描述 13px、行高 1.75、最多两行
- hover：上移 4–5px + 描边转为主色 mixed 40% + 右上角模糊光斑（`radial-gradient` 的 `::before` / 独立 span）
- 底部信息条：`font-family: var(--font-mono)`、11.5px、`--text-faint`，上方 1px 分隔线

### 数字与代码

统计数字、版本号、文件大小、坐标类信息统一使用 `--font-mono` 并开启 `font-variant-numeric: tabular-nums`；正文保持无衬线，不要整段使用等宽字体。

### 图标底板

工具 / 分类图标使用「品牌色渐变方块 + 两字母标记」：`linear-gradient(145deg, 亮色, 暗色)`，深色文字，顶部内侧高光 + 底部内阴影。不同工具用不同色相区分，但饱和度不高于 80%。

## 4. Element Plus 覆盖规则

- `<html class="dark">` 启用暗色变量，并在 `styles/element.css` 里重写 `--el-color-primary`、`--el-bg-color`、`--el-text-color-*`、`--el-border-color*`
- 只覆盖视觉变量与组件类，不改组件行为；不要滥用 `!important`
- Tabs：激活项文字 `--text-strong`，激活条为 2px 渐变 + 青色辉光
- Button：通过 `.btn-primary` / `.btn-ghost` 类扩展，不在业务组件里内联样式
- 支持 `color-mix(in srgb, ...)` 的现代浏览器优先用它做半透明强调色，保证主题可换

## 5. 动效

- 入场：`opacity 0 → 1` + `translateY(22px) → 0`，`0.7s var(--ease-out)`；同组元素延迟按 60–90ms 递增（`v-reveal` 指令传毫秒）
- hover 过渡统一 `0.25s–0.35s`，只动 `transform / opacity / border-color / background`
- 背景光斑缓慢漂移 20–30s，禁止高频闪烁、持续位移或大面积视差
- 必须尊重 `prefers-reduced-motion: reduce`，关闭位移与循环动画

## 6. 页面模板

**首页**：居中 Hero（状态徽标 → 发光头像环 → 渐变标题 → 一句话定位 → 双按钮 → 4 项统计）→ 环境方案双卡 → 精选工具三列 → 技术栈三卡 → CTA 横幅

**列表页**：小标题 + 大标题 + 说明 → 居中搜索框 → 热门词 → 方案卡 → 筛选胶囊 + 排序 → 三列卡片网格 → 空状态（含清除筛选）→ 提示条

**详情页**：面包屑 → 带主色渐变的头部面板（图标、名称、描述、标签、浏览/下载、官网按钮）→ 左主区 Tabs（下载 / 配置步骤 / 参考链接）+ 右侧信息与推荐栏 → 返回顶部

## 7. 明确不要做的事

- 不要照搬参考网站的布局、配色或组件形态
- 不要使用彩色大面积铺底、彩虹渐变文字、发光描边堆叠
- 不要同时使用 4 种以上强调色；一屏内主色 + 青绿 + 紫（少量）即可
- 不要给正文加阴影或发光，光只属于背景、按钮和强调元素
- 不要把演示数据伪装成真实业务数据，需在界面上注明「静态演示数据」

## 8. 可访问性与性能

- 正文对比度 ≥ 4.5:1；`--text-faint` 只用于辅助信息（≥ 12px 且非关键路径）
- 所有可点击元素保留 `:focus-visible` 轮廓，键盘可操作
- `backdrop-filter` 仅用于顶栏与少量面板；固定背景光斑使用 `transform` 动画并加 `will-change`，避免重绘
- 图片 / 图标必须有 `alt` 或 `aria-hidden`；纯装饰元素 `pointer-events: none`

## 9. 参考实现

- 令牌：`src/styles/tokens.css`
- 全局与动效：`src/styles/global.css`
- Element Plus 覆盖：`src/styles/element.css`
- 组件样例：`src/components/ToolCard.vue`、`EnvPlanCard.vue`、`AppHeader.vue`
- 页面样例：`src/views/HomeView.vue`、`ToolsView.vue`、`ToolDetailView.vue`
