import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/theme.scss'
import '@/styles/index.scss' // global css

import './icons' // icon
import './permission' // permission control

Vue.use(ElementUI)

axios.setConfig = function (config) {
  axios.defaults.baseURL = config.BASE_URL
  axios.defaults.timeout = config.AJAX_TIMEOUT
}

Vue.config.productionTip = false
axios.get('/global-config.json').then((res) => {
  // console.log(res)
  Vue.prototype.g_Config = res.data
  axios.setConfig(Vue.prototype.g_Config)
  /* eslint-disable no-new */
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
