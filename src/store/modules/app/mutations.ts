import { MutationTree } from 'vuex'
import { AppMutationTypes } from './mutation-types'
import { IAppState } from './state'
import { setLanguage } from '@/utils/cookies'

export type Mutations<S = IAppState> = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: S, withoutAnimation: boolean): void
  [AppMutationTypes.SET_LANGUAGE](state: S, lang: string): void
}

export const mutations: MutationTree<IAppState> & Mutations = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: IAppState, withoutAnimation: boolean) {
    state.sidebar.open = !state.sidebar.open
    // 设置cookie
    state.sidebar.withoutAnimation = withoutAnimation
  },
  [AppMutationTypes.SET_LANGUAGE](state: IAppState, lang: string) {
    state.language = lang
    setLanguage(lang)
  },
}
