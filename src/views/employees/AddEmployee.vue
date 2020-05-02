<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>新增员工基本信息</span>
      <el-button style="float: right; padding-right: 3px;" type="text">保存</el-button>
    </div>
    <div class="form">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="eid"
          label="员工编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ename"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ephone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="erole"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="esalary"
          label="工资/月">
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
        },
        // created() {
        //     this.$axios.get("/emps").then(res=>{
        //         if(res.data){
        //             console.log(res)
        //             this.tableData = res.data;
        //             this.itemCount = res.data.length;
        //             console.log(this.itemCount);
        //         }
        //     }).catch(failResponse=>{
        //
        //     })
        // }
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
