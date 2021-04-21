<template>
  <div class="sidebar-container">
    <div class="logo" @click="$router.push('/')">
      <img class="logoImg" :src="logoSrc" alt="logo" />
      <transition name="el-zoom-in-center">
        <h1 v-show="sidebar.opened" class="logoText">Vue Element Admin</h1>
      </transition>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :router="true"
        :default-active="$route.path"
        :collapse="isCollapse"
        :show-timeout="200"
        :unique-opened="true"
        text-color="#fff"
        background-color="#4a5a74"
        active-text-color="#409EFF"
      >
        <SidebarItem v-for="item in routers" :key="item.path" :index="item.path" :item="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { constantRoutes } from '@/router'
import { getRoles } from '@/utils/auth'
import SidebarItem from './SidebarItem.vue'
import logoSrc from '@img/logo.png'

export default defineComponent({
  components: { SidebarItem },
  data() {
    return {
      routers: [],
      logoSrc: logoSrc
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    isCollapse() {
      return !this.$store.state.app.sidebar.opened
    }
  },
  mounted() {
    this.routers = this.filterRoutes()
  },
  methods: {
    // 路由过滤
    filterRoutes() {
      const roles = getRoles()
      const routes = []
      for (let i = 0; i < constantRoutes.length; i++) {
        if (constantRoutes[i].path === '/') {
          routes.push(...constantRoutes[i].children)
        }
      }
      // 权限过滤
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].meta && routes[i].meta.roles && !routes[i].meta.roles.includes(roles)) {
          routes.splice(i, 1)
          i--
        }
      }
      for (let i = 0; i < routes.length; i++) {
        const childrens = []
        if (routes[i].children) {
          for (let j = 0; j < routes[i].children.length; j++) {
            // 权限过滤
            const childs = routes[i].children[j]
            if (
              (childs.meta && !childs.meta.roles) ||
              (childs.meta && childs.meta.roles && childs.meta.roles.includes(roles))
            ) {
              childrens.push(childs)
            }
          }
          routes[i].children = [...childrens]
        }
      }
      return routes
    }
  }
})
</script>

<style lang="scss" scoped="scoped">
.logo {
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  height: 50px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  background-color: #2b2f3a;
  justify-content: center;
  align-items: center;

  .logoImg {
    width: 32px;
    height: 32px;
  }

  .logoText {
    display: inline-block;
    height: 50px;
    margin-left: 12px;
    font-size: 14px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
