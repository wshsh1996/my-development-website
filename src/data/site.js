// 站点全局信息：个人资料、导航、技术栈
// 后续替换个人信息只需修改这里
export const site = {
  brand: '码客王',
  brandEn: 'CODE · CRAFT',
  role: '全栈开发者 · AI 编程 · 技术博主',
  slogan: '写代码 · 做产品 · 聊技术',
  intro:
    '专注 Vue3 + Spring Boot 全栈开发，热衷用 AI 提升工程效率。这里收录了我日常使用的开发工具、环境配置与实战教程。',
  github: 'https://github.com/',
  gitee: 'https://gitee.com/',
  updatedAt: '2026-10-18',
}

export const stats = [
  { value: '10+', label: '开源项目' },
  { value: '5000+', label: '社区粉丝' },
  { value: '8', label: '年开发经验' },
]

export const navItems = [
  { label: '首页', to: '/' },
  { label: '工具', to: '/tools' },
  { label: '环境方案', to: '/tools', hash: '#env-plan' },
]

export const techStacks = [
  {
    key: 'frontend',
    title: '前端',
    en: 'FRONTEND',
    accent: '#22d3ee',
    items: ['Vue 3', 'TypeScript', 'Vite', 'Element Plus', 'Pinia', 'UnoCSS'],
  },
  {
    key: 'backend',
    title: '后端',
    en: 'BACKEND',
    accent: '#6366f1',
    items: ['Java 17', 'Spring Boot', 'MyBatis-Plus', 'MySQL', 'Redis', 'Nginx'],
  },
  {
    key: 'devops',
    title: '工程化',
    en: 'DEVOPS',
    accent: '#a855f7',
    items: ['Git', 'Docker', 'CI/CD', 'Linux', 'Maven', '可观测性'],
  },
]
