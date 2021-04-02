import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'
import { getToken, removeToken, removeRoles } from './auth'

const service = axios.create({
  // baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000 // request timeout
})

// 发起请求之前的拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    // 如果有token 就携带tokon
    if (token) {
      config.headers['Authorization'] = 'Bearer__' + token
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken()
      removeRoles()
      router.push('/login')
    }
    ElMessage({
      type: 'error',
      message: error.message
    })
    return Promise.reject(error)
  }
)

export default service
