<template>
  <el-table :data="list" border style="width: 100%;">
    <el-table-column prop="username" label="用户名" />
    <el-table-column prop="password" label="密码" />
    <el-table-column prop="role" label="权限" />
    <el-table-column label="操作" width="200">
      <template #default="{ row }">
        <el-button type="text" size="small" @click="viewUser(row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getUserList } from '@/api/user'

const list = reactive([])

getUserList().then((res) => {
  list.push(...res.list)
})

const viewUser = (row) => {
  ElMessage({
    type: 'warning',
    message: row.username
  })
}
</script>

<style lang="scss" scoped></style>
