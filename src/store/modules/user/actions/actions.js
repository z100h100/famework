import * as types from '../../../mutation_type'
import getDate from '../../../../apis/api' // 接口
import { recursionRouter, setDefaultRoute } from '@/utils/index'
import router, { constantRouterMapDefault, constantRouterMap } from '@/router/index'

export default {
  // 登录
  Login ({ commit }, userInfo) {
    return getDate.GET_LOGIN(userInfo).then(response => {
      const data = response.data.data
      commit(types.SETCURRENTAUTHS, data)
      commit(types.SETTOKEN, data)
      return response
    })
  },
  LogOut ({ commit }, userInfo) {
    return getDate.GET_LOGINOUT(userInfo).then(response => {
      commit(types.LOGINOUT)
      commit(types.CLEARPERMISSION)
      commit(types.CLEARMENU)
      return response
    })
  },
  logMe ({ commit }) {
    return getDate.GET_INFO().then(response => {
      const data = response.data.data
      commit(types.SETCURRENTAUTHS, data)
      commit(types.SETTOKEN, data)
      return response
    })
  },
  async FETCH_PERMISSION ({ commit, dispatch, state }) {
    let permissionListCurrent = await dispatch('logMe')
    let permissionList = permissionListCurrent.data.data.actions
    /*  根据权限筛选出我们设置好的路由并加入到path=''的children */
    let routes = recursionRouter(permissionList, constantRouterMap)
    let MainContainer = constantRouterMapDefault.find(v => v.path === '')
    let children = MainContainer.children
    children.push(...routes)
    /* 生成左侧导航菜单 */
    commit(types.SETMENU, children)

    /*
        为所有有children的菜单路由设置第一个children为默认路由
        主要是供面包屑用，防止点击面包屑后进入某个路由下的 '' 路由,比如/manage/
        而我们的路由是
        [
            /manage/menu1,
            /manage/menu2
        ]
    */
    setDefaultRoute([MainContainer])

    /*  初始路由 */
    let initialRoutes = router.options.routes

    /*  动态添加路由 */
    router.addRoutes(constantRouterMapDefault)
    /* 完整的路由表 */
    commit('SET_PERMISSION', [initialRoutes, constantRouterMapDefault])
  }
  // 登出
  // LogOut ({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       commit('SET_TOKEN', '')
  //       commit('SET_ROLES', [])
  //       removeToken()
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // }
}
