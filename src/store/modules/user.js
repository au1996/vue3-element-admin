import { ElMessage } from 'element-plus'
import { user_login, user_logout } from '@/api/user'
import {
  getToken,
  setToken,
  getRoles,
  setRoles,
  getName,
  setName,
  getAvatar,
  setAvatar
} from '@/utils/auth'

const state = {
  token: getToken(),
  roles: getRoles(),
  name: getName(),
  avatar: getAvatar(),
  introduction: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
    setRoles(roles)
  },
  SET_NAME: (state, name) => {
    state.name = name
    setName(name)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
    setAvatar(avatar)
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  }
}

const actions = {
  async login({ commit }, userInfo) {
    const [err, res] = await user_login(userInfo)
    if (err) return
    if (res.token) {
      commit('SET_TOKEN', res.token)
      commit('SET_ROLES', res.role)
      commit('SET_NAME', res.username)
      commit('SET_AVATAR', res.avatar)
      commit('SET_INTRODUCTION', res.introduction)
      ElMessage.success(res.message)
      return res
    } else {
      ElMessage.error(res.message)
      return false
    }
  },
  async logout({ commit, state, dispatch }) {
    const [err, res] = await user_logout(state.token)
    if (err) return

    commit('SET_TOKEN', '')
    commit('SET_ROLES', '')
    commit('SET_NAME', '')
    commit('SET_AVATAR', '')
    dispatch('tagsView/delAllViews', null, { root: true })
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
