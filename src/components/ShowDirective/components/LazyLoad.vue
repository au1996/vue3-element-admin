<template>
  <div class="mt-20">
    <h1>请禁用浏览器缓存，使用低速网络查看效果</h1>
    <img v-lazyLoad="url" width="600" height="400" />
    <img v-lazyLoad="url2" width="600" height="400" />
    <img v-lazyLoad="url3" width="600" height="400" />
    <img v-lazyLoad="url4" width="600" height="400" />
    <img v-lazyLoad="url5" width="600" height="400" />
    <img v-lazyLoad="url6" width="600" height="400" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://www.xueyueob.cn/cube/cube01.bmp',
      url2: 'https://www.xueyueob.cn/cube/cube02.bmp',
      url3: 'https://www.xueyueob.cn/cube/cube03.bmp',
      url4: 'https://www.xueyueob.cn/cube/cube04.bmp',
      url5: 'https://www.xueyueob.cn/cube/cube05.bmp',
      url6: 'https://www.xueyueob.cn/cube/cube06.bmp'
    }
  }
}
</script>
