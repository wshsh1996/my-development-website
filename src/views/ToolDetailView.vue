<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { CopyDocument, Download, Link, Right, TopRight, View } from '@element-plus/icons-vue'
import {
  categoryLabel,
  formatCount,
  formatNumber,
  getRelatedTools,
  getToolById,
} from '@/data/tools'
import ToolMark from '@/components/ToolMark.vue'

const route = useRoute()
const router = useRouter()

const tool = computed(() => getToolById(route.params.id))
const relatedTools = computed(() => (tool.value ? getRelatedTools(tool.value) : []))

const activeTab = ref('download')
const activeVersion = ref('')

watch(
  tool,
  (value) => {
    activeVersion.value = value?.versions[0]?.key ?? ''
    activeTab.value = 'download'
    if (value) document.title = `${value.name} · 工具库 · 码客王`
  },
  { immediate: true },
)

const versionFiles = computed(
  () => tool.value?.files.filter((file) => file.version === activeVersion.value) ?? [],
)

const accentStyle = computed(() =>
  tool.value
    ? { '--accent-a': tool.value.accent[0], '--accent-b': tool.value.accent[1] }
    : {},
)

const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code)
    ElMessage.success('已复制到剪贴板')
  } catch {
    ElMessage.warning('当前浏览器不支持自动复制，请手动选择')
  }
}
</script>

<template>
  <div class="detail">
    <div class="container">
      <nav class="crumbs" aria-label="面包屑">
        <RouterLink to="/">首页</RouterLink>
        <span class="crumbs__sep">/</span>
        <RouterLink to="/tools">工具库</RouterLink>
        <span class="crumbs__sep">/</span>
        <span class="crumbs__current">{{ tool?.name ?? '未找到' }}</span>
      </nav>

      <template v-if="tool">
        <!-- 工具头部 -->
        <header class="detail-hero panel panel--glow" :style="accentStyle" v-reveal>
          <span class="detail-hero__glow"></span>
          <div class="detail-hero__main">
            <ToolMark :tool="tool" :size="78" />
            <div class="detail-hero__info">
              <div class="detail-hero__title">
                <h1>{{ tool.name }}</h1>
                <span class="tag tag--cyan">{{ tool.tagline }}</span>
              </div>
              <p class="detail-hero__desc">{{ tool.desc }}</p>
              <div class="detail-hero__tags">
                <span v-for="tag in tool.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <div class="detail-hero__meta">
                <span>
                  <el-icon :size="14"><View /></el-icon>
                  {{ formatNumber(tool.views) }} 浏览
                </span>
                <span>
                  <el-icon :size="14"><Download /></el-icon>
                  {{ formatNumber(tool.downloads) }} 下载
                </span>
                <span class="mono">更新于 {{ tool.updated }}</span>
              </div>
            </div>
          </div>

          <a class="btn btn--ghost detail-hero__official" :href="tool.official" target="_blank" rel="noopener noreferrer">
            访问官网
            <el-icon :size="13"><TopRight /></el-icon>
          </a>
        </header>

        <div class="detail-layout" :style="accentStyle">
          <div class="detail-main">
            <el-tabs v-model="activeTab" class="detail-tabs detail-panel panel">
              <!-- 下载 -->
              <el-tab-pane label="下载" name="download">
                <div class="download">
                  <div class="download__versions">
                    <button
                      v-for="version in tool.versions"
                      :key="version.key"
                      type="button"
                      class="version"
                      :class="{ 'is-active': activeVersion === version.key }"
                      @click="activeVersion = version.key"
                    >
                      <span class="version__label">{{ version.label }}</span>
                      <span class="version__note">{{ version.note }}</span>
                    </button>
                  </div>

                  <p class="download__hint">
                    所有下载均跳转至软件官方下载页，请根据系统架构选择对应安装包。
                  </p>

                  <div class="download__list">
                    <div v-for="file in versionFiles" :key="file.name" class="file">
                      <span class="file__os">{{ file.os }}</span>
                      <div class="file__info">
                        <span class="file__name mono">{{ file.name }}</span>
                        <span class="file__size mono">{{ file.size }}</span>
                      </div>
                      <a class="file__btn" :href="file.url" target="_blank" rel="noopener noreferrer">
                        <el-icon :size="14"><Download /></el-icon>
                        下载
                      </a>
                    </div>

                    <el-empty v-if="!versionFiles.length" :image-size="80" description="该版本暂无下载资源" />
                  </div>
                </div>
              </el-tab-pane>

              <!-- 环境配置 -->
              <el-tab-pane label="环境配置" name="setup">
                <ol class="steps">
                  <li v-for="(step, index) in tool.setup" :key="step.title" class="step">
                    <span class="step__index mono">{{ String(index + 1).padStart(2, '0') }}</span>
                    <div class="step__body">
                      <h3>{{ step.title }}</h3>
                      <p>{{ step.desc }}</p>
                      <div class="code">
                        <button type="button" class="code__copy" @click="copyCode(step.code)">
                          <el-icon :size="12"><CopyDocument /></el-icon>
                          复制
                        </button>
                        <pre><code>{{ step.code }}</code></pre>
                      </div>
                    </div>
                  </li>
                </ol>
              </el-tab-pane>

              <!-- 参考链接 -->
              <el-tab-pane label="参考链接" name="docs">
                <div class="docs">
                  <a
                    v-for="doc in tool.docs"
                    :key="doc.url"
                    class="doc"
                    :href="doc.url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="doc__icon">
                      <el-icon :size="16"><Link /></el-icon>
                    </span>
                    <span class="doc__text">
                      <strong>{{ doc.label }}</strong>
                      <small class="mono">{{ doc.url }}</small>
                    </span>
                    <el-icon class="doc__arrow" :size="14"><TopRight /></el-icon>
                  </a>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>

          <aside class="detail-aside">
            <div class="side-card panel">
              <h3 class="side-card__title">工具信息</h3>
              <dl class="info-list">
                <div>
                  <dt>分类</dt>
                  <dd>{{ categoryLabel(tool.category) }}</dd>
                </div>
                <div>
                  <dt>可用版本</dt>
                  <dd>{{ tool.versions.map((v) => v.label).join(' / ') }}</dd>
                </div>
                <div>
                  <dt>最近更新</dt>
                  <dd class="mono">{{ tool.updated }}</dd>
                </div>
                <div>
                  <dt>浏览 / 下载</dt>
                  <dd class="mono">{{ formatCount(tool.views) }} / {{ formatCount(tool.downloads) }}</dd>
                </div>
              </dl>
              <p class="side-card__note">浏览量与下载量为演示用静态数据，接入后端后可改为接口数据。</p>
            </div>

            <div class="side-card panel">
              <h3 class="side-card__title">推荐工具</h3>
              <RouterLink
                v-for="item in relatedTools"
                :key="item.id"
                class="related"
                :to="{ name: 'tool-detail', params: { id: item.id } }"
              >
                <ToolMark :tool="item" :size="36" />
                <span class="related__text">
                  <strong>{{ item.name }}</strong>
                  <small>{{ item.tagline }}</small>
                </span>
                <el-icon :size="12" class="related__arrow"><Right /></el-icon>
              </RouterLink>
            </div>
          </aside>
        </div>
      </template>

      <div v-else class="not-found panel">
        <el-empty description="工具不存在或已下线">
          <el-button class="btn-ghost" @click="router.push('/tools')">返回工具库</el-button>
        </el-empty>
      </div>
    </div>

    <el-backtop :right="28" :bottom="28" />
  </div>
</template>

<style scoped>
.detail {
  padding: 30px 0 40px;
}

/* ---------------- 面包屑 ---------------- */
.crumbs {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 22px;
  font-size: 12.5px;
  color: var(--text-faint);
}

.crumbs a {
  transition: color 0.25s var(--ease-out);
}

.crumbs a:hover {
  color: var(--cyan);
}

.crumbs__sep {
  color: var(--text-faint);
  opacity: 0.5;
}

.crumbs__current {
  color: var(--text-muted);
}

/* ---------------- 工具头部 ---------------- */
.detail-hero {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
  padding: 32px;
  overflow: hidden;
  background:
    radial-gradient(90% 180% at 0% 0%, color-mix(in srgb, var(--accent-a) 13%, transparent), transparent 58%),
    radial-gradient(80% 160% at 100% 100%, color-mix(in srgb, var(--accent-b) 10%, transparent), transparent 60%),
    var(--bg-panel);
}

.detail-hero__glow {
  position: absolute;
  top: -90px;
  left: 40px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-a), transparent 65%);
  opacity: 0.16;
  filter: blur(50px);
  pointer-events: none;
}

.detail-hero__main {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  min-width: 0;
}

.detail-hero__title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.detail-hero__title h1 {
  font-size: clamp(28px, 3.4vw, 38px);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: var(--text-strong);
}

.detail-hero__desc {
  max-width: 640px;
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-muted);
}

.detail-hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.detail-hero__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-top: 18px;
  font-size: 12px;
  color: var(--text-faint);
}

.detail-hero__meta span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.detail-hero__official {
  flex-shrink: 0;
  height: 42px;
  padding: 0 20px;
  font-size: 13px;
}

/* ---------------- 主体布局 ---------------- */
.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 22px;
  margin-top: 22px;
  align-items: start;
}

.detail-panel {
  padding: 6px 26px 26px;
}

.detail-panel :deep(.el-tabs__header) {
  padding: 0 2px;
}

/* ---------------- 下载 ---------------- */
.download__versions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.version {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 150px;
  padding: 12px 18px;
  border: 1px solid var(--line-soft);
  border-radius: var(--r-sm);
  background: rgba(255, 255, 255, 0.015);
  text-align: left;
  cursor: pointer;
  transition: border-color 0.25s var(--ease-out), background 0.25s var(--ease-out),
    box-shadow 0.25s var(--ease-out);
}

.version:hover {
  border-color: var(--line-strong);
}

.version__label {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text);
}

.version__note {
  font-size: 11px;
  color: var(--text-faint);
}

.version.is-active {
  border-color: rgba(34, 211, 238, 0.4);
  background: rgba(34, 211, 238, 0.08);
  box-shadow: inset 0 0 0 1px rgba(34, 211, 238, 0.1), 0 14px 34px -24px rgba(34, 211, 238, 0.7);
}

.version.is-active .version__label {
  color: var(--cyan);
}

/* 主题色高亮版本切换 */
.detail-hero + .detail-layout .version.is-active {
  border-color: color-mix(in srgb, var(--accent-a) 40%, transparent);
  background: color-mix(in srgb, var(--accent-a) 8%, transparent);
}

.download__hint {
  margin: 18px 0;
  padding: 10px 14px;
  border: 1px dashed var(--line-soft);
  border-radius: var(--r-xs);
  font-size: 12px;
  color: var(--text-faint);
  background: rgba(255, 255, 255, 0.01);
}

.download__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.file {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border: 1px solid var(--line-soft);
  border-radius: var(--r-sm);
  background: rgba(8, 12, 26, 0.5);
  transition: border-color 0.25s var(--ease-out), background 0.25s var(--ease-out);
}

.file:hover {
  border-color: var(--line);
  background: rgba(12, 17, 36, 0.7);
}

.file__os {
  flex-shrink: 0;
  width: 66px;
  padding: 4px 0;
  border: 1px solid var(--line-soft);
  border-radius: var(--r-xs);
  background: rgba(255, 255, 255, 0.03);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-align: center;
  color: var(--text-muted);
}

.file__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.file__name {
  font-size: 12.5px;
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file__size {
  font-size: 10.5px;
  color: var(--text-faint);
}

.file__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  height: 34px;
  padding: 0 16px;
  border: 1px solid rgba(34, 211, 238, 0.28);
  border-radius: var(--r-pill);
  background: rgba(34, 211, 238, 0.08);
  font-size: 12px;
  font-weight: 600;
  color: var(--cyan);
  transition: background 0.25s var(--ease-out), border-color 0.25s var(--ease-out),
    transform 0.25s var(--ease-out);
}

.file__btn:hover {
  background: rgba(34, 211, 238, 0.16);
  border-color: rgba(34, 211, 238, 0.5);
  transform: translateY(-1px);
}

/* ---------------- 配置步骤 ---------------- */
.steps {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0;
  padding: 4px 0 0;
  list-style: none;
}

.step {
  position: relative;
  display: flex;
  gap: 18px;
  padding-bottom: 24px;
  border-bottom: 1px dashed var(--line-soft);
}

.step:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.step__index {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 11px;
  background: rgba(99, 102, 241, 0.1);
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-soft);
}

.step__body {
  min-width: 0;
  flex: 1;
}

.step__body h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-strong);
}

.step__body p {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.75;
  color: var(--text-muted);
}

.code {
  position: relative;
  margin-top: 12px;
  border: 1px solid var(--line-soft);
  border-radius: var(--r-sm);
  background: rgba(5, 8, 18, 0.9);
  overflow: hidden;
}

.code pre {
  margin: 0;
  padding: 16px 18px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.85;
  color: #a5f3fc;
  tab-size: 2;
}

.code__copy {
  position: absolute;
  top: 9px;
  right: 9px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 9px;
  border: 1px solid var(--line);
  border-radius: var(--r-pill);
  background: rgba(13, 18, 38, 0.85);
  font-size: 10.5px;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.25s var(--ease-out), border-color 0.25s var(--ease-out);
}

.code__copy:hover {
  color: var(--cyan);
  border-color: rgba(34, 211, 238, 0.4);
}

/* ---------------- 参考链接 ---------------- */
.docs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.doc {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid var(--line-soft);
  border-radius: var(--r-sm);
  background: rgba(8, 12, 26, 0.45);
  transition: border-color 0.25s var(--ease-out), background 0.25s var(--ease-out);
}

.doc:hover {
  border-color: var(--line-strong);
  background: rgba(99, 102, 241, 0.06);
}

.doc__icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid rgba(34, 211, 238, 0.24);
  background: rgba(34, 211, 238, 0.08);
  color: var(--cyan);
}

.doc__text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  flex: 1;
}

.doc__text strong {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-strong);
}

.doc__text small {
  font-size: 10.5px;
  color: var(--text-faint);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doc__arrow {
  color: var(--text-faint);
}

.doc:hover .doc__arrow {
  color: var(--cyan);
}

/* ---------------- 侧栏 ---------------- */
.detail-aside {
  position: sticky;
  top: calc(var(--header-h) + 22px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.side-card {
  padding: 20px;
}

.side-card__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--text-strong);
}

.side-card__title::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 2px;
  background: var(--grad-brand);
  box-shadow: 0 0 10px rgba(34, 211, 238, 0.7);
}

.info-list {
  margin: 16px 0 0;
}

.info-list > div {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 9px 0;
  border-bottom: 1px dashed var(--line-soft);
}

.info-list > div:last-child {
  border-bottom: none;
}

.info-list dt {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--text-faint);
}

.info-list dd {
  margin: 0;
  font-size: 12px;
  text-align: right;
  color: var(--text);
  word-break: break-word;
}

.side-card__note {
  margin-top: 14px;
  font-size: 11px;
  line-height: 1.7;
  color: var(--text-faint);
}

.related {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
  margin: 2px -8px;
  border-radius: var(--r-sm);
  transition: background 0.25s var(--ease-out);
}

.related + .related {
  margin-top: 4px;
}

.related:hover {
  background: rgba(99, 102, 241, 0.08);
}

.related__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.related__text strong {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-strong);
}

.related__text small {
  font-size: 10.5px;
  color: var(--text-faint);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.related__arrow {
  color: var(--text-faint);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.25s var(--ease-out), transform 0.25s var(--ease-out);
}

.related:hover .related__arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--cyan);
}

/* ---------------- 未找到 ---------------- */
.not-found {
  margin-top: 40px;
  padding: 30px;
}

/* ---------------- 响应式 ---------------- */
@media (max-width: 1024px) {
  .detail-layout {
    grid-template-columns: minmax(0, 1fr) 270px;
  }
}

@media (max-width: 900px) {
  .detail-hero {
    flex-direction: column;
    padding: 26px;
  }

  .detail-hero__official {
    align-self: flex-start;
  }

  .detail-layout {
    grid-template-columns: 1fr;
  }

  .detail-aside {
    position: static;
  }

  .detail-panel {
    padding: 4px 18px 20px;
  }
}

@media (max-width: 560px) {
  .detail {
    padding-top: 18px;
  }

  .detail-hero__main {
    flex-direction: column;
    gap: 16px;
  }

  .file {
    flex-wrap: wrap;
    gap: 10px;
  }

  .file__btn {
    margin-left: auto;
  }

  .step {
    gap: 12px;
  }
}
</style>
