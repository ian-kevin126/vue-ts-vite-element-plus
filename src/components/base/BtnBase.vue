<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BtnBase',
})
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const defaultState = {
  search: {
    icon: 'el-icon-search',
    text: 'search',
    type: 'primary',
  },
  create: {
    icon: 'el-icon-plus',
    text: 'create',
    type: 'primary',
  },
  save: {
    icon: 'el-icon-check',
    text: '保存',
    type: 'success',
  },
  close: {
    icon: 'el-icon-close',
    text: '关闭',
    type: 'danger',
  },
  delete: {
    icon: 'el-icon-delete',
    text: '删除',
    type: 'danger',
    plain: true,
  },
  reset: {
    icon: 'el-icon-refresh-left',
    text: '重置',
    type: 'primary',
  },
  export: {
    icon: 'el-icon-takeaway-box',
    text: '导出',
    type: 'success',
  },
}

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'search',
  },
})
const { t } = useI18n()

const getName = computed(() => {
  return props.name || defaultState[props.type].text
})

const getPlain = computed(() => {
  return defaultState[props.type].plain
})

const getType = computed(() => {
  return defaultState[props.type].type
})

const getIcon = computed(() => {
  return defaultState[props.type].icon
})
</script>

<template>
  <el-button :type="getType" :icon="getIcon" :plain="getPlain">
    {{ t('btn.' + getName) }}
  </el-button>
</template>
