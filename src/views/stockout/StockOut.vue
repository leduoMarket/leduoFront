<template>
  <div class="stockOut">
  <el-card class="box-card">
    <div slot="header" class="clearFix">
      <span>出库单</span>
      <!--      新建页面-->
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="出库单" :visible.sync="dialogFormVisible">
        <el-form :model="dataInfo" :rules="stockOutRules" ref="dataInfo">
          <el-form-item label="出库单号" :label-width="formLabelWidth" prop="oNumber">
            <el-input v-model="dataInfo.oNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品代码" :label-width="formLabelWidth" prop="gid">
            <el-input v-model="dataInfo.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth" prop="vName">
            <el-input v-model="dataInfo.vName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出库日期" :label-width="formLabelWidth" prop="oDate">
            <el-input v-model="dataInfo.oDate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth" prop="oCount">
            <el-input v-model="dataInfo.oCount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth" prop="oPrice">
            <el-input v-model="dataInfo.oPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="已付款项" :label-width="formLabelWidth" prop="oPayment">
            <el-input v-model="dataInfo.oPayment" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStockOut"  >确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="form">
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
        :data="tableDataEnd.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        border
        style="width: 100%" ref="filterTable"  @sort-change="changeTableSort">
        <el-table-column
          prop="oNumber"
          width="140"
          label="出库单号"
        >
        </el-table-column>
        <el-table-column
          prop="gid"
          label="商品代码"
          width="150"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="vName"
          label="供应商名称"
          width="100">
        </el-table-column>

        <el-table-column
          :formatter="dateFormat"
          prop="oDate"
          label="出库日期"
          sortable
          width="120"
          column-key="date"
          :filters="[{text: '今年', value: '2020-'}, {text: '去年', value: '2019-'}, {text: '本月', value: '2020-05'}, {text: '上月', value: '2020-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="oCount"
          label="数量"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="oPrice"
          width="120"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="oPayment"
          label="已付款项"
          width="120"
          sortable="custom"
        >
        </el-table-column>

        <el-table-column
          prop="oHandle"
          fixed="right"
          label="操作">

          <template slot-scope="scope">
            <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: #ff0000" @click="del(scope.row,scope.$index)">删除</span></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3,5, 10, 20, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataEnd.length">
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
  import moment from 'moment'
  export default {
        name: "StockOut",
        data() {
            return {
                // 标记删除或者添加是否成功
                addSuccessful: false,
                // delSuccessful: false,
                // 在基础表格中展示的数据
                tableData: [{
                    gid: 1302021121123,
                    vName: '水果店',
                    oNumber: 'O2020010190',
                    oDate: '2020-01-01',
                    oPrice: 90.0,
                    oPayment: 110.0,
                    oCount: 20
                },{
                    gid: 1234123412342,
                    vName: "面包商",
                    oNumber: 'O232390901002',
                    oDate: '2020-02-03',
                    oPrice: 100.2,
                    oPayment: 20.3,
                    oCount: 20.2
                },{
                    gid: 1234123412342,
                    vName: "小吃店",
                    oNumber: 'O232390901002',
                    oDate: '2020-02-03',
                    oPrice: 100.2,
                    oPayment: 20.3,
                    oCount: 20.2
                }
                ],
                // 控制新增页面的form表单可见性
                dialogFormVisible: false,
                //删除的元素是谁
                delItem: [],
                // 用于新增数据绑定
                dataInfo: {
                    gid: '',
                    vName: '',
                    oNumber: '',
                    oDate: '',
                    oPrice: '',
                    oPayment: '',
                    oCount: ''
                },
                formLabelWidth: '120px',
                pageSize:5,
                currentPage:1, //初始页

                //初始数据的长度
                totalItems:0,
                //最后在页面中显示的数据
                tableDataEnd:[],
                //提交按钮的加载情况
                // submitBtn:false,
                //搜索框内的数据
                searchInput:'',
                filterTableDataEnd:[],
                flag:false,
                selectTags:"",
                //选择框的选项
                options: [{
                    value: 'oNumber',
                    label: '出库单代码'
                }, {
                    value: 'gid',
                    label: '商品代码'
                }, {
                    value: 'vName',
                    label: '供应商名称'

                }, {
                    value: 'oDate',
                    label: '出库日期'
                }, {
                    value: 'oPrice',
                    label: '价格'
                },{
                    value: 'oPayment',
                    label: '已付款项'
                },{
                    value: 'oCount',
                    label: '数量'
                }
                ],
                value: '',



                //表单验证规则
                stockOutRules:{
                    gid:[
                        { required:true ,validator: reg_gid,  trigger: 'blur'}
                    ],
                    vName:[
                        { required:true ,validator: reg_vname, trigger:'blur'}
                    ],
                    oNumber:[
                        { required:true ,validator: reg_onumber, trigger:'blur'}
                    ],
                    oDate:[
                        { required:true ,validator: reg_date,   trigger: 'blur' }
                    ],
                    oPrice:[
                        { required:true ,validator: reg_money , trigger:'blur'}
                    ],
                    oPayment:[
                        { required:true ,validator: reg_money, trigger:'blur'}
                    ],
                    oCount:[
                        { required:true ,validator: reg_count, trigger:'blur'}
                    ]

                }
            }
        },
      // 创建的时候发送请求获取显示数据库所有员工的列表数据
      created() {
            //前端测试代码
          /*this.tableDataEnd= [];
          this.tableData.forEach((value)=>{
              this.tableDataEnd.push(value);
          });*/
         // this.tableData=[];
          this.$axios.get("/staff/stockOut").then(res => {
              if (res.data.code === 200) {

                  this.tableData = res.data.data;
                  this.totalItems = this.tableData.length;
                  this.tableDataEnd= [];
                  this.tableData.forEach((value)=>{
                      this.tableDataEnd.push(value);
                  });

              }
          }).catch(() => {

          })
      },
        methods: {
            //分页排序整体表格数据
            changeTableSort(column){
                console.log(column);
                //获取字段名称和排序类型
                let fieldName = column.prop;
                let sortingType = column.order;
                //按照降序排序
                if(sortingType === "descending"){
                    this.tableDataEnd = this.tableData.sort((a, b) => b[fieldName] - a[fieldName]);
                }
                //按照升序排序
                else{
                    this.tableDataEnd = this.tableData.sort((a, b) => a[fieldName] - b[fieldName]);
                    console.log(this.tableDataEnd)
                }
            },

            // 初始页currentPage、初始每页数据数pageSize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
                console.log(this.pageSize)
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage)
            },
            openAddPage() {
                this.dialogFormVisible = true;
            },
            //日期格式化显示
            dateFormat:function(row,column){

                let date = row[column.property];

                if (date === undefined) {
                    return ''
                }
                return moment(date).format("YYYY-MM-DD");

            },
            //日期筛选器
            filterHandler(value, row, column) {
                const property = column['property'];

                return row[property].search(value) !== -1;
                // return row[property] == value;
            },
            doFilter(){
                let selectTag = this.selectTags;
                if(this.searchInput === ""){
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
                    if(selectTag==="oNumber"){
                        if(value.oNumber){
                            let oNumber =""+ value.oNumber;
                            if(oNumber.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="vName"){
                        if(value.vName){
                            let vName = ""+value.vName;
                            if(vName.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="gid"){
                        if(value.gid){
                            let gid = ""+value.gid;
                            if(gid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="oDate"){
                        if(value.oDate){
                            let oDate = ""+value.oDate;
                            if(oDate.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="oPrice"){
                        if(value.oPrice){
                            let oPrice = ""+ value.oPrice;
                            if(oPrice.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="oPayment"){
                        if(value.oPayment){
                            let oPayment = "" + value.oPayment;
                            if(oPayment.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="oCount"){
                        if(value.oCount){
                            let oCount = ""+value.oCount;
                            if(value.oCount.search(this.searchInput)!==-1){
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
                this.tableData.forEach((value)=>{
                    this.tableDataEnd.push(value);
                });

            },
            //新增出库单
            addStockOut() {
                //前端测试部分
                //让表格消失
                this.dialogFormVisible = false;
                this.tableData.unshift(this.dataInfo);
                this.tableDataEnd.unshift(this.dataInfo);
                // 将填写框置空，方便下次填写
                this.dataInfo = {
                    gid: '',
                    vName: '',
                    oNumber: '',
                    oDate: '',
                    oPrice: '',
                    oPayment: '',
                    oCount: ''
                };
                this.$message({
                    message: '成功添加一条记录',
                    type: 'success'
                });

                this.$refs.dataInfo.validate()
                    .then(() =>{
                        this.$axios.post('/staff/addstockOut', {
                            gid: this.dataInfo.gid,
                            vName: this.dataInfo.vName,
                            oNumber: this.dataInfo.oNumber,
                            oDate: this.dataInfo.oDate,
                            oPrice: this.dataInfo.oPrice,
                            oPayment: this.dataInfo.oPayment,
                            oCount: this.dataInfo.oCount
                        }).then(successResponse => {
                            if (successResponse.data.code === 200) {
                                //表格中回显
                                // 让表格消失
                                this.dialogFormVisible = false;
                                this.tableData.unshift(this.dataInfo);
                                this.tableDataEnd.unshift(this.dataInfo);
                                // 将填写框置空，方便下次填写
                                this.dataInfo = {
                                    gid: '',
                                    vName: '',
                                    oNumber: '',
                                    oDate: '',
                                    oPrice: '',
                                    oPayment: '',
                                    oCount: ''
                                };
                                this.$message({
                                    message: '成功添加一条记录',
                                    type: 'success'
                                });
                            }else{
                                this.$message({
                                    message: successResponse.data.message,
                                    type: 'error'
                                });
                            }
                        }).catch(failedResponse => {
                            this.$message({
                                message: failedResponse.data.message,
                                type: 'error'
                            });
                        });
                    }).catch(() =>{
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
                    if(value.oNumber!==delItem.oNumber){
                        this.filterTableDataEnd.push(value);
                    }
                });
                this.tableData = this.filterTableDataEnd;
                this.filterTableDataEnd=[];
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.$confirm('你确定要删除这条记录吗？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() =>{
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/staff/delstockOut',{
                        params:{
                            stockOutId: delItem.oNumber
                        }
                    }).then(successResponse =>{
                        if(successResponse.data.code === 200){

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
                            this.tableData.forEach((value)=>{
                                //通过主码快速过滤
                                if(value.oNumber!==delItem.oNumber){
                                    this.filterTableDataEnd.push(value);
                                }
                            });
                            this.tableData = this.filterTableDataEnd;
                            this.filterTableDataEnd=[];
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else {
                            this.$message({
                                type: 'info',
                                message: '删除失败!'
                            });
                        }
                    }).catch(() =>{
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
  .box-card {
    width: 75%;
  }
  .form {
    height: 100%;
  }
</style>
