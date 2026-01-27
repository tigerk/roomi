<template>
  <view class="index">
    <nut-button type="primary" @click="onClick">按钮</nut-button>
  </view>
</template>

<script setup>
import Taro from '@tarojs/taro'
const onClick = () => {
  Taro.showToast({
    title: '你成功了',
    icon: 'none',
    duration: 2000
  })
}
</script>
