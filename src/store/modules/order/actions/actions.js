import * as types from '../../../mutation_type'
import getDate from '../../../../apis/api' // 接口

export default {
  // 获取列表
  getWaybillPage ({ commit }, userInfo) {
    return getDate.GET_WAYBILLPAGE(userInfo).then(response => {
      const data = response.data.data
      commit(types.JUSTLIST, data)
      return response
    })
  },
  // 添加运单
  getWaybillSave ({ commit }, userInfo) {
    return getDate.GET_WAYBILLSAVE(userInfo).then(response => {
      return response
    })
  },
  // 获取全部user
  getUserAllUser ({ commit }, userInfo) {
    return getDate.GET_USERALLUSER(userInfo).then(response => {
      return response
    })
  },
  // 保存短信方
  getWaybillSaveSMS ({ commit }, userInfo) {
    return getDate.GET_WAYBILLSAVESMS(userInfo).then(response => {
      return response
    })
  }
}
