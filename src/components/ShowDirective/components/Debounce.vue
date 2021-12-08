<template>
  <div class="mt-20">
    <h1>{{ num }}</h1>
    <el-button v-debounce="minus" type="primary">-1 (500ms)</el-button>
    <el-button v-debounce="[minus, 700, 10]" type="primary">-10 (600ms)</el-button>
    <el-button v-debounce="[add, 1000, 10]" type="primary">+10 (1000ms)</el-button>
    <el-button v-debounce="[add, 200]" type="primary">+1 (100ms)</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const num = ref(10)

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
