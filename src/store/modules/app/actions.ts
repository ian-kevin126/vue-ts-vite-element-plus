import { IRootState } from '@/store'
import { ActionContext, ActionTree } from 'vuex'
import { IAppState } from './state'
import { Mutations } from './mutations'
import { AppMutationTypes } from './mutation-types'
import { AppActionTypes } from './action-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IAppState, IRootState>, 'commit'>

export interface IActions {
  [AppActionTypes.ACTION_TOGGLE_SIDEBAR](
    { commit }: AugmentedActionContext,
    withoutAnimation: boolean
  ): void
  [AppActionTypes.ACTION_SET_LANGUAGE](
    { commit }: AugmentedActionContext,
    lang: string
  ): void
}

export const actions: ActionTree<IAppState, IRootState> & IActions = {
  [AppActionTypes.ACTION_TOGGLE_SIDEBAR](
    { commit },
    withoutAnimation: boolean
  ) {
    commit(AppMutationTypes.TOGGLE_SIDEBAR, withoutAnimation)
  },
  [AppActionTypes.ACTION_SET_LANGUAGE](
    { commit },
    lang: string
  ) {
    commit(AppMutationTypes.SET_LANGUAGE, lang)
  },
}
