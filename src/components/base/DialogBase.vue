<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'DialogBase',
})
</script>

<script setup lang="ts">
const emit = defineEmits(['update:visible', 'update:confirm'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '新增',
  },
  width: {
    type: String,
    default: '860px',
  },
  hasFoot: {
    type: Boolean,
    default: true,
  },
  btnCancelText: {
    type: String,
    default: '取消',
  },
  btnConfirmText: {
    type: String,
    default: '确定',
  },
})

const visibleVal = ref(props.visible)

const handleClose = () => {
  emit('update:visible', false)
}

const handleConfirm = () => {
  handleClose()
  emit('update:confirm', props.visible)
}
</script>

<template>
  <el-dialog
    v-model="visibleVal"
    :title="title"
    :width="width"
    :before-close="handleClose"
  >
    <slot />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{ props.btnCancelText }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{
          props.btnConfirmText
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
