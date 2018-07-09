import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  // 登陆
  { path: '/login',
    component: resolve => require(['@/views/login/index'], resolve),
    hidden: true
  },
  // 404
  { path: '/404',
    component: resolve => require(['@/views/404'], resolve),
    hidden: true
  },
  // dashboard example
  {
    path: '/',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: resolve => require(['@/views/dashboard/index'], resolve)
    }]
  },
  // example
  {
    path: '/example',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'edit' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: resolve => require(['@/views/table/index'], resolve),
        meta: { title: 'Table', icon: 'share' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: resolve => require(['@/views/tree/index'], resolve),
        meta: { title: 'Tree', icon: 'delete' }
      }
    ]
  },
  // 表单
  {
    path: '/form',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    children: [
      {
        path: 'index',
        name: 'Form',
        component: resolve => require(['@/views/form/index'], resolve),
        meta: { title: 'Form', icon: 'location' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
