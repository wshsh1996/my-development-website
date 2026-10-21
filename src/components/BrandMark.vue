<script setup>
import { useId } from 'vue'

defineProps({
  size: { type: Number, default: 34 },
})

const uid = useId()
</script>

<template>
  <span class="brand-mark" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient :id="`bm-${uid}`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#6366F1" />
          <stop offset="0.55" stop-color="#22D3EE" />
          <stop offset="1" stop-color="#A855F7" />
        </linearGradient>
      </defs>
      <path
        d="M16 4.6 25.2 9.8v12L16 27 6.8 21.8v-12z"
        :stroke="`url(#bm-${uid})`"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <path
        d="M12.2 12.4v7.2l3.8 2.1 3.8-2.1v-7.2"
        :stroke="`url(#bm-${uid})`"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="16" cy="16" r="1.6" :fill="`url(#bm-${uid})`" />
    </svg>
  </span>
</template>

<style scoped>
.brand-mark {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 11px;
  background: linear-gradient(150deg, rgba(99, 102, 241, 0.24), rgba(34, 211, 238, 0.08));
  border: 1px solid rgba(123, 146, 255, 0.28);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 10px 26px -16px rgba(99, 102, 241, 0.9);
}

.brand-mark svg {
  width: 70%;
  height: 70%;
}
</style>
