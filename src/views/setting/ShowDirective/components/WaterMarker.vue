<template>
  <div class="mt-20">
    <img v-waterMarker="obj" width="300" height="300" />
    <span v-waterMarker class="box"></span>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const obj = reactive({
  text: '雪月欧巴的水印',
  color: 'skyblue'
})
</script>

<style lang="scss" scoped>
.box {
  display: inline-flex;
  width: 300px;
  height: 300px;
  background: pink;
}
</style>
