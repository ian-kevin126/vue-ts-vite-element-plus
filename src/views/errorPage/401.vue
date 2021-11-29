<script setup lang="ts">
import errorPng from '@/assets/401.svg'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const handleBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="error-page">
    <div class="error-page-wrapper">
      <div class="error-page-content">
        <div class="title">
          {{ t('errorPages.title') }}
        </div>
        <div class="desc">
          {{ t('errorPages.401.desc') }}
        </div>
        <div class="remark">
          {{ t('errorPages.401.remark') }}
        </div>

        <el-button type="primary" @click="handleBack">
          {{ t('btn.back') }}
        </el-button>
      </div>
      <div class="error-page-image flexcenter">
        <el-image :src="errorPng" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/error-page.scss';
</style>
