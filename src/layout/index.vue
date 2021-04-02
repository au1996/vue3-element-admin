<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
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

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar.vue'
import TagsView from './components/TagsView/index.vue'
import AppMain from './components/AppMain.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  },
  data() {
    return {
      mobileWidth: 992
    }
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device
    }),
    classObj() {
      return {
        hideSidebar: !this.$store.state.app.sidebar.opened,
        openSidebar: this.$store.state.app.sidebar.opened,
        withoutAnimation: this.$store.state.app.sidebar.withoutAnimation,
        mobile: this.$store.state.app.device === 'mobile'
      }
    }
  },
  watch: {
    $route() {
      if (this.device === 'mobile' && this.sidebar.opened) {
        this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMob = this.isMobile()
    if (isMob) {
      this.$store.dispatch('app/toggleDevice', 'mobile')
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    isMobile() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < this.mobileWidth
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMob = this.isMobile()
        this.$store.dispatch('app/toggleDevice', isMob ? 'mobile' : 'desktop')

        if (isMob) {
          this.$store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
})
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
