<template>
  <div class="RolePermission">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>权限管理</span>
      </div>
      <div>
        <el-table
          :data="tableDataEnd"
          fixed="center"
          style="width: 100%;margin-left: 50px">
          <el-table-column
            prop="uid"
            label="用户账号"
            height="15"
            width="120">
          </el-table-column>
          <el-table-column
            prop="uname"
            label="用户名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="urole"
            label="角色"
            width="120">
          </el-table-column>
          <el-table-column
            prop="esalary"
            fixed="right"
            label="操作"  >
            <template slot-scope="scope">
              <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="updateForm">编辑</span></el-button>
              <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: deepskyblue" @click="delForm">删除</span></el-button>
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
                    uid:"1234567",
                    uname:"张三",
                    urole:"经理",
                    ustatus:0,

                },{
                    uid:"2234567",
                    uname:"李芳",
                    urole:"财务员",
                    ustatus:1,


                },{
                    uid:"3234567",
                    uname:"李四",
                    urole:"销售员",
                    ustatus:0,

                }],
                //最后显示在表单的内容
                tableDataEnd:[],
            }
        },
        created(){
            this.tableDataEnd=[];
            this.tableData.forEach((value,index) =>{
                this.tableDataEnd.push(value);
            });

        },

        methods: {
            updateForm(){

            },
            change:function(index,row){
                console.log(row.ustatus);
            }

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
