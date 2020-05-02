<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>新建日志查询</span>
      <el-button style="float: right; padding-right: 3px;" type="text"><span style="color: red">保存</span></el-button>
    </div>
    <div class="form">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="ddate"
          label="操作日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dname"
          label="操作人员"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dposition"
          label="职位">
        </el-table-column>
        <el-table-column
          prop="devent"
          label="操作事件">
        </el-table-column>
      </el-table>
    </div>
    <span>取消</span>
  </el-card>
</template>
<script>
    export default {
        name: "StockIn",
        data() {
            return {
                options: [],
                tableData: [],
            }
        }
    }
</script>
<style scoped>
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 50px;
  }
  .box-card {
    width: 75%;
  }
  .form {
    height: 200px;
  }
</style>
