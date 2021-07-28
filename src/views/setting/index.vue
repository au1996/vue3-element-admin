<template>
  <div class="setting-view">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="item in list" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>
    <User v-if="activeName === 'user'" />
    <ShowDirective v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import User from './components/User.vue'
import ShowDirective from '@/components/ShowDirective/index.vue'

const activeName = ref('user')
const list = [
  { label: '用户管理', name: 'user' },
  { label: '指令管理', name: 'directive' }
]
</script>

<style lang="scss" scoped>
.setting-view {
  margin-bottom: 10px;
}
</style>
