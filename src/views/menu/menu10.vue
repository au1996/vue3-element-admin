<template>
  <div>
    <h1>菜单1</h1>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script></script>

<style lang="scss" scoped></style>
