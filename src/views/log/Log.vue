<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>日志查询</span>
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
    width: 75%;
  }
  .form {
    height: 200px;
  }
</style>
