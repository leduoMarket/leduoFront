<template>
  <el-container style="height: auto;">
    <el-col :span="12" style="width: 100%">
      <div class="header-info">
        <el-button style="float: right; padding: 3px 8px" type="text">账户</el-button>
        <a href="http://localhost:8080/home/help">
          <el-button style="float: right; padding: 3px 8px" type="text">帮助</el-button>
        </a>
        <el-button style="float: right; padding: 3px 8px" type="text">消息</el-button>
      </div>
    </el-col>
  </el-container>
</template>
<script>
export default {
  name: 'TopBar'
}
</script>
<style scoped>
  .header-info{
    text-align: right;
    background-color: #F7F7FB;
    height: 30px;
    background-color:rgba(0,0,0,0);
    margin-bottom: 25px;
    margin-top: 10px;
  }
  .header-info button{
    margin-right: 25px;
    vertical-align: middle;
    color: white !important;
  }
</style>
