<script setup lang="ts">
import { useStore } from '@/store/index';
import { SettingActionTypes } from '@/store/modules/setting/action-types'

defineProps({
  color: {
    type: String,
    required: true,
  }
})
const store = useStore

const handleRefresh = () => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'refresh',
    val: '',
  })
}
</script>

<template>
  <el-link>
    <icon-refresh
      class="refresh"
      title="refresh"
      theme="outline"
      size="16"
      :stroke-width="4"
      :fill="color"
      @click="handleRefresh"
    />
  </el-link>
</template>