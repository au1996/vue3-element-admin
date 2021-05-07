<template>
  <div class="userView">
    <div class="headerBox">
      <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    </div>
    <el-table :data="list" border>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="role" label="权限" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="viewUser(row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="添加用户">
      <el-form ref="form" v-loading="formLoading" :model="userForm" label-width="80px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="realname" label="真实姓名">
          <el-input v-model="userForm.realname"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" :disabled="formLoading" @click="addUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { get_user_list, add_user } from '@/api/user'

const dialogVisible = ref(false)
const formLoading = ref(false)
const list = reactive([])
const userForm = reactive({
  username: '',
  password: '',
  phone: '',
  email: '',
  realname: ''
})

get_user_list().then((res) => {
  list.push(...res.list)
})

const viewUser = (row) => {
  ElMessage({
    type: 'warning',
    message: row.username
  })
}

const addUser = () => {
  formLoading.value = true
  add_user(userForm)
    .then((res) => {
      console.log(res)
    })
    .finally(() => {
      formLoading.value = false
    })
}
</script>

<style lang="scss" scoped>
.headerBox {
  margin-bottom: 10px;
}
</style>
