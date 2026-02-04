<template>
  <view class="tabbar">
    <view class="tabbar-inner">
      <view
        v-for="item in tabs"
        :key="item.pagePath"
        class="tab-item"
        :class="{ 'tab-item--active': item.pagePath === current }"
        @click="handleSwitch(item.pagePath)"
      >
        <image
          class="tab-icon"
          :src="item.pagePath === current ? item.activeIcon : item.icon"
          mode="aspectFit"
        />
        <text class="tab-text">{{ item.text }}</text>
      </view>
    </view>
    <view class="tabbar-safe" />
  </view>
</template>

<script setup lang="ts">
import Taro, {useDidShow} from '@tarojs/taro'
import {ref} from 'vue'

const tabs = [
  { pagePath: 'pages/home/index', text: '工作台', icon: '/assets/tabbar/home.png', activeIcon: '/assets/tabbar/home-active.png' },
  { pagePath: 'pages/room/index', text: '房源', icon: '/assets/tabbar/room.png', activeIcon: '/assets/tabbar/room-active.png' },
  { pagePath: 'pages/contract/index', text: '合同', icon: '/assets/tabbar/contract.png', activeIcon: '/assets/tabbar/contract-active.png' },
  { pagePath: 'pages/approval/index', text: '审批', icon: '/assets/tabbar/approval.png', activeIcon: '/assets/tabbar/approval-active.png' },
  { pagePath: 'pages/profile/index', text: '我的', icon: '/assets/tabbar/profile.png', activeIcon: '/assets/tabbar/profile-active.png' }
]

const current = ref('pages/home/index')

useDidShow(() => {
  const pages = Taro.getCurrentPages()
  current.value = pages[pages.length - 1]?.route || ''
})

function handleSwitch(path: string) {
  if (path === current.value) return
  Taro.switchTab({ url: `/${path}` })
}
</script>

<style scoped>
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  box-shadow: 0 -8rpx 24rpx rgba(15, 23, 42, 0.08);
  z-index: 999;
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
}

.tab-icon {
  width: 44rpx;
  height: 44rpx;
}

.tab-text {
  font-size: 26rpx;
  color: #8a8f99;
}

.tab-item--active .tab-text {
  color: #3478f6;
  font-weight: 600;
}

.tabbar-safe {
  height: env(safe-area-inset-bottom);
}
</style>
