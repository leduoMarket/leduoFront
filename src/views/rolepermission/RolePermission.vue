<template>
  <div class="RolePermission">
    <Menu></Menu>
    <TopBar></TopBar>
    <router-view></router-view>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>权限管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">新建</el-button>
      </div>
      <div>
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
              <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="del">删除</span></el-button>
            </template>
          </el-table-column>
        </el-table>
<!--        <el-pagination-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--          :current-page="currentPage"-->
<!--          :page-sizes="[3,5, 10, 20, 40]"-->
<!--          :page-size="pagesize"-->
<!--          layout="total, sizes, prev, pager, next, jumper"-->
<!--          :total="tableData.length">-->
<!--        </el-pagination>-->
      </div>
    </el-card>

  </div>
</template>

<script>
    import TopBar from "D:/web/leduoFront/src/components/template/TopBar";
    import Menu from "D:/web/leduoFront/src/components/template/Menu";
    export default {
        name: "RolePermission",
        components: {TopBar,Menu},
        data() {
            return {
                options: [],
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

                }
                ],
                pagesize:5,  //分页数量
                currentPage:1 //初始页
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
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
