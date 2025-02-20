<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="login-title">系统登录</div>
      <el-form ref="loginFormRef" class="login-form" :model="param" :rules="rules" status-icon>
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="用户名">
            <template #prepend>
              <Icon name="UserFilled" size="14" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="param.password"
            placeholder="密码"
            :type="passwordType"
            @keyup.enter="submitForm"
          >
            <template #prepend>
              <Icon v-if="passwordLock" name="Lock" size="14" @click="switchPass" />
              <Icon v-else name="Unlock" size="14" @click="switchPass" />
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" :loading="btnLoading" @click="submitForm">登录</el-button>
        </div>
        <p class="login-tips">用户名: admin 密码: 123</p>
        <p class="login-tips">用户名: editor 密码: 456</p>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'

const btnLoading = ref(false)
const loginFormRef = ref(null)
const passwordLock = ref(true)
const passwordType = ref('password')

const param = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const switchPass = () => {
  if (passwordLock.value) {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
  passwordLock.value = !passwordLock.value
}

const router = useRouter()
const userStore = useUserStore()
const submitForm = async () => {
  loginFormRef.value.validate(async (valid) => {
    if (!valid) {
      ElMessage.error('请输入用户名和密码')
      return
    }

    btnLoading.value = true
    const res = await userStore.login(param)
    btnLoading.value = false

    if (res) {
      ElMessage.success('登录成功')
      router.push('/')
    }
  })
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #235bae;
  background-image: url(/img/login_bg.jpg);
  background-size: cover;
}

.login-title {
  width: 100%;
  font-size: 20px;
  line-height: 50px;
  color: #fff;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.login-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 5px;
}

.login-form {
  padding: 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #be1480;
}

.el-icon-lock,
.el-icon-unlock {
  cursor: pointer;
}
</style>
