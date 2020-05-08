<template>
  <div class="stockOut">
  <Menu></Menu>
  <TopBar></TopBar>
  <router-view></router-view>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>出库单</span>
      <!--      新建页面-->
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="出库单" :visible.sync="dialogFormVisible">
        <el-form :model="dataInfo" :rules="stockOutRules" ref="dataInfo">
          <el-form-item label="出库单号" :label-width="formLabelWidth" prop="onumber">
            <el-input v-model="dataInfo.onumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品代码" :label-width="formLabelWidth" prop="gid">
            <el-input v-model="dataInfo.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth" prop="vname">
            <el-input v-model="dataInfo.vname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出库日期" :label-width="formLabelWidth" prop="odate">
            <el-input v-model="dataInfo.odate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth" prop="oprice">
            <el-input v-model="dataInfo.oprice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="已付款项" :label-width="formLabelWidth" prop="opayment">
            <el-input v-model="dataInfo.opayment" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth" prop="oaccount">
            <el-input v-model="dataInfo.ocount" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStockOut"  >确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="text item">
      <el-input style="width: 300px"
                placeholder="请输入出库单单号"
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
          prop="onumber"
          label="出库单号">
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
          prop="odate"
          label="出库日期">
        </el-table-column>
        <el-table-column
          prop="oprice"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="opayment"
          label="已付款项">
        </el-table-column>
        <el-table-column
          prop="ocount"
          label="数量">
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
        :page-sizes="[3,5, 10, 20, 40]"
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
      reg_gid,
      reg_vname,
      reg_onumber,
      reg_date,
      reg_money,
      reg_count

  } from "../login/validator";
  import TopBar from "D:/web/leduoFront/src/components/template/TopBar";
  import Menu from "D:/web/leduoFront/src/components/template/Menu";
  export default {
        name: "StockOut",
        components: {TopBar,Menu},
        data() {
            return {
                // 标记删除或者添加是否成功
                addSuccessful: false,
                // delSuccessful: false,
                // 在基础表格中展示的数据
                tableData: [],
                // 控制新增页面的form表单可见性
                dialogFormVisible: false,
                //删除的元素是谁
                delItem: [],
                // 用于新增数据绑定
                dataInfo: {
                    onumber: '',
                    gid: '',
                    vname: '',
                    odate: '',
                    oprice: '',
                    opayment: '',
                    ocount: ''
                },
                formLabelWidth: '120px',
                pagesize:5,
                currentPage:1, //初始页
                searchInput:'',
                //提交按钮的加载情况
                // submitBtn:false,
                //表单验证规则
                stockOutRules:{
                    onumber:[
                        { required:true ,validator: reg_onumber, trigger:'blur'}
                    ],
                    gid:[
                        { required:true ,validator: reg_gid,  trigger: 'blur'}
                    ],
                    vname:[
                        { required:true ,validator: reg_vname, trigger:'blur'}
                    ],
                    odate:[
                        { required:true ,validator: reg_date,   trigger: 'blur' }
                    ],
                    oprice:[
                        { required:true ,validator: reg_money , trigger:'blur'}
                    ],
                    opayment:[
                        { required:true ,validator: reg_money, trigger:'blur'}
                    ],
                    ocount:[
                        { required:true ,validator: reg_count, trigger:'blur'}
                    ]

                }
            }
        },
        // 创建的时候发送请求获取显示数据库所有退货单的列表数据
        created() {
            this.$axios.get("/stockOut").then(res=>{
                if(res.data){
                    console.log(res);
                    this.tableData = res.data;
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
            openAddPage() {
                this.dialogFormVisible = true;

            },
            //查询
            beginSearch(){
                this.$axios.get('/querystockOut',{
                    params:{
                        onumber:this.searchInput,
                    }
                }).then(successfulResponse=>{
                    console.log('this.tableData'+successfulResponse.data);
                    this.tableData=[];
                    this.tableData.push(successfulResponse.data);
                    this.$message({
                        message: '成功找到记录',
                        type: 'success'
                    });
                }).catch(failedResponse=>{
                    this.$message('没有找到记录哦');
                })
            },
            //新增出库单
            addStockOut() {
                this.$refs.dataInfo.validate()
                    .then(res =>{
                        this.$axios.post('/addstockOut', {
                            onumber: this.dataInfo.onumber,
                            gid: this.dataInfo.gid,
                            vname: this.dataInfo.vname,
                            odate: this.dataInfo.odate,
                            oprice: this.dataInfo.oprice,
                            opayment: this.dataInfo.opayment,
                            ocount: this.dataInfo.ocount
                        }).then(successResponse => {
                            if (successResponse.data.code === 200) {
                                this.addSuccessful = true;
                            }
                        }).catch(failedResponse => {
                            this.addSuccessful = false;
                        });
                        if (!this.addSuccessful) {
                            this.$message.error('插入数据失败');
                        } else {
                            this.tableData.push(this.dataInfo);
                            this.$message({
                                message: '成功添加一条记录',
                                type: 'success'
                            });
                        }
                        //将信息刷新到表格中
                        this.tableData.push(this.dataInfo);
                        // 将填写框置空，方便下次填写
                        this.dataInfo = {
                            onumber: '',
                            gid: '',
                            vname: '',
                            odate: '',
                            oprice: '',
                            opayment: '',
                            ocount: ''
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

            // 删除选中下标的一行数据，index由click处的scope.$index传过来的小标，delItem由scope.$row传过来的元素
            del(delItem, index){
                console.log(delItem);
                this.$confirm('你确定要删除这条记录吗？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() =>{
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/delstockOut',{
                        params:{
                            stockOutId: delItem.onumber
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
