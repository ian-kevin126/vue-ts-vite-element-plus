import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { markRaw } from 'vue'

// 常规路由
const constantRouteFiles = import.meta.globEager('./constantRoutes/*.ts')
let constantModules: Array<RouteRecordRaw> = []

for (const path in constantRouteFiles) {
  constantModules = [...constantModules, ...constantRouteFiles[path].default]
}

// 异步路由
const asyncRouteFiles = import.meta.globEager('./permissionRoutes/*.ts')
let asyncModules: Array<RouteRecordRaw> = []

for (const path in asyncRouteFiles) {
  asyncModules = [...asyncModules, ...asyncRouteFiles[path].default]
}

export const permissionRoutes: Array<RouteRecordRaw> = [...asyncModules]

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: markRaw(Layout),
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () =>
          import(
            /* webpackChunkName: "redirect" */ '@/views/redirect/index.vue'
          ),
      },
    ],
  },
  {
    path: '/',
    component: markRaw(Layout),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'icon-home',
          affix: true,
        },
      },
    ],
  },
  ...constantModules,
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
})

export function resetRouter() {
  const routerCopy = router
  ;(router as any).matcher = (routerCopy as any).matcher
}

export default router
