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
        style="width: 100%"  ref="filterTable" @sort-change="changeTableSort"
      >
        <el-table-column
          prop="inumber"
          label="入库单号"
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
          prop="idate"
          label="入库日期"
          width="180"
          column-key="date"
          :filters="[{text: '今年', value: '2020-'}, {text: '去年', value: '2019-'}, {text: '本月', value: '2020-05'}, {text: '上月', value: '2020-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="iprice"
          label="价格"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="ipayment"
          label="已付款项"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="icount"
          label="数量"
          sortable="custom"
        >
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
                // 标记删除或者添加是否成功
                addSuccessful: false,
                //显示页面的表单数据
                tableData: [

                    {
                        inumber:'I2020040101',
                        gid:'1234567890123',
                        vname:'雪碧',
                        idate:'2020-04-01T00:00:00.0000000',
                        iprice:'10',
                        ipayment:'300',
                        icount:'40'
                    },
                    {
                        inumber:'I2020040302',
                        gid:'1234567890123',
                        vname:'橙汁',
                        idate:'2020-04-03T00:00:00.0000000',
                        iprice:'9',
                        ipayment:'9090',
                        icount:'10'
                    },
                    {
                        inumber:'I2020040502',
                        gid:'1234567890123',
                        vname:'橙汁',
                        idate:'2020-04-05T00:00:00.0000000',
                        iprice:'15.5',
                        ipayment:'9090',
                        icount:'10'
                    },
                    {
                        inumber:'I2020040201',
                        gid:'1234567890123',
                        vname:'可乐',
                        idate:'2019-04-02T00:00:00.0000000',
                        iprice:'12.2',
                        ipayment:'9090',
                        icount:'10'
                    },{
                        inumber:'I2020040301',
                        gid:'1234567890123',
                        vname:'橙汁',
                        idate:'2020-04-03T00:00:00.0000000',
                        iprice:'13.7',
                        ipayment:'9090',
                        icount:'10'
                    },
                ],
                nowDate:"",   //当前日期

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
                    value: 'inumber',
                    label: '入库单代码'
                }, {
                    value: 'gid',
                    label: '商品代码'
                }, {
                    value: 'vname',
                    label: '供应商名称'

                }, {
                    value: 'idate',
                    label: '入库日期'
                }, {
                    value: 'iprice',
                    label: '价格'
                },{
                    value: 'ipayment',
                    label: '已付款项'
                },{
                    value: 'icount',
                    label: '数量'
                }
                ],
                value: '',
                addLastForm:'',


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
                },

            }
        },
        //过滤器

        // 创建的时候发送请求获取显示数据库所有员工的列表数据
        created() {

            this.$axios.get("/home/stockIn").then(res => {
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
            /*//初始化加载列表
            getDeviceTypes() {
                this.loading = true;         //将“创建时间”转换为所需的时间格式
                 this.tableData.map(item => {
                     item.createTime = this.$moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
                 });
                 this.loading = false;
                 },*/

            //分页排序整体表格数据
            changeTableSort(column){
                console.log(column);
                //获取字段名称和排序类型
                var fieldName = column.prop;
                var sortingType = column.order;
                //如果字段名称为“创建时间”，将“创建时间”转换为时间戳，才能进行大小比较
                if(fieldName=="idate"){
                 this.tableData.map(item => {
                     item.idate = this.$moment(item.idate).valueOf();
                 });
                }
                //按照降序排序
                if(sortingType == "descending"){
                    this.tableData = this.tableData.sort((a, b) => b[fieldName] - a[fieldName]);
                }
                //按照升序排序
                else{
                    this.tableData = this.tableData.sort((a, b) => a[fieldName] - b[fieldName]);
                    console.log(this.tableData)
                }
                if(fieldName=="idate"){
                    this.tableData.map(item => {
                        item.idate = this.$moment(item.idate).format(
                            "YYYY-MM-DD HH:mm:ss"
                        );
                    });
                }

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
                if(this.searchInput == ""){
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
                    if(selectTag=="inumber"){
                        if(value.inumber){
                            if(value.inumber.search(this.searchInput)!==-1){
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
                    if(selectTag=="idate"){
                        if(value.idate){
                            if(value.idate.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="iprice"){
                        if(value.iprice){
                            if(value.iprice.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="ipayment"){
                        if(value.ipayment){
                            if(value.ipayment.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="icount"){
                        if(value.icount){
                            if(value.icount.search(this.searchInput)!==-1){
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
                this.$axios.get('/home/queryStockIn',{
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
                    this.$axios.delete('/delstockIn',{
                        params:{
                            stockInId: delItem.inumber
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
                            if(value.inumber!=delItem.inumber){
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
            },
            //新增表单操作
            addStockIn(){
                //逻辑前端判断
                this.submitBtn=true;
                this.$refs.addform.validate()  //判断表单验证是否通过，验证通过执行.then()，否则执行.catch()
                    .then(res =>{
                        if(this.addLastForm===this.addform){
                            this.$message.warning('您已经提交过，请勿重复提交');
                        }
                        this.$axios.post('/home/addstockIn',{
                            inumber:this.addform.inumber,
                            gid:this.addform.gid,
                            vname:this.addform.vname,
                            idate:this.addform.idate,
                            iprice:this.addform.iprice,
                            ipayment:this.addform.ipayment,
                            icount:this.addform.icount,
                        }).then(successResponse =>{
                            if(successResponse.data.code == 200){
                                this.submitBtn=false;
                                this.addSuccessful = true;
                                this.$message({
                                    message: '成功添加一条记录',
                                    type: 'success',
                                });
                                //将信息刷新到表格中，指向同一个数据源所以只添加一次
                                this.tableDataEnd.push(this.addform);
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
                            this.submitBtn=false;

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
