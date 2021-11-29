<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/index'
import { UserActionTypes } from '@/store/modules/user/action-types'
import useElement from '@/utils/useElement'
import { useI18n } from 'vue-i18n'

type Command = 'outLogin'
const router = useRouter()
const store = useStore()
const { t } = useI18n()
const circleUrl = ref(
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)
const { confirm } = useElement()

const outLogin = () => {
  confirm().then(async () => {
    await store.dispatch(UserActionTypes.ACTION_LOGIN_OUT, undefined)
    router.push('/login')
  })
}

const handleCommand = (command: Command) => {
  if (command === 'outLogin') {
    outLogin()
  }
}
</script>

<template>
  <div class="profile">
    <el-avatar :size="30" :src="circleUrl" />
    <el-dropdown @command="handleCommand">
      <el-link type="primary" class="name">
        <span class="mr5">张三</span>
        <icon-down class="icon-hover down" size="16" />
      </el-link>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="outLogin">
            <icon-logout class="icon-hover logout mr5" title="logout" />
            {{ t('navbar.out') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  align-items: center;
  height: $base-head-menu-height;
  line-height: $base-head-menu-height;
  .name {
    margin-left: 5px;
  }
}
</style>
