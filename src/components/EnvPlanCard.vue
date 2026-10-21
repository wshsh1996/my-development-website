<script setup>
import { computed } from 'vue'
import { Cpu, Monitor, Right } from '@element-plus/icons-vue'
import { getToolsByIds } from '@/data/tools'
import ToolMark from '@/components/ToolMark.vue'

const props = defineProps({
  plan: { type: Object, required: true },
})

const planTools = computed(() => getToolsByIds(props.plan.toolIds))
const icon = computed(() => (props.plan.id === 'frontend' ? Monitor : Cpu))
const accent = computed(() =>
  props.plan.id === 'frontend'
    ? { '--accent-a': '#22d3ee', '--accent-b': '#6366f1' }
    : { '--accent-a': '#a855f7', '--accent-b': '#6366f1' },
)
</script>

<template>
  <article class="env-card panel panel--glow" :style="accent">
    <div class="env-card__head">
      <span class="env-card__icon">
        <el-icon :size="21"><component :is="icon" /></el-icon>
      </span>
      <div class="env-card__title">
        <span class="env-card__sub">{{ plan.subtitle }}</span>
        <h3>{{ plan.title }}</h3>
      </div>
    </div>

    <p class="env-card__desc">{{ plan.desc }}</p>

    <div class="env-card__tools">
      <RouterLink
        v-for="item in planTools"
        :key="item.id"
        :to="{ name: 'tool-detail', params: { id: item.id } }"
        class="env-card__tool"
      >
        <ToolMark :tool="item" :size="26" />
        <span>{{ item.name }}</span>
      </RouterLink>
    </div>

    <div class="env-card__highlights">
      <span v-for="item in plan.highlights" :key="item">{{ item }}</span>
    </div>

    <div class="env-card__foot">
      <span class="mono">{{ planTools.length }} 个配套工具</span>
      <RouterLink
        :to="{ path: '/tools', query: { category: plan.category } }"
        class="env-card__cta"
      >
        查看配套工具
        <el-icon :size="12"><Right /></el-icon>
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.env-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 26px;
  overflow: hidden;
  background:
    radial-gradient(120% 90% at 0% 0%, color-mix(in srgb, var(--accent-a) 10%, transparent), transparent 55%),
    var(--bg-panel);
  transition: transform 0.35s var(--ease-out), border-color 0.35s var(--ease-out),
    box-shadow 0.35s var(--ease-out);
}

.env-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--accent-a) 30%, transparent);
  box-shadow: var(--shadow-float);
}

.env-card__head {
  display: flex;
  align-items: center;
  gap: 14px;
}

.env-card__icon {
  display: inline-grid;
  place-items: center;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--accent-a) 34%, transparent);
  background: color-mix(in srgb, var(--accent-a) 12%, transparent);
  color: var(--accent-a);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.env-card__sub {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.env-card__title h3 {
  margin-top: 4px;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-strong);
}

.env-card__desc {
  font-size: 13px;
  line-height: 1.75;
  color: var(--text-muted);
}

.env-card__tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.env-card__tool {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px 5px 5px;
  border: 1px solid var(--line-soft);
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.02);
  font-size: 12px;
  color: var(--text);
  transition: border-color 0.25s var(--ease-out), background 0.25s var(--ease-out),
    color 0.25s var(--ease-out);
}

.env-card__tool:hover {
  border-color: var(--line-strong);
  background: rgba(99, 102, 241, 0.1);
  color: var(--text-strong);
}

.env-card__highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  padding: 12px 0 0;
  border-top: 1px dashed var(--line-soft);
}

.env-card__highlights span {
  position: relative;
  padding-left: 14px;
  font-size: 12px;
  color: var(--text-faint);
}

.env-card__highlights span::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 5px;
  height: 5px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: var(--accent-a);
  box-shadow: 0 0 10px var(--accent-a);
}

.env-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 6px;
}

.env-card__foot .mono {
  font-size: 11px;
  color: var(--text-faint);
}

.env-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--accent-a);
  transition: gap 0.25s var(--ease-out), opacity 0.25s var(--ease-out);
}

.env-card__cta:hover {
  gap: 9px;
  opacity: 0.85;
}
</style>
