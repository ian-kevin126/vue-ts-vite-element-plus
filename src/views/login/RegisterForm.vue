<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const form = ref({
  name: '',
  password: '',
  checkedPwd: '',
})
</script>

<template>
  <el-form ref="form" :model="form" class="login-ruleForm">
    <el-form-item prop="name">
      <el-input v-model="form.name" :placeholder="t('register.username')">
        <template #prefix>
          <user theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="form-code">
        <el-input v-model="form.name" :placeholder="t('register.smsbtn')">
          <template #prefix>
            <icon-user theme="outline" size="16" fill="#999" />
          </template>
        </el-input>
        <el-button class="code-btn">
          {{ t('register.smsCode') }}
        </el-button>
      </div>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" :placeholder="t('register.password')" type="password">
        <template #prefix>
          <icon-lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" :placeholder="t('register.confirmPwd')" type="password">
        <template #prefix>
          <icon-lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="login-check">
        <el-checkbox v-model="form.checkedPwd">
          {{ t('register.checkText') }}
        </el-checkbox>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="medium"
        class="login-btn"
        round
      >
        {{ t('register.btn') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.login-ruleForm {
  margin-top: 1rem;
  :deep(.el-input__prefix) {
    top: 2px;
    padding: 0 4px;
  }
  .login-methods {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .login-btn {
    width: 100%;
    margin-bottom: 1rem;
  }
  .login-check {
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
  .form-code {
    display: flex;
    align-content: center;
    justify-content: space-between;
    .code-btn {
      margin-left: 1rem;
    }
  }
}
</style>
