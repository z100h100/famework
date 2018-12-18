import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app/index'
import user from './modules/user/index'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  getters
})

export default store
