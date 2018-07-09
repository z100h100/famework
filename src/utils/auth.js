import Cookies from 'js-cookie'

// token参数
const TokenKey = 'Admin-Token'

/**
 * 获取token
 * @returns {*}
 */
export function getToken () {
  return Cookies.get(TokenKey)
}

/**
 * 设置token
 * @param token
 * @returns {*}
 */
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

/**
 * 删除token
 * @returns {*}
 */
export function removeToken () {
  return Cookies.remove(TokenKey)
}
