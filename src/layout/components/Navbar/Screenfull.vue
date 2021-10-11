<template>
  <div class="screenfull-box" @click="click">
    <i class="el-icon-full-screen" />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'

const isFullscreen = ref(false)

onBeforeUnmount(() => {
  destroy()
})

onMounted(() => {
  init()
})

const click = () => {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: 'you browser can not work',
      type: 'warning'
    })
    return false
  }
  screenfull.toggle()
  return false
}

const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

const init = () => {
  if (screenfull.isEnabled) {
    screenfull.on('change', change)
  }
}

const destroy = () => {
  if (screenfull.isEnabled) {
    screenfull.off('change', change)
  }
}
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
