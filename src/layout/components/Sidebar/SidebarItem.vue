<template>
  <div v-if="nav.meta && !nav.hide" class="menu-wrapper">
    <!-- 一级菜单 -->
    <el-menu-item
      v-if="!nav.children || !nav.children.length"
      :index="nav.path"
      :class="{ 'submenu-title-noDropdown': !nav.isNest }"
    >
      <i v-if="nav.meta.icon" :class="nav.meta.icon" class="elIcon" />
      <template #title>
        <span>{{ nav.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-submenu v-else :index="nav.path">
      <!-- 二级菜单 -->
      <template #title>
        <i v-if="nav.meta.icon" :class="nav.meta.icon" class="elIcon" />
        <span>{{ nav.meta.title }}</span>
      </template>
      <!-- 三级菜单 -->
      <div v-for="child in nav.children" :key="child.path">
        <SidebarItem
          v-if="child.children && child.children.length"
          :index="child.path"
          :is-nest="true"
          :nav="child"
          class="nest-menu"
        />
        <el-menu-item v-else :index="child.path">
          <template #title>
            <span>{{ child.meta.title }}</span>
          </template>
        </el-menu-item>
      </div>
    </el-submenu>
  </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  nav: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  }
})

toRefs(props)
</script>
