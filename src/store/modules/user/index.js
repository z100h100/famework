import { getToken } from '@/utils/auth'
import actions from './actions/actions'
import mutations from './mutations/mutation'

const state = {
  permissionList: null,
  UserToken: getToken('auths'),
  user: {
    id: ''
  },
  currentSign: getToken('currentSign'),
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
