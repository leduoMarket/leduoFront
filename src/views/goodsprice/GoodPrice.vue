<template>
  <div class="GoodPrice">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品定价</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="商品定价" :visible.sync="dialogFormVisible">
        <el-form :model="dataInfo" :rules="goodPriceRules" ref="dataInfo">
          <el-form-item label="商品代码" :label-width="formLabelWidth" prop="gid">
            <el-input v-model="dataInfo.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth" prop="gname">
            <el-input v-model="dataInfo.gname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="历史价格" :label-width="formLabelWidth" prop="pold_price">
            <el-input v-model="dataInfo.pold_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="调整价格" :label-width="formLabelWidth" prop="pnew_price">
            <el-input v-model="dataInfo.pnew_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="调整原因" :label-width="formLabelWidth" prop="preason">
            <el-input v-model="dataInfo.preason" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="调整日期" :label-width="formLabelWidth" prop="pdate">
            <el-input v-model="dataInfo.pdate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="操作人员" :label-width="formLabelWidth" prop="phandler">
            <el-input v-model="dataInfo.phandler" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addcommodityPricing">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="text item">
      <el-input style="width: 300px"
                placeholder="请输入商品编号"
                v-model="searchInput"
                clearable>
      </el-input>
      <el-button round @click="beginSearch">查询</el-button>
    </div>
    <div class="form">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%">
        <el-table-column
          prop="gid"
          label="商品编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="gname"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pold_price"
          label="历史价格">
        </el-table-column>
        <el-table-column
          prop="pnew_price"
          label="调整价格">
        </el-table-column>
        <el-table-column
          prop="preason"
          label="调整原因">
        </el-table-column>
        <el-table-column
          prop="pdate"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="phandler"
          label="操作人">
        </el-table-column>
        <el-table-column
          prop="esalary"
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
      reg_gid,
      reg_gname,
      reg_money,
      reg_reason,
      reg_date,
      reg_ename

  } from "../login/validator";

  export default {
        name: "GoodPrice",
      data() {
            return {
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
                    gname: '',
                    pold_price: '',
                    pnew_price: '',
                    preason: '',
                    pdate: '',
                    phandler: '',
                },
                formLabelWidth: '120px',
                pagesize:5,  //分页数量
                currentPage:1 ,//初始页
                searchInput:'',

                goodPriceRules:{
                    gid:[
                        {required:true ,validator: reg_gid,  trigger: 'blur'}
                    ],
                    gname:[
                        {required:true ,validator: reg_gname,  trigger: 'blur'}
                    ],
                    pold_price:[
                        {required:true ,validator: reg_money,  trigger: 'blur'}
                    ],
                    pnew_price:[
                        {required:true ,validator: reg_money,  trigger: 'blur'}
                    ],
                    preason:[
                        {required:true ,validator: reg_reason,  trigger: 'blur'}
                    ],
                    pdate:[
                        {required:true ,validator: reg_date,  trigger: 'blur'}
                    ],
                    phandler:[
                        {required:true ,validator: reg_ename,  trigger: 'blur'}
                    ]
                },
            }
        },
        // 创建的时候发送请求获取显示数据库所有退货单的列表数据
        created() {
            this.$axios.get("/commodityPricing").then(res=>{
                if(res.data){
                    console.log(res)
                    this.tableData = res.data;
                    this.itemCount = res.data.length;
                    console.log(this.itemCount);
                }
            }).catch(failResponse=>{

            })
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
            openAddPage() {
                this.dialogFormVisible = true;

            },
            //查询
            beginSearch(){
                this.$axios.get('/querycommodityPricing',{
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
                });
                this.searchInput='';
            },
            addcommodityPricing() {
                this.$refs.dataInfo.validate()
                    .then(res =>{

                        this.$axios.post('/addcommodityPricing', {
                            gid: this.dataInfo.gid,
                            gname: this.dataInfo.gname,
                            poldPrice: this.dataInfo.pold_price,
                            pnewPrice: this.dataInfo.pnew_price,
                            preason: this.dataInfo.preason,
                            pdate: this.dataInfo.pdate,
                            phandler: this.dataInfo.phandler,
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
                            this.$message({
                                message: '成功添加一条记录',
                                type: 'success'
                            });
                            // 将填写框置空，方便下次填写
                            this.dataInfo = {
                                gid: '',
                                gname: '',
                                pold_price: '',
                                pnew_price: '',
                                preason: '',
                                pdate: '',
                                phandler: '',
                            };
                            // 让表格消失
                            this.dialogFormVisible = false;
                        }

                    }).catch(error =>{
                    this.$message({
                        message: '无法提交，表单中数据有错误',
                        type: 'error'
                    });

                })

            },

            // 删除选中下标的一行数据，index由click处的scope.$index传过来的下标，delItem由scope.$row传过来的元素
            del(delItem, index) {
                console.log(delItem);
                this.$confirm('你确定要删这条记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/delcommodityPricing', {
                        params: {
                            priceId: delItem.gid
                        }
                    }).then(successResponse => {
                        //数据库删除成功在table表里进行删除,
                        this.tableData.splice(index, 1);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(failedResponse => {
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
                console.log(delItem);
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
