export enum codeStatus {
  BAD = '请求错误(400)',
  FORBIDDEN = '未授权，请重新登录(401)',
  REFUSE = '拒绝访问(403)',
  NOT_FOUND = '请求出错(404)',
  REQUEST_TIMEOUT = '请求超时(408)',
  SERVER_ERR = '服务器错误(500)',
  SERVER_NOT_IMPLEMENT = '服务未实现(501)',
  NETWORK_ERR = '网络错误(502)',
  UNAVAILABLE = '服务不可用(503)',
  NETWORK_TIMEOUT = '网络超时(504)',
  NOT_SUPPORT = 'HTTP版本不受支持(505)',
}

export type CodeKey =
  | 400
  | 401
  | 403
  | 404
  | 408
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505

const codeKeys = {
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
  505: 'HTTP版本不受支持(505)',
}

function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key]
}

export const errorCode = (code: CodeKey): string => {
  return getValue(codeKeys, code)
}
