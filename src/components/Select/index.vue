<script setup lang="ts">
defineProps({
  value: {
    type: String,
    default: '',
  },
  options: {
    type: Array as any,
    required: true,
  },
})
</script>

<template>
  <el-select :model-value="value" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
