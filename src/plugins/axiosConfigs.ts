import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { App } from '@/config'
import { errorCode, CodeKey } from '../utils/codeStatus'
const { baseURL } = App

const service = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  withCredentials: false, // 跨域请求时是否需要使用凭证
  timeout: 30000,
  validateStatus() {
    return true
  },

  transformResponse: [
    data => {
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data)
      }
      return data
    },
  ],
})

// 添加请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // // 获取 token ，并将其添加至请求头中
    // let token = store.state.user.token
    // if (token) {
    //   config.headers.Authorization = token
    //   // config.headers.Authorization = 'Bearer ' + token;
    // }

    return config
  },
  (error: any) => {
    // 错误抛到业务代码
    error.data = {
      message: '服务器异常，请联系管理员！',
    }

    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const status = response.status
    const decide = status < 200 || status >= 300
    if (decide) {
      const message = errorCode(status as CodeKey)
      if (typeof response.data === 'string') {
        response.data = { message }
      } else {
        response.data.message = message
      }
      ElMessage({
        message,
        type: 'error',
        showClose: true,
      })
      return Promise.reject(response.data)
    }

    return response
  },
  (error: any) => {
    if (axios.isCancel(error)) {
      ElMessage({
        message: '请勿重复请求',
        type: 'warning',
        showClose: true,
      })
    } else {
      const message = '请求超时或服务器异常，请检查网络或联系管理员！'
      ElMessage({
        message,
        type: 'error',
        showClose: true,
      })
    }

    return Promise.reject(error)
  }
)

export default service
