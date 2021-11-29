<script setup lang="ts">
import Profile from './components/Profile.vue'
import Notice from './components/Notice.vue'
import Translate from './components/Translate.vue'
import Refresh from './components/Refresh.vue'
import Setting from './components/Setting.vue'

import SettingPane from '@/layout/setting/index.vue'
import ScreenFull from '@/components/ScreenFull/index.vue'

defineProps({
  color: {
    type: String,
    default: '#666',
  },
})
</script>

<template>
  <div class="right-pane">
    <div class="item">
      <Notice :color="color" />
    </div>

    <div class="item">
      <ScreenFull />
    </div>

    <div class="item">
      <Translate :color="color" />
    </div>

    <div class="item">
      <Setting :color="color" />
    </div>

    <div class="item">
      <Refresh :color="color" />
    </div>

    <div class="item">
      <Profile />
    </div>
    <SettingPane />
  </div>
</template>

<style lang="scss">
.right-pane {
  display: flex;
  line-height: $base-head-menu-height;
  .item {
    margin-left: 15px;
    cursor: pointer;
  }
}
.message-box {
  width: 300px;
  padding: 5px 15px;
  .el-tabs__content {
    margin-bottom: 10px;
  }
  :deep(.el-tabs__active-bar) {
    width: 80px !important;
  }
}
</style>
