<template>
  <el-table :data="list" border style="width: 100%;">
    <el-table-column prop="username" label="用户名" />
    <el-table-column prop="password" label="密码" />
    <el-table-column prop="role" label="权限" />
    <el-table-column label="操作" width="200">
      <template #default="{ row }">
        <el-button type="text" size="small" @click="editUser(row)">编辑</el-button>
        <el-button type="text" size="small" @click="deleteUser(row.username)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { reactive } from 'vue'
import { getUserList } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'

const list = reactive([])

getUserList().then((res) => {
  list.push(...res.list)
})

const editUser = (row) => {
  ElMessage(row.username)
}

const deleteUser = (name) => {
  ElMessageBox.confirm(`确定删除 ${name} ？`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    cancelButtonClass: 'cancelBtn',
    type: 'warning'
  })
    .then(() => {
      const index = list.findIndex((o) => o.username === name)
      list.splice(index, 1)
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped></style>
