<template>
  <div class="userView">
    <el-table :data="list" border>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="role" label="角色" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="viewUser(row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { get_user_list } from '@/api/user'

const list = reactive([])

get_user_list().then((res) => {
  list.push(...res.list)
})

const viewUser = (row) => {
  ElMessage({
    type: 'warning',
    message: row.username
  })
}
</script>

<style lang="scss" scoped>
.headerBox {
  margin-bottom: 10px;
}
</style>
