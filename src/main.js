import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/packages/theme-chalk/src/base.scss'
import 'element-plus/lib/theme-chalk/index.css'
import './styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'
import directives from './directive'

import './permission' // permission control
import { DateFormat } from '@/utils/util'

const app = createApp(App)
app.use(ElementPlus)
app.use(directives)
app.use(router).use(store).mount('#app')

app.config.globalProperties.$DateFormat = DateFormat

export default app
