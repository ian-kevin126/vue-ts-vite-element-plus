<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BtnLinkPermission',
})
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { IPermission } from '@/types/auth'

const emit = defineEmits(['on:click'])
const props = defineProps({
  auth: {
    type: String,
    default: 'edit',
  },
  delTip: {
    type: String,
    default: '确定要删除吗?',
  },
})

const authMaps: IPermission = {
  detail: '详情',
  edit: '编辑',
  delete: '删除',
  update: '更新',
  save: '保存',
  auth: '授权',
}

const getAuthLabel = computed(() => {
  return authMaps[props.auth]
})

const isDelete = computed(() => {
  return props.auth === 'delete'
})

const handleClick = () => {
  emit('on:click')
}
</script>

<template>
  <span class="btn-link-box">
    <el-popconfirm v-if="isDelete" :title="delTip" @confirm="handleClick">
      <template #reference>
        <BtnLinkBase v-permission="auth" :name="getAuthLabel" />
      </template>
    </el-popconfirm>
    <BtnLinkBase
      v-else
      v-permission="auth"
      :name="getAuthLabel"
      @click="handleClick"
    />
  </span>
</template>

<style lang="scss" scoped>
.btn-link-box {
  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
