<template>
  <div class="mt-20 w-full button">
    <button v-draggable>{{ msg }}</button>
  </div>
</template>

<script setup>
const msg = '可拖拽的按钮'
</script>

<style lang="scss" scoped>
.button {
  height: 300px;
  border: 1px solid #000;
}
</style>
