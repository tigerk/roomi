import { request } from '../services/http'

export type Pagination<T> = {
  list: T[]
  total: number
  pageSize: number
  currentPage: number
}

export type TenantItem = {
  id: number
  tenantName?: string
  phone?: string
  roomName?: string
  status?: number
}

export type BookingItem = {
  id: number
  tenantName?: string
  phone?: string
  status?: number
  roomName?: string
}

export function getTenantList(data: Record<string, any>) {
  return request<Pagination<TenantItem>>({ url: 'contract/tenant/list', data })
}

export function getBookingList(data: Record<string, any>) {
  return request<Pagination<BookingItem>>({ url: 'contract/booking/list', data })
}
