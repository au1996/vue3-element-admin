import { createApp, createVNode } from 'vue'

import ElementPlus, { ElIcon } from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'

// global css
import './styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'
import Directives from './directive'

import './permission' // permission control

const app = createApp(App)
app.use(ElementPlus)
app.use(Directives)
app.use(router)
app.use(store)
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
