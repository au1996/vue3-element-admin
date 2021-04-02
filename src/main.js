import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import './styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'

import './permission' // permission control

const app = createApp(App)

app.use(router).use(store).use(ElementPlus).mount('#app')

export default app
