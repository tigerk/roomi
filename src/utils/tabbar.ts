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
  // 使用 nextTick 确保 tabbar 组件已挂载
  setTimeout(() => {
    Taro.eventCenter.trigger('tabbar:change', {index, route: currentRoute})
  }, 0)
}

export function getTabbarIndex(route: string) {
  return routeIndexMap[route] ?? 0
}
