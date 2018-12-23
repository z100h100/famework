/**
 * 获取token
 * @returns {*}
 */
function getToken (cname) {
  let name = cname + ''
  let ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1)
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length)
  }
  return ''
}

/**
 * 设置token
 * @param cname
 * @param value
 * @returns {*}
 */
function setToken (cname, value) {
  let Days = 30
  let exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = cname + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

/**
 * 删除token
 * @returns {*}
 */
function removeToken (token) {
  setToken(name, '', -1)
}

export {
  getToken,
  removeToken,
  setToken
}
