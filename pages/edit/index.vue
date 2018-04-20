<template>
    <h1>
      创建文章页面
    </h1>
</template>

<script>
  import axios from 'axios'
  export default {
    middleware: 'auth',
    layout: 'edit',
    head() {
      return {
        title: "创建文章页面",
        meta: [
          { hid: 'description', name: 'description', content: "创建文章页面创建文章页面创建文章页面..."},
          { hid: 'keywords', name: 'keywords', content: '关键词1,关键词2'}
        ]
      }
    }
  }
</script>
