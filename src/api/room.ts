import { request } from '../services/http'

export type Pagination<T> = {
  list: T[]
  total: number
  pageSize: number
  currentPage: number
}

export type RoomItem = {
  id: number
  name?: string
  roomNo?: string
  status?: number
  houseName?: string
  rentPrice?: number
}

export function getRoomList(data: Record<string, any>) {
  return request<Pagination<RoomItem>>({ url: 'room/list', data })
}
