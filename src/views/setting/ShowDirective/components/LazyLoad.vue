<template>
  <div class="mt-20">
    <h1>禁用浏览器缓存，用低速网络查看效果</h1>
    <img v-for="imgUrl in urlList" :key="imgUrl" v-lazyLoad="imgUrl" width="600" height="400" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const urlList = ref([])
const baseUrl = 'https://www.xyob.cn/cube/'

for (let i = 1; i <= 6; i++) {
  urlList.value.push(`${baseUrl}cube0${i}.bmp`)
}
</script>
