<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'FormBase',
})
</script>

<script setup lang="ts">
import { ElForm } from 'element-plus'

type ELEForm = InstanceType<typeof ElForm>

export interface MyFormExpose {
  validate: ELEForm['validate']
}

const props = defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },

  rules: {
    type: Object,
    default: () => ({}),
  },
})

const validateForm = ref<ELEForm>()
const validate = (callback: Function) => validateForm?.value?.validate(callback)

defineExpose({
  validate,
})
</script>

<template>
  <el-form
    ref="validateForm"
    :model="props.form"
    :rules="props.rules"
    class="form-wrapper"
  >
    <slot />
  </el-form>
</template>
