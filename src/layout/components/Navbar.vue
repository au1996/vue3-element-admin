<template>
  <el-menu class="navbar" mode="horizontal">
    <Hamburger class="hamburger-container" :is-active="sidebar.opened" @toggleClick="toggleSideBar" />
    <Breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <Screenfull class="screenfull" />
      </el-tooltip>
      <el-dropdown class="avatar-container right-menu-item" trigger="hover">
        <div class="avatar-wrapper">
          <img src="http://www.xueyueob.cn/icons/favicon.ico" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown" placement="top">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display: block;" @click="editPossword">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display: block;" @click="loginOut">登出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { defineComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import { removeToken, removeRoles } from '@/utils/auth'

export default defineComponent({
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  data() {
    return {
      status: false
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    name() {
      return localStorage.name
    }
  },
  methods: {
    close() {
      this.status = false
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    editPossword() {
      ElMessage.warning('暂不支持修改密码')
    },
    loginOut() {
      ElMessageBox.confirm('退出登录', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancelBtn',
        type: 'warning'
      })
        .then(() => {
          removeToken()
          removeRoles()
          this.$store.dispatch('tagsView/delAllViews').then(() => {
            this.$router.push('/login')
          })
        })
        .catch(() => {})
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  line-height: 50px;

  .hamburger-container {
    float: left;
    height: 50px;
    padding: 0 10px;
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  :deep(.right-menu) {
    display: flex;
    float: right;
    height: 100%;
    align-items: center;

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
