import { RouteRecordRaw } from 'vue-router'
import { markRaw } from 'vue'
import Layout from '@/layout/index.vue'

const componentRouter: RouteRecordRaw[] = [
  {
    path: '/component',
    name: 'Component',
    component: markRaw(Layout),
    redirect: '/component/table',
    meta: {
      title: 'table',
      icon: 'icon-remind',
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () =>
          import(
            /* webpackChunkName: "TableComponent" */ '@/views/component/table/index.vue'
          ),
        meta: {
          title: 'table',
          icon: 'icon-table',
        },
      },
    ],
  },
]

export default componentRouter
