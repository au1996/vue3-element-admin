<template>
  <div class="mt-20">
    <input v-model="val" placeholder="请输入内容" />
    <button v-copy="val">复制</button>
    <h2>{{ copyVal }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: '雪月',
      copyVal: ''
    }
  }
}
</script>
