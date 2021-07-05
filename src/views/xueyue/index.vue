<template>
  <h1 class="title">雪月测试 scss 全局变量</h1>
  <img :src="avatar" alt="头像" />
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      name: 'xueyue'
    }
  },
  computed: {
    avatar() {
      return this.$store.state.user.avatar
    }
  }
})
</script>

<style lang="scss" scoped>
.title {
  color: $yellow;
  background-color: $panGreen;
}
</style>
