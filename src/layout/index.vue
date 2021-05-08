<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device === 'mobile' && opened" class="drawer-bg" @click="handleClickOutside" />
    <!--侧边栏-->
    <Sidebar />
    <!--主体内容-->
    <div class="main-container">
      <!--顶部导航-->
      <Navbar />
      <!-- 关闭菜单 -->
      <TagsView />
      <!--主页面-->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar.vue'
import TagsView from './components/TagsView/index.vue'
import AppMain from './components/AppMain.vue'

const route = useRoute()
const store = useStore()

const opened = computed(() => store.state.app.sidebar.opened)
const withoutAnimation = computed(() => store.state.app.sidebar.withoutAnimation)
const device = computed(() => store.state.app.device)
const classObj = computed(() => {
  return {
    hideSidebar: !opened.value,
    openSidebar: opened.value,
    withoutAnimation: withoutAnimation.value,
    mobile: device.value === 'mobile'
  }
})

watch(route, () => {
  if (device.value === 'mobile' && opened.value) {
    store.dispatch('app/closeSideBar', { withoutAnimation: false })
  }
})

onBeforeMount(() => {
  window.addEventListener('resize', resizeHandler)
})

onMounted(() => {
  const isMob = isMobile()
  if (isMob) {
    store.dispatch('app/toggleDevice', 'mobile')
    store.dispatch('app/closeSideBar', { withoutAnimation: true })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})

const handleClickOutside = () => {
  store.dispatch('app/closeSideBar', { withoutAnimation: false })
}

const mobileWidth = ref(992)

const isMobile = () => {
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < mobileWidth.value
}

const resizeHandler = () => {
  if (!document.hidden) {
    const isMob = isMobile()
    store.dispatch('app/toggleDevice', isMob ? 'mobile' : 'desktop')

    if (isMob) {
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.main-container {
  margin-left: 20px;
  transition: margin-left 0.28s;
}
</style>
