<template>
  <div class="pageaction" style="text-align: center; margin: 20px 0">
    <el-pagination
      background
      v-show="hasPaging"
      layout="prev, pager, next"
      :page-size="pageSize"
      v-on:current-change="currentChange"
      :total="total"
      :current-page="currentPage">
    </el-pagination>
  </div>
</template>

<script>
  export default{
    props : ['total','pageSize', 'currentPage', 'page-change'],
    data(){
      return{
      }
    },
    methods : {
      currentChange : function(index){
        this.$emit("page-change",index);
      }
    },
    computed : {

      hasPaging: function(){
        return this.total / this.pageSize  > 1
      }

    }
  }
</script>
