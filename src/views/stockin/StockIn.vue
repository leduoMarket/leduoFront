<template>
  <div class="stockIn">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>入库单</span>
<!--      新建页面-->
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="入库单" :visible.sync="dialogFormVisible">
        <el-form :model="addform" :rules="stockInRules"  ref="addform">
          <el-form-item label="入库单号" :label-width="formLabelWidth" prop="inumber">
            <el-input v-model="addform.inumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品代码" :label-width="formLabelWidth" prop="gid">
            <el-input v-model="addform.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth" prop="vname">
            <el-input v-model="addform.vname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入库日期" :label-width="formLabelWidth" prop="idate">
            <el-input v-model="addform.idate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth" prop="iprice">
            <el-input v-model="addform.iprice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="已付款项" :label-width="formLabelWidth" prop="ipayment">
            <el-input v-model="addform.ipayment" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth" prop="icount">
            <el-input v-model="addform.icount" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStockIn" :loading="submitBtn" >确 定</el-button>
        </div>
      </el-dialog>
    </div>
<!--    查询模块-->
    <div class="text item">
      <el-input style="width: 300px"
                placeholder="请输入入库单单号"
                v-model="searchInput"
                clearable>
      </el-input>
      <el-button round @click="beginSearch">查询</el-button>
    </div>
    <div class="form">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%">
        <el-table-column
          prop="inumber"
          label="入库单号">
        </el-table-column>
        <el-table-column
          prop="gid"
          label="商品代码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="vname"
          label="供应商名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="idate"
          label="入库日期">
        </el-table-column>
        <el-table-column
          prop="iprice"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="ipayment"
          label="已付款项">
        </el-table-column>
        <el-table-column
          prop="icount"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="esalary"
          label="操作">
<!--          默认为每一行增加删除操作，只需要在methods里面定义就好-->
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
        reg_inumber,
        reg_gid,
        reg_vname,
        reg_date,
        reg_money,
        reg_count
    } from "../login/validator";
    export default {
        name: "StockIn",
        data() {
            return {
                // 标记删除或者添加是否成功
                addSuccessful: false,
                //显示页面的表单数据
                tableData: [

                ],
                //删除的元素是谁
                delItem: [
                ],
                // 控制新增页面的form表单可见性
                dialogTableVisible: false,
                dialogFormVisible: false,
                // 用于新增表单数据时的绑定
                addform: {
                    inumber:'',
                    gid:'',
                    vname:'',
                    idate:'',
                    iprice:'',
                    ipayment:'',
                    icount:''
                },
                formLabelWidth: '120px',
                pagesize:5,
                currentPage:1, //初始页
                searchInput:'',
                //提交按钮是否可用
                submitBtn:false,
                //表单验证规则
                stockInRules:{
                    inumber:[
                        { required:true ,validator: reg_inumber, trigger:'blur'}
                    ],
                    gid:[
                        { required:true ,validator: reg_gid,  trigger: 'blur'}
                    ],
                    vname:[
                        { required:true ,validator: reg_vname, trigger:'blur'}
                    ],
                    idate:[
                        { required:true ,validator: reg_date,   trigger: 'blur' }
                    ],
                    iprice:[
                        { required:true ,validator: reg_money , trigger:'blur'}
                    ],
                    ipayment:[
                        { required:true ,validator: reg_money, trigger:'blur'}
                    ],
                    icount:[
                        { required:true ,validator: reg_count, trigger:'blur'}
                    ]

                }
            }
        },
        // 创建的时候发送请求获取显示数据库所有员工的列表数据
        created() {
            console.log("vue被创建");
            this.$axios.get("/stockIn").then(res => {
                if (res.data) {
                    console.log(res);
                    this.tableData = res.data;
                }
            }).catch(failResponse => {


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
            //查询
            beginSearch(){
                this.$axios.get('/queryStockIn',{
                    params:{
                        inumber:this.searchInput,
                    }
                }).then(successfulResponse => {
                    //服务器执行了查找但是没找到,返回的数据为空，
                    if (!successfulResponse.data) {
                        this.$message('没有找到记录哦');
                    } else {
                        //服务器返回了结果并且结果不为空
                        //先将tableData数据清空
                        this.tableData = [];
                        //查找出来的结果显示到tableData里面
                        this.tableData.push(successfulResponse.data);
                        this.$message({
                            message: '成功找到记录',
                            type: 'success'
                        });
                    }
                }).catch(failedResponse => {
                    this.$message('查找错误');
                })
            },
            // 删除选中下标的一行数据，index由click处的scope.$index传过来的小标，delItem由scope.$row传过来的元素
            del(delItem, index){
                console.log(delItem);
                this.$confirm('你确定要删除这条记录吗？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() =>{
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/delstockIn',{
                        params:{
                            stockInId: delItem.inumber
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
            },
            //新增表单操作
            addStockIn(){
                //逻辑前端判断
                this.submitBtn=true;
                this.$refs.addform.validate()  //判断表单验证是否通过，验证通过执行.then()，否则执行.catch()
                    .then(res =>{
                        this.submitBtn=false;
                        console.log("提交成功");
                        this.$axios.post('/addstockIn',{
                            inumber:this.addform.inumber,
                            gid:this.addform.gid,
                            vname:this.addform.vname,
                            idate:this.addform.idate,
                            iprice:this.addform.iprice,
                            ipayment:this.addform.ipayment,
                            icount:this.addform.icount,
                        }).then(successResponse =>{
                            if(successResponse.data.code == 200){
                                this.addSuccessful = true;
                                this.$message({
                                    message: '成功添加一条记录',
                                    type: 'success',
                                });
                                //将信息刷新到表格中
                                this.tableData.push(this.addform);
                                //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                                this.addform = {
                                    inumber : '',
                                    gid : '',
                                    vname : '',
                                    idate : '',
                                    iprice: '',
                                    ipayment: '',
                                    icount: '',
                                };
                            }
                        }).catch(failedResponse =>{
                            this.addSuccessful = false;

                        } );
                        // 让表格消失
                        this.addform = {
                            inumber : '',
                            gid : '',
                            vname : '',
                            idate : '',
                            iprice: '',
                            ipayment: '',
                            icount: '',
                        };
                        this.dialogFormVisible = false;
                    }).catch(error =>{
                        console.log("提交失败");
                        this.$message({
                             message: '无法提交，表单中数据有错误',
                             type: 'error'
                         });

                });

            },
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
