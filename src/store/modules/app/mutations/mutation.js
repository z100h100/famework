import * as types from '../../../mutation_type'
import Cookies from 'js-cookie'

export default {
  [types.TOGGLESIDEBAR] (state, res) {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  [types.CLOSESIDEBAR] (state, withoutAnimation) {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  [types.TOGGLEDEVICE] (state, device) {
    state.device = device
  }
}
