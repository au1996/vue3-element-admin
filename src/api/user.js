import { request } from './Axios'

/**
 * 登录
 * @param {*} data
 * @returns
 */
export function user_login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

/**
 * 登出
 * @param {*} params
 * @returns
 */
export function user_logout(params) {
  return request({
    url: '/api/logout',
    method: 'get',
    params
  })
}

/**
 * 获取用户列表
 * @param {*} data
 * @returns
 */
export function get_user_list(data) {
  return request({
    url: '/api/users',
    method: 'post',
    data
  })
}

/**
 * 获取角色列表
 * @param {*} params
 * @returns
 */
export function get_roles(params) {
  return request({
    url: '/api/roles',
    method: 'get',
    params
  })
}
