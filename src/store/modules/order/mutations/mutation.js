import * as types from '../../../mutation_type'
// import router from '@/router/index'
// import { recursionRouter } from '@/utils/index'

export default {
  [types.GETWAYBILLGET] (state, res) {
    state.orderTrackList = res
  },
  [types.GETWAYBILLPAGE] (state, res) {
    state.orderList = res
  }
}
