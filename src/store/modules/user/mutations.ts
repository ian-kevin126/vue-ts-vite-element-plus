import { IUserState } from './state'
import { MutationTree } from 'vuex'
import { UserMutationTypes } from './mutation-types'

export type Mutations<S = IUserState> = {
  [UserMutationTypes.SET_TOKEN](state: S, token: string): void
  [UserMutationTypes.SET_ROLES](state: S, roles: string[]): void
  [UserMutationTypes.SET_USER_INFO](state: S, userinfo: any): void
}

export const mutations: MutationTree<IUserState> & Mutations = {
  [UserMutationTypes.SET_TOKEN](state: IUserState, token: string) {
    state.token = token
  },
  [UserMutationTypes.SET_ROLES](state: IUserState, roles: string[]) {
    state.roles = roles
  },
  [UserMutationTypes.SET_USER_INFO](state: IUserState, userinfo: any) {
    state.userinfo = userinfo
  },
}
