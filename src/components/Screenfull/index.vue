<template>
  <div class="screenfull-box" @click="click">
    <i class="el-icon-full-screen" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'
export default defineComponent({
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeUnmount() {
    this.destroy()
  },
  methods: {
    click() {
      if (!screenfull.isEnabled) {
        ElMessage({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
      return false
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    }
  }
})
</script>

<style scoped>
.screenfull-box {
  display: flex;
  justify-content: center;
  width: 20px;
  margin: 0 10px;
  cursor: pointer;
}

.el-icon-full-screen {
  font-size: 20px;
}
</style>
