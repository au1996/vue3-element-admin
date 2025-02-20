<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="left-box">
      <Hamburger class="hamburger-container" :is-active="opened" @toggleClick="toggleSideBar" />
      <Breadcrumb class="breadcrumb-container" />
    </div>
    <div class="right-menu">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <Screenfull class="screenfull" />
      </el-tooltip>
      <el-dropdown class="avatar-container right-menu-item">
        <div class="avatar-wrapper">
          <img :src="userInfo.avatar ? userInfo.avatar : './img/logo.png'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/')">首页</el-dropdown-item>
            <el-dropdown-item divided @click="loginOut">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import { useTagsViewStore } from '@/store/tagsView'
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import Screenfull from './Screenfull.vue'

const router = useRouter()
const appStore = useAppStore()
const opened = computed(() => appStore.state.sidebar.opened)

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const tagsViewStore = useTagsViewStore()

const toggleSideBar = () => {
  appStore.toggleSideBar()
}

const loginOut = () => {
  ElMessageBox.confirm('退出登录', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await userStore.logout()
      if (res) {
        router.push('/login')
        tagsViewStore.delAllViews()
      }
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  line-height: 50px;

  .hamburger-container {
    float: left;
    height: 50px;
    padding: 0 10px;
  }

  :deep(.right-menu) {
    display: flex;
    align-items: center;
    height: 100%;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      margin: 0 4px;
      vertical-align: middle;
    }

    .international {
      vertical-align: top;
    }

    .theme-switch {
      vertical-align: 15px;
    }

    .avatar-container {
      // height: 50px;
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        margin-top: 5px;

        .user-avatar {
          width: 40px;
          height: 40px;
          cursor: pointer;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          position: absolute;
          top: 20px;
          right: -16px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
