<template>
  <div class="RolePermission">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>权限管理</span>
      </div>
      <div>
        <el-table
          :data="tableDataEnd"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="序号"
            width=50%>
          </el-table-column>
          <el-table-column
            prop="role"
            label="权限角色"
            width="100">
          </el-table-column>
          <el-table-column
            prop="ability"
            label="描述"
            width="335">
          </el-table-column>
          <el-table-column
            prop="rmember"
            label="成员"
            width="">
          </el-table-column>
          <el-table-column
            prop="esalary"
            label="操作">

            <template slot-scope="scope">
              <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="updateForm">修改</span></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

  </div>
</template>

<script>
    export default {
        name: "RolePermission",
        data() {
            return {
                options: [],
                //从数据中获得的数据
                tableData: [{
                    id:1,
                    role:"经理",
                    ability:"拥有访问超市任何信息的权限",
                    rmember:"张三"
                },{
                    id:2,
                    role:"财务员",
                    ability:"拥有财务菜单栏下的所有权限",
                    rmember:"王五"

                },{
                    id:3,
                    role:"销售员",
                    ability:"拥有销售菜单栏、退货菜单栏下的所有权限",
                    rmember:"李四"

                },{
                    id:4,
                    role:"库房管理员",
                    ability:"拥有采购菜单栏、退货菜单栏、商品菜单栏下的所有权限",
                    rmember:"刘兰"

                }],
                //最后显示在表单的内容
                tableDataEnd:[],
            }
        },
        created(){

        },

        methods: {
            updateForm(){

            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            // handleSizeChange: function (size) {
            //     this.pagesize = size;
            //     console.log(this.pagesize)
            // },
            // handleCurrentChange: function (currentPage) {
            //     this.currentPage = currentPage;
            //     console.log(this.currentPage)
            // },
        }


    }
</script>

<style scoped>
  div[class*='item']{
    margin-bottom: 10px;

  }
  .header-info{
    text-align: right;
    background-color: #F7F7FB;
    height: 30px;
  }
  .box-card{
    width: 75%;
  }
  .header-info span{
    /*margin-right: 25px;*/
    vertical-align: middle;
  }
  .form {
    height: 100%;
  }
</style>
