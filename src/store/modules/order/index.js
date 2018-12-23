// import { login, logout, getInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import actions from './actions/actions'
import mutations from './mutations/mutation'

const state = {
  orderList: {
    content: [],
    totalElements: 0,
    size: 10,
    number: 1
  },
  orderTrackList: {
    operator: {
      username: ''
    }
  }
}

export default{
  state,
  actions,
  mutations
}
