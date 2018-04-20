<template>
  <section class="container">
    <div class="login_logout">
      <h1>Login</h1>
      <div class="list">
        <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="60px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="userName">
            <el-input type="text" v-model="ruleForm2.userName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input type="password" v-model="ruleForm2.passWord" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
  import Api from '../../utils/api'
  export default {
    head() {
      return {
        title: 'login页面',
        meta: [
          { hid: 'description', name: 'description', content: 'login页面....' }
        ]
      }
    },
    data(){
      return {
        ruleForm2: {
          userName: '',
          passWord: ''
        }
      }
    },

    methods: {
      async login() {
        try {
          await this.$store.dispatch('login', this.ruleForm2)
          Util.UI.toast('登录成功!', 'success')
          this.$router.push(`/`)
        } catch (e) {
          this.formError = e.message
        }
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped lang="scss">
  .container{
    -webkit-box-shadow: none;
    box-shadow: none;
    .login_logout{
      padding: 20px;
      border-radius: 5px;
      -webkit-box-shadow: 0 0 6px rgba(99, 99, 99, .4);
      box-shadow: 0 0 6px rgba(99, 99, 99, .4);
      width: 360px !important;
      height: 300px !important;
      margin-left: -180px;
      margin-top: -150px;
      position: absolute;
      left: 50%;
      top:50%;
      min-height: 300px;
    }
  }
  footer{
    display: none;
  }
</style>
