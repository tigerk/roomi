import { request } from '@/services/http'

export type UserLoginVO = {
  id: number
  avatar: string
  username: string
  nickname: string
  roles: string[]
  permissions: string[]
  accessToken: string
  refreshToken: string
  expires: number
  curCompanyId: number
  companyList: Array<any>
}

export function wechatLogin(code: string) {
  return request<UserLoginVO>({ url: 'wechat/login', data: { code } })
}

export function wechatBind(code: string, username: string, password: string) {
  return request<UserLoginVO>({ url: 'wechat/bind', data: { code, username, password } })
}

export function passwordLogin(username: string, password: string) {
  return request<UserLoginVO>({ url: 'login', data: { username, password } })
}

export function smsLogin(phone: string, verifyCode: string) {
  return request<UserLoginVO>({ url: 'login/sms', data: { phone, verifyCode } })
}

export function sendSmsCode(phone: string, captcha: string) {
  return request<boolean>({ url: `login/sms/send?phone=${phone}&captcha=${captcha}`, method: 'POST', data: {} })
}

export function resetPassword(phone: string, verifyCode: string, password: string) {
  return request<boolean>({ url: 'login/update', data: { phone, verifyCode, password } })
}

export function getCurrentUser() {
  return request<UserLoginVO>({ url: 'login/current', method: 'POST', data: {} })
}
