<template>
  <div class="stockOut">
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
          <el-form-item label="数量" :label-width="formLabelWidth" prop="ocount">
            <el-input v-model="dataInfo.ocount" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStockOut"  >确 定</el-button>
        </div>
      </el-dialog>
    </div>
<!--    <div class="text item">-->
<!--      <el-input style="width: 300px"-->
<!--                placeholder="请输入出库单单号"-->
<!--                v-model="searchInput"-->
<!--                clearable>-->
<!--      </el-input>-->
<!--      <el-button round @click="beginSearch">查询</el-button>-->
<!--    </div>-->
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
        :data="tableDataEnd.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%" ref="filterTable"  @sort-change="changeTableSort">
        <el-table-column
          prop="onumber"
          label="出库单号"
        >
        </el-table-column>
        <el-table-column
          prop="gid"
          label="商品代码"
          width="180"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="vname"
          label="供应商名称"
          width="180">
        </el-table-column>

        <el-table-column
          :formatter="dateFormat"
          prop="odate"
          label="出库日期"
          sortable
          width="180"
          column-key="date"
          :filters="[{text: '今年', value: '2020-'}, {text: '去年', value: '2019-'}, {text: '本月', value: '2020-05'}, {text: '上月', value: '2020-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="oprice"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="opayment"
          label="已付款项"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="ocount"
          label="数量"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="esalary"
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
                tableData: [],
                // 控制新增页面的form表单可见性
                dialogFormVisible: false,
                //删除的元素是谁
                delItem: [],
                // 用于新增数据绑定
                dataInfo: {
                    gid: '',
                    vname: '',
                    onumber: '',
                    odate: '',
                    oprice: '',
                    opayment: '',
                    ocount: ''
                },
                formLabelWidth: '120px',
                pagesize:5,
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
                    value: 'onumber',
                    label: '出库单代码'
                }, {
                    value: 'gid',
                    label: '商品代码'
                }, {
                    value: 'vname',
                    label: '供应商名称'

                }, {
                    value: 'odate',
                    label: '出库日期'
                }, {
                    value: 'oprice',
                    label: '价格'
                },{
                    value: 'opayment',
                    label: '已付款项'
                },{
                    value: 'ocount',
                    label: '数量'
                }
                ],
                value: '',



                //表单验证规则
                stockOutRules:{
                    gid:[
                        { required:true ,validator: reg_gid,  trigger: 'blur'}
                    ],
                    vname:[
                        { required:true ,validator: reg_vname, trigger:'blur'}
                    ],
                    onumber:[
                        { required:true ,validator: reg_onumber, trigger:'blur'}
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
      // 创建的时候发送请求获取显示数据库所有员工的列表数据
      created() {

          this.$axios.get("/staff/stockOut").then(res => {
              if (res.data) {
                  console.log(res);
                  this.tableData = res.data;
                  this.totalItems = this.tableData.length;
                  this.tableData.forEach((value,index)=>{
                      this.tableDataEnd.push(value);
                  });
                  console.log(this.tableData.length);
              }
          }).catch(failResponse => {

          })
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
                    this.tableDataEnd = this.tableDataEnd.sort((a, b) => b[fieldName] - a[fieldName]);
                }
                //按照升序排序
                else{
                    this.tableDataEnd = this.tableDataEnd.sort((a, b) => a[fieldName] - b[fieldName]);
                    console.log(this.tableDataEnd)
                }
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
            openAddPage() {
                this.dialogFormVisible = true;
            },
            //查询
            beginSearch(){
                this.$axios.get('/staff/querystockOut',{
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
                });
                this.searchInput='';
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
                // return row[property] == value;
            },
            doFilter(){
                var selectTag = this.selectTags;
                if(this.searchInput === ""){
                    this.$message.warning("查询信息不能为空！！！");
                    return;
                }
                if(selectTag === ""){
                    this.$message.warning("查询条件不能为空！！！");
                    return;
                }
                this.tableDataEnd=[];
                this.filterTableDataEnd=[];
                this.tableData.forEach((value,index)=>{
                    if(selectTag=="onumber"){
                        if(value.onumber){
                            if(value.onumber.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="vname"){
                        if(value.vname){
                            if(value.vname.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="gid"){
                        if(value.gid){
                            if(value.gid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="odate"){
                        if(value.odate){
                            if(value.odate.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="oprice"){
                        if(value.oprice){
                            if(value.oprice.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="opayment"){
                        if(value.opayment){
                            if(value.opayment.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="ocount"){
                        if(value.ocount){
                            if(value.ocount.search(this.searchInput)!==-1){
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
                this.tableDataEnd=[];
                this.tableData.forEach((value,index)=>{
                    this.tableDataEnd.push(value);
                });

            },
            //新增出库单
            addStockOut() {
                this.$refs.dataInfo.validate()
                    .then(res =>{
                        this.$axios.post('/staff/addstockOut', {
                            gid: this.dataInfo.gid,
                            vname: this.dataInfo.vname,
                            onumber: this.dataInfo.onumber,
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
                            this.tableDataEnd.push(this.dataInfo);
                            this.$message({
                                message: '成功添加一条记录',
                                type: 'success'
                            });
                        }
                        //将信息刷新到表格中
                        this.tableData.push(this.addform);
                        // 将填写框置空，方便下次填写
                        this.dataInfo = {
                            gid: '',
                            vname: '',
                            onumber: '',
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
                    this.$axios.delete('/staff/delstockOut',{
                        params:{
                            stockOutId: delItem.onumber
                        }
                    }).then(successResponse =>{
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
                            if(value.onumber!=delItem.onumber){
                                this.filterTableDataEnd.push(value);
                            }
                        });
                        this.tableData = this.filterTableDataEnd;
                        this.filterTableDataEnd=[];
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
