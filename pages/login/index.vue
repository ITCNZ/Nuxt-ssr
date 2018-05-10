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
          <el-form-item label="验证">
            <div id="captcha">
              <p id="wait" v-if="!showJiyan" class="show"><i class="el-icon-loading"></i>正在加载验证码......</p>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" id="btn">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
          <p class="username_pass">测试账号: 任意非空字符 密码: 123456</p>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
  import Api from '~/utils/api'
  import Cookie from 'js-cookie'
  export default {
    head() {
      return {
        title: 'login页面',
        meta: [
          { hid: 'description', name: 'description', content: 'login页面....' }
        ],
        script: [
          { src: 'gt.js', type: 'text/javascript' }
        ]
      }
    },
    data(){
      return {
        ruleForm2: {
          userName: '',
          passWord: ''
        },
        jiyanData: {
          geetest_challenge: '',
          geetest_validate: '',
          geetest_seccode: ''
        },
        showJiyan: false
      }
    },
    created() {
      Api.JiyanSlide()
      .then(res => {
          // 参数1：配置参数
          // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
        let _this = this;
          initGeetest({
            // 以下 4 个配置参数为必须，不能缺少
            gt: res.data.gt,
            challenge: res.data.challenge,
            offline: !res.data.success, // 表示用户后台检测极验服务器是否宕机
            new_captcha: res.data.new_captcha, // 用于宕机时表示是新验证码的宕机
            product: "float", // 产品形式，包括：float，popup
            width: "100%"
          }, function(captchaObj) {
            var captchaBox = document.getElementById('captcha');
            var wait = document.getElementById('wait');
            var btn = document.getElementById('btn');
            captchaObj.appendTo(captchaBox);
            captchaObj.onReady(function () {
              _this.showJiyan = true;
            });
            btn.onclick = function () {
              _this.ruleForm2.userName = _this.ruleForm2.userName.trim()
              Api.login(_this.ruleForm2)
              .then(info => {
                let result = captchaObj.getValidate();
                if (!result) {
                  return Util.UI.toast('请完成验证!', 'error')
                }

                _this.jiyanData.geetest_challenge = result.geetest_challenge;
                _this.jiyanData.geetest_validate = result.geetest_validate;
                _this.jiyanData.geetest_seccode = result.geetest_seccode;
                Api.JiyanValidate(_this.jiyanData)
                .then(res => {
                  if (res.data.status === 'success') {
                    Cookie.set('authUser', info.data)
                    Util.UI.toast('登录成功!', 'success')
                    _this.$router.push(`/`)
                  } else if (res.data.status === 'fail') {
                    Util.UI.toast('登录失败，请完成验证!', 'error')
                    captchaObj.reset();
                  }
                })

              }, err => {
                Util.UI.toast('账号或密码错误!', 'error')
              })
            }
          });
      })
    },
    methods: {
//      async login() {
//        try {
//          await this.$store.dispatch('login', this.ruleForm2)
//          Util.UI.toast('登录成功!', 'success')
//          this.$router.push(`/`)
//        } catch (e) {
//          Util.UI.toast('账号或密码错误!', 'error')
//        }
//      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
    console.log("jquery", this)
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
      /*height: 300px !important;*/
      margin-left: -180px;
      margin-top: -150px;
      position: absolute;
      left: 50%;
      top:50%;
      min-height: 300px;
    }
    .username_pass{
      font-size: 12px;
      color: #999;
      text-align: center;
    }
    #wait{
      line-height: 40px;
      color: #666;
    }
  }
  footer{
    display: none;
  }
</style>
