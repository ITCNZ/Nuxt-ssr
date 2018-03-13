<template>
    <h1>
      编辑文章页面
    </h1>
</template>

<script>
  import axios from 'axios'
  export default {
    layout: 'edit',
    head() {
      return {
        title: "编辑、修改文章页面",
        meta: [
          { hid: 'description', name: 'description', content: '编辑文章页面,编辑文章页面,编辑文章页面'},
          { hid: 'keywords', name: 'keywords', content: '关键词1,关键词2'}
        ]
      }
    }
  }
</script>
