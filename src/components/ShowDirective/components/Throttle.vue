<template>
  <div class="mt-20">
    <h1>{{ num }}</h1>
    <el-button v-throttle="minus" type="primary">-1 (500)</el-button>
    <el-button v-throttle="[minus, 700, 10]" type="primary">-10 (700)</el-button>
    <el-button v-throttle="[add, 1000, 10]" type="primary">+10 (1000)</el-button>
    <el-button v-throttle="[add, 200]" type="primary">+1 (200)</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 20
    }
  },
  methods: {
    add(n) {
      if (n) {
        this.num += n
      } else {
        this.num++
      }
    },
    minus(n) {
      if (n) {
        this.num -= n
      } else {
        this.num--
      }
    }
  }
}
</script>
