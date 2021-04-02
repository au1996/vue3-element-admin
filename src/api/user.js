import request from '../utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getUserList(data) {
  return request({
    url: '/api/user-list',
    method: 'get',
    data
  })
}
