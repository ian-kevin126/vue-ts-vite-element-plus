<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store/index'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'

const store = useStore()
const router = useRoute()

const routes = computed(() => {
  return store.state.permission.routes
})

const getMenuMode = computed(() => {
  return store.state.setting.menuMode
})

const theme = computed(() => {
  return store.state.setting.theme
})

const menuTextActiveColor = computed(() => {
  return theme.value
})

const sidebar = computed(() => {
  return store.state.app.sidebar
})

const isCollapse = computed(() => {
  return !sidebar.value.open
})

const defaultActive = computed(() => {
  const { fullPath } = router
  return fullPath || '/dashboard'
})

const activeMenu = computed(() => {
  const { path, meta } = router
  if (meta !== null || meta !== undefined) {
    if (meta.activeMenu) {
      return meta.activeMenu
    }
  }
  return path
})
</script>

<template>
  <el-menu
    class="sidebar-menu"
    :mode="getMenuMode"
    :active="activeMenu"
    :collapse="isCollapse"
    :default-active="defaultActive"
    :active-text-color="menuTextActiveColor"
    :collapse-transition="true"
  >
    <template v-for="route in routes">
      <template v-if="!route.meta || !route.meta.hidden">
        <SidebarItem
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </template>
    </template>
  </el-menu>
</template>

<style lang="scss" scope>
.is-horizonal {
  .sidebar-menu {
    flex: 1;
    border-bottom: 1px solid #ddd;
  }
}
</style>

<style lang="scss">
.is-collapse {
  .sidebar-menu {
    width: $base-unfold-width;
  }
}
</style>

<style lang="scss" scoped>
.sidebar-menu {
  border: none;
  width: 100%;
  .el-menu--horizontal {
    border-bottom: none !important;
  }
}
</style>
