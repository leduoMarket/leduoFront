<template>
  <div>
    <router-view></router-view>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>员工基本信息</span>
      <el-button style="float: right; padding-right: 3px;" type="text"><span style="color: red">删除</span></el-button>
      <el-button style="float: right; padding-right: 3px;" type="text">编辑</el-button>
      <el-button style="float: right; padding-right: 3px;" type="text">
        <router-link to="addemployee">新建</router-link>

      </el-button>
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
    <span>共{{itemCount}}条记录</span>
  </el-card>
  </div>
</template>

<script>
    export default {
        name: "StockIn",
        data() {
            return {
                options: [],
                tableData: [],
                itemCount:[],
            }
        },
        // methods:{
        //     addEmployee(){
        //         this.$router.replace({path: 'addemployee'})
        //         console.log("addEmploee")
        //     },
        // },
        created() {
                this.$axios.get("/emps").then(res=>{
                    if(res.data){
                        console.log(res)
                        this.tableData = res.data;
                        this.itemCount = res.data.length;
                        console.log(this.itemCount);
                    }
                }).catch(failResponse=>{

                })
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
