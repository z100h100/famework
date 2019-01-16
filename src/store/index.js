import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import just from './modules/just'
import role from './modules/role'
import order from './modules/order'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    just,
    order,
    role
  },
  getters
})

export default store
