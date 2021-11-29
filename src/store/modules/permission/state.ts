import { RouteRecordRaw } from 'vue-router'

export interface IPermissionState {
  routes: RouteRecordRaw[]
  dynamicRoutes: RouteRecordRaw[]
}

export const state: IPermissionState = {
  routes: [],
  dynamicRoutes: [],
}
