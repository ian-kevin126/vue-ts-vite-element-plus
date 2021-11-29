<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { getLocale } from '@/locales'
</script>

<template>
  <el-config-provider :locale="getLocale">
    <router-view />
  </el-config-provider>
</template>

<style></style>
