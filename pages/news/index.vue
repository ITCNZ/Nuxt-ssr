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
            <el-button size="mini" type="primary" @click="goFn(item._id)">查看</el-button>
            <el-button size="mini" type="success" @click="editFn(item._id)">修改</el-button>
            <el-button size="mini" type="danger" @click="deletFn(item._id)">删除</el-button>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import Api from '~/utils/api'
  export default {
    middleware: 'auth',
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
      return Api.newslist()
      .then((res) => {
        return { datas: res.data }
      }).catch (err => {
          console.log('报错了啊')
      })
    },

    methods: {
      deletFn(id) {
        Util.UI.confirm('确定删除这篇文章吗?').then(() => {
          Api.newsDelet(id)
          .then(res => {
            Util.UI.toast('文章删除成功!', 'success')
            setTimeout(() => {
              this.$router.go(0)
            }, 600)
          })
        }, () => {
          console.log('取消了')
        })

      },
      editFn(id) {
        this.$router.push(`/edit/${id}`)
      },
      goFn(id) {
        this.$router.push(`/news/${id}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  li {
    overflow: hidden;
    padding: 6px 0;
    border-bottom: 1px solid #f7f7f7;
    line-height: 29px;
    &:hover {
      background: #f7f7f7;
    }
  }
  .caozuo{
    float: right;
    a{
      margin-left: 20px;
      font-size: 12px;
      color: #666;
    }
    button{
      margin-left: 20px;
      font-size: 12px;
      color: #fff;
    }
  }
</style>
