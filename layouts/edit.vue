<template>
    <div class="edit container">
      <nuxt/>
      <el-form :model="editData" :rules="rules" ref="editForm" label-width="100px" class="form-edit">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="editData.title"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="editData.author"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <div class="quill-editor"
               :content="editData.content"
               @change="onEditorChange($event)"
               @blur="onEditorBlur($event)"
               @focus="onEditorFocus($event)"
               @ready="onEditorReady($event)"
               v-quill:myQuillEditor="editorOption">
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitNews('editForm')">立即发表</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs';
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import 'quill/dist/quill.core.css'
  export default {
    data(){
      return {
        editData: {
          title: '',
          author: '',
          date: '',
          content: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 5, message: '长度在不得少于5个字符', trigger: 'blur' }
          ],
          author: [
            { required: false, message: '请输入文章作者', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入文章内容', trigger: 'blur' }
          ]
        },
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['clean']
            ]
          }
        }

      }
    },
    beforeMount () {
      if (!this.$route.params.id) return;
      Util.Net.getJSON('/api/newslist/' + this.$route.params.id) // 此处使用的是自己封装的请求插件
        .then(res => {
          this.editData.title = res.data.title;
          this.editData.author = res.data.author;
          this.editData.date = res.data.date;
          this.editData.content = res.data.content;
        }, err => {
          console.log('报错啦', err)
        })
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitNews(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {

            if (this.$route.params.id) { // 修改,编辑
              axios.post('/api/newsedit/' + this.$route.params.id, qs.stringify(this.editData))
              .then((res) => {
                Util.UI.toast('文章修改成功!', 'success')
              }).then((res) => {
                this.$router.push('/news')
              }).catch (err => {
                Util.UI.toast('修改文章失败!', 'error')
              })
            } else{// 新建
              this.editData.author = this.editData.author ? this.editData.author : '佚名';
              axios.post('/api/newsedit', qs.stringify(this.editData))
              .then((res) => {
                Util.UI.toast('发表文章成功!', 'success')
              }).then((res) => {
                console.log('成功啦----')
                this.$router.push('/news')
              }).catch (err => {
                Util.UI.toast('发表文章失败!', 'error')
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },

      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
//        console.log('editor change!', editor, html, text)
        this.editData.content = html
      }

    },
    components: {

    }
  }
</script>

<style scoped lang="scss">
  .form-edit{
    max-width: 72%;
  }
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
