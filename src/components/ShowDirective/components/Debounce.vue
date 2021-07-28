<template>
  <div class="mt-20">
    <h1>{{ num }}</h1>
    <el-button v-debounce="minus" type="primary">-1 (500)</el-button>
    <el-button v-debounce="[minus, 700, 10]" type="primary">-10 (600)</el-button>
    <el-button v-debounce="[add, 1000, 10]" type="primary">+10 (1000)</el-button>
    <el-button v-debounce="[add, 200]" type="primary">+1 (100)</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 10
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
