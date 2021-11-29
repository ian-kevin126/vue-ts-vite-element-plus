<script setup lang="ts">
import { computed } from 'vue'
import Boardcrumb from '../components/Breadcrumb/index.vue'
import RightPane from '../components/RightPane/index.vue'
import { useStore } from '@/store'
import { AppActionTypes } from '@/store/modules/app/action-types'

const store = useStore()

const isHorizonal = computed(() => {
  return store.state.setting.menuMode === 'horizontal'
})

const toggleSidebar = () => {
  store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, true)
}
</script>

<template>
  <div v-if="!isHorizonal" class="header-container">
    <div class="left">
      <el-link class="menu-icon" @click="toggleSidebar">
        <icon-menu-fold class="icon" size="16" />
      </el-link>
      <Boardcrumb />
    </div>

    <RightPane />
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  border-bottom: $base-border-width-mini solid #eaebf3;
  height: $base-head-menu-height;
  padding: 0 $base-padding;

  .left {
    display: flex;
    align-items: center;
    .menu-icon {
      margin-right: 20px;
    }
  }
}
</style>
