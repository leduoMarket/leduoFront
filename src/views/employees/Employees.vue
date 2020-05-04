<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>员工基本信息</span>
<!--        新增员工弹窗-->
        <el-button style="float: right; padding-right: 3px;" type="text" @click="openAddPage">新增
        </el-button>
        <el-dialog title="新增员工基本信息" :visible.sync="dialogFormVisible">
          <el-form :model="userInfo" >
<!--             <el-form-item label="员工编号" :label-width="formLabelWidth">-->
<!--               输入框的内容和数据绑定-->
              <el-input  placeholder="员工编号" v-model="userInfo.eid" autocomplete="off" clearable></el-input>
<!--            </el-form-item>-->
<!--            <el-form-item label="员工姓名" :label-width="formLabelWidth">-->
              <el-input  placeholder="员工姓名" v-model="userInfo.ename" autocomplete="off" clearable></el-input>
<!--            </el-form-item>-->
<!--            <el-form-item label="电话" :label-width="formLabelWidth">-->
              <el-input  placeholder="电话号码" v-model="userInfo.ephone" autocomplete="off" clearable></el-input>
<!--            </el-form-item>-->
<!--            <el-form-item label="角色" :label-width="formLabelWidth">-->
              <el-input  placeholder="角色" v-model="userInfo.erole" autocomplete="off" clearable></el-input>
<!--            </el-form-item>-->
<!--            <el-form-item label="工资" :label-width="formLabelWidth">-->
              <el-input  placeholder="工资" v-model="userInfo.esalary" autocomplete="off" clearable></el-input>
<!--            </el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addEmployee">确 定</el-button>
          </div>
        </el-dialog>
      </div>
<!--      搜索框-->
      <div class="text item">
        <el-input style="width: 300px"
          placeholder="请输入员工编号"
          v-model="input"
          clearable>
        </el-input>
        <el-button round>查询</el-button>
      </div>

<!--      展示的table表格-->
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
            <el-table-column
              prop="esalary"
              label="操作">
              <template slot-scope="scope">
                            <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="del">删除</span></el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <span>共{{itemCount}}条记录</span>
    </el-card>
  </div>
</template>

<!--javaScript代码-->
<script>
    export default {
        name: "StockIn",
        data() {
            return {
                tableData: [{
                    eid:'1',
                    ename: '',
                    ephone: '',
                    erole: '',
                    esalary: ''},
                    {
                    eid:'2',
                    ename: '',
                    ephone: '',
                    erole: '',
                    esalary: ''
                }],

                // 计算总共有多少条数据
                itemCount: [],
                // 控制员工新增页面的form表单可见性
                dialogFormVisible: false,
                delItem: 0,
                // 用于新增员工数据时候的绑定
                userInfo: {
                    eid: '',
                    ename: '',
                    ephone: '',
                    erole: '',
                    esalary: ''

                }
            }
        },
        created() {
            console.log("vue被创建");
            this.$axios.get("/emps").then(res => {
                if (res.data) {
                    console.log(res)
                    this.tableData = res.data;
                    if (res.data.length == 0) {
                        this.itemCount = 0;
                    } else {
                        this.itemCount = res.data.length;
                    }
                    console.log(this.itemCount);
                }
            }).catch(failResponse => {

            })
        },
        methods: {
            openAddPage(){
                this.dialogFormVisible = true;

            },
            addEmployee() {
                if(!this.userInfo.eid){
                    console.log("员工号为空");
                    return;
                }
                this.tableData.push(this.userInfo);
                this.userInfo = {
                    eid: '',
                    ename: '',
                    ephone: '',
                    erole: '',
                    esalary: ''
                }
                this.dialogFormVisible = false;
                console.log("新增被点击")
            },
            del(index){
                console.log("删除被点击"+index);
                delItem = this.tableData.splice(index,1);
                console.log(delItem);
            },
            // delemp() {
            //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         this.$message({
            //             type: 'success',
            //             message: '删除成功!'
            //         });
            //     }).catch(() => {
            //         this.$message({
            //             type: 'info',
            //             message: '已取消删除'
            //         });
            //     });
            // }
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
