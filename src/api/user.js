import request from '../utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function get_user_list(data) {
  return request({
    url: '/api/user-list',
    method: 'get',
    data
  })
}

export function add_user(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data
  })
}
