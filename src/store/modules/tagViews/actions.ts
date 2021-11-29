import { TagView, ITagViewsState } from './state'
import { IRootState } from '@/store'
import { ActionTree, ActionContext } from 'vuex'
import { TagsActionTypes } from './action-types'
import { Mutations } from './mutation'
import { TagsMutationTypes } from './mutation-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<ITagViewsState, IRootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K): ReturnType<Mutations[K]>
} & Omit<ActionContext<ITagViewsState, IRootState>, 'commit'>

export interface IActions {
  [TagsActionTypes.ACTION_ADD_VIEW](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_ADD_VISITED_VIEW](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_DEL_VIEW](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_DEL_OTHER_VIEW](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_DEL_CACHED_VIEW](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_OTHER_VIEWS](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_UPDATE_VISITED_VIEW](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_DEL_LEFT_VIEWS](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_DEL_RIGHT_VIEWS](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_DEL_ALL_VIEWS]({
    commit,
  }: NoAugmentedActionContext): void
  [TagsActionTypes.ACTION_DEL_ALL_CACHED_VIEWS]({
    commit,
  }: NoAugmentedActionContext): void
}

export const actions: ActionTree<ITagViewsState, IRootState> & IActions = {
  async [TagsActionTypes.ACTION_ADD_VIEW]({ commit }, view: TagView) {
    commit(TagsMutationTypes.ADD_CACHED_VIEW, view)
    commit(TagsMutationTypes.ADD_VISITED_VIEW, view)
  },
  [TagsActionTypes.ACTION_ADD_VISITED_VIEW]({ commit }, view: TagView) {
    commit(TagsMutationTypes.ADD_VISITED_VIEW, view)
  },
  [TagsActionTypes.ACTION_DEL_VIEW]({ commit }, view: TagView) {
    commit(TagsMutationTypes.DEL_VISITED_VIEW, view)
    commit(TagsMutationTypes.DEL_CACHED_VIEW, view)
  },
  [TagsActionTypes.ACTION_OTHER_VIEWS]({ commit }, view: TagView) {
    commit(TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS, view)
  },
  [TagsActionTypes.ACTION_DEL_OTHER_VIEW]({ commit }, view: TagView) {
    commit(TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS, view)
    commit(TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS, view)
  },
  [TagsActionTypes.ACTION_DEL_CACHED_VIEW]({ commit }, view: TagView) {
    commit(TagsMutationTypes.DEL_CACHED_VIEW, view)
  },
  [TagsActionTypes.ACTION_UPDATE_VISITED_VIEW]({ commit }, view: TagView) {
    commit(TagsMutationTypes.UPDATE_VISITED_VIEW, view)
  },
  [TagsActionTypes.ACTION_DEL_LEFT_VIEWS]({ commit }, view: TagView) {
    commit(TagsMutationTypes.DEL_LEFT_VIEW, view)
  },
  [TagsActionTypes.ACTION_DEL_RIGHT_VIEWS]({ commit }, view: TagView) {
    commit(TagsMutationTypes.DEL_RIGHT_VIEW, view)
  },
  [TagsActionTypes.ACTION_DEL_ALL_VIEWS]({ commit }) {
    commit(TagsMutationTypes.DEL_ALL_VISITED_VIEWS)
  },
  [TagsActionTypes.ACTION_DEL_ALL_CACHED_VIEWS]({ commit }) {
    commit(TagsMutationTypes.DEL_ALL_CACHED_VIEWS)
  },
}
