import { MutationTree } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'
import { IPermissionState } from './state'
import { PermissionMutationTypes } from './mutation-types'

export type Mutations<S = IPermissionState> = {
  [PermissionMutationTypes.SET_ROUTER](state: S, routes: RouteRecordRaw[]): void
}

export const mutations: MutationTree<IPermissionState> & Mutations = {
  [PermissionMutationTypes.SET_ROUTER](
    state: IPermissionState,
    routes: RouteRecordRaw[]
  ) {
    state.routes = constantRoutes.concat(routes)
    state.dynamicRoutes = routes
  },
}
