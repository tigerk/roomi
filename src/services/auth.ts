import Taro from '@tarojs/taro'
import { getToken } from './storage'

export function ensureLoggedIn() {
  const token = getToken()
  if (!token) {
    Taro.reLaunch({ url: '/pages/login/index' })
  }
}
