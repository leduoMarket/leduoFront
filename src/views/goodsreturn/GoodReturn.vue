<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>退货单</span>
    </div>
    <div class="form">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="gid"
          label="商品代码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="rdate"
          label="退货日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="rreason"
          label="退货原因">
        </el-table-column>
      </el-table>
    </div>
    <span>共0条记录</span>
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

  .box-card {
    width: 75%;
  }
  .form {
    height: 200px;
  }
</style>
