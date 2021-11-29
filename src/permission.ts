import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from './router'
import { useStore } from './store'
import { RouteLocationNormalized } from 'vue-router'
import { RouteWhiteList } from './config/index'
import { PermissionActionTypes } from './store/modules/permission/action-types'
import { UserActionTypes } from './store/modules/user/action-types'
import { settingConfig } from '@/config/setting'
let isFirst = true

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: any
  ) => {
    NProgress.start()
    const store = useStore()

    // 检查是否登录
    if (!store.state.user.token) {
      if (~RouteWhiteList.indexOf(to.path)) {
        next()
      } else {
        next(`/login?redirect=${to.path}`)
      }
    } else {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (isFirst) {
          try {
            isFirst = false
            const roles = store.state.user.roles
            store.dispatch(PermissionActionTypes.ACTION_SET_ROUTES, roles)
            store.state.permission.dynamicRoutes.forEach(route => {
              router.addRoute(route)
            })

            next({ ...to, replace: true })
          } catch (err) {
            store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined)
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        } else {
          next()
        }
      }
    }
    document.title = to.meta.title + '-' + settingConfig.title
  }
)

router.afterEach(() => {
  NProgress.done()
})
