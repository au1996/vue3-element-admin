<template>
  <div class="mt-20">
    <span>显示按钮1</span>
    <button v-permission="'admin'">按钮1</button>
    <hr />
    <hr />
    <span>显示按钮2</span>
    <button v-permission="'xueyue'">按钮2</button>
    <hr />
    <hr />
    <span>隐藏按钮3</span>
    <button v-permission="'editor'">按钮3</button>
  </div>
</template>

<script setup></script>
