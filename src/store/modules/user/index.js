import actions from './actions/actions'
import mutations from './mutations/mutation'

const state = {
  permissionList: null,
  UserToken: '',
  user: {
    id: ''
  },
  currentSign: '',
  sidebarMenu: [],
  currentMenu: '',
  avatar: '',
  roles: []
}

export default{
  state,
  actions,
  mutations
}
