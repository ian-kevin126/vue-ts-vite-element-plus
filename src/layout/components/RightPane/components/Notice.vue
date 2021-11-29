<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { noticeList } from '../data'

defineProps({
  color: {
    type: String,
    required: true,
  },
})
const { t } = useI18n()
const activeName = ref('first')

</script>

<template>
  <el-dropdown trigger="click">
    <el-badge :value="12" class="badge">
      <el-link>
        <icon-remind
          class="remind"
          title="remind"
          theme="outline"
          size="16"
          :stroke-width="4"
          :fill="color"
        />
      </el-link>
    </el-badge>
    <template #dropdown>
      <div class="message-box">
        <el-tabs v-model="activeName" stretch>
          <el-tab-pane :label="t('tabs.notice')" name="first">
            <Cell :list="noticeList" />
          </el-tab-pane>
          <el-tab-pane :label="t('tabs.message')" name="second">
            {{ t('notice.empty') }}
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </el-dropdown>
</template>
