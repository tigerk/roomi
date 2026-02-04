import Taro from '@tarojs/taro'
import { clearToken, clearUser, getToken } from './storage'

export type ApiResponse<T> = {
  code: number
  message: string
  data: T
}

type RequestOptions = {
  url: string
  method?: Taro.request.Option['method']
  data?: any
  header?: Record<string, string>
}

export async function request<T>(options: RequestOptions): Promise<ApiResponse<T>> {
  const token = getToken()
  const header: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.header || {})
  }
  if (token) {
    header['SaasToken'] = token
  }

  const res = await Taro.request<ApiResponse<T>>({
    url: `${API_BASE}/${options.url.replace(/^\//, '')}`,
    method: options.method || 'POST',
    data: options.data,
    header
  })

  if (res.data?.code === 9999 || res.data?.code === 401) {
    clearToken()
    clearUser()
    const pages = Taro.getCurrentPages()
    const current = pages[pages.length - 1]
    if (current?.route !== 'pages/login/index') {
      Taro.reLaunch({ url: '/pages/login/index' })
    }
  }

  return res.data
}
