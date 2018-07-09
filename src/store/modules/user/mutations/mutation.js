import * as types from '../../../mutation_type'

export default {
  [types.SETTOKEN] (state, token) {
    state.token = token
  },
  [types.SETNAME] (state, name) {
    state.name = name
  },
  [types.SETAVATAR] (state, avatar) {
    state.avatar = avatar
  },
  [types.SETROLES] (state, roles) {
    state.roles = roles
  }
}
