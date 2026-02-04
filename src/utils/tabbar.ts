import Taro from '@tarojs/taro'

const routeIndexMap: Record<string, number> = {
  'pages/home/index': 0,
  'pages/room/index': 1,
  'pages/contract/index': 2,
  'pages/approval/index': 3,
  'pages/profile/index': 4
}

export function syncTabbarByRoute(route?: string) {
  const pages = Taro.getCurrentPages()
  const currentRoute = route || pages[pages.length - 1]?.route || 'pages/home/index'
  const index = routeIndexMap[currentRoute] ?? 0
  Taro.eventCenter.trigger('tabbar:change', { index, route: currentRoute })
}

export function getTabbarIndex(route: string) {
  return routeIndexMap[route] ?? 0
}
