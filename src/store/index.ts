import { createLogger, createStore } from 'vuex'
import { store as app, AppStore, IAppState } from '@/store/modules/app'
import { store as user, UserStore, IUserState } from '@/store/modules/user'
import {
  store as tagViews,
  TagViewsStore,
  ITagViewsState,
} from '@/store/modules/tagViews'
import {
  store as permission,
  PermissionStore,
  IPermissionState,
} from '@/store/modules/permission'
import {
  store as setting,
  SettingStore,
  ISettingState,
} from '@/store/modules/setting'

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger()] : []
export interface IRootState {
  app: IAppState
  user: IUserState
  permission: IPermissionState
  tagViews: ITagViewsState
  setting: ISettingState
}

export type Store = AppStore<Pick<IRootState, 'app'>> &
  UserStore<Pick<IRootState, 'user'>> &
  PermissionStore<Pick<IRootState, 'permission'>> &
  TagViewsStore<Pick<IRootState, 'tagViews'>> &
  SettingStore<Pick<IRootState, 'setting'>>

export const store = createStore({
  plugins,
  modules: {
    app,
    user,
    permission,
    tagViews,
    setting,
  },
})

export function useStore(): Store {
  return store as Store
}
