import axios from 'axios'

import { ElMessage } from 'element-plus'
import store from '@/store'
import { AXIOS_WHITE_CANCEL_LIST } from '@/config/base'
import { getToken, removeToken, removeRoles, removeName, removeAvatar } from '@/utils/auth'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const method = config.method
    const url = config.url
    const token = getToken()

    // 如果有token 就携带tokon
    if (token) {
      config.headers['Authorization'] = 'Bearer__' + token
    }

    // url是否在白名单中
    const flag = AXIOS_WHITE_CANCEL_LIST.some((item) => {
      if (method === 'GET') {
        return url.indexOf(item) === 0
      }
      return url === item
    })

    // 如果不在白名单中
    if (!flag) {
      // 取消上一个重复请求
      store.commit('axios/deleteCancel', url)

      // 加上取消请求
      config.cancelToken = new axios.CancelToken((cancel) => {
        store.commit('axios/addCancel', { url, cancel })
      })
    }

    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 取消请求不执行后面操作
    if (axios.isCancel(error)) {
      return new Promise(() => {
        console.warn('axios cancel')
      })
    }

    if (error.response && error.response.status === 401) {
      removeToken()
      removeRoles()
      removeName()
      removeAvatar()
      location.reload()
    }

    ElMessage.error(error.message)

    return Promise.reject(error)
  }
)

export default service
