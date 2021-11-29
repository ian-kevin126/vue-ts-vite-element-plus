import { ActionTree, ActionContext } from 'vuex'
import { Mutations } from './mutations'
import { SettingActionTypes } from './action-types'
import { ISettingState } from './state'
import { IRootState } from '../../index'
import { SettingMutationTypes } from './mutation-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<ISettingState, IRootState>, 'commit'>

export interface IActions {
  [SettingActionTypes.ACTION_UPDATE_SETTING](
    { commit }: AugmentedActionContext,
    opts: { type: string; val: any }
  ): void
}

export const actions: ActionTree<ISettingState, IRootState> & IActions = {
  [SettingActionTypes.ACTION_UPDATE_SETTING](
    { commit },
    opts: { type: string; val: any }
  ) {
    commit(SettingMutationTypes.UPDATE_SETTING, opts)
  },
}
