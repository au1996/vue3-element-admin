import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { getCookie, setCookie } from '@/utils/util'

const KEY_SIDEBAR_OPENED = 'sidebar_opened'

export const useAppStore = defineStore('app', () => {
  const state = reactive({
    device: 'desktop', // desktop | mobile
    sidebar: {
      opened: getCookie(KEY_SIDEBAR_OPENED) !== 'false',
      withoutAnimation: false
    }
  })

  const toggleSideBar = () => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      setCookie(KEY_SIDEBAR_OPENED, 'true')
    } else {
      setCookie(KEY_SIDEBAR_OPENED, 'false')
    }
  }

  const closeSideBar = (val) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = val
    setCookie(KEY_SIDEBAR_OPENED, 'false')
  }

  const toggleDevice = (val) => {
    state.device = val
  }

  return {
    state,
    toggleSideBar,
    closeSideBar,
    toggleDevice
  }
})
