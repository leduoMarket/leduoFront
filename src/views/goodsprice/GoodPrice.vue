<template>
  <div class="GoodPrice">
  <el-card class="box-card">
    <div slot="header" class="clearFix">
      <span>商品定价</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="addForm">新建</el-button>
      <el-dialog title="商品定价" :visible.sync="dialogFormVisible">
        <el-form :model="dataInfo" :rules="goodPriceRules" ref="dataInfo">
          <el-form-item label="商品代码" :label-width="formLabelWidth" prop="gid" >
            <el-input v-model="dataInfo.gid" autocomplete="off" @blur="getGood"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth" prop="gName">
            <el-input v-model="dataInfo.gName" autocomplete="off" :readonly="status ? false : 'readonly'"></el-input>
          </el-form-item>
          <el-form-item label="历史价格" :label-width="formLabelWidth" prop="pOldPrice">
            <el-input v-model="dataInfo.pOldPrice" autocomplete="off" :readonly="status ? false : 'readonly'"></el-input>
          </el-form-item>
          <el-form-item label="调整价格" :label-width="formLabelWidth" prop="pNewPrice">
            <el-input v-model="dataInfo.pNewPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="调整原因" :label-width="formLabelWidth" prop="pReason">
            <el-input v-model="dataInfo.pReason" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="调整日期" :label-width="formLabelWidth" prop="pDate">
            <el-input v-model="dataInfo.pDate" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="操作人员" :label-width="formLabelWidth" prop="pHandler">
            <el-input v-model="dataInfo.pHandler" autocomplete="off"  readonly   ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCommodityPricing">确 定</el-button>
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
        style="width: 100%"   ref="filterTable" @sort-change="changeTableSort">
        <el-table-column
          prop="gid"
          label="商品编号"
          width="150"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="gName"
          label="商品名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="pOldPrice"
          label="历史价格"
          width="80">
        </el-table-column>
        <el-table-column
          prop="pNewPrice"
          label="调整价格"
          width="80">
        </el-table-column>
        <el-table-column
          prop="pReason"
          label="调整原因">
        </el-table-column>
        <el-table-column
          prop="pDate"
          label="日期"
          :formatter="dateFormat"

          column-key="date"
          :filters="[{text: '今年', value: '2020-'}, {text: '去年', value: '2019-'}, {text: '本月', value: '2020-05'}, {text: '上月', value: '2020-04'}]"
          :filter-method="filterHandler"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="pHandler"
          label="操作人">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="pHandle"-->
<!--          label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button style="float: left; padding-right: 3px;" type="text">-->
<!--              <span style="color: red" @click="del(scope.row,scope.$index)">删除</span>-->
<!--            </el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
    import {reg_date, reg_ename, reg_gid, reg_gname, reg_money, reg_reason} from "../login/validator";
    import moment from 'moment'

    export default {
        name: "GoodPrice",
      data() {
            return {
                readonly:true,
                status:true,
                scope:null,
                // 标记删除或者添加是否成功
                addSuccessful: false,
                // delSuccessful: false,
                // 在基础表格中展示的数据
                tableData: [],
                // 控制新增页面的form表单可见性
                dialogFormVisible: false,
                dialogTableVisible: false,
                //删除的元素是谁
                delItem: [],
                // 用于新增数据绑定
                dataInfo: {
                    gid: '',
                    gName: '',
                    pOldPrice: '',
                    pNewPrice: '',
                    pReason: '',
                    pDate: '',
                    pHandler: '',
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
                    value: 'gName',
                    label: '商品名称'
                }, {
                    value: 'pOldPrice',
                    label: '历史价格'

                }, {
                    value: 'pNewPrice',
                    label: '调整价格'
                }, {
                    value: 'pReason',
                    label: '调整原因'
                },{
                    value: 'pDate',
                    label: '调整日期'
                },{
                    value: 'pHandler',
                    label: '操作人'
                }
                ],
                value: '',

                goodPriceRules:{
                    gid:[
                        {required:true ,validator: reg_gid,  trigger: 'blur'}
                    ],
                    gName:[
                        {required:true ,validator: reg_gname,  trigger: 'blur'}
                    ],
                    pOldPrice:[
                        {required:true ,validator: reg_money,  trigger: 'blur'}
                    ],
                    pNewPrice:[
                        {required:true ,validator: reg_money,  trigger: 'blur'}
                    ],
                    pReason:[
                        {required:true ,validator: reg_reason,  trigger: 'blur'}
                    ],
                    pDate:[
                        {required:true ,validator: reg_date,  trigger: 'blur'}
                    ],
                    pHandler:[
                        {required:true ,validator: reg_ename,  trigger: 'blur'}
                    ]
                },
            }
        },
        // 创建的时候发送请求获取显示数据库所有退货单的列表数据
        created() {
            //前端测试部分
            this.tableData=[];
            this.$axios.get("/staff/getProductPricingInfo").then(res=>{
                if(res.data.code === 200){
                    let item = {
                        gid: '',
                        gName: '',
                        pOldPrice: '',
                        pNewPrice: '',
                        pReason: '',
                        pDate: '',
                        pHandler: '',

                    };
                    res.data.data.forEach(value=>{
                        item.gid=value.gid;
                        item.gName=value.gname;
                        item.pNewPrice=value.pnewPrice;
                        item.pOldPrice=value.poldPrice;
                        item.pReason=value.preason;
                        item.pDate=value.pdate;
                        item.pHandler=value.phandler;
                        this.tableData.push(item);
                        item = {
                            gid: '',
                            gName: '',
                            pOldPrice: '',
                            pNewPrice: '',
                            pReason: '',
                            pDate: '',
                            pHandler: '',
                        };
                    });
                    this.tableDataEnd=[];
                    this.tableData.forEach((value)=>{
                        this.tableDataEnd.push(value);
                    });
                }
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '无法获取数据'
                });

            })
        },
        methods: {
            getGood(){
                this.status = false;
                if(this.dataInfo.gid.length===13){
                    this.$axios.get('/staff/getProductInfoByGid',{
                        params:{
                            gid:this.dataInfo.gid
                        }
                    }).then(res =>{
                        if(res.data.code === 200){
                            this.dataInfo.gName= res.data.data.gname;
                            this.dataInfo.pOldPrice=res.data.data.chargeUnit;
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.message
                            });
                            this.dataInfo.gName = "";
                            this.dataInfo.pOldPrice = "";
                        }
                    }).catch(failResponse =>{
                        this.$message.error(failResponse.message);
                        this.dataInfo.gName = "";
                        this.dataInfo.pOldPrice = "";
                    });
                }else {
                    this.$message.error("请输入商品代码");
                    this.dataInfo.gName = "";
                    this.dataInfo.pOldPrice = "";
                }


            },
            //新增表单的显示
            addForm(){
              this.dialogFormVisible=true;
              this.dataInfo.pHandler=JSON.parse(sessionStorage.getItem("uid"));
                let getNowFormatDate = function() {
                    let date = new Date();
                    let seperator1 = "-";
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let strDate = date.getDate();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    let currentdate = year + seperator1 + month + seperator1 + strDate;
                    return currentdate;
                };
                this.dataInfo.pDate=""+getNowFormatDate();
            },
            // 分页排序整体表格数据
            changeTableSort(column){
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
                }
            },

            // 初始页currentPage、初始每页数据数pageSize和数据data
            handleSizeChange: function (size) {
                this.pageSize = size;

            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
            openAddPage() {
                this.dialogFormVisible = true;

            },
            //日期格式化显示
            dateFormat:function(row,column){

                let date = row[column.property];

                if(date === undefined){
                    return '';
                }
                return moment(date).format("YYYY-MM-DD")

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
                this.searchInput = this.searchInput.trim();
                this.tableDataEnd=[];
                this.filterTableDataEnd=[];
                this.tableData.forEach((value)=>{
                    if(selectTag==="gid"){
                        if(value.gid){
                            let gid = "" + value.gid;
                            if(gid.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="gName"){
                        if(value.gName){
                            let gName = ""+value.gName;
                            if(gName.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="pOldPrice"){
                        if(value.pOldPrice){
                            let pOldPrice = "" + value.pOldPrice;
                            if(pOldPrice.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="pNewPrice"){
                        if(value.pNewPrice){
                            let pNewPrice = "" + value.pNewPrice;
                            if(pNewPrice.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="pReason"){
                        if(value.pReason){
                            let pReason = ""+ value.pReason;
                            if(pReason.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="pDate"){
                        if(value.pDate){
                            let pDate = ""+value.pDate;
                            if(pDate.search(this.searchInput)!==-1){
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                    if(selectTag==="pHandler"){
                        if(value.pHandler){
                            let pHandler = ""+value.pHandler;
                            if(pHandler.search(this.searchInput)!==-1){
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
            addCommodityPricing() {

                //前端测试部分
                this.$refs.dataInfo.validate()
                    .then(() =>{
                        this.$axios.post('/staff/addProductPricingInfo', {
                            gid: this.dataInfo.gid,
                            gname: this.dataInfo.gName,
                            poldPrice: this.dataInfo.pOldPrice,
                            pnewPrice: this.dataInfo.pNewPrice,
                            preason: this.dataInfo.pReason,
                            pdate: this.dataInfo.pDate,
                            phandler: this.dataInfo.pHandler,
                        }).then(successResponse => {
                            if (successResponse.data.code === 200) {
                                this.dialogFormVisible = false;
                                this.tableData.unshift(this.dataInfo);
                                this.tableDataEnd.unshift(this.dataInfo);
                                // 将填写框置空，方便下次填写
                                this.dataInfo = {
                                    gid: '',
                                    gName: '',
                                    pOldPrice: '',
                                    pNewPrice: '',
                                    pReason: '',
                                    pDate: '',
                                    pHandler: '',
                                };
                                this.$message({
                                    message: '成功添加一条记录',
                                    type: 'success'
                                });
                            }else {
                                this.$message({
                                    message: successResponse.data.message,
                                    type: 'error'
                                });
                            }
                        }).catch(() => {
                            this.$message.error('插入数据失败');
                        });

                    }).catch(() =>{
                    this.$message({
                        message: '无法提交，表单中数据有错误',
                        type: 'error'
                    });

                })

            },

            // 删除选中下标的一行数据，index由click处的scope.$index传过来的下标，delItem由scope.$row传过来的元素
            del(delItem, index) {
                //前端测试部分
                this.$confirm('你确定要删这条记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/staff/delProductPricingInfo?priceId=').then(successResponse => {
                        if(successResponse.data.code ===200){
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
                                if(value.gid!==delItem.gid||value.gName!==delItem.gName||value.pOldPrice!==delItem.pOldPrice||value.pNewPrice!==delItem.pNewPrice||value.pReason!==delItem.pReason||value.pDate!==delItem.pDate||value.pHandler!==delItem.pHandler){

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
  }
</style>
