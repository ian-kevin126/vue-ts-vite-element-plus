<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { MyFormExpose } from '@/components/base/FormBase.vue'
import FormBase from '@/components/base/FormBase.vue'
import { ISelectItem } from '@/types'
import useElement from '@/utils/useElement'

const visibleDialog = ref(false)
const title = '新增角色'
const { error } = useElement()
const formRef = ref<InstanceType<typeof FormBase> & MyFormExpose>()
const formState = () => ({
  name: '',
  remarks: '',
  auditRole: '', // 角色名字
  singleGroupAuditRole: '', //  角色id
  showCustomerInfo: true,
  isEnable: true,
})
const state = reactive({
  form: formState(),
  loading: false,
  rules: {
    name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
    auditRole: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
  },
})

const changeRole = (val: ISelectItem) => {
  state.form.singleGroupAuditRole = val.value
}

const show = () => {
  visibleDialog.value = true
}

const hide = () => {
  visibleDialog.value = false
  state.form = formState()
}

const edit = (row: any) => {
  show()
  state.form = { ...row }
}

const saveOrUpdate = () => {
  hide()
}

const handleConfirm = async () => {
  const valid = await formRef.value?.validate()

  if (!valid) {
    error()
    return
  }
  saveOrUpdate()
}

defineExpose({
  show,
  edit,
})
</script>

<template>
  <DialogBase
    :title="title"
    :visible="visibleDialog"
    @update:visible="visibleDialog = $event"
    @update:confirm="handleConfirm"
  >
    <FormBase
      ref="formRef"
      :form="state.form"
      :rules="state.rules"
      label-width="160px"
    >
      <FormItemBase prop="name" label="角色名称">
        <InputBase v-model:value="state.form.name" />
      </FormItemBase>

      <FormItemBase prop="auditRole" label="审核角色">
        <SelectBase
          v-model:value="state.form.auditRole"
          type="auditRole"
          @on:select="changeRole"
        />
      </FormItemBase>

      <FormItemBase label="备注">
        <InputBase
          v-model:value="state.form.remarks"
          :rows="4"
          type="textarea"
        />
      </FormItemBase>

      <FormItemBase label="启用状态">
        <SwitchBase v-model:value="state.form.isEnable" />
      </FormItemBase>
    </FormBase>
  </DialogBase>
</template>
