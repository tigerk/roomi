<template>
  <view class="container">
    <view class="card" v-for="item in rooms" :key="item.id">
      <view class="row">
        <view class="title">{{ item.roomNo || item.name || '房间' }}</view>
        <view class="status">{{ formatStatus(item.status) }}</view>
      </view>
      <view class="meta">项目：{{ item.houseName || '-' }}</view>
      <view class="meta">租金：{{ item.rentPrice ? item.rentPrice + ' 元' : '-' }}</view>
    </view>

    <view v-if="rooms.length === 0" class="empty">暂无房源</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDidShow } from '@tarojs/taro'
import { getRoomList, RoomItem } from '../../api/room'
import { ensureLoggedIn } from '../../services/auth'

const rooms = ref<RoomItem[]>([])

useDidShow(async () => {
  ensureLoggedIn()
  const res = await getRoomList({ currentPage: 1, pageSize: 20 })
  if (res.code === 0) {
    rooms.value = res.data?.list || []
  }
})

function formatStatus(status?: number) {
  if (status === 1) return '空置'
  if (status === 2) return '已租'
  if (status === 3) return '锁定'
  return '未知'
}
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8rpx;
}

.title {
  font-size: 30rpx;
  font-weight: 600;
}

.status {
  font-size: 24rpx;
  color: #1f6feb;
}

.meta {
  color: #6b7280;
  font-size: 24rpx;
  margin-top: 4rpx;
}

.empty {
  text-align: center;
  color: #9aa2ad;
  margin-top: 120rpx;
}
</style>
