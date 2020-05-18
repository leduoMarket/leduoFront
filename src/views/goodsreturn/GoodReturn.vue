<template>
  <div class="goodreturn">
  <el-card class="box-card">
    <div slot="header" class="clearFix">
      <span>退货单</span>

      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="退货单" :visible.sync="dialogFormVisible">
        <el-form :model="dataInfo" :rules="goodReturnRules" ref="dataInfo">
          <el-form-item label="商品代码" :label-width="formLabelWidth" prop="gid">
            <el-input v-model="dataInfo.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="退货日期" :label-width="formLabelWidth" prop="rDate">
            <el-input v-model="dataInfo.rDate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="退货数量" :label-width="formLabelWidth" prop="rCount">
            <el-input v-model="dataInfo.rCount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="退货原因" :label-width="formLabelWidth" prop="rReason">
            <el-input v-model="dataInfo.rReason" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGoodsReturn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="form">
      <!--查找-->
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
        style="width: 100%" @sort-change="changeTableSort">
        <el-table-column
          prop="gid"
          label="商品代码"
          width="180"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          :formatter="dateFormat"
          prop="rDate"
          label="退货日期"
          sortable
          width="180"
          column-key="date"
          :filters="[{text: '今年', value: '2020-'}, {text: '去年', value: '2019-'}, {text: '本月', value: '2020-05'}, {text: '上月', value: '2020-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="rCount"
          label="退货数量"
          width="150"
          sortable="custom"
        >
        </el-table-column>

        <el-table-column
          prop="rReason"
          width="250"
          label="退货原因">
        </el-table-column>
        <el-table-column
          fixed = "right"
          prop="rHandle"
          label="操作">

          <template slot-scope="scope">
            <el-button style="float: left; padding-right: 3px;" type="text">
              <span style="color: red" @click="del(scope.row,scope.$index)">删除</span>
            </el-button>
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
      reg_gid,
      reg_date,
      reg_count,
      reg_reason,

  } from "../login/validator"
  import moment from 'moment'
  export default {
        name: "GoodReturn",
        data() {
            return {
                scope:null,
                // 标记删除或者添加是否成功
                addSuccessful: false,
                // delSuccessful: false,
                // 在基础表格中展示的数据
                tableData: [
                    {
                        gid: 123456789012,
                        rDate: '2020-05-01T00:00:00.0000000',
                        rReason: '不喜欢',
                        rCount:10
                },
                    {
                        gid:1238901890123,
                        rDate: '2020-04-01T00:00:00.0000000',
                        rReason: '质量不好',
                        rCount:3
                    }],
                // 控制新增页面的form表单可见性
                dialogFormVisible: false,
                dialogTableVisible: false,
                //删除的元素是谁
                delItem: [],
                // 用于新增数据绑定
                dataInfo: {
                    gid: '',
                    rDate: '',
                    rReason: '',
                    rCount:'',
                },
                formLabelWidth: '120px',
                pageSize:5,  //分页数量
                currentPage:1 ,//初始页

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
                    value: 'gid',
                    label: '商品编号'
                }, {
                    value: 'rDate',
                    label: '退货日期'
                }, {
                    value: 'rCount',
                    label: '退货数量'
                }
                ],
                value: '',

                goodReturnRules:{
                    gid:[
                        {required:true ,validator: reg_gid,  trigger: 'blur'}
                    ],
                    rDate:[
                        {required:true ,validator: reg_date,  trigger: 'blur'}
                    ],
                    rCount: [
                        {required:true ,validator: reg_count,  trigger: 'blur'}
                    ],
                    rReason:[
                        {required:true ,validator: reg_reason,  trigger: 'blur'}
                    ]
                }
            }
        },
        // 创建的时候发送请求获取显示数据库所有退货单的列表数据
        created() {
            //前端代码测试
           /* this.tableData.forEach((value)=>{
                this.tableDataEnd.push(value);
            });*/
            this.tableData=[];
            this.$axios.get("/home/goodsReturn").then(res=>{
                if(res.data.code===200){
                    console.log(res);
                    let item = {
                        gid: '',
                        rDate: '',
                        rReason: '',
                        rCount:'',

                    };
                    res.data.data.forEach(value=>{
                        item.gid=value.gid;
                        item.rDate=value.rdate;
                        item.rReason=value.rreason;
                        item.rCount=value.rcount;
                        this.tableData.push(item);
                        item = {
                            gid: '',
                            rDate: '',
                            rReason: '',
                            rCount:'',
                        };
                    });
                    this.tableDataEnd=[];
                    this.tableData.forEach((value)=>{
                        this.tableDataEnd.push(value);
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: this.res.data.message
                    });
                }
            }).catch(failResponse=>{
                this.$message({
                    type: 'info',
                    message: failResponse.data.message
                });

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

            //日期格式化显示
            dateFormat:function(row,column){

                let date = row[column.property];

                if(date === undefined){return ''}

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
                //去空格
                this.searchInput = this.searchInput.trim();
                this.tableDataEnd=[];
                this.filterTableDataEnd=[];
                this.tableData.forEach((value)=>{
                    if(selectTag==="gid"){
                        if(value.gid){
                            let gid = ""+value.gid;
                            if(gid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="rCount"){
                        if(value.rCount){
                            let rCount = ""+value.rCount;
                            if(rCount.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="rDate"){
                        if(value.rDate){
                            let rDate = ""+value.rDate;
                            if(rDate.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                });
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
            addGoodsReturn() {
                // 前端测试代码，将push改为unshift
               /* this.dialogFormVisible = false;
                this.tableData.unshift(this.dataInfo);
                this.tableDataEnd.unshift(this.dataInfo);
                this.dataInfo = {
                    gid: '',
                    rDate: '',
                    rReason: '',
                    rCount: '',
                };
                this.$message({
                    message: '成功添加一条记录',
                    type: 'success'
                });*/
                    this.$refs.dataInfo.validate()
                        .then(() => {
                            this.$axios.post('/home/addgoodsReturn', {
                                gid: this.dataInfo.gid,
                                rdate: this.dataInfo.rDate,
                                rreason: this.dataInfo.rReason,
                                rcount: this.dataInfo.rCount,
                            }).then(successResponse => {
                                if (successResponse.data.code === 200) {

                                    this.dialogFormVisible = false;
                                    this.tableData.unshift(this.dataInfo);
                                    this.tableDataEnd.unshift(this.dataInfo);
                                    this.dataInfo = {
                                        gid: '',
                                        rDate: '',
                                        rReason: '',
                                        rCount: '',
                                    };
                                    this.$message({
                                        message: '成功添加一条记录',
                                        type: 'success'
                                    });
                                } else {
                                    this.$message({
                                        message: successResponse.data.message,
                                        type: 'error',
                                    });
                                }
                            }).catch(failedResponse => {
                                this.addSuccessful = false;
                                this.$message({
                                    message:failedResponse.data.message,
                                    type: 'error'
                                });
                            });

                        }).catch(() => {
                        this.$message({
                            message: '无法提交，表单中数据有错误',
                            type: 'error'
                        });

                    });

                },

            // 删除选中下标的一行数据，index由click处的scope.$index传过来的下标，delItem由scope.$row传过来的元素
            del(delItem, index) {
                //删除前端测试
              /*  //数据库删除成功在table表里进行删除,
                this.filterTableDataEnd = [];
                //删除在表格中tableDataEnd显示的哪个数据
                this.tableDataEnd.forEach((value, i) => {
                    if (i !== index) {
                        this.filterTableDataEnd.push(value);
                    }
                });
                this.tableDataEnd = this.filterTableDataEnd;
                this.filterTableDataEnd = [];

                //删除从数据源中tableData获得的数据
                this.tableData.forEach((value, i) => {
                    //通过主码快速过滤
                    if (value.gid != delItem.gid || value.rReason != delItem.rReason || value.rDate != delItem.rDate || value.rCount != value.rCount) {
                        this.filterTableDataEnd.push(value);
                    }
                });
                this.tableData = this.filterTableDataEnd;
                this.filterTableDataEnd = [];
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });*/

                this.$confirm('你确定要删这条记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/home/delgoodsReturn', {
                        params: {
                            goodsId: delItem.gid
                        }
                    }).then(successResponse => {
                        if(successResponse.data.code===200) {
                            //数据库删除成功在table表里进行删除,
                            this.filterTableDataEnd = [];
                            //删除在表格中tableDataEnd显示的哪个数据
                            this.tableDataEnd.forEach((value, i) => {
                                if (i !== index) {
                                    this.filterTableDataEnd.push(value);
                                }
                            });
                            this.tableDataEnd = this.filterTableDataEnd;
                            this.filterTableDataEnd = [];

                            //删除从数据源中tableData获得的数据
                            this.tableData.forEach((value) => {
                                //通过主码快速过滤
                                if (value.gid !== delItem.gid || value.rReason !== delItem.rReason || value.rDate !== delItem.rDate || value.rCount !== delItem.rCount) {
                                    this.filterTableDataEnd.push(value);
                                }
                            });
                            this.tableData = this.filterTableDataEnd;
                            this.filterTableDataEnd = [];
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else {
                            this.$message({
                                type: 'info',
                                message: '删除失败'
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
    margin-top: 30px;
  }
</style>
