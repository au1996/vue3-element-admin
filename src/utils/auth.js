import Cookies from 'js-cookie'

const TokenKey = 'token'
const RoleKey = 'roles'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRoles() {
  return Cookies.get(RoleKey)
}

export function setRoles(role) {
  return Cookies.set(RoleKey, role)
}

export function removeRoles() {
  return Cookies.remove(RoleKey)
}
