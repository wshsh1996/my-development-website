<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { TopRight } from '@element-plus/icons-vue'
import { navItems, site } from '@/data/site'
import BrandMark from '@/components/BrandMark.vue'

const route = useRoute()
const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const isActive = (item) => {
  if (item.hash) {
    return route.path.startsWith(item.to) && route.hash === item.hash
  }
  if (item.to === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(item.to)
}
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="container header__inner">
      <RouterLink to="/" class="brand" aria-label="返回首页">
        <BrandMark :size="36" />
        <span class="brand__text">
          <strong>{{ site.brand }}</strong>
          <small>{{ site.brandEn }}</small>
        </span>
      </RouterLink>

      <nav class="nav" aria-label="主导航">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="{ path: item.to, hash: item.hash }"
          class="nav__link"
          :class="{ 'is-active': isActive(item) }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="header__actions">
        <a class="gh-link" :href="site.github" target="_blank" rel="noopener noreferrer">
          <span>GitHub</span>
          <el-icon :size="13"><TopRight /></el-icon>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: var(--header-h);
  border-bottom: 1px solid transparent;
  background: rgba(5, 7, 16, 0.42);
  backdrop-filter: blur(0px);
  transition: background 0.35s var(--ease-out), border-color 0.35s var(--ease-out),
    backdrop-filter 0.35s var(--ease-out);
}

.header.is-scrolled {
  background: rgba(6, 9, 20, 0.76);
  border-bottom-color: rgba(123, 146, 255, 0.14);
  backdrop-filter: blur(18px) saturate(140%);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: 28px;
  height: 100%;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  flex-shrink: 0;
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.brand__text strong {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--text-strong);
}

.brand__text small {
  margin-top: 3px;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.22em;
  color: var(--text-faint);
}

.nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.nav__link {
  position: relative;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: var(--r-pill);
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text-muted);
  transition: color 0.25s var(--ease-out), background 0.25s var(--ease-out),
    border-color 0.25s var(--ease-out);
}

.nav__link:hover {
  color: var(--text-strong);
  background: rgba(255, 255, 255, 0.03);
}

.nav__link.is-active {
  color: var(--text-strong);
  border-color: rgba(99, 102, 241, 0.28);
  background: rgba(99, 102, 241, 0.12);
}

.nav__link.is-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  width: 14px;
  height: 2px;
  transform: translateX(-50%);
  border-radius: var(--r-pill);
  background: var(--grad-brand);
  box-shadow: var(--glow-cyan);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.gh-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.02);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
  transition: color 0.25s var(--ease-out), border-color 0.25s var(--ease-out),
    background 0.25s var(--ease-out);
}

.gh-link:hover {
  color: var(--text-strong);
  border-color: var(--line-strong);
  background: rgba(99, 102, 241, 0.1);
}

@media (max-width: 768px) {
  .header__inner {
    gap: 14px;
  }

  .brand__text small {
    display: none;
  }

  .nav__link {
    padding: 8px 10px;
    font-size: 13px;
  }

  .gh-link span {
    display: none;
  }

  .gh-link {
    width: 36px;
    padding: 0;
    justify-content: center;
  }
}

@media (max-width: 520px) {
  .brand__text strong {
    font-size: 14px;
  }

  .nav {
    gap: 0;
  }

  .nav__link {
    padding: 8px;
  }
}

@media (max-width: 400px) {
  .brand__text {
    display: none;
  }
}
</style>
