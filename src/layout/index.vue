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
import { useAppStore } from '@/store/app'
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index.vue'
import TagsView from './components/TagsView/index.vue'
import AppMain from './components/AppMain.vue'

const route = useRoute()
const appStore = useAppStore()
const device = computed(() => appStore.state.device)
const sidebar = computed(() => appStore.state.sidebar)
const opened = computed(() => sidebar.value.opened)
const withoutAnimation = computed(() => sidebar.value.withoutAnimation)

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
    appStore.closeSideBar(false)
  }
})

onBeforeMount(() => {
  window.addEventListener('resize', resizeHandler)
})

onMounted(() => {
  const isMob = isMobile()
  if (isMob) {
    appStore.toggleDevice('mobile')
    appStore.closeSideBar(true)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})

const handleClickOutside = () => {
  appStore.closeSideBar(false)
}

const mobileWidth = ref(992)

const isMobile = () => {
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < mobileWidth.value
}

const resizeHandler = () => {
  if (!document.hidden) {
    const isMob = isMobile()
    appStore.toggleDevice(isMob ? 'mobile' : 'desktop')
    if (isMob) {
      appStore.closeSideBar(true)
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
