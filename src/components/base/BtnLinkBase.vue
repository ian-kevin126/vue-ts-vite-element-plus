<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'BtnLinkBase',
})
</script>

<script setup lang="ts">
import { useStore } from '@/store/index'

defineProps({
  name: {
    type: String,
    default: 'Link',
  },
  type: {
    type: String,
    default: 'primary',
  },
})

const store = useStore()

const sizeMaps = {
  mini: '12px',
  small: '14px',
  medium: '16px',
}

const getSize = computed(() => {
  return store.state.app.size
})

const getFontSize = computed(() => {
  return sizeMaps[getSize.value]
})
</script>

<template>
  <el-link :type="type" :style="getFontSize">
    {{ name }}
  </el-link>
</template>
