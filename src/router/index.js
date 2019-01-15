import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMapDefault = [
  {
    path: '',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    redirect: '/dashboard',
    label: '首页',
    key: 'Auths_Dashboard',
    hidden: true,
    meta: { title: '首页', icon: 'share', requiresAuth: true, name: '首页' },
    children: [{
      path: 'dashboard',
      name: '首页',
      meta: { title: '首页', icon: 'share', requiresAuth: true },
      component: resolve => require(['@/views/dashboard/index'], resolve)
    }]
  },
  // 表单
  {
    path: '/trackDetails/:id',
    label: 'trackDetails',
    component: resolve => require(['@/views/trackDetails/index'], resolve),
    hidden: true
  }
]

export const constantRouterMap = [
  // 运单管理
  {
    path: '/order',
    component: resolve => require(['@/views/temp'], resolve),
    redirect: '/order/orderList',
    name: 'Order',
    label: '运单管理',
    key: 'Auths_Order',
    meta: { title: '运单管理', icon: 'edit' },
    children: [
      {
        path: 'orderAdd',
        name: 'orderAdd',
        label: '创建运单',
        parent: 'Order',
        key: 'Auths_OrderAdd',
        component: resolve => require(['@/views/order/orderAdd'], resolve),
        meta: { title: '创建运单', icon: 'edit' }
      },
      {
        path: 'orderList',
        name: 'orderList',
        label: '运单列表',
        parent: 'Order',
        key: 'Auths_OrderList',
        component: resolve => require(['@/views/order/orderList'], resolve),
        meta: { title: '运单列表', icon: 'edit' }
      },
      {
        path: 'orderDetail/:id',
        name: 'orderDetail',
        label: '运单详情',
        parent: 'Order',
        key: 'Auths_OrderDetail',
        component: resolve => require(['@/views/order/orderDetail'], resolve),
        meta: { title: '运单详情', icon: 'delete' },
        hidden: true
      },
      {
        path: 'orderTrack/:id',
        name: 'orderTrack',
        label: '运单追踪',
        parent: 'Order',
        key: 'Auths_OrderTrack',
        component: resolve => require(['@/views/order/orderTrack'], resolve),
        meta: { title: '运单追踪', icon: 'delete' },
        hidden: true
      }
    ]
  },
  // 表单
  {
    path: '/jurisdiction',
    label: '权限管理',
    key: 'Auths_Jurisdiction',
    meta: { title: '权限管理', icon: 'location' },
    component: resolve => require(['@/views/temp'], resolve),
    children: [
      {
        path: 'roleList',
        name: 'roleList',
        label: '角色列表',
        key: 'Auths_roleList',
        component: resolve => require(['@/views/jurisdiction/roleList'], resolve),
        meta: { title: '角色列表', icon: 'location' }
      },
      {
        path: 'roleModify',
        name: 'roleModify',
        label: '修改角色权限',
        key: 'Auths_roleModify',
        component: resolve => require(['@/views/jurisdiction/roleModify'], resolve),
        meta: { title: '修改角色权限', icon: 'location' },
        hidden: true
      },
      {
        path: 'roleAdd',
        name: 'roleAdd',
        label: '添加角色',
        key: 'Auths_roleAdd',
        component: resolve => require(['@/views/jurisdiction/roleAdd'], resolve),
        meta: { title: '添加角色', icon: 'location' }
      },
      {
        path: 'justList',
        name: 'justList',
        label: '用户列表',
        key: 'Auths_justList',
        component: resolve => require(['@/views/jurisdiction/justList'], resolve),
        meta: { title: '用户列表', icon: 'location' }
      },
      {
        path: 'justAdd',
        name: 'justAdd',
        label: '添加用户',
        key: 'Auths_justAdd',
        component: resolve => require(['@/views/jurisdiction/justAdd'], resolve),
        meta: { title: '添加用户', icon: 'location' }
      },
      {
        path: 'justModify',
        name: 'justModify',
        label: '用户权限修改',
        key: 'Auths_justModify',
        component: resolve => require(['@/views/jurisdiction/justModify'], resolve),
        meta: { title: '用户权限修改', icon: 'location' },
        hidden: true
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
// 初始路由
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'login',
      label: 'login',
      component: resolve => require(['@/views/login/index'], resolve),
      hidden: true
    },
    {
      path: '/trackDetails/:id',
      label: 'trackDetails',
      component: resolve => require(['@/views/trackDetails/index'], resolve),
      hidden: true
    }
  ]
})
