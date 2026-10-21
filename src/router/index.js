import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '码客王 · 开发者工具箱' },
  },
  {
    path: '/tools',
    name: 'tools',
    component: () => import('@/views/ToolsView.vue'),
    meta: { title: '工具库 · 码客王' },
  },
  {
    path: '/tools/:id',
    name: 'tool-detail',
    component: () => import('@/views/ToolDetailView.vue'),
    props: true,
    meta: { title: '工具详情 · 码客王' },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  // 使用 hash 模式：Gitee Pages / GitHub Pages 等纯静态托管无需额外路由重写配置
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 84 }
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ?? '码客王 · 开发者工具箱'
})

export default router
