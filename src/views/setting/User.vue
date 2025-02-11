<template>
  <div class="user-manage-view">
    <div class="header-box">
      <el-input
        v-model="tableParams.keyword"
        class="left"
        placeholder="请输入关键词搜索"
        clearable
        @change="onSearch"
      >
        <template #append>
          <el-button @click="onSearch">
            <Icon name="Search" />
          </el-button>
        </template>
      </el-input>
      <el-button type="primary" @click="showDialog('add')">添加用户</el-button>
    </div>
    <el-table v-loading="tableLoading" border :data="tableData">
      <el-table-column prop="username" label="账号" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          {{ getRoleName(row.role) }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="120" />
      <el-table-column prop="introduction" label="介绍" />
      <el-table-column prop="avatar" label="头像">
        <template #default="{ row }">
          <img v-show="row.avatar" :src="row.avatar" width="40" height="40" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="160">
        <template #default="{ row }">
          {{ DateFormat(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="showDialog(TYPE_UPDATE, row)"
            >修改</el-button
          >
          <el-button type="danger" size="small" @click="deleteUser(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.pageSize"
      :total="pagination.total"
      :page-sizes="[2, 5, 10, 20]"
      layout="total, slot, prev, pager, next, sizes, jumper"
      class="default"
      @current-change="pagination.pageChange"
      @size-change="pagination.sizeChange"
    >
    </el-pagination>
    <el-dialog
      v-model="dialogState.visible"
      :title="dialogState.type === TYPE_UPDATE ? '修改' : '添加'"
    >
      <el-form ref="userFormRef" v-loading="formLoading" :model="userForm" label-width="80px">
        <el-form-item prop="username" label="账号">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="role" label="角色">
          <el-select v-model="userForm.role" placeholder="请选择" class="w-full" @focus="getRoles">
            <el-option
              v-for="item in roleList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="介绍">
          <el-input v-model="userForm.introduction"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogState.visible = false">取 消</el-button>
          <el-button type="primary" :disabled="formLoading" @click="addOrUpdateUser"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import useTableData from '@/hooks/useTableData'
import { get_user_list, get_roles } from '@/api/user'
import { DateFormat } from '@/utils/util'

const tableParams = reactive({
  keyword: ''
})

const getTableParams = () => {
  return tableParams
}

const setTableData = (resData, tableData) => {
  const [err, res] = resData
  if (err) return
  pagination.total = res.total
  tableData.value = res.data
}

const { tableLoading, tableData, pagination, getTableData } = useTableData({
  getTableParams,
  setTableData,
  request: get_user_list,
  pageSize: 2
})

const onSearch = () => {
  getTableData(1)
}

/**
 * 获取角色列表
 */
const roleList = ref([])
const getRoles = async () => {
  const [err, res] = await get_roles()
  if (err) return
  roleList.value = res.data
}
getRoles()

/**
 * 获取角色名
 */
const getRoleName = (id) => {
  let name = id
  roleList.value.forEach((group) => {
    if (group.id === id) {
      name = group.name
    }
  })
  return name
}

const TYPE_ADD = 'add'
const TYPE_UPDATE = 'update'
const dialogState = reactive({
  type: TYPE_ADD,
  visible: false
})
const formLoading = ref(false)
const userFormRef = ref(null)
const userForm = reactive({
  username: '',
  password: '',
  role: '',
  email: '',
  introduction: ''
})

/**
 * 展开弹窗
 * @param {String} type add | update
 * @param {Object} row
 */
const showDialog = (type, row) => {
  dialogState.type = type
  dialogState.visible = true
  if (dialogState.type === TYPE_UPDATE) {
    for (const key in row) {
      userForm[key] = row[key]
    }
  } else {
    for (const key in userForm) {
      userForm[key] = ''
    }
  }
}

/**
 * 添加或更新用户
 */
const addOrUpdateUser = () => {
  formLoading.value = true
  if (dialogState.type === TYPE_ADD) {
    tableData.value.push(userForm)
  }
  setTimeout(() => {
    formLoading.value = false
    dialogState.visible = false
  }, 800)
}

/**
 * 删除用户
 */
const deleteUser = (row) => {
  ElMessageBox.confirm(`确定删除 ${row.username} ？`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'warning',
        message: '暂无权限删除'
      })
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .left {
    width: 300px;
  }
}
</style>
