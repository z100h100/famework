import * as types from '../../../mutation_type'
// import router from '@/router/index'
// import { recursionRouter } from '@/utils/index'

export default {
  [types.JUSTLIST] (state, res) {
    state.justList = res
  },
  [types.JUSTAUTHSLIST] (state, res) {
    state.justModifyList = res
  }
}
