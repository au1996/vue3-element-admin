import request from './Axios'

/**
 * 登录
 * @param {*} data
 * @returns
 */
export function user_login(data) {
  return request({
    url: '/api/login',
    method: 'POST',
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
    method: 'GET',
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
    method: 'POST',
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
    method: 'GET'
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
    method: 'PUT',
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
    method: 'DELETE'
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
    method: 'GET',
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
    method: 'GET',
    params
  })
}
