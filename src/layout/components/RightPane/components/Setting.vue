<script setup lang="ts">
import { useStore } from '@/store'
import { SettingActionTypes } from '@/store/modules/setting/action-types'

defineProps({
  color: {
    type: String,
    required: true,
  },
})
const store = useStore()

const showSetting = () => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'setting',
    val: true,
  })
}
</script>

<template>
  <el-link>
    <icon-setting
      class="setting"
      title="setting"
      theme="outline"
      size="16"
      :stroke-width="4"
      :fill="color"
      @click="showSetting"
    />
  </el-link>
</template>
