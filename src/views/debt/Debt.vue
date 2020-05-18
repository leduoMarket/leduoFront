<template>
  <div class="debt">
  <el-card class="box-card">
    <div slot="header" class="clearFix">
      <span>欠款单</span>
      <!--<el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>-->
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
        style="width: 100%"  @sort-change="changeTableSort">
        <el-table-column
          prop="dNumber"
          label="欠款单号"
          width="180"

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
          prop="vName"
          label="供应商名称">
        </el-table-column>
        <el-table-column
          prop="dDebt"
          label="欠款金额"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          :formatter="dateFormat"
          prop="dDate"
          label="日期"
          width="180"
          column-key="date"
          :filters="[{text: '今年', value: '2020-'}, {text: '去年', value: '2019-'}, {text: '本月', value: '2020-05'}, {text: '上月', value: '2020-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="eHandler"
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
        reg_dnumber,
        reg_gid,
        reg_vname,
        reg_date,
        reg_money,
    } from "../login/validator";
    import moment from 'moment'
  export default {
        name: "Debt",
        data() {
            return {
                scope:null,
                // 标记删除或者添加是否成功
                addSuccessful: false,
                // delSuccessful: false,
                // 在基础表格中展示的数据
                tableData: [{
                    dNumber: 'd2020010301',
                    gid: '21348329',
                    vName: '方便面',
                    dDate: '2020-01-03T00:00:00.0000000',
                    dDebt: '1242',
                },{
                    dNumber: 'd2020020501',
                    gid: '214412',
                    vName: '橙汁',
                    dDate: '2020-02-05T00:00:00.0000000',
                    dDebt: '142',
                },{
                    dNumber: 'd2020200321',
                    gid: '12423432',
                    vName: '可乐',
                    dDate: '2020-03-21T00:00:00.0000000',
                    dDebt: '636',
                }],
                // 控制新增页面的form表单可见性
                dialogFormVisible: false,
                //删除的元素是谁
                delItem: [],
                // 用于新增数据绑定
                dataInfo: {
                    dNumber: '',
                    gid: '',
                    vName: '',
                    dDate: '',
                    dDebt: '',
                },
                formLabelWidth: '120px',
                pageSize:5,  //分页数量
                currentPage:1 ,//初始页
                //初始数据的长度
                totalItems:0,
                //最后在页面中显示的数据
                tableDataEnd:[],
                //搜索框内的数据
                searchInput:"",
                filterTableDataEnd:[],
                flag:false,
                selectTags:"",


                debtRules:{
                    dNumber:[
                        {required:true ,validator: reg_dnumber,  trigger: 'blur'}
                    ],
                    gid:[
                        {required:true ,validator: reg_gid,  trigger: 'blur'}
                    ],
                    vName:[
                        {required:true ,validator: reg_vname,  trigger: 'blur'}
                    ],
                    dDate:[
                        {required:true ,validator: reg_date,  trigger: 'blur'}
                    ],
                    dDebt:[
                        {required:true ,validator: reg_money,  trigger: 'blur'}
                    ],

                },
                //选择框的选项
                options: [{
                    value: 'dNumber',
                    label: '欠款单号'
                }, {
                    value: 'gid',
                    label: '商品编号'
                }, {
                    value: 'vName',
                    label: '供应商名称'
                }, {
                    value: 'dDate',
                    label: '日期'
                }, {
                    value: 'dDebt',
                    label: '欠款金额'
                }
                ],
                value: ''
            }
        },
        // 创建的时候发送请求获取显示数据库所有的列表数据
        created() {
            //前端测试代码
            // this.tableData.forEach((value,index)=>{
            //     this.tableDataEnd.push(value);
            // });

            this.tableData=[];
            this.$axios.get("/home/debt").then(res => {
                if(res.data.code === 200){
                    console.log(res);
                    this.tableData = res.data;
                    this.itemCount = res.data.length;
                    this.tableDataEnd=[];
                    this.tableData.forEach((value)=>{
                        this.tableDataEnd.push(value);
                    });
                    console.log(this.itemCount);
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
                    if(selectTag==="dNumber"){
                        if(value.dNumber){
                            let dNumber = ""+value.dNumber;
                            if(dNumber.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="gid"){
                        if(value.gid){
                            let gid= ""+value.gid;
                            if(gid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="vName"){
                        if(value.vName){
                            let vName=""+value.vName;
                            if(vName.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="dDebt"){
                        if(value.dDebt){
                            let dDebt=""+value.dDebt;
                            if(dDebt.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }if(selectTag==="dDate"){
                        if(value.dDate){
                            let dDate = ""+value.dDate;
                            if(dDate.search(this.searchInput)!==-1){
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


                // return row[property] == value;
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
            // 删除选中下标的一行数据，index由click处的scope.$index传过来的下标，delItem由scope.$row传过来的元素
            del(delItem, index) {
                console.log(delItem);
                this.$confirm('你确定要删这条记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //前端测试代码
                    //数据库删除成功在table表里进行删除,
                    // this.filterTableDataEnd=[];
                    // //删除在表格中tableDataEnd显示的哪个数据
                    // this.tableDataEnd.forEach((value,i)=>{
                    //     if(i !==index){
                    //         this.filterTableDataEnd.push(value);
                    //     }
                    // });
                    // this.tableDataEnd=this.filterTableDataEnd;
                    // this.filterTableDataEnd=[];
                    //
                    // //删除从数据源中tableData获得的数据
                    // this.tableData.forEach((value)=>{
                    //     //通过主码快速过滤
                    //     if(value.dNumber!==delItem.dNumber){
                    //         this.filterTableDataEnd.push(value);
                    //     }
                    // });
                    // this.tableData = this.filterTableDataEnd;
                    // this.filterTableDataEnd=[];

                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/delDebt？dNumber='+delItem.dNumber)
                        .then(successResponse => {
                            if(successResponse.data.code===200){
                        //数据库删除成功在table表里进行删除,
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
                            if(value.dNumber!==delItem.dNumber){
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
                    }).catch(() => {
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
