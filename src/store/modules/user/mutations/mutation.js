import * as types from '../../../mutation_type'
// import { setToken, removeToken } from '@/utils/auth'

export default {
  [types.SETCURRENTAUTHS] (state, res) {
    state.currentSign = res.actions
    state.UserToken = res
    sessionStorage.setItem('UserToken', res)
  },
  // 退出登录接口
  [types.LOGINOUT] (state, res) {
    state.UserToken = ''
    sessionStorage.removeItem('UserToken')
  },
  [types.SETTOKEN] (state, res) {
    state.user = res.user
  },
  [types.SETAVATAR] (state, res) {
    state.avatar = res
  },
  [types.SETROLES] (state, res) {
    state.roles = res
  },
  [types.SET_PERMISSION] (state, routes) {
    state.permissionList = routes
  },
  [types.CLEARPERMISSION] (state, routes) {
    state.permissionList = null
  },
  [types.SETMENU] (state, menu) {
    state.sidebarMenu = menu
  },
  [types.CLEARMENU] (state) {
    state.sidebarMenu = []
  },
  [types.SETCURRENTMENU] (state, menu) {
    state.currentMenu = menu
  }
}
