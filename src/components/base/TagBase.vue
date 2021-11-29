<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'TagBase',
})
</script>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: [String, Boolean],
    default: '',
  },
  type: {
    type: String,
    default: 'enable',
  },
})

const TagStatus = {
  enable: {
    1: '启用',
    0: '关闭',
  },
}

const TagTypes = {
  enable: {
    1: 'success',
    0: 'info',
  },
}

const getTagValue = computed(() => {
  const tagObj = TagStatus[props.type]
  return tagObj[+props.name]
})

const getTagType = computed(() => {
  const tagType = TagTypes[props.type]
  return tagType[+props.name]
})
</script>

<template>
  <div class="tag-base">
    <el-tag :type="getTagType">
      {{ getTagValue }}
    </el-tag>
  </div>
</template>
