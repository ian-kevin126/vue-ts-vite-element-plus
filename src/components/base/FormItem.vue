<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FormItemBase',
})
</script>

<template>
  <el-form-item>
    <slot />
  </el-form-item>
</template>
