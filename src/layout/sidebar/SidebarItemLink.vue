<script setup lang="ts">
import { isExternal } from '@/utils/validate'
import { useRouter } from 'vue-router'

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
})

const router = useRouter()

const push = () => {
  const path = props.to.replace('//', '/')
  router.push(path).catch(err => {
    console.log(err)
  })
}
</script>

<template>
  <a v-if="isExternal(to)" :href="to">
    <slot />
  </a>
  <div v-else @click.prevent="push">
    <slot />
  </div>
</template>

<style scoped></style>
