<template>
  <div class="errPage-container">
    <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back"> 返回 </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面
        <h2>你没有权限去该页面</h2>
        <h6>如有不满请联系你领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/"> 回首页 </router-link>
          </li>
          <li class="link-type">
            <a href="https://github.com/au1996" target="brank">随便看看</a>
          </li>
          <li><a href="#" @click.prevent="dialogVisible = true">点我看图</a></li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img src="/img/401.gif" width="313" height="428" alt="Girl has dropped her ice cream." />
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible" title="随便看">
      <img :src="ewizardClap" class="pan-img" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const ewizardClap = 'https://au1996.github.io/blog/images/logo.png'
const dialogVisible = ref(false)

const back = () => {
  if (route.query.noGoBack) {
    router.push('/')
  } else {
    router.go(-1)
  }
}
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  padding: 100px 0;
  margin: 0 auto;

  .pan-back-btn {
    color: #fff;
    background: #008489;
    border: none !important;
  }

  .pan-gif {
    display: block;
    margin: 0 auto;
  }

  .pan-img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }

  .text-jumbo {
    margin: 40px 0;
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  h2,
  h6 {
    margin: 20px 0;
  }

  .list-unstyled {
    padding-left: 40px;
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
