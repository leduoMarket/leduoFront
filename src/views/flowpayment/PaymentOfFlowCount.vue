<template>
  <div class="paymentofflowcount">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>支付流水帐</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="支付流水帐" :visible.sync="dialogFormVisible">
        <el-form :model="form"  :rules="paymentOfFlowCountRules" ref="form">
          <el-form-item label="交易号" :label-width="formLabelWidth" prop="pnumber">
            <el-input v-model="form.pnumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="交易时间" :label-width="formLabelWidth" prop="pdate">
            <el-input v-model="form.pdate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="交易类别" :label-width="formLabelWidth" prop="pcategory">
            <el-input v-model="form.pcategory" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="来源店铺" :label-width="formLabelWidth" prop="psource_shop">
            <el-input v-model="form.psource_shop" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="交易金额" :label-width="formLabelWidth" prop="ptrading_amount">
            <el-input v-model="form.ptrading_amount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="现余额" :label-width="formLabelWidth" prop="premainning_amount">
            <el-input v-model="form.premainning_amount" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addpayment" :loading="submitBtn" >确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="text item">
      <div class="text item">
        <el-input style="width: 300px"
                  placeholder="请输入交易单号"
                  v-model="searchInput"
                  clearable>
        </el-input>
        <el-button round @click="beginSearch">查询</el-button>
      </div>
    </div>
    <div class="form">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%">
        <el-table-column
          prop="pnumber"
          label="交易号"
          width="180"
          sortable
        >
        </el-table-column>
        <el-table-column
          :formatter="dateFormat"
          prop="pdate"
          label="交易时间"
          sortable
          width="180"
          column-key="date"
          :filters="[{text: '今年', value: '2020-'}, {text: '去年', value: '2019-'}, {text: '本月', value: '2020-05'}, {text: '上月', value: '2020-04'}]"
          :filter-method="filterHandler">
        </el-table-column>
        <el-table-column
          prop="pcategory"
          label="交易类别">
        </el-table-column>
        <el-table-column
          prop="psource_shop"
          label="来源店铺">
        </el-table-column>
        <el-table-column
          prop="ptrading_amount"
          label="交易金额">
        </el-table-column>
        <el-table-column
          prop="premainning_amount"
          label="现余额">
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
      reg_pnumber,
      reg_date,
      reg_pcategory,
      reg_source_shop,
      reg_money
  } from "../login/validator";
  export default {
        name: "PaymentOfFlowCount",
        data() {
            return {
                tableData: [],
                gridData: [],
                dialogTableVisible: false,
                dialogFormVisible: false,
                 form: {
                     pnumber: '',
                     pdate: '',
                     pcategory: '',
                     psource_shop: '',
                     ptrading_amount: '',
                     premainning_amount: ''
                 },
                formLabelWidth: '120px',
                pagesize:5,  //分页数量
                currentPage:1, //初始页
                searchInput:'',
                //提交按钮是否可用
                submitBtn:false,
                paymentOfFlowCountRules:{
                    pnumber:[
                        {required:true ,validator: reg_pnumber,  trigger: 'blur'}
                    ],
                    pdate: [
                        {required:true ,validator: reg_date,  trigger: 'blur'}
                    ],
                    pcategory:[
                        {required:true ,validator: reg_pcategory,  trigger: 'blur'}
                    ],
                    psource_shop: [
                        {required:true ,validator: reg_source_shop,  trigger: 'blur'}
                    ],
                    ptrading_amount: [
                        {required:true ,validator: reg_money,  trigger: 'blur'}
                    ],
                    premainning_amount: [
                        {required:true ,validator: reg_money,  trigger: 'blur'}
                    ]
                }
            }
        },
      created(){
        console.log("vue被创建");
        this.$axios.get("/payments").then(res =>{
            if(res.data){
                console.log(res);
                this.tableData=res.data;
            }
        }).catch(failReasponse =>{

        });

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
            //日期格式化显示
            dateFormat:function(row,column){

                var date = row[column.property];

                if(date == undefined){return ''};

                return moment(date).format("YYYY-MM-DD")

            },
            //日期筛选器
            filterHandler(value, row, column) {
                const property = column['property'];

                return row[property].search(value) !== -1;
            },
            //查询
            beginSearch(){
                this.$axios.get('/queryPaymentOfFlowCount',{
                    params:{
                        pnumber:this.searchInput,
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
            //新增
            addpayment(){
                this.submitBtn=true;
                this.$refs.form.validate()
                    .then(res =>{
                        this.submitBtn=false;
                        console.log("提交成功");
                        this.$axios.post('/addpayment',{
                            pnumber:this.form.pnumber,
                            pdate:this.form.pdate,
                            pcategory:this.form.pcategory,
                            psourceShop:this.form.psource_shop,
                            ptradingAmount:this.ptrading_amount,
                            premainningAmount:this.premainning_amount,
                        }).then(successResponse =>{
                            if(successResponse.data.code == 200){
                                this.addSuccessful = true;
                                this.$message({
                                    message: '成功添加一条记录',
                                    type: 'success',
                                });
                                //将信息刷新到表格中
                                this.tableData.push(this.form);
                                //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                                this.form={
                                    pnumber: '',
                                    pdate: '',
                                    pcategory: '',
                                    psource_shop: '',
                                    ptrading_amount: '',
                                    premainning_amount: ''
                                };
                            }
                        }).catch(failedResponse =>{
                            this.addSuccessful = false;

                        } );
                        // 让表格消失
                        this.form={
                            pnumber: '',
                            pdate: '',
                            pcategory: '',
                            psource_shop: '',
                            ptrading_amount: '',
                            premainning_amount: ''
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
            del(delItem, index){
                console.log(delItem);
                this.$confirm('你确定要删除这条记录吗？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() =>{
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/delpayment',{
                        params:{
                            stockInId: delItem.pnumber
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
    height: 200px;
  }
</style>
