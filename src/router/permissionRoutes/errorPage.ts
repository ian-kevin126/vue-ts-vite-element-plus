import { RouteRecordRaw } from 'vue-router'
import { markRaw } from 'vue'
import Layout from '@/layout/index.vue'

const tableRouter: RouteRecordRaw[] = [
  {
    path: '/error',
    name: 'Error',
    component: markRaw(Layout),
    redirect: '/error/401',
    meta: {
      title: 'errorPages',
      icon: 'icon-folder-block',
    },
    children: [
      {
        path: '401',
        name: 'page401',
        component: () =>
          import(
            /* webpackChunkName: "dynamicTable" */ '@/views/errorPage/401.vue'
          ),
        meta: {
          title: 'page401',
          icon: 'icon-shield',
        },
      },
      {
        path: '404',
        name: 'page404',
        component: () =>
          import(
            /* webpackChunkName: "dynamicTable" */ '@/views/errorPage/404.vue'
          ),
        meta: {
          title: 'page404',
          icon: 'icon-bug',
        },
      },
    ],
  },
]

export default tableRouter
