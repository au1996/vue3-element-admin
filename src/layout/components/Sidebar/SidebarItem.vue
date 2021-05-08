<template>
  <div v-if="item.meta && !item.hide">
    <div class="menu-wrapper">
      <!-- 一级菜单 -->
      <el-menu-item
        v-if="!item.children || !item.children.length"
        :index="item.path"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <i v-if="item.meta.icon" :class="item.meta.icon" class="elIcon" />
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <el-submenu v-else :index="item.path">
        <!-- 二级菜单 -->
        <template #title>
          <i v-if="item.meta.icon" :class="item.meta.icon" class="elIcon" />
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 三级菜单 -->
        <div v-for="child in item.children" :key="child.path">
          <SidebarItem
            v-if="child.children && child.children.length"
            :key="child.path"
            :index="child.path"
            :is-nest="true"
            :item="child"
            class="nest-menu"
          />
          <el-menu-item v-else :key="child.path" :index="child.path">
            <template #title>
              <span>{{ child.meta.title }}</span>
            </template>
          </el-menu-item>
        </div>
      </el-submenu>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  }
})
</script>
