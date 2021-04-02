<template>
  <div>
    <el-empty description="首页" />
    <h2>{{ msg }}</h2>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const msg = ref(666)
const h2Style = reactive({
  color: '#435448'
})
setInterval(() => {
  msg.value = Math.random()
  h2Style.color = '#' + Math.random().toString(16).slice(-6)
}, 3000)
</script>

<style lang="scss" scoped>
h2 {
  color: v-bind('h2Style.color');
  text-align: center;
}
</style>
