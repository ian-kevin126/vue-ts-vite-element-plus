<script setup lang="ts">
import { useStore } from '@/store/index'
import { AppActionTypes } from '@/store/modules/app/action-types'
import { computed } from 'vue'
import { settingConfig } from '@/config/setting'

import logPng from '@/assets/logo.png'
const store = useStore()

const toggle = () => {
  store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, false)
}

const isOpen = computed(() => {
  return store.state.app.sidebar.open
})
</script>

<template>
  <div class="logo" @click="toggle">
    <el-image class="logo-image" :src="logPng" fit="contain" />
    <span v-if="isOpen" class="logo-text">{{ settingConfig.title }}</span>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $base-logo-height;

  &-image {
    width: 30px;
    height: 30px;
    padding: 5px;
  }
  &-text {
    font-size: 18px;
  }
}
</style>
