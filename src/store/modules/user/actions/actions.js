import * as types from '../../../mutation_type'
import getDate from '../../../../apis/api' // 接口
// import Cookies from 'js-cookie' // cookie
import { setToken, removeToken } from '@/utils/auth'

export default {
  // 登录
  Login ({ commit }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      return getDate.GET_LOGIN(username, userInfo.password).then(response => {
        const data = response.data
        setToken(data.token)
        commit(types.SETTOKEN, data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  GetInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response.data
        if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', data.roles)
        } else {
          reject(response)
        }
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  LogOut ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}
