<template>
  <el-tooltip effect="dark" :content="tip" placement="bottom">
    <I class="screenfull-box" name="FullScreen" :size="16" @click="onToggle" />
  </el-tooltip>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'

const isFullscreen = ref(false)

const tip = computed(() => {
  if (isFullscreen.value) {
    return '取消全屏'
  }
  return '全屏'
})

const onToggle = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning('you browser can not work')
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

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  destroy()
})
</script>

<style scoped>
.screenfull-box {
  margin: 0 10px;
  cursor: pointer;
}
</style>
