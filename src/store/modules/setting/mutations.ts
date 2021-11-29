import { MutationTree } from 'vuex'
import { ISettingState } from './state'
import { SettingMutationTypes } from './mutation-types'
import { settingConfig } from '@/config/setting'

type themeKeys = typeof settingConfig
export type Mutations<S = ISettingState> = {
  [SettingMutationTypes.UPDATE_SETTING](
    state: S,
    opts: { type: string; val: any }
  ): void
}

export const mutations: MutationTree<ISettingState> & Mutations = {
  [SettingMutationTypes.UPDATE_SETTING](
    state: ISettingState,
    opts: { type: keyof themeKeys; val: any }
  ) {
    const { type, val } = opts
    // if (type == 'theme') {
    //   state.theme = val
    // }
    // if (type == 'setting') {
    //   state.visibleSetting = val
    // }
    // if (type == 'menuMode') {
    //   state.menuMode = val
    // }
    // if (type == 'fixHead') {
    //   state.fixHead = val
    // }
    // if (type == 'visibleTab') {
    //   state.visibleTab = val
    // }
    if (type == 'refresh') {
      state.routerView = false
      setTimeout(() => {
        state.routerView = true
      }, 20)
    } else if(type == 'setting') {
      state.setting = val
    }
    else {
      state[type] = val
    }
  },
}
