<template>
  <view class="container">
    <nut-tabs v-model="activeTab">
      <nut-tab-pane title="租客" pane-key="tenant">
        <view class="card" v-for="item in tenants" :key="item.id">
          <view class="row">
            <view class="title">{{ item.tenantName || '租客' }}</view>
            <view class="status">{{ formatStatus(item.status) }}</view>
          </view>
          <view class="meta">房间：{{ item.roomName || '-' }}</view>
          <view class="meta">电话：{{ item.phone || '-' }}</view>
        </view>
        <view v-if="tenants.length === 0" class="empty">暂无租客</view>
      </nut-tab-pane>

      <nut-tab-pane title="预定" pane-key="booking">
        <view class="card" v-for="item in bookings" :key="item.id">
          <view class="row">
            <view class="title">{{ item.tenantName || '预定客户' }}</view>
            <view class="status">{{ formatStatus(item.status) }}</view>
          </view>
          <view class="meta">房间：{{ item.roomName || '-' }}</view>
          <view class="meta">电话：{{ item.phone || '-' }}</view>
        </view>
        <view v-if="bookings.length === 0" class="empty">暂无预定</view>
      </nut-tab-pane>
    </nut-tabs>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDidShow } from '@tarojs/taro'
import { syncTabbarByRoute } from '@/utils/tabbar'
import { getBookingList, getTenantList, BookingItem, TenantItem } from '@/api/contract'
import { ensureLoggedIn } from '@/services/auth'

const activeTab = ref('tenant')
const tenants = ref<TenantItem[]>([])
const bookings = ref<BookingItem[]>([])

useDidShow(async () => {
  syncTabbarByRoute()
  ensureLoggedIn()
  await loadTenants()
  await loadBookings()
})

async function loadTenants() {
  const res = await getTenantList({ currentPage: 1, pageSize: 20 })
  if (res.code === 0) {
    tenants.value = res.data?.list || []
  }
}

async function loadBookings() {
  const res = await getBookingList({ currentPage: 1, pageSize: 20 })
  if (res.code === 0) {
    bookings.value = res.data?.list || []
  }
}

function formatStatus(status?: number) {
  if (status === 1) return '进行中'
  if (status === 2) return '已完成'
  if (status === 3) return '已取消'
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
