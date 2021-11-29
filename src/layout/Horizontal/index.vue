<script setup lang="ts">
import VLogo from '../logo.vue'
import AppMain from '../appMain/index.vue'
import VSidebar from '../sidebar/index.vue'
import TabViews from '../tabViews/index.vue'
import RightPane from '../components/RightPane/index.vue'
import { useStore } from '@/store'
import { computed } from 'vue-demi'

const store = useStore()

const isFixHeader = computed(() => {
  return store.state.setting.fixHead
})

const isShowTab = computed(() => {
  return store.state.setting.visibleTab
})

const isShowLogo = computed(() => {
  return store.state.setting.visibleLogo
})

const getStyle = computed(() => {
  if (isFixHeader.value) {
    return isShowTab.value ? `margin-top: 120px` : `margin-top: 60px`
  }
  return 'margin-top: 0'
})
</script>

<template>
  <div class="layout is-horizonal" :class="{ 'is-fix-header': isFixHeader }">
    <el-scrollbar>
      <div class="layout-topbar">
        <VLogo v-if="isShowLogo" />
        <VSidebar />
        <RightPane />
      </div>
      <div class="layout-body">
        <TabViews v-if="isShowTab" />
        <div class="layout-main" :style="getStyle">
          <AppMain />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style lang="scss">
.layout {
  display: flex;

  // 上下布局
  &.is-horizonal {
    height: 100vh;
    flex-direction: column;
    @include scrollbar;

    &.is-fix-header {
      .layout-topbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: $base-z-index-default;
        background-color: #fff;
      }
      .tabs-bar-container {
        position: fixed;
        top: $base-head-menu-height;
        left: 0;
        right: 0;
      }
    }

    .layout-topbar {
      display: flex;
      width: 100%;
      padding: 0 100px;
      height: $base-head-menu-height;
      border-right: none;
      border-bottom: 1px solid #f6f6f6;
    }

    .layout-body {
      .tabs-bar-container {
        padding: 0 100px;
      }

      .layout-main {
        padding: 20px 100px;
        background-color: $base-content-bg-color;
      }
    }
  }
}
</style>
