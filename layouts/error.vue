<template>
  <div class="main">
    <h2 v-if="error.statusCode==404">404页面不存在</h2>
    <h2 v-else>500服务器错误</h2>
    <ul>
      <li><nuxt-link to="/">返回主页面</nuxt-link></li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
  .main{
    text-align: center;
    padding-top: 200px;
    min-height: 500px;;
  }
</style>
<script>
  export default {
    props:['error'],
  }
</script>
