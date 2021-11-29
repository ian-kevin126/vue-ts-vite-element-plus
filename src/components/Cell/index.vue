<script setup lang="ts">
import { PropType } from 'vue'

interface IItemProps {
  icon: string
  name: string
  title: string
  time: Date
  [keys: string]: any
}

defineProps({
  list: {
    type: Array as PropType<Array<IItemProps>>,
    required: true,
  },
  name: {
    type: String,
    default: 'title',
  },
})
</script>

<template>
  <div class="cell-container">
    <div v-for="(item, index) in list" :key="index" class="cell-item">
      <div class="cell-item-meta-avatar">
        <div v-if="item.icon" class="icon-box">
          <component
            :is="item.icon"
            class="icon"
            theme="outline"
            size="16"
            :stroke-width="3"
          />
        </div>
      </div>
      <div class="cell-item-meta-content">
        <div class="title">
          {{ item[name] }}
        </div>
        <div class="desc">
          <div class="time">
            {{ item.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cell-container {
  .cell-item {
    display: flex;
    align-items: center;
    padding: 8px 0;
    &:not(:last-child) {
      border-bottom: 1px solid $base-border-color;
    }
    &-meta {
      display: flex;
      &-avatar {
        align-items: center;
        padding: 5px 10px;
        .icon-box {
          width: 30px;
          height: 30px;
          line-height: 30px;
          color: $base-color-white;
          text-align: center;
          background-color: $base-color-primary;
          border-radius: 50%;
        }
      }
      &-content {
        flex: 1;
        .title {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
