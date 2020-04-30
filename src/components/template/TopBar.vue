<template>
  <el-container style="height: auto; border: 1px solid #eee">
    <el-col :span="12" style="width: 100%">
      <div class="header-info">
        <span>消息</span>
        <span>帮助</span>
        <span>账户</span>
      </div>
      <div class="locate-page">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">采购</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">入库单</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

    </el-col>
  </el-container>
</template>

<script>
export default {
  // 实现手动打开和关闭菜单
  name: 'TopBar'
}
</script>

<style scoped>
  .header-info{
    text-align: right;
    background-color: #F7F7FB;
    height: 30px;
  }
  .header-info span{
    margin-right: 25px;
    vertical-align: middle;
  }
  .el-breadcrumb{
    height: 30px;
    background-color: #EAEAFD;
    line-height: 30px;
    /*设置居中*/
  }
</style>
