<template>
  <div class="setting-view">
    <div class="header-box">
      <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    </div>
    <el-table :data="list" border>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="role" label="角色" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="deleteUser(row.username)">删除</el-button>
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
import { ElMessage, ElMessageBox } from 'element-plus'
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
.header-box {
  margin-bottom: 10px;
}
</style>
