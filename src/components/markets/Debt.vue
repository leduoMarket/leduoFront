<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>尚未结清款项</span>
      <el-button style="float: right; padding: 3px 0" type="text">新建</el-button>
    </div>
    <div class="text item">
      <el-select v-model="value" placeholder="请选择"  value="">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button round>查询</el-button>
    </div>
    <div class="form">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="vid"
          label="供应商代码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="vname"
          label="供应商名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="gid"
          label="商品代码">
        </el-table-column>
        <el-table-column
          prop="gid"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="inumber"
          label="单号">
        </el-table-column>
        <el-table-column
          prop="ddate"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="vcredit"
          label="信誉">
        </el-table-column>
        <el-table-column
          prop="dpayment"
          label="贷款结算">
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
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 50px;

  }
  .box-card {
    width: 83%;
  }
  .form {
    height: 200px;
  }
</style>
