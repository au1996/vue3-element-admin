import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/packages/theme-chalk/src/base.scss'
import 'element-plus/lib/theme-chalk/index.css'
import './styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'
import Directives from './directive'

import './permission' // permission control
import { DateFormat } from '@/utils/util'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

console.log(66666666)

const app = createApp(App)
app.use(ElementPlus)
app.use(Directives)
app.use(router).use(store).mount('#app')

app.provide('$DateFormat', DateFormat)

export default app
