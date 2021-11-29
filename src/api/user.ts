import request from '@/plugins/request' // axios 封装
import qs from 'qs'
import httpUrl from './httpUrl' // 接口 url
import { ILoginClient } from '@/types'

// 用户登录
export const loginRequest = async (params: ILoginClient) => {
  return await request.post<string>(httpUrl.login, params)
}

export const userInfoRequest = async (userId: number | string) => {
  return await request.post<string>(httpUrl.userinfo, qs.stringify(userId))
}
