<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import Horizontal from './Horizontal/index.vue'
import Vertical from './Vertical/index.vue'

const store = useStore()

const isHorizonal = computed(() => {
  return store.state.setting.menuMode === 'horizontal'
})
</script>

<template>
  <Horizontal v-if="isHorizonal" />
  <Vertical v-else />
</template>