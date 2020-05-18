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
    <div class="form">
      <!--查找框-->
      <el-select v-model="selectTags" clearable size="medium"  placeholder="请选择" value="" >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="searchInput" placeholder="请输入信息"  size="medium" style="width:240px; margin-right:23% ;margin-bottom: 1.5%"></el-input>

      <el-button type="primary" icon="el-icon-search" @click="doFilter"  size="medium" round  plain>搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="doReset" size="medium"  round  plain >重置</el-button>
      <el-table
        :data="tableDataEnd.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"  @sort-change="changeTableSort">
        <el-table-column
          prop="pnumber"
          label="交易号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          :formatter="dateFormat"
          prop="pdate"
          label="交易时间"
          width="180">
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
          label="交易金额"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="premainning_amount"
          label="现余额"
          sortable="custom"
        >
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
        :total="tableDataEnd.length">
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
  import moment from 'moment'
  export default {
        name: "PaymentOfFlowCount",
        data() {
            return {
                // 标记删除或者添加是否成功
                addSuccessful: false,
                //显示页面的表单数据
                tableData: [
                    {
                        pnumber: 'P2020040101',
                        pdate: '2020-04-01T00:00:00.0000000',
                        pcategory: '入库',
                        psource_shop: '天猫',
                        ptrading_amount: 180,
                        premainning_amount: 23
                    },
                    {
                        pnumber: 'P2020040102',
                        pdate: '2020-04-01T00:00:00.0000000',
                        pcategory: '出库',
                        psource_shop: '京东',
                        ptrading_amount: 129,
                        premainning_amount: 172
                    },
                    {
                        pnumber: 'P2020040103',
                        pdate: '2020-04-01T00:00:00.0000000',
                        pcategory: '入库',
                        psource_shop: '淘宝',
                        ptrading_amount: 21,
                        premainning_amount: 210
                    },
                    {
                        pnumber: 'P2020040104',
                        pdate: '2020-04-02T00:00:00.0000000',
                        pcategory: '出库',
                        psource_shop: '天猫',
                        ptrading_amount: 80,
                        premainning_amount:19
                    },
                    {
                        pnumber: 'P2020040105',
                        pdate: '2020-04-03T00:00:00.0000000',
                        pcategory: '入库',
                        psource_shop: '拼多多',
                        ptrading_amount: 180,
                        premainning_amount: 510
                    },
                ],

                nowDate:"",   //当前日期


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

                //初始数据的长度
                totalItems:0,
                //最后在页面中显示的数据
                tableDataEnd:[],
                //搜索框内的数据
                searchInput:"",
                filterTableDataEnd:[],
                flag:false,
                selectTags:"",
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
                },
                //选择框的选项
                options: [{
                    value: 'punumber',
                    label: '交易号'
                }, {
                    value: 'pdate',
                    label: '交易时间'
                }, {
                    value: 'pcategory',
                    label: '交易类别'
                }, {
                    value: 'psource_shop',
                    label: '来源店铺'
                },{
                    value:'ptrading_amount',
                    label:'交易金额'
                },{
                    value:'premainning_amount',
                    label:'现余额'
                }
                ],
                value: '',
                addLastForm:'',
            }
        },
      created(){
          this.tableDataEnd=[];
          this.tableData.forEach((value,index)=>{
              this.tableDataEnd.push(value);
          });
          console.log('tableData'+this.tableData);
          console.log('tableDataEnd'+this.tableDataEnd);
          /*this.tableData =  [];*/
          this.$axios.get("/home/payments").then(res =>{
              if(res.data.code === 200){
                  console.log(res);
                  this.tableData = res.data.data;
                  this.itemCount = res.data.length;
                  this.tableDataEnd=[];
                  this.tableData.forEach((value,index)=>{
                      this.tableDataEnd.push(value);
                  });
                  console.log(this.tableData.length);
              }else{
                  this.$masssage({
                      type:'info',
                      massage:this.res.data.message
                  })
              }
        }).catch(failReasponse =>{
              this.$masssage({
                  type:'info',
                  massage:this.res.data.message
              })
        });

      },
        methods: {
            //分页排序整体表格数据
            changeTableSort(column){
                console.log(column);
                //获取字段名称和排序类型
                var fieldName = column.prop;
                var sortingType = column.order;
                //按照降序排序
                if(sortingType == "descending"){
                    this.tableDataEnd = this.tableData.sort((a, b) => b[fieldName] - a[fieldName]);
                }
                //按照升序排序
                else{
                    this.tableDataEnd = this.tableData.sort((a, b) => a[fieldName] - b[fieldName]);
                    console.log(this.tableDataEnd)
                }
            },

            doFilter(){
                var selectTag = this.selectTags;
                if(this.searchInput == ""){
                    this.$message.warning("查询信息不能为空！！！");
                    return;
                }
                if(selectTag === ""){
                    this.$message.warning("查询条件不能为空！！！");
                    return;
                }
                this.searchInput=this.searchInput.trim();
                this.tableDataEnd=[];
                this.filterTableDataEnd=[];
                this.tableData.forEach((value,index)=>{
                    if(selectTag=="pnumber"){
                        if(value.pnumber){
                            let pnumber = ""+value.pnumber;
                            if(pnumber.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="pdate"){
                        if(value.pdate){
                            let pdate = ""+value.pdate;
                            if(pdate.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="pcategory"){
                        if(value.pcategory){
                            let pcategory = value.pcategory;
                            if(pcategory.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="psource_shop"){
                        if(value.psource_shop){
                            let psource_shop =""+value.psource_shop;
                            if(psource_shop.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    console.log(index);
                });
                this.tableDataEnd=[];
                this.tableDataEnd=this.filterTableDataEnd;
                this.filterTableDataEnd=[];
            },
            doReset(){
                this.searchInput="";
                this.tableDataEnd=[];
                this.tableData.forEach((value,index)=>{
                    this.tableDataEnd.push(value);
                });
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

            //新增
            addpayment() {
                this.submitBtn = true;
                //前端测试代码
               /* this.tableDataEnd.unshift(this.form);
                this.tableData.unshift(this.tableDataEnd);
                //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                this.form = {
                    pnumber: '',
                    pdate: '',
                    pcategory: '',
                    psource_shop: '',
                    ptrading_amount: '',
                    premainning_amount: ''
                };
                this.dialogFormVisible = false;*/
                this.$refs.form.validate()
                    .then(res => {
                        console.log("正则成功");
                        // if(this.addLastForm===this.form){
                        //     this.$message.warning('您已经提交过，请勿重复提交');
                        // }
                        this.$axios.post('/home/addpayment', {
                            pnumber: this.form.pnumber,
                            pdate: this.form.pdate,
                            pcategory: this.form.pcategory,
                            psourceShop: this.form.psource_shop,
                            ptradingAmount: this.ptrading_amount,
                            premainningAmount: this.premainning_amount,
                        }).then(successResponse => {
                            if (successResponse.data.code === 200) {
                                this.dialogFormVisible = false;
                                this.tableDataEnd.unshift(this.form);
                                this.tableData.unshift(this.tableDataEnd);
                                //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                                this.form = {
                                    pnumber: '',
                                    pdate: '',
                                    pcategory: '',
                                    psource_shop: '',
                                    ptrading_amount: '',
                                    premainning_amount: ''
                                };
                                this.dialogFormVisible = false;
                                this.submitBtn = false;
                                this.addSuccessful = true;
                                this.$message({
                                    message: '成功添加一条记录',
                                    type: 'success',
                                });
                            }
                            if (successResponse.data.code == 201) {
                                this.$message({
                                    message: successResponse.data.message,
                                    type: 'error',
                                });
                                this.submitBtn = false;
                            }
                        }).catch(failedResponse => {
                            this.addSuccessful = false;
                            this.submitBtn = false;
                            this.$message({
                                message: failedResponse.data.message,
                                type: 'error'
                            });

                        });
                    }).catch(error => {
                    console.log("提交失败");
                    this.submitBtn=false;
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
                    //前端测试代码
                    /*this.filterTableDataEnd=[];
                    //删除在表格中tableDataEnd显示的哪个数据
                    this.tableDataEnd.forEach((value,i)=>{
                        if(i !==index){
                            this.filterTableDataEnd.push(value);
                        }
                    });
                    this.tableDataEnd=this.filterTableDataEnd;
                    this.filterTableDataEnd=[];

                    //删除从数据源中tableData获得的数据
                    this.tableData.forEach((value,i)=>{
                        //通过主码快速过滤
                        if(value.pnumber!=delItem.pnumber){
                            this.filterTableDataEnd.push(value);
                        }
                    });
                    this.tableData = this.filterTableDataEnd;
                    this.filterTableDataEnd=[];
                    this.$message({
                        type: 'success',
                        message: successResponse.data.message
                    });*/
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/home/delpayment?pnumber='+delItem.pnumber)
                        .then(successResponse =>{
                            if(successResponse.data.code===200){
                        this.filterTableDataEnd=[];
                        //删除在表格中tableDataEnd显示的哪个数据
                        this.tableDataEnd.forEach((value,i)=>{
                            if(i !==index){
                                this.filterTableDataEnd.push(value);
                            }
                        });
                        this.tableDataEnd=this.filterTableDataEnd;
                        this.filterTableDataEnd=[];

                        //删除从数据源中tableData获得的数据
                        this.tableData.forEach((value,i)=>{
                            //通过主码快速过滤
                            if(value.pnumber!=delItem.pnumber){
                                this.filterTableDataEnd.push(value);
                            }
                        });
                        this.tableData = this.filterTableDataEnd;
                        this.filterTableDataEnd=[];
                        this.$message({
                            type: 'success',
                            message: successResponse.data.message
                        });
                            }
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
    height: 100%;
  }
</style>
