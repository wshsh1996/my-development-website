<script setup>
const props = defineProps({
  tool: { type: Object, required: true },
  size: { type: Number, default: 44 },
})

const style = {
  '--mark-from': props.tool.accent[0],
  '--mark-to': props.tool.accent[1],
  width: `${props.size}px`,
  height: `${props.size}px`,
  fontSize: `${Math.round(props.size * 0.32)}px`,
  borderRadius: `${Math.round(props.size * 0.28)}px`,
}
</script>

<template>
  <span class="tool-mark" :style="style" aria-hidden="true">{{ tool.mark }}</span>
</template>

<style scoped>
.tool-mark {
  position: relative;
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  overflow: hidden;
  background: linear-gradient(145deg, var(--mark-from), var(--mark-to));
  color: #050813;
  font-family: var(--font-mono);
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -8px 16px -12px rgba(0, 0, 0, 0.8),
    0 12px 28px -18px rgba(99, 102, 241, 0.9);
}

.tool-mark::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(130% 90% at 18% -10%, rgba(255, 255, 255, 0.45), transparent 55%),
    linear-gradient(180deg, transparent 55%, rgba(0, 0, 0, 0.22));
  pointer-events: none;
}
</style>
