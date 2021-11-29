import { ActionContext, ActionTree } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { IRootState } from '@/store'
import { Mutations } from './mutations'
import { IPermissionState } from './state'
import { PermissionActionTypes } from './action-types'
import { PermissionMutationTypes } from './mutation-types'
import { permissionRoutes } from '@/router/index'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IPermissionState, IRootState>, 'commit'>

// 校验权限
const hasPermission = (route: RouteRecordRaw, roles: string[]) => {
  if (route.meta && route.meta.roles) {
    return roles.some(() => {
      if (route.meta?.roles !== undefined) {
        return true
        // return route.meta?.roles.includs(role)
      }
    })
  } else {
    return true
  }
}

// 过滤路由
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const result: RouteRecordRaw[] = []
  routes.forEach(route => {
    const routeCopy = { ...route }
    if (hasPermission(routeCopy, roles)) {
      if (routeCopy.children) {
        routeCopy.children = filterAsyncRoutes(routeCopy.children, roles)
      }
      result.push(routeCopy)
    }
  })
  return result
}

export interface IActions {
  [PermissionActionTypes.ACTION_SET_ROUTES](
    { commit }: AugmentedActionContext,
    roles: string[]
  ): void
}

export const actions: ActionTree<IPermissionState, IRootState> & IActions = {
  [PermissionActionTypes.ACTION_SET_ROUTES]({ commit }, roles: string[]) {
    const asyncRoutes = filterAsyncRoutes(permissionRoutes, roles)
    console.log('asyncRoutes')

    commit(PermissionMutationTypes.SET_ROUTER, asyncRoutes)
  },
}
