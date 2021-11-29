<script setup lang="ts">
import screenfull from 'screenfull'
import useElement from '@/utils/useElement'

defineProps({
  icon: {
    type: String,
    default: 'icon-full-screen-one',
  },
  color: {
    type: String,
    default: '#666',
  },
})

const { warning } = useElement()
const handleScreenFull = () => {
  if (!screenfull.isEnabled) {
    warning('糟糕，无法全屏！')
    return false
  } else {
    screenfull.toggle()
  }
}
</script>

<template>
  <div class="screen-full" @click="handleScreenFull">
    <el-link>
      <component
        :is="icon"
        title="fullscreen"
        theme="outline"
        size="16"
        :stroke-width="4"
      />
    </el-link>
  </div>
</template>
