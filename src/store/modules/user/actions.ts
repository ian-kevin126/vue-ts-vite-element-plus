import { ActionContext, ActionTree } from 'vuex'
import { UserActionTypes } from './action-types'
import { Mutations } from './mutations'
import { IUserState } from './state'
import { IRootState, useStore } from '@/store'
import { ILogin } from '@/types'
import { setToken } from '@/utils/cookies'
import { UserMutationTypes } from './mutation-types'
import { removeToken } from '@/utils/cookies'
import { loginRequest, userInfoRequest } from '@/api/user'
import { resetRouter } from '../../../router/index'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IUserState, IRootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K): ReturnType<Mutations[K]>
} & Omit<ActionContext<IUserState, IRootState>, 'commit'>

export interface IUserActions {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userinfo: ILogin
  ): void
  [UserActionTypes.ACTION_GET_USER_INFO]({
    commit,
  }: AugmentedActionContext): void
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext): void
}

export const actions: ActionTree<IUserState, IRootState> & IUserActions = {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userinfo: ILogin
  ) {
    const { username, password } = userinfo
    username.trim()

    loginRequest({
      username,
      password,
    }).then(data => {
      setToken(data.accessToken)
      commit(UserMutationTypes.SET_TOKEN, data.accessToken)
      return data
    })
  },

  async [UserActionTypes.ACTION_GET_USER_INFO]({
    commit,
  }: AugmentedActionContext) {
    const store = useStore()
    const userId = store.state.user.userinfo?.id
    await userInfoRequest(userId)
      .then((data: any) => {
        commit(UserMutationTypes.SET_ROLES, ['admin'])
        commit(UserMutationTypes.SET_USER_INFO, data)
        return data
      })
      .catch(() => {
        throw Error('获取用户信息失败，请重新登录！')
      })
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }) {
    removeToken()
  },

  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }) {
    removeToken()
    resetRouter()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_ROLES, [])
  },
}
