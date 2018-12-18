import api from './index'
import axios from 'axios'
// import store from '../store'
import { Message } from 'element-ui'
/**
 *
 * @type {{}}
 */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charest=utf-8'
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  // store.state.index.fullscreenLoading = true
  return config
}, err => {
  // store.state.index.fullscreenLoading = false
  Message.error('服务器错误，请重试')
  return Promise.reject(err)
})
axios.interceptors.response.use(response => {
  // if (response.data.status == '200') {
  //   // store.state.index.fullscreenLoading = false
  // } else {
  //   Message.error(response.data.message)
  //   // store.state.index.fullscreenLoading = false
  //   return Promise.reject(response.status)
  // }
  return response
}, err => {
  // store.state.index.fullscreenLoading = false
  Message.error('服务器错误，请重试')
  return Promise.reject(err)
})

let base = '/apis'

export default {
  GET_LOGIN (params) {
    return api.fetch('post', `${base}/login?username=${params.username}&password=${params.password}`, {})
  },
  GET_INFO (params) {
    return api.fetch('post', `${base}/me`, params)
  }
}
