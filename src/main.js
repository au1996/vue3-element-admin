import { createApp, createVNode } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus, { ElIcon } from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'

// global css
import './styles/index.scss'

import App from './App.vue'
import router from './router'
import Directive from './directive'

import './permission'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(Directive)
app.use(ElementPlus)
app.mount('#app')

const Icon = (props) => {
  const { name, size, color, bottom } = props
  return createVNode(
    ElIcon,
    {
      size: size || 16,
      color: color,
      style: {
        bottom: bottom || ''
      }
    },
    () => createVNode(Icons[name])
  )
}

app.component('Icon', Icon)
