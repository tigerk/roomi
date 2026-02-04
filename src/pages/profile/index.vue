<template>
  <view class="container">
    <view class="card profile">
      <view class="avatar">{{ initials }}</view>
      <view>
        <view class="name">{{ user?.nickname || user?.username || '用户' }}</view>
        <view class="meta">当前公司：{{ user?.curCompanyId || '-' }}</view>
      </view>
    </view>

    <view class="card">
      <nut-button type="danger" block @click="handleLogout">退出登录</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro, { useDidShow } from '@tarojs/taro'
import { computed, ref } from 'vue'
import { ensureLoggedIn } from '../../services/auth'
import { clearToken, clearUser, getUser, UserInfo } from '../../services/storage'

const user = ref<UserInfo | null>(null)

useDidShow(() => {
  ensureLoggedIn()
  user.value = getUser()
})

const initials = computed(() => {
  const name = user.value?.nickname || user.value?.username || ''
  return name ? name.slice(0, 1).toUpperCase() : 'U'
})

function handleLogout() {
  clearToken()
  clearUser()
  Taro.reLaunch({ url: '/pages/login/index' })
}
</script>

<style scoped>
.profile {
  display: flex;
  gap: 16rpx;
  align-items: center;
}

.avatar {
  width: 88rpx;
  height: 88rpx;
  border-radius: 44rpx;
  background: #1f6feb;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  font-weight: 700;
}

.name {
  font-size: 30rpx;
  font-weight: 600;
}

.meta {
  color: #6b7280;
  font-size: 24rpx;
  margin-top: 4rpx;
}
</style>
