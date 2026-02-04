import { request } from '../services/http'

export type Pagination<T> = {
  list: T[]
  total: number
  pageSize: number
  currentPage: number
}

export type ApprovalItem = {
  id: number
  title?: string
  bizType?: string
  status?: number
  createTime?: string
}

export function getTodoList(data: Record<string, any>) {
  return request<Pagination<ApprovalItem>>({ url: 'approval/todo/list', data })
}

export function getDoneList(data: Record<string, any>) {
  return request<Pagination<ApprovalItem>>({ url: 'approval/done/list', data })
}

export function getApplyList(data: Record<string, any>) {
  return request<Pagination<ApprovalItem>>({ url: 'approval/apply/list', data })
}

export function getTodoCount() {
  return request<number>({ url: 'approval/todo/count', data: {} })
}
