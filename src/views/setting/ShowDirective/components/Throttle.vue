<template>
  <div class="mt-20">
    <h1>{{ num }}</h1>
    <el-button v-throttle="minus" type="primary">-1 (500)</el-button>
    <el-button v-throttle="[minus, 700, 10]" type="primary">-10 (700)</el-button>
    <el-button v-throttle="[add, 1000, 10]" type="primary">+10 (1000)</el-button>
    <el-button v-throttle="[add, 200]" type="primary">+1 (200)</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const num = ref(20)

const add = (n) => {
  if (n) {
    num.value += n
  } else {
    num.value++
  }
}

const minus = (n) => {
  if (n) {
    num.value -= n
  } else {
    num.value--
  }
}
</script>
