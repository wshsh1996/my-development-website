<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Right } from '@element-plus/icons-vue'
import { categories, categoryLabel, envPlans, tools } from '@/data/tools'
import EnvPlanCard from '@/components/EnvPlanCard.vue'
import ToolCard from '@/components/ToolCard.vue'

const route = useRoute()

const keyword = ref('')
const activeCategory = ref('all')
const sortBy = ref('default')
const hotKeywords = ['Node.js', 'JDK', 'MySQL', 'Docker', 'Git']

const sortOptions = [
  { value: 'default', label: '默认排序' },
  { value: 'views', label: '按浏览量' },
  { value: 'downloads', label: '按下载量' },
]

const syncCategoryFromQuery = () => {
  const query = route.query.category
  const matched = categories.find((item) => item.key === query)
  activeCategory.value = matched ? matched.key : 'all'
}

watch(() => route.query.category, syncCategoryFromQuery, { immediate: true })

const filteredTools = computed(() => {
  const keywordValue = keyword.value.trim().toLowerCase()
  const list = tools.filter((tool) => {
    if (activeCategory.value !== 'all' && tool.category !== activeCategory.value) {
      return false
    }
    if (!keywordValue) return true
    const haystack = [
      tool.name,
      tool.tagline,
      tool.desc,
      tool.category,
      categoryLabel(tool.category),
      ...tool.tags,
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(keywordValue)
  })

  if (sortBy.value === 'views') list.sort((a, b) => b.views - a.views)
  if (sortBy.value === 'downloads') list.sort((a, b) => b.downloads - a.downloads)

  return list
})

const resetFilters = () => {
  keyword.value = ''
  activeCategory.value = 'all'
  sortBy.value = 'default'
}
</script>

<template>
  <div class="tools">
    <!-- 页头 -->
    <section class="tools-hero">
      <div class="container tools-hero__inner">
        <span class="eyebrow" v-reveal>Toolbox</span>
        <h1 class="tools-hero__title" v-reveal="60">
          开发工具与<span class="gradient-text">安装教程</span>
        </h1>
        <p class="tools-hero__desc" v-reveal="100">
          收录前端 / 后端运行环境、开发软件与部署工具，附带版本说明、下载入口与配置步骤。
        </p>

        <div class="tools-hero__search" v-reveal="140">
          <el-input
            v-model="keyword"
            class="search-field"
            size="large"
            clearable
            placeholder="搜索工具、环境或安装教程…"
            aria-label="搜索工具"
          >
            <template #prefix>
              <el-icon :size="17"><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <div class="tools-hero__hot" v-reveal="180">
          <span class="tools-hero__hot-label">热门</span>
          <button
            v-for="item in hotKeywords"
            :key="item"
            type="button"
            class="tools-hero__hot-item"
            @click="keyword = item"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </section>

    <!-- 环境方案 -->
    <section id="env-plan" class="section section--tight tools-env">
      <div class="container">
        <div class="section-head" v-reveal>
          <div>
            <span class="eyebrow">Environment</span>
            <h2 class="section-head__title">热门环境方案</h2>
            <p class="section-head__desc">按方向一次配好运行时、构建工具与编辑器，减少环境排错时间。</p>
          </div>
        </div>

        <div class="env-grid">
          <EnvPlanCard
            v-for="(plan, index) in envPlans"
            :key="plan.id"
            :plan="plan"
            v-reveal="index * 80"
          />
        </div>
      </div>
    </section>

    <!-- 工具列表 -->
    <section class="section section--tight tools-list">
      <div class="container">
        <div class="toolbar" v-reveal>
          <div class="chips" role="tablist" aria-label="工具分类">
            <button
              v-for="item in categories"
              :key="item.key"
              type="button"
              class="chip"
              :class="{ 'is-active': activeCategory === item.key }"
              @click="activeCategory = item.key"
            >
              {{ item.label }}
            </button>
          </div>

          <div class="toolbar__right">
            <span class="toolbar__count mono">{{ filteredTools.length }} ITEMS</span>
            <el-select v-model="sortBy" size="default" style="width: 132px" aria-label="排序方式">
              <el-option
                v-for="item in sortOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>

        <TransitionGroup v-if="filteredTools.length" name="grid" tag="div" class="tool-grid">
          <ToolCard v-for="tool in filteredTools" :key="tool.id" :tool="tool" />
        </TransitionGroup>

        <div v-else class="empty panel">
          <el-empty description="没有匹配的工具，换个关键词试试">
            <el-button class="btn-ghost" @click="resetFilters">清除筛选</el-button>
          </el-empty>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="tip panel" v-reveal>
          <span class="tip__mark mono">TIP</span>
          <p>
            页面内浏览量与下载量为演示用静态数据；所有下载均跳转至软件官方下载页，安装前请核对版本与系统架构。
          </p>
          <RouterLink to="/" class="link-quiet">
            返回首页
            <el-icon :size="12"><Right /></el-icon>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---------------- 页头 ---------------- */
.tools-hero {
  position: relative;
  padding: 78px 0 26px;
  overflow: hidden;
}

.tools-hero__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.tools-hero__title {
  margin-top: 16px;
  font-size: clamp(32px, 4.6vw, 48px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-strong);
}

.tools-hero__desc {
  max-width: 620px;
  margin-top: 14px;
  font-size: 14.5px;
  line-height: 1.85;
  color: var(--text-muted);
}

.tools-hero__search {
  width: min(640px, 100%);
  margin-top: 32px;
}

.tools-hero__hot {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
}

.tools-hero__hot-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--text-faint);
  margin-right: 2px;
}

.tools-hero__hot-item {
  padding: 4px 12px;
  border: 1px solid var(--line-soft);
  border-radius: var(--r-pill);
  background: transparent;
  font-size: 12px;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.25s var(--ease-out), border-color 0.25s var(--ease-out),
    background 0.25s var(--ease-out);
}

.tools-hero__hot-item:hover {
  color: var(--cyan);
  border-color: rgba(34, 211, 238, 0.35);
  background: rgba(34, 211, 238, 0.08);
}

/* ---------------- 环境方案 ---------------- */
.env-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

/* ---------------- 筛选栏 ---------------- */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  padding: 14px;
  border: 1px solid var(--line-soft);
  border-radius: var(--r-lg);
  background: rgba(9, 13, 28, 0.55);
  backdrop-filter: blur(14px);
}

.chips {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  height: 34px;
  padding: 0 15px;
  border: 1px solid transparent;
  border-radius: var(--r-pill);
  background: transparent;
  font-size: 13px;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.25s var(--ease-out), background 0.25s var(--ease-out),
    border-color 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
}

.chip:hover {
  color: var(--text-strong);
  background: rgba(255, 255, 255, 0.04);
}

.chip.is-active {
  background: var(--grad-brand);
  color: #061018;
  font-weight: 600;
  box-shadow: 0 10px 30px -14px rgba(34, 211, 238, 0.8);
}

.toolbar__right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.toolbar__count {
  font-size: 10.5px;
  letter-spacing: 0.16em;
  color: var(--text-faint);
}

/* ---------------- 工具网格 ---------------- */
.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 22px;
}

.grid-move,
.grid-enter-active,
.grid-leave-active {
  transition: opacity 0.3s var(--ease-soft), transform 0.3s var(--ease-out);
}

.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.grid-leave-active {
  position: absolute;
}

.empty {
  margin-top: 22px;
  padding: 20px;
}

/* ---------------- 提示条 ---------------- */
.tip {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 24px;
  border-style: dashed;
  background: rgba(9, 13, 28, 0.45);
}

.tip__mark {
  flex-shrink: 0;
  padding: 3px 10px;
  border: 1px solid rgba(34, 211, 238, 0.3);
  border-radius: var(--r-xs);
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--cyan);
  background: rgba(34, 211, 238, 0.08);
}

.tip p {
  flex: 1;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .env-grid,
  .tool-grid {
    grid-template-columns: 1fr;
  }

  .tools-hero {
    padding-top: 56px;
  }

  .toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .toolbar__right {
    width: 100%;
    justify-content: space-between;
  }

  .tip {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}

@media (max-width: 700px) {
  .tool-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .tool-grid {
    grid-template-columns: 1fr;
  }
}
</style>
