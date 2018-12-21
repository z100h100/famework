import * as types from '../../../mutation_type'
// import router from '@/router/index'
// import { recursionRouter } from '@/utils/index'

export default {
  [types.ROLELIST] (state, res) {
    state.roleList = res
  },
  [types.GETALLROLE] (state, res) {
    state.allrole = res
  }
}
