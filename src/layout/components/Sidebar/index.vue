<template>
  <div class="sidebar-container">
    <div class="logo" @click="$router.push('/')">
      <img class="logo-img" :src="logoSrc" alt="logo" />
      <transition name="el-zoom-in-center">
        <h1 v-show="opened" class="logo-text">Vue Element Admin</h1>
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

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { constantRoutes } from '@/router'
import { getRoles } from '@/utils/auth'
import SidebarItem from './SidebarItem.vue'
import logoSrc from '@img/logo.png'

const store = useStore()
const routers = reactive([])

const opened = computed(() => store.state.app.sidebar.opened)
const isCollapse = computed(() => !opened.value)

onMounted(() => {
  filterRoutes()
})

const filterRoutes = () => {
  const roles = getRoles()
  for (let i = 0; i < constantRoutes.length; i++) {
    if (constantRoutes[i].path === '/') {
      routers.push(...constantRoutes[i].children)
    }
  }
  // 权限过滤
  for (let i = 0; i < routers.length; i++) {
    if (routers[i].meta && routers[i].meta.roles && !routers[i].meta.roles.includes(roles)) {
      routers.splice(i, 1)
      i--
    }
  }
  for (let i = 0; i < routers.length; i++) {
    const childrens = []
    if (routers[i].children) {
      for (let j = 0; j < routers[i].children.length; j++) {
        // 权限过滤
        const childs = routers[i].children[j]
        if (
          (childs.meta && !childs.meta.roles) ||
          (childs.meta && childs.meta.roles && childs.meta.roles.includes(roles))
        ) {
          childrens.push(childs)
        }
      }
      routers[i].children = [...childrens]
    }
  }
}
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

  .logo-img {
    width: 32px;
    height: 32px;
  }

  .logo-text {
    display: inline-block;
    height: 50px;
    margin-left: 12px;
    font-size: 14px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
