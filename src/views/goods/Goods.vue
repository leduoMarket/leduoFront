<template>
  <div class="goods">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品表</span>
           <!-- 新建页面-->
        <el-button style="float: right; padding: 3px 0" type="text"  @click="goToClass">分类规则</el-button>

      <el-button style="float: right; padding: 3px 10px" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="商品表" :visible.sync="dialogFormVisible">
        <el-form :model="dataInfo" :rules="goodsRules" ref="dataInfo">
          <el-form-item label="商品代码" :label-width="formLabelWidth" prop="gid">
            <el-input v-model="dataInfo.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth" prop="gname">
            <el-input v-model="dataInfo.gname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品类别" :label-width="formLabelWidth" prop="categories">
          <el-input v-model="dataInfo.categories" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="生产地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="dataInfo.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="计价单位" :label-width="formLabelWidth" prop="charge_unit">
            <el-input v-model="dataInfo.charge_unit" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="生产日期" :label-width="formLabelWidth" prop="gdate">
            <el-input v-model="dataInfo.gdate" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGoods">确 定</el-button>
        </div>
      </el-dialog>

    </div>
    <!--    查询模块-->
    <!--<div class="text item">
      <el-input style="width: 300px"
                placeholder="请输入商品编号"
                v-model="searchInput"
                clearable>
      </el-input>
      <el-button round @click="beginSearch">查询</el-button>
    </div>-->
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
        style="width: 100%" @sort-change="changeTableSort">
        <el-table-column
          prop="gid"
          label="商品代码"
          width="180"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="gname"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
        prop="categories"
        label="商品类别">
      </el-table-column>
        <el-table-column
          prop="address"
          label="生产地址">
        </el-table-column>
        <el-table-column
          prop="charge_unit"
          label="计价单位">
        </el-table-column>
        <el-table-column
          :formatter="dateFormat"
          prop="gdate"
          label="生产日期"
          sortable
          width="180"
          column-key="date"
          :filters="[{text: '今年', value: '2020-'}, {text: '去年', value: '2019-'}, {text: '本月', value: '2020-05'}, {text: '上月', value: '2020-04'}]"
          :filter-method="filterHandler"
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
        reg_gid,
        reg_gname,
        reg_gcategories,
        reg_address,
        reg_gchange_unit,
        reg_date,
    } from "../login/validator";

    export default {
        name: "Goods",
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
                dataInfo: {
                    gid:'',
                    gname:'',
                    categories:'',
                    address:'',
                    charge_unit:'',
                    gdate:''
                },
                formLabelWidth: '120px',
                pagesize:5,
                currentPage:1, //初始页
                searchInput:'',

                //初始数据的长度
                totalItems:0,
                //最后在页面中显示的数据
                tableDataEnd:[],
                //搜索框内的数据
                searchInput:"",
                filterTableDataEnd:[],
                flag:false,
                selectTags:"",


                goodsRules:{
                    gid:[
                        {required:true ,validator: reg_gid,  trigger: 'blur'}
                    ],
                    gname:[
                        {required:true ,validator: reg_gname,  trigger: 'blur'}
                    ],
                    categories:[
                        {required:true ,validator: reg_gcategories,  trigger: 'blur'}
                    ],
                    address:[
                        {required:true ,validator: reg_address,  trigger: 'blur'}
                    ],
                    charge_unit:[
                        {required:true ,validator: reg_gchange_unit,  trigger: 'blur'}
                    ],
                    gdate:[
                        {required:true ,validator: reg_date,  trigger: 'blur'}
                    ]
                },
                //选择框的选项
                options: [{
                    value: 'gid',
                    label: '商品代码'
                }, {
                    value: 'gname',
                    label: '商品名称'
                }, {
                    value: 'categories',
                    label: '商品类别'
                }
                ],
                value: ''
            }
        },
        // 创建的时候发送请求获取显示数据库列表数据
        created() {

            this.$axios.get("/home/goods").then(res => {
                if(res.data){
                    console.log(res);
                    this.tableData = res.data;
                    this.itemCount = res.data.length;
                    this.tableDataEnd=[];
                    this.tableDataEnd = this.tableData;
                    console.log(this.itemCount);
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
                    this.tableData = this.tableData.sort((a, b) => b[fieldName] - a[fieldName]);
                }
                //按照升序排序
                else{
                    this.tableData = this.tableData.sort((a, b) => a[fieldName] - b[fieldName]);
                    console.log(this.tableData)
                }
            },

            doFilter(){
                var selectTag = this.selectTags;
                if(this.searchInput == ""){
                    this.$message.warning("查询信息不能为空！！！");
                    return;
                }
                this.tableDataEnd=[];
                this.filterTableDataEnd=[];
                this.tableData.forEach((value,index)=>{
                    if(selectTag=="gid"){
                        if(value.gid){
                            if(value.gid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="gname"){
                        if(value.gname){
                            if(value.gname.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag=="categories"){
                        if(value.categories){
                            if(value.categories.search(this.searchInput)!==-1){
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
                this.tableDataEnd = this.tableData;
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
                this.$axios.get('/home/queryGoods',{
                    params:{
                        gid:this.searchInput,
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
            // 删除选中下标的一行数据，index由click处的scope.$index传过来的小标，delItem由scope.$row传过来的元素
            del(delItem, index){
                this.$confirm('你确定要删除这条记录吗？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() =>{
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/home/delGoods',{
                        params:{
                            GoodsId: delItem.gid
                        }
                    }).then(successResponse =>{
                        //数据库删除成功在table表里进行删除,
                        this.tableData.splice(index, 1);
                        this.tableDataEnd.slice(index,1);
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
            //去商品分类
            goToClass(){
              let role = sessionStorage.getItem("role");
              if(role == "1"){
                  this.$router.replace("/home/goodClass");
              }else if(role =="2") {
                  this.$router.replace("/homet/goodClass");

              }else if(role == "3"){
                  this.$router.replace("/homes/goodClass");
              }
            },
            //新增表单操作
            addGoods(){
                this.$refs.dataInfo.validate()
                    .then(res =>{
                        this.$axios.post('/home/Goods',{
                            gid:this.dataInfo.gid,
                            gname:this.dataInfo.gname,
                            categories:this.dataInfo.categories,
                            address:this.dataInfo.address,
                            charge_unit:this.dataInfo.charge_unit,
                            gdate:this.dataInfo.gdate
                        }).then(successResponse =>{
                            if(successResponse.data.code == 200){
                                this.addSuccessful = true;
                                this.$message({
                                    message: '成功添加一条记录',
                                    type: 'success',
                                });
                                //将信息刷新到表格中
                                this.tableData.push(this.addform);
                                this.tableDataEnd.push(this.addform);
                                //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                                this.addform = {
                                    gid : '',
                                    gname : '',
                                    categories: '',
                                    address : '',
                                    charge_unit : '',
                                    gdate: '',
                                };
                            }
                        }).catch(failedResponse =>{

                        } );
                        // 让表格消失
                        this.addform = {
                            gid : '',
                            gname : '',
                            categories:'',
                            address : '',
                            charge_unit : '',
                            gdate: '',
                        };
                        this.dialogFormVisible = false;
                    }).catch(error =>{
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
