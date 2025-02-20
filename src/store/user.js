import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { user_login, user_logout } from '@/api/user'
import { getCookie, setCookie } from '@/utils/util'

const KEY_TOKEN = 'token'
const KEY_USERNAME = 'username'
const KEY_ROLE = 'role'
const KEY_AVATAR = 'avatar'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    [KEY_TOKEN]: getCookie(KEY_TOKEN),
    [KEY_USERNAME]: getCookie(KEY_USERNAME),
    [KEY_ROLE]: getCookie(KEY_ROLE),
    [KEY_AVATAR]: getCookie(KEY_AVATAR)
  })

  const setUserInfo = (obj) => {
    userInfo.value = obj
    for (const key in userInfo.value) {
      setCookie(key, obj[key])
    }
  }

  const login = async (param) => {
    const [err, res] = await user_login(param)
    if (err) return

    if (!res[KEY_TOKEN]) {
      ElMessage.error(res.message)
      return false
    }

    setUserInfo({
      [KEY_TOKEN]: res[KEY_TOKEN],
      [KEY_USERNAME]: res[KEY_USERNAME],
      [KEY_ROLE]: res[KEY_ROLE],
      [KEY_AVATAR]: res[KEY_AVATAR]
    })
    return res
  }

  const logout = async () => {
    const [err, res] = await user_logout(userInfo[KEY_TOKEN])
    if (err) return

    setUserInfo({
      [KEY_TOKEN]: '',
      [KEY_USERNAME]: '',
      [KEY_ROLE]: '',
      [KEY_AVATAR]: ''
    })

    return true
  }

  return {
    userInfo,
    login,
    logout
  }
})
