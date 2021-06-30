<template>
  <div class="home-view">
    <el-empty description="首页" />
    <h2 class="title">{{ msg }}</h2>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const msg = ref('Welcome to the management system')

const h2Style = reactive({
  color: '#435448'
})

setInterval(() => {
  h2Style.color = '#' + Math.random().toString(16).slice(-6)
}, 1000)
</script>

<style lang="scss" scoped>
.home-view {
  .title {
    color: v-bind('h2Style.color');
    text-align: center;
  }
}
</style>
