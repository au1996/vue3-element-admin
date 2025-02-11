<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import locale from 'element-plus/lib/locale/lang/zh-cn'
</script>
