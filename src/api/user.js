import request from '../utils/request'

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
 * 添加用户
 * @param {*} data
 * @returns
 */
export function add_user(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @param {*} id
 * @returns
 */
export function get_user_info(id) {
  return request({
    url: `/api/user/${id}`,
    method: 'get'
  })
}

/**
 * 修改用户信息
 * @param {*} data
 * @returns
 */
export function update_user_info(data) {
  return request({
    url: `/api/user/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除用户信息
 * @param {*} id
 * @returns
 */
export function delete_user_info(id) {
  return request({
    url: `/api/user/${id}`,
    method: 'delete'
  })
}

/**
 * 获取用户列表
 * @param {*} params
 * @returns
 */
export function get_user_list(params) {
  return request({
    url: '/api/users',
    method: 'get',
    params
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
