<script setup>
import { site } from '@/data/site'
import BrandMark from '@/components/BrandMark.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <RouterLink to="/" class="footer__logo">
          <BrandMark :size="32" />
          <span>{{ site.brand }}</span>
        </RouterLink>
        <p class="footer__slogan">{{ site.slogan }}</p>
        <p class="footer__desc">记录工具、环境与工程实践，<br />用代码创造价值。</p>
      </div>

      <div class="footer__cols">
        <div class="footer__col">
          <h4>站点</h4>
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/tools">工具库</RouterLink>
          <RouterLink :to="{ path: '/tools', hash: '#env-plan' }">环境方案</RouterLink>
        </div>
        <div class="footer__col">
          <h4>资源</h4>
          <a :href="site.github" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a :href="site.gitee" target="_blank" rel="noopener noreferrer">Gitee</a>
          <a href="https://element-plus.org/zh-CN/" target="_blank" rel="noopener noreferrer">Element Plus</a>
        </div>
        <div class="footer__col">
          <h4>技术栈</h4>
          <span>Vue 3</span>
          <span>Vite</span>
          <span>Element Plus</span>
        </div>
      </div>
    </div>

    <div class="container footer__bottom">
      <span>© {{ year }} {{ site.brand }} · 保留所有权利</span>
      <span class="mono">BUILT WITH VUE 3 + ELEMENT PLUS</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  z-index: 1;
  margin-top: 40px;
  border-top: 1px solid var(--line-soft);
  background: linear-gradient(180deg, rgba(8, 11, 24, 0.4), rgba(4, 6, 14, 0.9));
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  gap: 48px;
  padding: 58px 0 40px;
}

.footer__logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-strong);
}

.footer__slogan {
  margin-top: 16px;
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--cyan);
}

.footer__desc {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.8;
  color: var(--text-faint);
}

.footer__cols {
  display: flex;
  gap: 72px;
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer__col h4 {
  margin-bottom: 4px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.footer__col a,
.footer__col span {
  font-size: 13px;
  color: var(--text-muted);
  transition: color 0.25s var(--ease-out);
}

.footer__col a:hover {
  color: var(--cyan);
}

.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 0 30px;
  border-top: 1px solid var(--line-soft);
  font-size: 12px;
  color: var(--text-faint);
}

.footer__bottom .mono {
  font-size: 10px;
  letter-spacing: 0.18em;
}

@media (max-width: 900px) {
  .footer__inner {
    flex-direction: column;
    gap: 32px;
    padding: 44px 0 32px;
  }

  .footer__cols {
    gap: 48px;
  }
}

@media (max-width: 560px) {
  .footer__cols {
    flex-wrap: wrap;
    gap: 32px;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
