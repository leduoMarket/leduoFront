<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>日志查询</span>
      <el-button style="float: right; padding-right: 3px;" type="text">新建</el-button>
    </div>
    <div class="text item">
      <div class="text item">
        <el-input style="width: 300px"
                  placeholder="请输入员工编号"
                  v-model="input"
                  clearable>
        </el-input>
        <el-button round>查询</el-button>
      </div>
    </div>
    <div class="form">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%">
        <el-table-column
          prop="ddate"
          label="操作日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dname"
          label="操作人员编号"
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3,5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
  </el-card>
</template>
<script>
    export default {
        name: "StockIn",
        data() {
            return {
                options: [],
                tableData: [],
                pagesize:5,  //分页数量
                currentPage:1 //初始页
            }
        },
        methods: {
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage)
            },
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
    height: 100%;
  }
</style>
