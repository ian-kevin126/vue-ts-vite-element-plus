import { RouteRecordRaw } from 'vue-router'

const userRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录',
      icon: 'icon-remind',
      hidden: true,
    },
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/errorPage/401.vue'),
    meta: {
      title: '401',
      icon: 'icon-remind',
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPage/404.vue'),
    meta: {
      title: '404',
      icon: 'icon-remind',
      hidden: true,
    },
  },
]

export default userRoutes
