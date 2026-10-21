<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Bottom, Right } from '@element-plus/icons-vue'
import { site, stats, techStacks } from '@/data/site'
import { envPlans, featuredToolIds, getToolsByIds, tools } from '@/data/tools'
import EnvPlanCard from '@/components/EnvPlanCard.vue'
import ToolCard from '@/components/ToolCard.vue'

const router = useRouter()

const featuredTools = computed(() => getToolsByIds(featuredToolIds))
const heroStats = computed(() => [...stats, { value: String(tools.length), label: '精选工具' }])

const scrollToEnv = () => {
  document.getElementById('home-env')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero__halo" aria-hidden="true"></div>
      <div class="hero__inner container">
        <span class="hero__badge" v-reveal>
          <span class="hero__badge-dot"></span>
          {{ site.role }}
        </span>

        <div class="hero__avatar" v-reveal="60">
          <span class="hero__avatar-ring"></span>
          <span class="hero__avatar-inner">MW</span>
          <span class="hero__avatar-pulse"></span>
        </div>

        <h1 class="hero__title gradient-text" v-reveal="110">{{ site.brand }}</h1>
        <p class="hero__slogan" v-reveal="150">{{ site.slogan }}</p>
        <p class="hero__intro" v-reveal="190">{{ site.intro }}</p>

        <div class="hero__actions" v-reveal="230">
          <el-button class="btn-primary" size="large" @click="router.push('/tools')">
            进入工具箱
            <el-icon class="el-icon--right" :size="14"><Right /></el-icon>
          </el-button>
          <el-button class="btn-ghost" size="large" @click="scrollToEnv">环境方案</el-button>
        </div>

        <div class="stat-row hero__stats" v-reveal="280">
          <div v-for="item in heroStats" :key="item.label" class="stat">
            <b class="stat__value">{{ item.value }}</b>
            <span class="stat__label">{{ item.label }}</span>
          </div>
        </div>
      </div>

      <div class="hero__scroll" aria-hidden="true">
        <span class="mono">SCROLL</span>
        <el-icon :size="14"><Bottom /></el-icon>
      </div>
    </section>

    <!-- 环境方案 -->
    <section id="home-env" class="section">
      <div class="container">
        <div class="section-head" v-reveal>
          <div>
            <span class="eyebrow">Environment</span>
            <h2 class="section-head__title">两套开箱即用的开发环境</h2>
            <p class="section-head__desc">
              按前端 / 后端分别整理运行环境与配套软件，版本、镜像源和环境变量一次配好。
            </p>
          </div>
          <RouterLink to="/tools" class="link-quiet section-head__aside">
            浏览全部工具
            <el-icon :size="12"><Right /></el-icon>
          </RouterLink>
        </div>

        <div class="env-grid">
          <EnvPlanCard
            v-for="(plan, index) in envPlans"
            :key="plan.id"
            :plan="plan"
            v-reveal="index * 90"
          />
        </div>
      </div>
    </section>

    <!-- 精选工具 -->
    <section class="section section--tight">
      <div class="container">
        <div class="section-head" v-reveal>
          <div>
            <span class="eyebrow">Toolbox</span>
            <h2 class="section-head__title">日常在用的精选工具</h2>
            <p class="section-head__desc">运行时、IDE、数据库与部署工具，附安装步骤和官方下载入口。</p>
          </div>
          <RouterLink to="/tools" class="link-quiet section-head__aside">
            全部 {{ tools.length }} 款工具
            <el-icon :size="12"><Right /></el-icon>
          </RouterLink>
        </div>

        <div class="tool-grid">
          <ToolCard
            v-for="(tool, index) in featuredTools"
            :key="tool.id"
            :tool="tool"
            v-reveal="index * 70"
          />
        </div>
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="section section--tight">
      <div class="container">
        <div class="section-head" v-reveal>
          <div>
            <span class="eyebrow">Stack</span>
            <h2 class="section-head__title">技术栈与工程化偏好</h2>
            <p class="section-head__desc">保持简单、可维护，优先选择生态成熟且有长期支持的技术方案。</p>
          </div>
        </div>

        <div class="stack-grid">
          <article
            v-for="(stack, index) in techStacks"
            :key="stack.key"
            class="stack panel"
            :style="{ '--stack-accent': stack.accent }"
            v-reveal="index * 80"
          >
            <div class="stack__head">
              <span class="stack__en mono">{{ stack.en }}</span>
              <h3>{{ stack.title }}</h3>
            </div>
            <ul class="stack__list">
              <li v-for="item in stack.items" :key="item">
                <span class="stack__dot"></span>
                {{ item }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section--tight">
      <div class="container">
        <div class="cta panel panel--glow" v-reveal>
          <div class="cta__text">
            <span class="eyebrow">Start Here</span>
            <h2>需要哪款工具的安装教程？</h2>
            <p>工具库收录了运行环境、开发软件和安装步骤，直接按文档配置即可开工。</p>
          </div>
          <el-button class="btn-primary" size="large" @click="router.push('/tools')">
            打开工具库
            <el-icon class="el-icon--right" :size="14"><Right /></el-icon>
          </el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---------------- Hero ---------------- */
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--header-h));
  padding: 72px 0 108px;
  overflow: hidden;
}

.hero__halo {
  position: absolute;
  top: 46%;
  left: 50%;
  width: 760px;
  height: 560px;
  transform: translate(-50%, -50%);
  background:
    radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.22), transparent 62%),
    radial-gradient(circle at 62% 38%, rgba(34, 211, 238, 0.16), transparent 58%);
  filter: blur(50px);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 7px 16px;
  border: 1px solid var(--line);
  border-radius: var(--r-pill);
  background: rgba(9, 13, 28, 0.6);
  backdrop-filter: blur(12px);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}

.hero__badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.14), 0 0 12px rgba(52, 211, 153, 0.8);
  animation: pulse-dot 2.4s ease-in-out infinite;
}

.hero__avatar {
  position: relative;
  display: grid;
  place-items: center;
  width: 108px;
  height: 108px;
  margin-top: 34px;
  border-radius: 50%;
}

.hero__avatar-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #6366f1, #22d3ee, #a855f7, #6366f1);
  padding: 2px;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: spin-slow 9s linear infinite;
  box-shadow: 0 0 46px -8px rgba(99, 102, 241, 0.75);
}

.hero__avatar-inner {
  position: absolute;
  inset: 9px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background:
    radial-gradient(120% 120% at 30% 0%, rgba(99, 102, 241, 0.35), transparent 60%),
    #080d1e;
  border: 1px solid rgba(123, 146, 255, 0.18);
}

.hero__avatar-text {
  font-family: var(--font-mono);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: linear-gradient(140deg, #ffffff, #a5b4fc 55%, #67e8f9);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.hero__avatar-pulse {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  border: 1px solid rgba(99, 102, 241, 0.4);
  animation: pulse-ring 3.4s var(--ease-out) infinite;
}

.hero__title {
  margin-top: 26px;
  font-size: clamp(46px, 7.4vw, 78px);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.035em;
  filter: drop-shadow(0 12px 40px rgba(99, 102, 241, 0.28));
}

.hero__slogan {
  margin-top: 12px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.16em;
  color: var(--cyan);
}

.hero__intro {
  max-width: 600px;
  margin-top: 20px;
  font-size: 14.5px;
  line-height: 1.9;
  color: var(--text-muted);
}

.hero__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
}

.hero__stats {
  margin-top: 52px;
}

.hero__scroll {
  position: absolute;
  bottom: 26px;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transform: translateX(-50%);
  font-size: 9px;
  letter-spacing: 0.3em;
  color: var(--text-faint);
  animation: float-slow 3s ease-in-out infinite;
}

/* ---------------- 通用区块 ---------------- */
.env-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.stack-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.stack {
  position: relative;
  padding: 24px;
  overflow: hidden;
}

.stack::before {
  content: '';
  position: absolute;
  top: 0;
  left: 24px;
  width: 46px;
  height: 2px;
  border-radius: var(--r-pill);
  background: var(--stack-accent);
  box-shadow: 0 0 18px var(--stack-accent);
}

.stack__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 18px;
}

.stack__en {
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--stack-accent);
}

.stack__head h3 {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-strong);
}

.stack__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.stack__list li {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border: 1px solid var(--line-soft);
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.02);
  font-size: 12.5px;
  color: var(--text);
}

.stack__dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--stack-accent);
  box-shadow: 0 0 8px var(--stack-accent);
}

/* ---------------- CTA ---------------- */
.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 38px 42px;
  background:
    radial-gradient(90% 160% at 0% 0%, rgba(99, 102, 241, 0.16), transparent 58%),
    radial-gradient(90% 160% at 100% 100%, rgba(34, 211, 238, 0.1), transparent 58%),
    var(--bg-panel);
}

.cta__text h2 {
  margin-top: 12px;
  font-size: clamp(22px, 2.6vw, 28px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-strong);
}

.cta__text p {
  margin-top: 8px;
  font-size: 13.5px;
  color: var(--text-muted);
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.14), 0 0 12px rgba(52, 211, 153, 0.8);
  }
  50% {
    opacity: 0.55;
    box-shadow: 0 0 0 7px rgba(52, 211, 153, 0.06), 0 0 18px rgba(52, 211, 153, 0.5);
  }
}

@media (max-width: 900px) {
  .env-grid,
  .tool-grid,
  .stack-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    padding: 56px 0 92px;
  }

  .cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 30px;
  }
}

@media (max-width: 560px) {
  .hero__badge {
    font-size: 11px;
    padding: 6px 12px;
  }

  .hero__avatar {
    width: 92px;
    height: 92px;
    margin-top: 26px;
  }

  .hero__avatar-inner {
    font-size: 24px;
  }

  .hero__slogan {
    font-size: 14px;
    letter-spacing: 0.1em;
  }

  .hero__intro {
    font-size: 13.5px;
  }

  .hero__actions .el-button {
    width: 100%;
  }

  .hero__actions {
    width: 100%;
    flex-direction: column;
    gap: 10px;
  }

  .hero__actions .el-button + .el-button {
    margin-left: 0;
  }

  .hero__scroll {
    display: none;
  }
}
</style>
