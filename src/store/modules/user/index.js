// import { login, logout, getInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import actions from './actions/actions'
import mutations from './mutations/mutation'

const state = {
  permissionList: null,
  UserToken: '',
  name: '',
  currentSign: [],
  avatar: '',
  roles: []
}

export default{
  state,
  actions,
  mutations
}
