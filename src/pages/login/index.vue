<template>
  <view class="login-page">
    <!-- 顶部装饰背景 -->
    <view class="top-bg">
      <view class="bg-circle bg-circle--1"/>
      <view class="bg-circle bg-circle--2"/>
    </view>

    <!-- Logo + 标题 -->
    <view class="header">
      <view class="logo-box">
        <view class="logo-placeholder">
          <!-- Logo 占位符，后续替换为 <image src="..." class="logo-img" /> -->
          <view class="logo-diamond"/>
        </view>
      </view>
      <text class="headline">欢迎使用测试系统</text>
      <text class="sub-headline">安全登录，开始使用</text>
    </view>

    <!-- 表单卡片 -->
    <view class="form-card">
      <!-- 手机号 -->
      <view class="input-wrap" :class="{ 'input-wrap--focus': focusField === 'phone' }">
        <image class="input-icon" src="@/assets/icons/icon-phone.png" mode="aspectFit"/>
        <input
          class="input-el"
          v-model="form.username"
          type="number"
          placeholder="请输入手机号"
          placeholder-class="input-placeholder"
          maxlength="11"
          @focus="focusField = 'phone'"
          @blur="focusField = ''"
        />
      </view>

      <!-- 密码模式 -->
      <view
        v-if="mode === 'password'"
        class="input-wrap"
        :class="{ 'input-wrap--focus': focusField === 'pwd' }"
      >
        <image class="input-icon" src="@/assets/icons/icon-lock.png" mode="aspectFit"/>
        <input
          class="input-el"
          v-model="form.password"
          :password="!showPwd"
          placeholder="请输入密码"
          placeholder-class="input-placeholder"
          @focus="focusField = 'pwd'"
          @blur="focusField = ''"
        />
        <view class="pwd-toggle" @click="showPwd = !showPwd">
          <image
            class="pwd-toggle-icon"
            :src="showPwd
              ? require('@/assets/icons/icon-eye-open.png')
              : require('@/assets/icons/icon-eye-close.png')"
            mode="aspectFit"
          />
        </view>
      </view>

      <!-- 验证码模式 -->
      <view
        v-else
        class="input-wrap"
        :class="{ 'input-wrap--focus': focusField === 'code' }"
      >
        <image class="input-icon" src="@/assets/icons/icon-shield.png" mode="aspectFit"/>
        <input
          class="input-el"
          v-model="form.verifyCode"
          type="number"
          placeholder="请输入验证码"
          placeholder-class="input-placeholder"
          maxlength="6"
          @focus="focusField = 'code'"
          @blur="focusField = ''"
        />
        <view class="code-divider"/>
        <view
          class="code-btn"
          :class="{ 'code-btn--disabled': codeCountdown > 0 }"
          @click="handleSendCode"
        >
          <text class="code-btn-text">
            {{ codeCountdown > 0 ? `${codeCountdown}s` : '获取验证码' }}
          </text>
        </view>
      </view>

      <!-- 切换 & 忘记密码 -->
      <view class="form-links">
        <view class="link-item" @click="toggleMode">
          <text class="link-arrow">⇄</text>
          <text class="link-text">{{ mode === 'password' ? '验证码登录' : '密码登录' }}</text>
        </view>
        <view class="link-item" @click="showReset = true">
          <text class="link-text">忘记/设置密码?</text>
        </view>
      </view>

      <!-- 登录按钮 -->
      <view class="login-btn" :class="{ 'login-btn--loading': loading }" @click="handleLogin">
        <text class="login-btn-text">
          {{ loading ? '登录中...' : (mode === 'password' ? '密码登录' : '验证码登录') }}
        </text>
      </view>

      <!-- 协议 -->
      <view class="agree-row" @click="agree = !agree">
        <view class="checkbox" :class="{ 'checkbox--checked': agree }">
          <text v-if="agree" class="checkbox-tick">✓</text>
        </view>
        <text class="agree-text">我已阅读并同意</text>
        <text class="agree-link" @click.stop>《测试系统平台服务协议》</text>
      </view>
    </view>

    <!-- 其他登录方式 -->
    <view class="other-section">
      <view class="divider">
        <view class="divider-line"/>
        <text class="divider-text">其他方式快捷登录</text>
        <view class="divider-line"/>
      </view>

      <view class="quick-list">
        <view class="quick-item" @click="handleWechatLogin">
          <view class="quick-icon-box">
            <image class="quick-icon-img" src="@/assets/icons/icon-wechat.png" mode="aspectFit"/>
          </view>
          <text class="quick-label">微信授权登录</text>
        </view>
      </view>
    </view>

    <!-- 底部 -->
    <view class="footer">
      <text class="footer-warn">⚠</text>
      <text class="footer-text">© 2025 TestSystem. All rights reserved.</text>
    </view>

    <!-- ========== 重置密码弹窗 ========== -->
    <view v-if="showReset" class="mask" @click.self="showReset = false">
      <view class="sheet" @click.stop>
        <view class="sheet-bar"/>
        <view class="sheet-header">
          <text class="sheet-title">重置密码</text>
          <view class="sheet-close" @click="showReset = false">
            <text class="sheet-close-x">✕</text>
          </view>
        </view>

        <view class="input-wrap" :class="{ 'input-wrap--focus': focusField === 'r-phone' }">
          <image class="input-icon" src="@/assets/icons/icon-phone.png" mode="aspectFit"/>
          <input
            class="input-el"
            v-model="resetForm.phone"
            type="number"
            placeholder="请输入手机号"
            placeholder-class="input-placeholder"
            maxlength="11"
            @focus="focusField = 'r-phone'"
            @blur="focusField = ''"
          />
        </view>

        <view class="input-wrap" :class="{ 'input-wrap--focus': focusField === 'r-code' }">
          <image class="input-icon" src="@/assets/icons/icon-shield.png" mode="aspectFit"/>
          <input
            class="input-el"
            v-model="resetForm.verifyCode"
            type="number"
            placeholder="请输入验证码"
            placeholder-class="input-placeholder"
            maxlength="6"
            @focus="focusField = 'r-code'"
            @blur="focusField = ''"
          />
          <view class="code-divider"/>
          <view
            class="code-btn"
            :class="{ 'code-btn--disabled': resetCountdown > 0 }"
            @click="handleSendResetCode"
          >
            <text class="code-btn-text">
              {{ resetCountdown > 0 ? `${resetCountdown}s` : '获取验证码' }}
            </text>
          </view>
        </view>

        <view class="input-wrap" :class="{ 'input-wrap--focus': focusField === 'r-pwd' }">
          <image class="input-icon" src="@/assets/icons/icon-lock.png" mode="aspectFit"/>
          <input
            class="input-el"
            v-model="resetForm.password"
            password
            placeholder="请输入新密码"
            placeholder-class="input-placeholder"
            @focus="focusField = 'r-pwd'"
            @blur="focusField = ''"
          />
        </view>

        <view class="sheet-actions">
          <view class="sheet-btn sheet-btn--cancel" @click="showReset = false">
            <text class="sheet-btn-text--cancel">取消</text>
          </view>
          <view
            class="sheet-btn sheet-btn--confirm"
            :class="{ 'sheet-btn--loading': resetLoading }"
            @click="handleResetPassword"
          >
            <text class="sheet-btn-text--confirm">
              {{ resetLoading ? '重置中...' : '确认重置' }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import {reactive, ref, onUnmounted} from 'vue'
import {passwordLogin, sendSmsCode, smsLogin, resetPassword, wechatLogin} from '@/api/auth'
import {getToken, setToken, setUser} from '@/services/storage'

const loading = ref(false)
const agree = ref(true)
const mode = ref<'password' | 'sms'>('password')
const showPwd = ref(false)
const focusField = ref('')
const codeCountdown = ref(0)
const resetCountdown = ref(0)
const showReset = ref(false)
const resetLoading = ref(false)

const form = reactive({username: '', password: '', verifyCode: ''})
const resetForm = reactive({phone: '', verifyCode: '', password: ''})

let codeTimer: ReturnType<typeof setInterval> | null = null
let resetTimer: ReturnType<typeof setInterval> | null = null

if (getToken()) {
  Taro.reLaunch({url: '/pages/home/index'})
}

function toggleMode() {
  mode.value = mode.value === 'password' ? 'sms' : 'password'
}

function startCountdown(type: 'code' | 'reset') {
  if (type === 'code') {
    if (codeTimer) clearInterval(codeTimer)
    codeCountdown.value = 60
    codeTimer = setInterval(() => {
      codeCountdown.value -= 1
      if (codeCountdown.value <= 0) {
        codeCountdown.value = 0
        if (codeTimer) {
          clearInterval(codeTimer);
          codeTimer = null
        }
      }
    }, 1000)
  } else {
    if (resetTimer) clearInterval(resetTimer)
    resetCountdown.value = 60
    resetTimer = setInterval(() => {
      resetCountdown.value -= 1
      if (resetCountdown.value <= 0) {
        resetCountdown.value = 0
        if (resetTimer) {
          clearInterval(resetTimer);
          resetTimer = null
        }
      }
    }, 1000)
  }
}

async function handleSendCode() {
  if (codeCountdown.value > 0) return
  if (!form.username) {
    Taro.showToast({title: '请输入手机号', icon: 'none'});
    return
  }
  try {
    const res = await sendSmsCode(form.username)
    if (res.code === 0) {
      startCountdown('code')
      Taro.showToast({title: '验证码已发送', icon: 'success'});
      return
    }
    Taro.showToast({title: res.message || '发送失败', icon: 'none'})
  } catch {
    Taro.showToast({title: '发送失败', icon: 'none'})
  }
}

async function handleLogin() {
  if (loading.value) return
  if (!agree.value) {
    Taro.showToast({title: '请先同意服务协议', icon: 'none'});
    return
  }
  if (!form.username) {
    Taro.showToast({title: '请输入手机号', icon: 'none'});
    return
  }
  if (mode.value === 'password' && !form.password) {
    Taro.showToast({title: '请输入密码', icon: 'none'});
    return
  }
  if (mode.value === 'sms' && !form.verifyCode) {
    Taro.showToast({title: '请输入验证码', icon: 'none'});
    return
  }

  try {
    loading.value = true
    const res = mode.value === 'password'
      ? await passwordLogin(form.username, form.password)
      : await smsLogin(form.username, form.verifyCode)
    if (res.code === 0) {
      setToken(res.data.accessToken);
      setUser(res.data)
      Taro.reLaunch({url: '/pages/home/index'});
      return
    }
    Taro.showToast({title: res.message || '登录失败', icon: 'none'})
  } catch {
    Taro.showToast({title: '登录失败', icon: 'none'})
  } finally {
    loading.value = false
  }
}

async function handleWechatLogin() {
  if (!agree.value) {
    Taro.showToast({title: '请先同意服务协议', icon: 'none'});
    return
  }
  try {
    loading.value = true
    const {code} = await Taro.login()
    const res = await wechatLogin(code)
    if (res.code === 0) {
      setToken(res.data.accessToken);
      setUser(res.data)
      Taro.reLaunch({url: '/pages/home/index'});
      return
    }
    Taro.showToast({title: res.message || '登录失败', icon: 'none'})
  } catch {
    Taro.showToast({title: '登录失败', icon: 'none'})
  } finally {
    loading.value = false
  }
}

async function handleSendResetCode() {
  if (resetCountdown.value > 0) return
  if (!resetForm.phone) {
    Taro.showToast({title: '请输入手机号', icon: 'none'});
    return
  }
  try {
    const res = await sendSmsCode(resetForm.phone)
    if (res.code === 0) {
      startCountdown('reset')
      Taro.showToast({title: '验证码已发送', icon: 'success'});
      return
    }
    Taro.showToast({title: res.message || '发送失败', icon: 'none'})
  } catch {
    Taro.showToast({title: '发送失败', icon: 'none'})
  }
}

async function handleResetPassword() {
  if (resetLoading.value) return
  if (!resetForm.phone || !resetForm.verifyCode || !resetForm.password) {
    Taro.showToast({title: '请填写完整信息', icon: 'none'});
    return
  }
  try {
    resetLoading.value = true
    const res = await resetPassword(resetForm.phone, resetForm.verifyCode, resetForm.password)
    if (res.code === 0) {
      Taro.showToast({title: '密码已重置', icon: 'success'})
      showReset.value = false;
      return
    }
    Taro.showToast({title: res.message || '重置失败', icon: 'none'})
  } catch {
    Taro.showToast({title: '重置失败', icon: 'none'})
  } finally {
    resetLoading.value = false
  }
}

onUnmounted(() => {
  if (codeTimer) clearInterval(codeTimer)
  if (resetTimer) clearInterval(resetTimer)
})
</script>

<style>
/* ===== 页面 ===== */
.login-page {
  position: relative;
  min-height: 100vh;
  background-color: #f7f8fc;
  padding: 0 48rpx;
  padding-bottom: env(safe-area-inset-bottom);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ===== 背景装饰 ===== */
.top-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 500rpx;
  overflow: hidden;
  pointer-events: none;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background-color: #3478f6;
}

.bg-circle--1 {
  width: 500rpx;
  height: 500rpx;
  top: -240rpx;
  left: -140rpx;
  opacity: 0.06;
}

.bg-circle--2 {
  width: 360rpx;
  height: 360rpx;
  top: -100rpx;
  right: -80rpx;
  opacity: 0.04;
}

/* ===== Header ===== */
.header {
  position: relative;
  z-index: 1;
  padding-top: 120rpx;
  margin-bottom: 48rpx;
}

.logo-box {
  margin-bottom: 28rpx;
}

.logo-placeholder {
  width: 108rpx;
  height: 108rpx;
  border-radius: 28rpx;
  background: linear-gradient(135deg, #3478f6, #5b9aff);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-diamond {
  width: 52rpx;
  height: 52rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.8);
  border-radius: 12rpx;
  transform: rotate(45deg);
}

.headline {
  display: block;
  font-size: 48rpx;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
}

.sub-headline {
  display: block;
  font-size: 28rpx;
  color: #9ca3af;
  margin-top: 8rpx;
}

/* ===== 表单卡片 ===== */
.form-card {
  position: relative;
  z-index: 1;
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 36rpx 32rpx;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.06);
}

/* ===== 输入框 ===== */
.input-wrap {
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  border: 2rpx solid #e5e7eb;
  border-radius: 16rpx;
  padding: 0 24rpx;
  height: 96rpx;
  margin-bottom: 24rpx;
}

.input-wrap--focus {
  border-color: #3478f6;
  background-color: #ffffff;
}

.input-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 16rpx;
  flex-shrink: 0;
}

.input-el {
  flex: 1;
  height: 96rpx;
  font-size: 30rpx;
  color: #111827;
  min-width: 0;
}

.input-placeholder {
  color: #c0c4cc;
  font-size: 30rpx;
}

.pwd-toggle {
  flex-shrink: 0;
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pwd-toggle-icon {
  width: 36rpx;
  height: 36rpx;
  opacity: 0.45;
}

.code-divider {
  width: 2rpx;
  height: 36rpx;
  background-color: #e5e7eb;
  margin: 0 16rpx;
  flex-shrink: 0;
}

.code-btn {
  flex-shrink: 0;
  padding: 8rpx 4rpx;
}

.code-btn-text {
  font-size: 24rpx;
  color: #3478f6;
  font-weight: 600;
  white-space: nowrap;
}

.code-btn--disabled .code-btn-text {
  color: #9ca3af;
  font-weight: 400;
}

/* ===== 链接行 ===== */
.form-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -8rpx;
  margin-bottom: 32rpx;
}

.link-item {
  display: flex;
  align-items: center;
}

.link-arrow {
  font-size: 24rpx;
  color: #3478f6;
  margin-right: 6rpx;
}

.link-text {
  font-size: 26rpx;
  color: #3478f6;
}

/* ===== 登录按钮 ===== */
.login-btn {
  width: 100%;
  height: 96rpx;
  border-radius: 16rpx;
  background: linear-gradient(135deg, #3478f6, #5b9aff);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24rpx;
}

.login-btn:active {
  opacity: 0.85;
}

.login-btn--loading {
  opacity: 0.7;
}

.login-btn-text {
  font-size: 32rpx;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 4rpx;
}

/* ===== 协议 ===== */
.agree-row {
  display: flex;
  align-items: center;
  padding: 4rpx 0;
}

.checkbox {
  width: 32rpx;
  height: 32rpx;
  border-radius: 6rpx;
  border: 2rpx solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12rpx;
  flex-shrink: 0;
}

.checkbox--checked {
  background-color: #3478f6;
  border-color: #3478f6;
}

.checkbox-tick {
  font-size: 20rpx;
  color: #ffffff;
  font-weight: 700;
}

.agree-text {
  font-size: 24rpx;
  color: #9ca3af;
}

.agree-link {
  font-size: 24rpx;
  color: #3478f6;
}

/* ===== 其他登录 ===== */
.other-section {
  position: relative;
  z-index: 1;
  margin-top: 56rpx;
}

.divider {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}

.divider-line {
  flex: 1;
  height: 1rpx;
  background-color: #e5e7eb;
}

.divider-text {
  font-size: 24rpx;
  color: #c0c4cc;
  padding: 0 20rpx;
  white-space: nowrap;
}

.quick-list {
  display: flex;
  justify-content: center;
}

.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quick-icon-box {
  width: 96rpx;
  height: 96rpx;
  border-radius: 48rpx;
  background-color: #f0f5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
}

.quick-icon-img {
  width: 48rpx;
  height: 48rpx;
}

.quick-label {
  font-size: 22rpx;
  color: #9ca3af;
}

/* ===== 底部 ===== */
.footer {
  position: relative;
  z-index: 1;
  margin-top: auto;
  padding: 32rpx 0 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-warn {
  font-size: 24rpx;
  margin-right: 8rpx;
}

.footer-text {
  font-size: 24rpx;
}

/* ===== 重置密码弹窗 ===== */
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 999;
  display: flex;
  align-items: flex-end;
}

.sheet {
  width: 100%;
  background-color: #ffffff;
  border-radius: 32rpx 32rpx 0 0;
  padding: 16rpx 40rpx;
  padding-bottom: calc(48rpx + env(safe-area-inset-bottom));
}

.sheet-bar {
  width: 64rpx;
  height: 8rpx;
  border-radius: 4rpx;
  background-color: #e5e7eb;
  margin: 0 auto 24rpx;
}

.sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28rpx;
}

.sheet-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #111827;
}

.sheet-close {
  width: 56rpx;
  height: 56rpx;
  border-radius: 28rpx;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sheet-close-x {
  font-size: 28rpx;
  color: #6b7280;
  line-height: 1;
}

.sheet-actions {
  display: flex;
  margin-top: 32rpx;
}

.sheet-btn {
  height: 88rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sheet-btn--cancel {
  flex: 1;
  background-color: #f3f4f6;
  margin-right: 20rpx;
}

.sheet-btn--confirm {
  flex: 2;
  background: linear-gradient(135deg, #3478f6, #5b9aff);
}

.sheet-btn--confirm:active {
  opacity: 0.85;
}

.sheet-btn--loading {
  opacity: 0.7;
}

.sheet-btn-text--cancel {
  font-size: 30rpx;
  font-weight: 600;
  color: #6b7280;
}

.sheet-btn-text--confirm {
  font-size: 30rpx;
  font-weight: 600;
  color: #ffffff;
}
</style>
