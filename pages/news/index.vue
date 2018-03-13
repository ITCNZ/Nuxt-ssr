<template>
  <section class="container">
    <h1>
      这是文章列表页面
    </h1>
    <div class="list">
      <ul class="list-ul">
        <li v-for="(item, index) in datas" :key="index">
          <nuxt-link :to="`/news/${item._id}`">{{item.title}}</nuxt-link>
          <span class="caozuo">
            <nuxt-link :to="`/edit/${item._id}`">修改</nuxt-link>
            <button @click="deletFn(item._id)">删除</button>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  export default {
    head() {
      return {
        title: '这是文章的列表页面',
        meta: [
          { hid: 'description', name: 'description', content: '这是useryemian一段描述文字' }
        ]
      }
    },
    data(){
      return {
        datas: ''
      }
    },
    asyncData ({ params, error }) {
      return axios.get('http://localhost:3333/api/newslist')
      .then((res) => {
        return { datas: res.data }
      }).catch (err => {
          console.log('报错了啊')
      })
    },
    methods: {
      deletFn(id) {
        axios.get('http://localhost:3333/api/newsdelet/' + id)
        .then((res) => {
          alert('文章删除成功!')
        }).then((res) => {
          location.reload()
        }).catch (err => {
            console.log('报错了啊', err)
        })
      }
    }
  }
</script>

<style scoped>
  li{
    overflow: hidden;
    padding: 2px 0;
  }
  .caozuo{
    float: right;
  }
  .caozuo a,button{
    margin-left: 20px;
    font-size: 12px;
    color: #666;
  }
</style>
