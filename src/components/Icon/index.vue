<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'icon-park',
  },
  size: {
    type: String,
    default: '14',
  },
  color: {
    type: String,
    default: '#333',
  },
  theme: {
    type: String,
    default: 'outline',
  },
  strokeWidth: {
    type: Number,
    default: 3,
  },
  name: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: 'icon',
  },
})
</script>

<template>
  <div class="icon-comp">
    <i
      v-if="name.indexOf('el-icon') !== -1"
      :class="name"
      :style="{ color, 'font-size': size + 'px' }"
    />
    <component
      :is="name"
      v-if="type === 'icon-park'"
      :theme="theme"
      :size="size"
      :stroke-width="strokeWidth"
      :fill="color"
      class="icon"
    />
    <el-icon
      v-if="type === 'el-icon'"
      :style="{ color, 'font-size': size + 'px' }"
    >
      <component :is="name" />
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  padding: 0 4px;
  visibility: initial !important;
}
</style>
