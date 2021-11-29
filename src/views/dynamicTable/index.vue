<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RoleColumn } from '@/config/table'
import FormDialog from './FormDialog.vue'

const TABLE_TITLE = '添加员工'

const dialogRef = ref(null)
const searchVal = ref('')
const state = reactive({
  tableData: [],
  total: 0,
})

const handlePage = page => {
  console.log('pageNum, pageSize:', page)
}

const changeVal = val => {
  searchVal.value = val
}

const handleCreate = () => {
  dialogRef.value.show()
}

const handleUpdate = (row: any) => {
  dialogRef.value.edit(row)
}

const handleDelete = (row: any) => {
  console.log('row', row)
}
</script>

<template>
  <div>
    <FormDialog ref="dialogRef" />
    <TableBase
      :data="state.tableData"
      :columns="RoleColumn"
      :total-count="state.total"
      @update:page="handlePage"
    >
      <template #title>
        <h3>{{ TABLE_TITLE }}</h3>
      </template>

      <template #headerHandler>
        <FormBase :inline="true">
          <FormItemBase label="姓名">
            <InputBase
              :value="searchVal"
              tip="搜索：角色名称"
              @change="changeVal"
            />
          </FormItemBase>
          <FormItemBase label="账号">
            <InputBase
              :value="searchVal"
              tip="搜索：账号"
              @change="changeVal"
            />
          </FormItemBase>
        </FormBase>
        <BtnBase type="search" />
        <BtnPermission @click="handleCreate" />
      </template>

      <template #isEnable="scope">
        <TagBase :name="scope.row.isEnable" />
      </template>

      <template #action="scope">
        <BtnLinkPermission auth="edit" @on:click="handleUpdate(scope.row)" />
        <BtnLinkPermission auth="delete" @on:click="handleDelete(scope.row)" />
      </template>
    </TableBase>
  </div>
</template>

<style scoped></style>
