<script setup lang="ts">
import { computed, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './SidebarItemLink.vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw> | any,
    required: true,
  },
  basePath: {
    type: String,
    required: true,
  },
})

const { t } = useI18n()

const getChildrenLen = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter((item: RouteRecordRaw) => {
      if (item.meta && item.meta.hidden) {
        return false
      } else {
        return true
      }
    })
    return showingChildren.length
  }
  return 0
})

const getOneChild = computed(() => {
  if (getChildrenLen.value > 1) {
    return null
  }

  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        return child
      }
    }
  }
  const cur = { ...props.item, path: '' }
  return cur
})

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }

  if (routePath === '/dashboard') {
    return routePath
  }

  const path = routePath ? props.basePath + '/' + routePath : props.basePath
  return path
}
</script>

<template>
  <template v-if="getOneChild && !getOneChild.children">
    <SidebarItemLink v-if="getOneChild.meta" :to="resolvePath(getOneChild.path)">
      <el-menu-item :index="resolvePath(getOneChild.path)">
        <component
          :is="getOneChild.meta.icon"
          v-if="getOneChild.meta.icon"
          theme="outline"
          stroke-width="3"
        />
        <template #title>
          <span v-if="getOneChild.meta.title">{{ t('route.' + getOneChild.meta.title) }}</span>
        </template>
      </el-menu-item>
    </SidebarItemLink>
  </template>

  <el-sub-menu v-else :index="resolvePath(item.path)">
    <template #title>
      <component
        :is="item.meta.icon"
        v-if="item.meta"
        theme="outline"
        stroke-width="3"
      />
      <span v-if="item.meta">{{ t('route.' + item.meta.title) }}</span>
    </template>
    <template v-if="item.children">
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </template>
  </el-sub-menu>
</template>

<style lang="scss">
.el-sub-menu.is-active .el-sub-menu__title {
  .i-icon {
    margin-right: 5px !important;
  }
}
.el-menu--collapse > .el-sub-menu > .el-sub-menu__title span {
  &.i-icon {
    height: 14px !important;
    width: 14px !important;
    margin-right: 5px !important;
    visibility: visible !important;
  }
}

.is-horizonal {
  .el-menu.el-menu--horizontal {
    border-bottom: none !important;
    padding: 0 20px;
  }
  .el-menu {
    .el-menu-item {
      &.is-active {
        border-right: none;
        background-color: transparent !important;
      }
    }
  }
}
</style>
