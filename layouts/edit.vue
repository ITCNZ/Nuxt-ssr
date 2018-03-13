<template>
    <div class="edit container">
      <nuxt/>
      <form id="saveReportForm" method="post">
        <p>
          <label for="title">文章标题:</label>
          <input type="text" id="title" name="title" placeholder="文章标题" v-model="editData.title">
        </p>
        <p>
          <label for="author">作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者:</label>
          <input type="text" id="author" name="author" placeholder="作者" v-model="editData.author">
        </p>
        <!--<p>-->
          <!--<label for="content">文章内容:</label>-->
          <!--<textarea id="content" name="content" placeholder="文章内容" v-model="editData.content"></textarea>-->
        <!--</p>-->

        <div class="quill-editor-box">
          <label>文章内容:</label>
          <div class="quill-editor"
               :content="editData.content"
               @change="onEditorChange($event)"
               @blur="onEditorBlur($event)"
               @focus="onEditorFocus($event)"
               @ready="onEditorReady($event)"
               v-quill:myQuillEditor="editorOption">
          </div>
        </div>
        <p>
          <input type="button" value="发表" @click="submitNews()">
        </p>
      </form>
    </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs';
  export default {
    data(){
      return {
        editData: {
          title: '',
          author:'',
          date:'',
          content: ''
        },
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction
              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
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
    created () {
      if (!this.$route.params.id) return;
      axios.get('http://localhost:3333/api/newslist/' + this.$route.params.id, {
        proxy: {
          host: '127.0.0.1',
          port: 3000
        }
      })
      .then((res) => {
        this.editData.title = res.data.title;
        this.editData.author = res.data.author;
        this.editData.date = res.data.date;
        this.editData.content = res.data.content;
      }).catch (err => {
          console.log('报错了啊')
      })
    },
    methods: {
      submitNews() {
        if (this.$route.params.id) { // 修改,编辑
          axios.post('http://localhost:3333/api/newsedit/' + this.$route.params.id, qs.stringify(this.editData), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            alert('文章修改成功!')
        }).then((res) => {
            this.$router.push('/news')
        }).catch (err => {
              console.log('报错了啊')
          })
        } else{// 新建
          axios.post('http://localhost:3333/api/newsedit', qs.stringify(this.editData), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
           .then((res) => {
            alert('发表文章成功!')
        }).then((res) => {
            this.$router.push('/news')
        }).catch (err => {
            console.log('报错了啊')
        })

        }
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
        console.log('editor change!', editor, html, text)
        this.editData.content = html
      }

    },
    components: {

    }
  }
</script>

<style scoped>
  .quill-editor-box{
    max-width: 40%;
  }
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
