<template>
  <div class="RolePermission">
    <el-card class="box-card">
      <div slot="header" class="clearFix">
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
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="uName"
            label="用户名"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="uRole"
            label="角色"
            align="center"
            width="150" >
            <template slot-scope="scope1">
              <el-select v-model="scope1.row.uRole" placeholder="请选择" value="" size="mini" style="width:100px;margin-left: 35px"  @change="changeRole(scope1.row,scope1.$index)">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column
            prop="uStatus"
            label="是否允许登录"
            width="150"
            align="center"
            style="margin-left: 10px"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.uStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="0"
                @change="changeStatus(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3,5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataEnd.length">
        </el-pagination>
      </div>
    </el-card>

  </div>
</template>

<script>
    export default {
        name: "RolePermission",
        data() {
            return {
                scope1:null,
                scope:null,
                options: [{
                    value:"管理员",
                    label:"经理"
                },{
                    value: "财务",
                    label: "财务"
                },{
                    value:"员工",
                    label:"员工"
                }
                ],
                //从数据中获得的数据
                tableData: [],
                //最后显示在表单的内容
                tableDataEnd:[],
                pageSize:5,
                currentPage:1,
            }
        },
        created(){
            // 前端测试部分
            this.tableData = [];
            // 从后端获得数据
            this.$axios.get("/admin/getAllemployees").then(res =>{
                if(res.data.code ===200){
                    this.tableData=res.data.data;
                    this.tableDataEnd=[];
                    let item={
                        uid:'',
                        uName:'',
                        uStatus:'',
                        uRole:'',
                    };
                    this.tableData.forEach((value) =>{
                        item.uid=value.uid;
                        item.uName=value.userName;
                        item.uRole=value.role;
                        item.uStatus=""+value.status;
                        this.tableDataEnd.push(item);
                        item={
                            uid:'',
                            uName:'',
                            uStatus:'',
                            uRole:'',
                        };

                    });
                }
            }).catch(fail =>{
                this.$message.warning(fail.message);
            });

        },

        methods: {
            changeRole(item){

                    this.$axios.put('/admin/changeStatus',{
                        uid:item.uid,
                        role:item.uRole,
                        status:item.uStatus
                    }).then(()=>{
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    }).catch(() =>{
                        this.$message({
                            type: 'error',
                            message: '修改失败'
                        });
                    })

            },
            changeStatus(item){
                this.$axios.put('/admin/changeStatus',{
                    uid:item.uid,
                    role:item.uRole,
                    status:item.uStatus
                }).then(res =>{
                    this.$message({
                        type: 'success',
                        message: res.data.message
                    });
                }).catch(() =>{
                    this.$message({
                        type: 'error',
                        message: '修改失败'
                    });
                });
            },
            //初始页currentPage、初始每页数据数pageSize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
        }


    }
</script>

<style scoped>
  div[class*='item']{
    margin-bottom: 10px;

  }

  .box-card{
    width: 75%;
  }
  .header-info span{
    /*margin-right: 25px;*/
    vertical-align: middle;
  }

</style>
