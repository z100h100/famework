import api from './index'
import axios from 'axios'
// import store from '../store'
import { Message } from 'element-ui'
import router from '@/router'
/**
 *
 * @type {{}}
 */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charest=utf-8'
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  return config
}, err => {
  Message.error('服务器错误，请重试')
  return Promise.reject(err)
})
axios.interceptors.response.use(response => {
  if (response.data.status == 0) {
    if (response.data.code == '1001') {
      Message.error(response.data.message)
      router.push('/')
    } else {
      Message.error(response.data.message)
    }
  }
  return response
}, err => {
  Message.error('服务器错误，请重试')
  return Promise.reject(err)
})

let base = ''

export default {
  GET_LOGIN (params) {
    return api.fetch('post', `${base}/login?username=${params.username}&password=${params.password}`, {})
  },
  GET_LOGINOUT (params) {
    return api.fetch('get', `${base}/logout`, {})
  },
  GET_INFO (params) {
    return api.fetch('post', `${base}/me`, params)
  },
  GET_ROLELISTGET (params) {
    return api.fetch('get', `${base}/role/get`, params)
  },
  GET_ROLELIST (params) {
    return api.fetch('post', `${base}/role/page`, params)
  },
  GET_ROLELISTSAVE (params) {
    return api.fetch('post', `${base}/role/save`, params)
  },
  GET_ALLROLE (params) {
    return api.fetch('post', `${base}/role/all`, params)
  },
  GET_JUSTLIST (params) {
    return api.fetch('post', `${base}/user/page`, params)
  },
  GET_USERALLUSER (params) {
    return api.fetch('get', `${base}/user/all_user`, params)
  },
  GET_JUSTAUTHSLIST (params) {
    return api.fetch('get', `${base}/user/get`, params)
  },
  GET_JUSTAUTHSADD (params) {
    return api.fetch('post', `${base}/user/add`, params)
  },
  GET_JUSTAUTHSMODIFY (params) {
    return api.fetch('post', `${base}/user/update`, params)
  },
  GET_WAYBILLPAGE (params) {
    return api.fetch('post', `${base}/waybill/page`, params)
  },
  GET_WAYBILLGET (params) {
    return api.fetch('get', `${base}/waybill/get`, params)
  },
  GET_WAYBILLSAVE (params) {
    return api.fetch('post', `${base}/waybill/save`, params)
  },
  GET_WAYBILLSAVESMS (params) {
    return api.fetch('post', `${base}/waybill/saveSms`, params)
  },
  GET_WAYBILLSAVETRACKING (params) {
    return api.fetch('post', `${base}/waybill/saveTracking`, params)
  }
}
