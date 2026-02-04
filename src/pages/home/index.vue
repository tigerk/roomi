<template>
  <view class="container">
    <view class="card hero">
      <view class="title">欢迎回来</view>
      <view class="subtitle">{{ nickname || '管理员' }}</view>
    </view>

    <view class="card">
      <view class="section-title">待办概览</view>
      <view class="stat-row">
        <view class="stat">
          <view class="stat-value">{{ todoCount }}</view>
          <view class="stat-label">我的待办</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDidShow } from '@tarojs/taro'
import { getTodoCount } from '@/api/approval'
import { ensureLoggedIn } from '@/services/auth'
import { getUser } from '@/services/storage'

const todoCount = ref(0)
const nickname = ref('')

useDidShow(async () => {
  ensureLoggedIn()
  const user = getUser()
  nickname.value = user?.nickname || user?.username || ''
  const res = await getTodoCount()
  if (res.code === 0) {
    todoCount.value = res.data || 0
  }
})
</script>

<style scoped>
.hero {
  display: grid;
  gap: 8rpx;
}

.title {
  font-size: 34rpx;
  font-weight: 700;
}

.subtitle {
  color: #6b7280;
}

.stat-row {
  display: flex;
  gap: 24rpx;
}

.stat {
  flex: 1;
  background: #f3f6ff;
  border-radius: 12rpx;
  padding: 16rpx;
}

.stat-value {
  font-size: 32rpx;
  font-weight: 700;
}

.stat-label {
  color: #6b7280;
  font-size: 24rpx;
}
</style>
