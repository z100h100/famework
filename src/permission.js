import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

router.beforeEach((to, from, next) => {
  NProgress.start()
  // if (!store.state.user.UserToken) {
  if (!sessionStorage.getItem('UserToken')) {
    if (
      to.matched.length > 0 &&
      !to.matched.some(record => record.meta.requiresAuth)
    ) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    if (!store.state.user.permissionList) {
      store.dispatch('FETCH_PERMISSION').then(() => {
        next({ path: to.path })
      })
    } else {
      if (to.path !== '/login') {
        next()
      } else {
        store.dispatch('LogOut').then(() => {
          // location.reload()
          // next(from.fullPath)
        })
      }
    }
  }
})

router.afterEach((to, from, next) => {
  store.commit('SETCURRENTMENU', to.path)
  NProgress.done() // 结束Progress
})
