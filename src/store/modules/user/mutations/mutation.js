import * as types from '../../../mutation_type'
// import router from '@/router/index'
// import { recursionRouter } from '@/utils/index'

export default {
  [types.SETCURRENTAUTHS] (state, res) {
    state.currentSign = res.actions
    delete state.currentSign.loginTime
    state.UserToken = res
    // recursionRouter(res.actions, router)
  },
  [types.SETTOKEN] (state, res) {
    state.name = res
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
  [types.CLEAR_PERMISSION] (state, routes) {
    state.permissionList = null
  },
  [types.SETMENU] (state, menu) {
    state.sidebarMenu = menu
  }
}
