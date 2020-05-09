<template>
  <div class="vender">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>供应商表</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="供应商表" :visible.sync="dialogFormVisible">
        <el-form :model="addform"  :rules="venderRules" ref="addform">
          <el-form-item label="供应商代码" :label-width="formLabelWidth" prop="vid">
            <el-input v-model="addform.vid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth" prop="vname">
            <el-input v-model="addform.vname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="vaddress">
            <el-input v-model="addform.vaddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="vphone">
            <el-input v-model="addform.vphone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="vemail">
          <el-input v-model="addform.vemail" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="传真" :label-width="formLabelWidth" prop="vfax">
            <el-input v-model="addform.vfax" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="信誉" :label-width="formLabelWidth" prop="vcredit">
            <el-input v-model="addform.vcredit" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="贷款结算" :label-width="formLabelWidth" prop="vsettle_account">
            <el-input v-model="addform.vsettle_account" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addVender">确 定</el-button>
        </div>
      </el-dialog>
    </div>
<!--    <div class="text item">-->
<!--      <el-input style="width: 300px"-->
<!--                placeholder="请输入供应商代码"-->
<!--                v-model="input"-->
<!--                clearable>-->
<!--      </el-input>-->
<!--      <el-button round>查询</el-button>-->
<!--    </div>-->
    <div class="form">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"  ref="filterTable">
        <el-table-column
          prop="vid"
          label="供应商代码"
          width="120"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="vname"
          label="供应商名称"
          width="100"

        >
        </el-table-column>
        <el-table-column
          prop="vaddress"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="vphone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="vemail"
          label="E-mail">
        </el-table-column>
        <el-table-column
          prop="vfax"
          label="传真">
        </el-table-column>
        <el-table-column
          prop="vcredit"
          label="信誉">
        </el-table-column>
        <el-table-column
          prop="vsettle_account"
          label="贷款结算">
        </el-table-column>
        <el-table-column
          prop="esalary"
          label="操作">

          <template slot-scope="scope">
            <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="del(scope.row,scope.$index)">删除</span></el-button>
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
        :total="tableData.length">
      </el-pagination>
    </div>
  </el-card>
  </div>
</template>

<script>
  import {
      reg_vid,
      reg_vname,
      reg_address,
      reg_phone,
      reg_email,
      reg_fax,
      reg_credit,
      reg_count
  } from "../login/validator";
  export default {
        name: "Vender",
        data() {
            return {
                //添加表单成功吗
                addSuccessful:false,
                // 在基础表格中展示的数据
                tableData: [],
                //删除的元素是谁
                delItem: [
                ],

                // 控制员工新增页面的form表单可见性
                dialogTableVisible: false,
                dialogFormVisible: false,
                addform: {
                    vid: '',
                    vname: '',
                    vaddress: '',
                    vphone: '',
                    vemail:'',
                    vfax: '',
                    vcredit: '',
                    vsettle_account: ''
                },
                formLabelWidth: '120px',
                pagesize:5,
                currentPage:1, //初始页

                venderRules:{
                    vid:[
                        { required:true ,validator: reg_vid,  trigger: 'blur'}
                    ],
                    vname:[
                        { required:true ,validator: reg_vname, trigger:'blur'}
                    ],
                    vaddress:[
                        { required:true ,validator: reg_address, trigger:'blur' }
                    ],
                    vphone :[
                        {required:true ,validator: reg_phone, trigger:'blur'}
                    ],
                    vemail: [
                        {required:true ,validator: reg_email, trigger:'blur'}
                    ],
                    vfax:[
                        {required:true ,validator: reg_fax, trigger:'blur'}
                    ],
                    vcredit:[
                        {required:true ,validator: reg_credit, trigger:'blur'}
                    ],
                    vsettle_account:[
                        {required:true ,validator: reg_count, trigger:'blur'}
                    ]
                }
            }
        },
      created() {
          this.$axios.get("/home/Vender").then(res=>{
              if(res.data){
                  console.log(res);
                  this.tableData = res.data;
                  console.log(this.tableData.length);
              }
          }).catch(failResponse=>{

          })
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
            addVender(){
                this.$refs.addform.validate()
                    .then(res =>{
                        this.$axios.post('/home/addVender', {
                            vid: this.addform.vid,
                            vname: this.addform.vname,
                            vaddress: this.addform.vaddress,
                            vphone: this.addform.vphone,
                            vemail: this.addform.vemail,
                            vfax: this.addform.vfax,
                            vcredit: this.addform.vcredit,
                            vsettle_account: this.addform.vsettle_account,

                        }).then(successResponse => {
                            if (successResponse.data.code === 200) {
                                this.addSuccessful = true;
                                this.$message({
                                    message: '成功添加一条记录',
                                    type: 'success',
                                });
                                //将信息刷新到表格中
                                this.tableData.push(this.addform);
                                //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                                this.addform = {
                                    vid: '',
                                    vname: '',
                                    vaddress: '',
                                    vphone: '',
                                    vemail:'',
                                    vfax: '',
                                    vcredit: '',
                                    vsettle_account: ''
                                };
                            }
                        }).catch(failedResponse => {
                            this.addSuccessful = false;
                        });

                        // 将填写框置空，方便下次填写
                        this.addform = {
                            vid: '',
                            vname: '',
                            vaddress: '',
                            vphone: '',
                            vemail:'',
                            vfax: '',
                            vcredit: '',
                            vsettle_account: ''
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
            },
            del(delItem, index) {
                console.log(delItem);
                this.$confirm('你确定要删除这条记录吗？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() =>{
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/home/delVender',{
                        params:{
                            venderId: delItem.vid
                        }
                    }).then(successResponse =>{
                        //数据库删除成功在table表里进行删除,
                        this.tableData.splice(index, 1);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(failResponse =>{
                        //用户同意删除情况下数据库删除失败
                        this.$message({
                            type: 'info',
                            message: '删除失败'
                        });
                    })
                }).catch(() =>{
                    //用户取消了删除
                    this.$message({
                        type: 'info',
                        message: '已删除取消'
                    });

                });
            }

        },

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
