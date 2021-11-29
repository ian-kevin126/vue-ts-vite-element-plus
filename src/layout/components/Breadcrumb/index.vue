<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'
import { compile } from 'path-to-regexp'

const currentRoute = useRoute()
const router = useRouter()

const state = reactive({
  breadcrumbs: [] as Array<RouteLocationMatched>,
})

const isDashboard = (route: RouteLocationMatched) => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.toString().trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

const getBreadcrumb = () => {
  let matched = currentRoute.matched.filter(item => item.meta && item.meta.title)

  const frist = matched[0]
  if (!isDashboard(frist)) {
    matched = [{ path: '/dashboard', meta: { title: 'dashboard' } } as any].concat(matched)
  }
  state.breadcrumbs = matched.filter(item => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false
  })
}

const pathCompile = (path: string) => {
  const { params } = currentRoute
  const toPath = compile(path)
  return toPath(params)
}

const handleLink = (item: any) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect).catch(err => {
      console.error(err)
    })
  }

  router.push(pathCompile(path) as any).catch(err => {
    console.error(err)
  })
}

const getBreadcrumbs = computed(() => {
  return state.breadcrumbs
})

watch(
  () => currentRoute.path,
  path => {
    console.log('path:', path)
    if (path.startsWith('/redirect/')) {
      return
    }
    getBreadcrumb()
  },
  { immediate: true }
)
</script>

<template>
  <div class="bread-crumb-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in getBreadcrumbs" :key="item.path">
        <span v-if="item.redirect === 'noredirect' || index === getBreadcrumbs.length - 1">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped></style>
