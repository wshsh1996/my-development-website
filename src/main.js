import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import './styles/tokens.css'
import './styles/global.css'
import './styles/element.css'

import App from './App.vue'
import router from './router'
import reveal from './directives/reveal'

const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.directive('reveal', reveal)
app.mount('#app')
