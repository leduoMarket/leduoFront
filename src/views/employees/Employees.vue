<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>员工基本信息</span>
        <!--        新增员工弹窗-->
        <el-button style="float: right; padding-right: 3px;" type="text" @click="dialogFormVisible = true">新增
        </el-button>
        <el-dialog title="员工基本信息" :visible.sync="dialogFormVisible">
          <el-form :model="userInfo">
            <el-form-item label="员工编号" :label-width="formLabelWidth">
              <el-input v-model="userInfo.eid" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名" :label-width="formLabelWidth">
              <el-input v-model="userInfo.ename" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="userInfo.ephone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
              <el-input v-model="userInfo.erole" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="工资" :label-width="formLabelWidth">
              <el-input v-model="userInfo.esalary" autocomplete="off"></el-input>
            </el-form-item>
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
              <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red"
                                                                                    @click="del(scope.$row,scope.$index)">删除</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<!--javaScript代码-->
<script>
    export default {
        name: "StockIn",
        data() {
            return {
                // 标记删除或者添加是否成功
                addSuccessful: false,
                // delSuccessful: false,
                // 在基础表格中展示的数据
                tableData: [],
                // 控制员工新增页面的form表单可见性
                dialogFormVisible: false,
                //删除的元素是谁
                delItem: [],
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
        // 创建的时候发送请求获取显示数据库所有员工的列表数据
        created() {
            console.log("vue被创建");
            this.$axios.get("/emps").then(res => {
                if (res.data) {
                    console.log(res)
                    this.tableData = res.data;
                }
            }).catch(failResponse => {

            })
        },
        methods: {
            // 执行新增员工操作
            addEmployee() {
                if (!this.userInfo.eid) {
                    console.log("员工号为空");
                    return;
                }
                this.$axios.post('/addemp', {
                    eid: this.userInfo.eid,
                    ename: this.userInfo.ename,
                    ephone: this.userInfo.ephone,
                    erole: this.userInfo.erole,
                    esalary: this.userInfo.esalary,
                }).then(successResponse => {
                    if (successResponse.data.code == 200) {
                        this.addSuccessful = true;
                    }
                }).catch(failedResponse => {
                    this.addSuccessful = false;
                });
                if (!this.addSuccessful) {
                    this.$message.error('插入数据失败');
                } else {
                    this.tableData.push(this.userInfo);
                    this.$message({
                        message: '成功添加一条记录',
                        type: 'success'
                    });
                }
                // 将填写框置空，方便下次填写
                this.userInfo = {
                    eid: '',
                    ename: '',
                    ephone: '',
                    erole: '',
                    esalary: ''
                };
                // 让表格消失
                this.dialogFormVisible = false;
            },

            // 删除选中下标的一行数据，index由click处的scope.$index传过来的小标，delItem由scope.$row传过来的元素
            del(delItem, index) {
                this.$confirm('你确定要删这条记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delItem = this.tableData.splice(index, 1),
                        this.$axios.get('/delemp/'+String(delItem.eid)).then(successResponse => {
                            this.$message({
                                type: 'success',
                                // 删除index处的一条记录
                                message: '删除成功!'
                            });
                        }).catch(failedResponse => {
                            this.$message({
                                type: 'info',
                                message: '删除失败'
                            });
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已删除取消'
                    });
                });
                console.log(delItem);
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
    height: 200px;
  }
</style>
