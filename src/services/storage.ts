import Taro from '@tarojs/taro'

const TOKEN_KEY = 'saas_token'
const USER_KEY = 'saas_user'

export type UserInfo = {
  id?: number
  username?: string
  nickname?: string
  avatar?: string
  roles?: string[]
  permissions?: string[]
  accessToken?: string
  refreshToken?: string
  expires?: number
  curCompanyId?: number
  companyList?: Array<any>
}

export function setToken(token: string) {
  Taro.setStorageSync(TOKEN_KEY, token)
}

export function getToken(): string | null {
  return Taro.getStorageSync(TOKEN_KEY) || null
}

export function clearToken() {
  Taro.removeStorageSync(TOKEN_KEY)
}

export function setUser(user: UserInfo) {
  Taro.setStorageSync(USER_KEY, user)
}

export function getUser(): UserInfo | null {
  return Taro.getStorageSync(USER_KEY) || null
}

export function clearUser() {
  Taro.removeStorageSync(USER_KEY)
}
