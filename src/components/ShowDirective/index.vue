<template>
  <div class="showDirective">
    <el-tabs v-model="activeName" tab-position="left">
      <el-tab-pane v-for="item in list" :key="item.name" :label="item.label" :name="item.name">
        {{ item.label + '指令' }}
      </el-tab-pane>
      <Debounce v-if="activeName === 'debounce'" />
      <Throttle v-if="activeName === 'throttle'" />
      <Permission v-if="activeName === 'permission'" />
      <LazyLoad v-if="activeName === 'lazyLoad'" />
      <WaterMarker v-if="activeName === 'waterMarker'" />
      <Draggabler v-if="activeName === 'draggable'" />
      <Copy v-if="activeName === 'copy'" />
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Debounce from './components/Debounce.vue'
import Throttle from './components/Throttle.vue'
import Permission from './components/Permission.vue'
import LazyLoad from './components/LazyLoad.vue'
import WaterMarker from './components/WaterMarker.vue'
import Draggabler from './components/Draggable.vue'
import Copy from './components/Copy.vue'

const activeName = ref('debounce')
const list = [
  { label: '防抖', name: 'debounce' },
  { label: '节流', name: 'throttle' },
  { label: '权限', name: 'permission' },
  { label: '懒加载', name: 'lazyLoad' },
  { label: '水印', name: 'waterMarker' },
  { label: '拖拽', name: 'draggable' },
  { label: '复制', name: 'copy' }
]
</script>
