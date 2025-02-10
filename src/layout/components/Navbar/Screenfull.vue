<template>
  <div class="box" @click="click">
    <Icon name="FullScreen" size="18" />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'

const isFullscreen = ref(false)

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

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  destroy()
})
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  width: 20px;
  margin: 0 10px;
  cursor: pointer;
}
</style>
