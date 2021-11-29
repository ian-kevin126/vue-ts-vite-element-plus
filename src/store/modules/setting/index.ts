import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { IRootState } from '@/store'

import { state } from './state'
import { actions, IActions } from './actions'
import { mutations, Mutations } from './mutations'
import type { ISettingState } from './state'

export { ISettingState }

export type SettingStore<S = ISettingState> = Omit<
  VuexStore<S>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof IActions>(
    key: K,
    payload: Parameters<IActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<IActions[K]>
}

export const store: Module<ISettingState, IRootState> = {
  state,
  actions,
  mutations,
}
