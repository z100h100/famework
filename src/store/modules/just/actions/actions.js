import * as types from '../../../mutation_type'
import getDate from '../../../../apis/api' // 接口

export default {
  // 获取列表
  getJustList ({ commit }, userInfo) {
    return getDate.GET_JUSTLIST(userInfo).then(response => {
      const data = response.data.data
      commit(types.JUSTLIST, data)
      return response
    })
  },
  getDelJust ({ commit }, userInfo) {
    return getDate.GET_DELJUST(userInfo).then(response => {
      return response
    })
  },
  getJustAuthsList ({ commit }, userInfo) {
    return getDate.GET_JUSTAUTHSLIST(userInfo).then(response => {
      const data = response.data.data
      commit(types.JUSTAUTHSLIST, data)
      return response
    })
  },
  getJustAuthsAdd ({ commit }, userInfo) {
    return getDate.GET_JUSTAUTHSADD(userInfo).then(response => {
      return response
    })
  },
  getJustAuthsModify ({ commit }, userInfo) {
    return getDate.GET_JUSTAUTHSMODIFY(userInfo).then(response => {
      return response
    })
  }
}
