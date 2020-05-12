<template>
  <div class="employees">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>员工基本信息</span>
        <!--        新增员工弹窗-->
        <!--<el-button style="float: right; padding-right: 3px;" type="text" @click="dialogFormVisible = true">新增
        </el-button>
        <el-dialog title="员工基本信息" :visible.sync="dialogFormVisible">
          <el-form :model="userInfo" :rules="employeesRules" ref="userInfo">
            <el-form-item label="员工编号" :label-width="formLabelWidth" prop="eid">
              <el-input v-model="userInfo.eid" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名" :label-width="formLabelWidth" prop="ename">
              <el-input v-model="userInfo.ename" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth" prop="ephone">
              <el-input v-model="userInfo.ephone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth" prop="erole">
              <el-input v-model="userInfo.erole" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="工资" :label-width="formLabelWidth" prop="esalary">
              <el-input v-model="userInfo.esalary" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addEmployee">确 定</el-button>
          </div>
        </el-dialog>-->
      </div>
      <div class="form">
       <!-- <el-select v-model="selectTags" clearable size="medium"  placeholder="请选择" value="" >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="searchInput" placeholder="请输入信息"  size="medium" style="width:240px; margin-right:23% ;margin-bottom: 1.5%"></el-input>

        <el-button type="primary" icon="el-icon-search" @click="doFilter"  size="medium" round  plain>搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="doReset" size="medium"  round  plain >重置</el-button>-->
        <el-table
          :data="tableDataEnd.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border
          style="width: 100%">
          <el-table-column
            prop="uid"
            label="员工编号"
            width="180"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="用户名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色">
          </el-table-column>
          <el-table-column
            prop="satatus"
            label="帐号状态">
          </el-table-column>
          <el-table-column
            prop="ehandle"
            label="操作">
            <template slot-scope="scope">
              <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="del(scope.row,scope.$index)">删除</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3,5, 10, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataEnd.length">
        </el-pagination>
      </div>

  </el-card>
  </div>
</template>
<!--javaScript代码-->
<script>
  import {
      reg_eid,
      reg_ename,
      reg_erole,
      reg_money,
      reg_phone
  } from "../login/validator";
  export default {
        name: "Employees",
        data() {
            return {
                addSuccessful:false,
                // delSuccessful: false,
                // 在基础表格中展示的数据
                tableData: [],
                // 控制员工新增页面的form表单可见性
                dialogFormVisible: false,
                //删除的元素是谁
                delItem: [],
                // 用于新增员工数据时候的绑定
                userInfo: {
                    uid: '',
                    user_name: '',
                    phone: '',
                    role: '',
                    satatus: ''

                },
                formLabelWidth: '120px',
                pagesize:5,
                currentPage:1, //初始页

                //初始数据的长度
                totalItems:0,
                //最后在页面中显示的数据
                tableDataEnd:[],
                //搜索框内的数据
                searchInput:"",
                filterTableDataEnd:[],
                flag:false,
                selectTags:"",

                /*employeesRules:{
                    eid:[
                        {required:true ,validator: reg_eid,  trigger: 'blur'}
                    ],
                    ename:[
                        {required:true ,validator: reg_ename,  trigger: 'blur'}
                    ],
                    ephone:[
                        {required:true ,validator: reg_phone,  trigger: 'blur'}
                    ],
                    erole:[
                        {required:true ,validator: reg_erole,  trigger: 'blur'}
                    ],
                    esalary:[
                        {required:true ,validator: reg_money,  trigger: 'blur'}
                    ]
                },*/
                //选择框的选项
                options: [{
                    value: 'uid',
                    label: '员工编号'
                }, {
                    value: 'user_name',
                    label: '员工姓名'
                },{
                    value: 'role',
                    label: '角色'
                }
                ],
                value: ''
                }
        },
        // 创建的时候发送请求获取显示数据库所有员工的列表数据
        created() {

            this.$axios.get("/admin/emps").then(res => {
                if (res.data) {
                    console.log(res);
                    this.tableData = res.data;
                    this.totalItems = this.tableData.length;
                    this.tableDataEnd = this.tableData;
                    console.log(this.tableData.length);
                }
            }).catch(failResponse => {

            })
        },
        methods: {
            doFilter(){
                var selectTag = this.selectTags;
                if(this.searchInput == ""){
                    this.$message.warning("查询信息不能为空！！！");
                    return;
                }
                this.tableDataEnd=[];
                this.filterTableDataEnd=[];
                this.tableData.forEach((value,index)=>{
                    if(selectTag=="uid"){
                        if(value.uid){
                            if(value.uid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="user_name"){
                        if(value.user_name){
                            if(value.user_name.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="role"){
                        if(value.role){
                            if(value.role.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    console.log(index);
                });
                this.tableDataEnd=this.filterTableDataEnd;
                this.filterTableDataEnd=[];
            },
            doReset(){
                this.searchInput="";
                this.tableDataEnd = this.tableData;
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage)
            },
            // 执行新增员工操作
            /*addEmployee() {
                this.$refs.userInfo.validate()
                    .then(res =>{
                        this.$axios.post('/admin/addemp', {
                            eid: this.userInfo.eid,
                            ename: this.userInfo.ename,
                            ephone: this.userInfo.ephone,
                            erole: this.userInfo.erole,
                            esalary: this.userInfo.esalary,
                        }).then(successResponse => {
                            if (successResponse.data.code == 200) {
                                this.addSuccessful=true;
                                this.$message({
                                    message: '成功添加一条记录',
                                    type: 'success',
                                });
                                //将信息刷新到表格中
                                this.tableData.push(this.addform);
                                this.tableDataEnd.push(this.addform);
                                //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                                this.userInfo = {
                                    eid: '',
                                    ename: '',
                                    ephone: '',
                                    erole: '',
                                    esalary: ''
                                };
                                // console.log("userInfo"+this.userInfo.eid);
                            }
                        }).catch(failedResponse => {
                            this.$message({
                                message: '添加失败',
                            });
                        });
                        // 将填写框置空，方便下次填写
                        // 让表格消失
                        this.userInfo = {
                            eid: '',
                            ename: '',
                            ephone: '',
                            erole: '',
                            esalary: ''
                        };
                        // 让表格消失
                        this.dialogFormVisible = false;
                    }).catch(error =>{
                    console.log("提交失败");
                    this.$message({
                        message: '无法提交，表单中数据有错误',
                        type: 'error'
                    });
                });


            },*/

            // 删除选中下标的一行数据，index由click处的scope.$index传过来的下标，delItem由scope.$row传过来的元素
            del(delItem, index) {
                this.$confirm('你确定要删这条记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/home/delemp', {
                        params: {
                            empId: delItem.eid
                        }
                    }).then(successResponse => {
                        //数据库删除成功在table表里进行删除,
                        this.tableData.splice(index, 1);
                        this.tableDataEnd.slice(index,1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                    }).catch(failedResponse => {
                        //用户同意删除情况下数据库删除失败
                        this.$message({
                            type: 'info',
                            message: '删除失败'
                        });
                    })
                }).catch(() => {
                    //用户取消了删除
                    this.$message({
                        type: 'info',
                        message: '已删除取消'
                    });
                });
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
