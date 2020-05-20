<template>
  <div class="stockIn">
  <el-card class="box-card">
    <div slot="header" class="clearFix">
      <span>入库单</span>
<!--      新建页面-->
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="入库单" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" :rules="stockInRules"  ref="addForm">
          <el-form-item label="入库单号" :label-width="formLabelWidth" prop="iNumber">
            <el-input v-model="addForm.iNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品代码" :label-width="formLabelWidth" prop="gid">
            <el-input v-model="addForm.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth" prop="vName">
            <el-input v-model="addForm.vName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入库日期" :label-width="formLabelWidth" prop="iDate">
            <el-input v-model="addForm.iDate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth" prop="iCount">
            <el-input v-model="addForm.iCount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth" prop="iPrice">
            <el-input v-model="addForm.iPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="已付款项" :label-width="formLabelWidth" prop="iPayment">
            <el-input v-model="addForm.iPayment" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStockIn" :loading="submitBtn" >确 定</el-button>
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
        style="width: 100%"  ref="filterTable" @sort-change="changeTableSort"
      >
        <el-table-column
          prop="iNumber"
          label="入库单号"
          width="120"
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
          width="120">
        </el-table-column>
        <el-table-column
          :formatter="dateFormat"
          prop="iDate"
          label="入库日期"
          width="120"
          column-key="date"
          :filters="[{text: '今年', value: '2020-'}, {text: '去年', value: '2019-'}, {text: '本月', value: '2020-05'}, {text: '上月', value: '2020-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="iCount"
          label="数量"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="iPrice"
          label="价格"
          sortable="custom"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="iPayment"
          label="已付款项"
          sortable="custom"
          width="120"
        >
        </el-table-column>

        <el-table-column
          prop="eSalary"
          fixed="right"
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
        reg_inumber,
        reg_gid,
        reg_vname,
        reg_date,
        reg_money,
        reg_count
    } from "../login/validator";
    import moment from 'moment'
    export default {
        name: "StockIn",
        data() {
            return {
                scope:null,
                // 标记删除或者添加是否成功
                addSuccessful: false,
                //显示页面的表单数据
                tableData: [],
                nowDate:"",   //当前日期

                //删除的元素是谁
                delItem: [
                ],
                // 控制新增页面的form表单可见性
                dialogTableVisible: false,
                dialogFormVisible: false,
                // 用于新增表单数据时的绑定
                addForm: {
                    iNumber:'',
                    gid:'',
                    vName:'',
                    iDate:'',
                    iPrice:'',
                    iPayment:'',
                    iCount:''
                },
                formLabelWidth: '120px',
                pageSize:5,
                currentPage:1, //初始页
                //初始数据的长度
                totalItems:0,
                //最后在页面中显示的数据
                tableDataEnd:[],
                //搜索框内的数据
                searchInput:'',
                filterTableDataEnd:[],
                flag:false,
                selectTags:"",
                //选择框的选项
                options: [{
                    value: 'iNumber',
                    label: '入库单代码'
                }, {
                    value: 'gid',
                    label: '商品代码'
                }, {
                    value: 'vName',
                    label: '供应商名称'

                }, {
                    value: 'iDate',
                    label: '入库日期'
                },{
                    value: 'iCount',
                    label: '数量'
                },
                    {
                    value: 'iPrice',
                    label: '价格'
                },{
                    value: 'iPayment',
                    label: '已付款项'
                },
                ],
                value: '',
                addLastForm:'',


                //提交按钮是否可用
                submitBtn:false,
                //表单验证规则
                stockInRules:{
                    iNumber:[
                        { required:true ,validator: reg_inumber, trigger:'blur'}
                    ],
                    gid:[
                        { required:true ,validator: reg_gid,  trigger: 'blur'}
                    ],
                    vName:[
                        { required:true ,validator: reg_vname, trigger:'blur'}
                    ],
                    iDate:[
                        { required:true ,validator: reg_date,   trigger: 'blur' }
                    ],
                    iPrice:[
                        { required:true ,validator: reg_money , trigger:'blur'}
                    ],
                    iPayment:[
                        { required:true ,validator: reg_money, trigger:'blur'}
                    ],
                    iCount:[
                        { required:true ,validator: reg_count, trigger:'blur'}
                    ]
                },

            }
        },
        //过滤器
        // 创建的时候发送请求获取显示数据库所有员工的列表数据
        created() {
            this.tableData =  [];
            this.$axios.get("/staff/stockInList").then(res => {
                if (res.data.code===200) {
                    let item = {
                        iNumber:'',
                        gid:'',
                        vName:'',
                        iDate:'',
                        iPrice:'',
                        iPayment:'',
                        iCount:''

                    };
                    res.data.data.forEach(value=>{
                        item.iNumber=value.inumber;
                        item.gid=value.gid;
                        item.vName=value.vname;
                        item.iDate=value.idate;
                        item.iPrice=value.iprice;
                        item.iPayment=value.ipayment;
                        item.iCount=value.icount;
                        this.tableData.push(item);
                        item = {
                            iNumber:'',
                            gid:'',
                            vName:'',
                            iDate:'',
                            iPrice:'',
                            iPayment:'',
                            iCount:''
                        };
                    });
                    this.totalItems = this.tableData.length;
                    this.tableDataEnd=[];
                    this.tableData.forEach((value)=>{
                        this.tableDataEnd.push(value);
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: res.data.message
                    });
                }
            }).catch(failResponse => {
                this.$message({
                    type: 'info',
                    message: failResponse.message
                });
            })
        },

        methods: {
            //分页排序整体表格数据
            changeTableSort(column){
                //获取字段名称和排序类型
                let fieldName = column.prop;
                let sortingType = column.order;
                //如果字段名称为“创建时间”，将“创建时间”转换为时间戳，才能进行大小比较

                //按照降序排序
                if(sortingType === "descending"){
                    this.tableDataEnd = this.tableData.sort((a, b) => b[fieldName] - a[fieldName]);
                }
                //按照升序排序
                else{
                    this.tableDataEnd = this.tableData.sort((a, b) => a[fieldName] - b[fieldName]);
                }
            },

            //日期格式化显示
            dateFormat:function(row,column){

                let date = row[column.property];

                if(date === undefined){
                    return ''
                }

                return moment(date).format("YYYY-MM-DD")

            },
            //日期筛选器
            filterHandler(value, row, column) {
                const property = column['property'];

                return row[property].search(value) !== -1;
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

                this.tableData.forEach((value)=>{
                    if(selectTag==="iNumber"){
                        if(value.iNumber){
                            let iNumber = ""+value.iNumber;
                            if(iNumber.search(this.searchInput)!==-1){
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
                            let gid =""+ value.gid;
                            if(gid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="iDate"){
                        if(value.iDate){
                            let iDate = ""+value.iDate;
                            if(iDate.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="iPrice"){
                        if(value.iPrice){
                            let iPrice = ""+value.iPrice;
                            if(iPrice.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="iPayment"){
                        if(value.iPayment){
                            let iPayment = ""+value.iPayment;
                            if(iPayment.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="iCount"){
                        if(value.iCount){
                            let iCount = ""+value.iCount;
                            if(iCount.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
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
            // 初始页currentPage、初始每页数据数pageSize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },

            // 删除选中下标的一行数据，index由click处的scope.$index传过来的小标，delItem由scope.$row传过来的元素
            del(delItem, index){
                this.$confirm('你确定要删除这条记录吗？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() =>{
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/staff/delstockIn?inumber='+delItem.iNumber)
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
                                this.tableData.forEach((value)=>{
                                    //通过主码快速过滤
                                    if(value.iNumber!==delItem.iNumber){
                                        this.filterTableDataEnd.push(value);
                                    }
                                });
                                this.tableData = this.filterTableDataEnd;
                                this.filterTableDataEnd=[];

                                this.$message({
                                    type: 'success',
                                    message: successResponse.data.message
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
                            message: '删除失败!'
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
                this.$refs.addForm.validate()  //判断表单验证是否通过，验证通过执行.then()，否则执行.catch()
                    .then(() =>{
                        this.$axios.post('/staff/stockInAdd',{
                            inumber:this.addForm.iNumber,
                            gid:this.addForm.gid,
                            vname:this.addForm.vName,
                            idate:this.addForm.iDate,
                            iprice:this.addForm.iPrice,
                            ipayment:this.addForm.iPayment,
                            icount:this.addForm.iCount,
                        }).then(successResponse =>{
                            if(successResponse.data.code === 200){
                                this.dialogFormVisible = false;
                                this.tableDataEnd.unshift(this.addForm);
                                this.tableData.unshift(this.addForm);
                                //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                                this.addForm = {
                                    iNumber : '',
                                    gid : '',
                                    vName : '',
                                    iDate : '',
                                    iPrice: '',
                                    iPayment: '',
                                    iCount: '',
                                };

                                this.submitBtn=false;
                                this.addSuccessful = true;
                                this.$message({
                                    message: '成功添加一条记录',
                                    type: 'success',
                                });
                                //将信息刷新到表格中，指向同一个数据源所以只添加一次
                            }
                            if(successResponse.data.code===201){
                                this.$message({
                                    message: successResponse.data.message,
                                    type: 'error',
                                });
                                this.submitBtn = false;
                            }
                        }).catch(failedResponse =>{
                            this.addSuccessful = false;
                            this.submitBtn=false;
                            this.$message({
                                message:failedResponse.message,
                                type: 'error'
                            });

                        } );
                    }).catch(() =>{
                    this.submitBtn=false;
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
  .box-card {
    width: 75%;
  }
  .form {
    height: 100%;
  }
</style>
