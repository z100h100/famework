import * as types from '../../../mutation_type'
import getDate from '../../../../apis/api' // 接口

export default {
  // 获取列表
  getRoleList ({ commit }, userInfo) {
    return getDate.GET_ROLELIST(userInfo).then(response => {
      const data = response.data.data
      commit(types.ROLELIST, data)
      return response
    })
  },
  getDelRole ({ commit }, userInfo) {
    return getDate.GET_DELROLE(userInfo).then(response => {
      return response
    })
  },
  getRoleAuthsList ({ commit }, userInfo) {
    return getDate.GET_ROLELISTGET(userInfo).then(response => {
      return response
    })
  },
  getAllRole ({ commit }, userInfo) {
    return getDate.GET_ALLROLE(userInfo).then(response => {
      return response
    })
  },
  getRoleAuthsSave ({ commit }, userInfo) {
    return getDate.GET_ROLELISTSAVE(userInfo).then(response => {
      return response
    })
  }
}
