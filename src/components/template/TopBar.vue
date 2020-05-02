<template>
  <el-container style="height: auto;">
    <el-col :span="12" style="width: 100%">
      <div class="header-info">
        <span>消息</span>
        <span>帮助</span>
        <span>账户</span>
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
  .header-info span{
    margin-right: 25px;
    vertical-align: middle;
    color: white !important;
  }
</style>
