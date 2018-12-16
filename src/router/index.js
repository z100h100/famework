import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  // 登陆
  { path: '/login',
    label: 'login',
    component: resolve => require(['@/views/login/index'], resolve),
    hidden: true
  },
  // 404
  { path: '/404',
    label: '404',
    component: resolve => require(['@/views/404'], resolve),
    hidden: true
  },
  // dashboard example
  {
    path: '/',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    redirect: '/dashboard',
    name: '首页',
    label: '首页',
    key: 'Auths_Dashboard',
    hidden: true,
    meta: { title: '首页', icon: 'share' },
    children: [{
      path: 'dashboard',
      component: resolve => require(['@/views/dashboard/index'], resolve)
    }]
  },
  // 运单管理
  {
    path: '/order',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    redirect: '/order/orderList',
    name: 'Order',
    label: '运单管理',
    key: 'Auths_Order',
    meta: { title: '运单管理', icon: 'edit' },
    children: [
      {
        path: 'orderList',
        name: 'orderList',
        label: '运单列表',
        key: 'Auths_OrderList',
        component: resolve => require(['@/views/order/orderList'], resolve),
        meta: { title: '运单列表', icon: 'share' }
      },
      {
        path: 'orderAdd',
        name: 'orderAdd',
        label: '创建运单',
        key: 'Auths_OrderAdd',
        component: resolve => require(['@/views/order/orderAdd'], resolve),
        meta: { title: '创建运单', icon: 'delete' }
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        label: '运单详情',
        key: 'Auths_OrderDetail',
        component: resolve => require(['@/views/order/orderDetail'], resolve),
        meta: { title: '运单详情', icon: 'delete' }
      },
      {
        path: 'orderTrack',
        name: 'orderTrack',
        label: '运单追踪',
        key: 'Auths_OrderTrack',
        component: resolve => require(['@/views/order/orderTrack'], resolve),
        meta: { title: '运单追踪', icon: 'delete' }
      }
    ]
  },
  // 表单
  {
    path: '/jurisdiction',
    label: '权限',
    key: 'Auths_Jurisdiction',
    meta: { title: '权限', icon: 'location' },
    component: resolve => require(['@/views/layout/Layout'], resolve),
    children: [
      {
        path: 'index',
        name: 'justList',
        label: '人员列表',
        key: 'Auths_justList',
        component: resolve => require(['@/views/jurisdiction/index'], resolve),
        meta: { title: '权限', icon: 'location' }
      },
      {
        path: 'index',
        name: 'justModify',
        label: '权限修改',
        key: 'Auths_justModify',
        component: resolve => require(['@/views/jurisdiction/index'], resolve),
        meta: { title: '权限', icon: 'location' }
      }
    ]
  },
  // 表单
  {
    path: '/form',
    label: 'Form',
    key: 'Auths_Form',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    children: [
      {
        path: 'index',
        name: 'Form',
        label: 'Form',
        key: 'Auths_Form',
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
