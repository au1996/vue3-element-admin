<template>
  <div class="mt-20">
    <el-input v-model="val" class="mb-10" />
    <el-button v-copy="val" v-copy:success="copySuccess" class="mb-10">复制1</el-button>
    <el-input v-model="val2" class="mb-10" />
    <el-button v-copy="val2" v-copy:success="copySuccess2">复制2</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const val = ref('雪月1')
const val2 = ref('222')

const copySuccess = () => {
  ElMessage.success('复制成功1: ' + val.value)
}

const copySuccess2 = () => {
  ElMessage.success('复制成功2: ' + val2.value)
}
</script>
