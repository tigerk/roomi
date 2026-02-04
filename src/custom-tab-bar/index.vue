<template>
  <view class="tabbar">
    <view class="tabbar-inner">
      <view
        v-for="item in tabs"
        :key="item.pagePath"
        class="tab-item"
        :class="{ 'tab-item--active': currentIndex === item.index }"
        @click="handleSwitch(item)"
      >
        <image
          class="tab-icon"
          :src="currentIndex === item.index ? item.activeIcon : item.icon"
          mode="aspectFit"
        />
        <text class="tab-text">{{ item.text }}</text>
      </view>
    </view>
    <view class="tabbar-safe"/>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import {ref, onMounted, onUnmounted} from 'vue'
import {getTabbarIndex} from '@/utils/tabbar'

interface TabItem {
  index: number
  pagePath: string
  text: string
  icon: string
  activeIcon: string
}

const tabs: TabItem[] = [
  {
    index: 0,
    pagePath: '/pages/home/index',
    text: '工作台',
    icon: '/assets/tabbar/home.png',
    activeIcon: '/assets/tabbar/home-active.png'
  },
  {
    index: 1,
    pagePath: '/pages/room/index',
    text: '房源',
    icon: '/assets/tabbar/room.png',
    activeIcon: '/assets/tabbar/room-active.png'
  },
  {
    index: 2,
    pagePath: '/pages/contract/index',
    text: '合同',
    icon: '/assets/tabbar/contract.png',
    activeIcon: '/assets/tabbar/contract-active.png'
  },
  {
    index: 3,
    pagePath: '/pages/approval/index',
    text: '审批',
    icon: '/assets/tabbar/approval.png',
    activeIcon: '/assets/tabbar/approval-active.png'
  },
  {
    index: 4,
    pagePath: '/pages/profile/index',
    text: '我的',
    icon: '/assets/tabbar/profile.png',
    activeIcon: '/assets/tabbar/profile-active.png'
  }
]

// 当前选中的 index - 初始化时根据当前路由设置
const currentIndex = ref(0)

// 初始化时根据当前页面路由设置选中状态
function initSelectedIndex() {
  const pages = Taro.getCurrentPages()
  const currentPage = pages[pages.length - 1]
  if (currentPage?.route) {
    currentIndex.value = getTabbarIndex(currentPage.route)
  }
}

// 监听 tabbar 变化事件
function onTabbarChange(data: { index: number }) {
  currentIndex.value = data.index
}

onMounted(() => {
  initSelectedIndex()
  Taro.eventCenter.on('tabbar:change', onTabbarChange)
})

onUnmounted(() => {
  Taro.eventCenter.off('tabbar:change', onTabbarChange)
})

// 切换 Tab
function handleSwitch(item: TabItem) {
  if (currentIndex.value === item.index) return

  // 先更新选中状态，避免视觉延迟
  currentIndex.value = item.index

  // 触发事件通知其他页面的 tabbar
  Taro.eventCenter.trigger('tabbar:change', {index: item.index})

  Taro.switchTab({
    url: item.pagePath
  })
}

// 暴露方法供页面调用更新选中状态
defineExpose({
  setSelected: (index: number) => {
    currentIndex.value = index
  }
})
</script>

<style>
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  box-shadow: 0 -4px 12px rgba(15, 23, 42, 0.08);
  z-index: 9999;
}

.tabbar-inner {
  display: flex;
  height: 120rpx;
  padding: 10rpx 16rpx 6rpx;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
  /* 防止点击时的布局抖动 */
  min-width: 0;
}

.tab-item:active {
  opacity: 0.7;
}

.tab-icon {
  width: 48rpx;
  height: 48rpx;
  /* 固定图标尺寸，防止切换时抖动 */
  flex-shrink: 0;
}

.tab-text {
  font-size: 24rpx;
  color: #8a8f99;
  line-height: 1.2;
  /* 防止文字宽度变化导致抖动 */
  white-space: nowrap;
}

.tab-item--active .tab-text {
  color: #3478f6;
  font-weight: 600;
}

.tabbar-safe {
  height: env(safe-area-inset-bottom);
}
</style>
