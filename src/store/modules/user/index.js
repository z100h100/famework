import actions from './actions/actions'
import mutations from './mutations/mutation'
import { getToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: []
}

export default{
  state,
  actions,
  mutations
}
