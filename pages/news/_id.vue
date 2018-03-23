<template>
  <section class="container">
    <h1>
      {{datas.title}}
    </h1>
    <div class="about">
      作者: {{datas.author}}  发表时间:{{datas.date}}
    </div>
    <div class="art-body" v-html="datas.content"></div>
  </section>
</template>

<script>
  import axios from 'axios'
  export default {
    head() {
      return {
        title: this.datas.title,
        meta: [
          { hid: 'description', name: 'description', content: '这是网页的描述,' + this.datas.title},
          { hid: 'keywords', name: 'keywords', content: '关键词1,关键词2'}
        ]
      }
    },
    data(){
      return {
        datas: ''
      }
    },
    asyncData ({ params, error }) {
      return axios.get('http://localhost:3333/api/newslist/' + params.id)
          .then((res) => {
          return { datas: res.data }
        }).catch (err => {
          console.log('报错了啊')
      })
    }
  }
</script>

<style scoped lang="scss">
  h1,.about {
    text-align: center;
    margin-bottom: 15px;
  }
</style>
