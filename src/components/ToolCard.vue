<script setup>
import { Download, Right, View } from '@element-plus/icons-vue'
import { categoryLabel, formatCount } from '@/data/tools'
import ToolMark from '@/components/ToolMark.vue'

defineProps({
  tool: { type: Object, required: true },
})

const accentStyle = (tool) => ({
  '--accent-a': tool.accent[0],
  '--accent-b': tool.accent[1],
})
</script>

<template>
  <RouterLink
    :to="{ name: 'tool-detail', params: { id: tool.id } }"
    class="tool-card panel"
    :style="accentStyle(tool)"
  >
    <span class="tool-card__glow"></span>

    <div class="tool-card__top">
      <ToolMark :tool="tool" :size="46" />
      <span class="tool-card__cat">{{ categoryLabel(tool.category) }}</span>
    </div>

    <h3 class="tool-card__name">{{ tool.name }}</h3>
    <p class="tool-card__desc">{{ tool.desc }}</p>

    <div class="tool-card__tags">
      <span v-for="tag in tool.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <div class="tool-card__foot">
      <span class="tool-card__stat">
        <el-icon :size="14"><View /></el-icon>
        {{ formatCount(tool.views) }}
      </span>
      <span class="tool-card__stat">
        <el-icon :size="14"><Download /></el-icon>
        {{ formatCount(tool.downloads) }}
      </span>
      <span class="tool-card__go">
        查看详情
        <el-icon :size="12"><Right /></el-icon>
      </span>
    </div>
  </RouterLink>
</template>

<style scoped>
.tool-card {
  display: flex;
  flex-direction: column;
  padding: 22px;
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.35s var(--ease-out), border-color 0.35s var(--ease-out),
    box-shadow 0.35s var(--ease-out), background 0.35s var(--ease-out);
}

.tool-card__glow {
  position: absolute;
  top: -80px;
  right: -60px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-a), transparent 66%);
  opacity: 0;
  filter: blur(34px);
  transition: opacity 0.35s var(--ease-out);
  z-index: -1;
}

.tool-card:hover {
  transform: translateY(-5px);
  border-color: color-mix(in srgb, var(--accent-a) 42%, transparent);
  background: rgba(17, 23, 46, 0.78);
  box-shadow: 0 30px 70px -40px rgba(2, 5, 15, 0.95),
    0 0 0 1px color-mix(in srgb, var(--accent-a) 18%, transparent);
}

.tool-card:hover .tool-card__glow {
  opacity: 0.3;
}

.tool-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.tool-card__cat {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--text-faint);
  padding-top: 4px;
  white-space: nowrap;
}

.tool-card__name {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-strong);
}

.tool-card__desc {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.75;
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 45px;
}

.tool-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 16px;
}

.tool-card__foot {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid var(--line-soft);
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--text-faint);
}

.tool-card__stat {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.tool-card__stat .el-icon {
  color: var(--text-faint);
}

.tool-card__go {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  color: var(--cyan);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out);
}

.tool-card:hover .tool-card__go {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 560px) {
  .tool-card__go {
    opacity: 1;
    transform: none;
  }
}
</style>
