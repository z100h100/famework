import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app/index'
import user from './modules/user/index'
import just from './modules/just/index'
import role from './modules/role/index'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    just,
    role
  },
  getters
})

export default store
