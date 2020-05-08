<template>
  <div class="goodreturn">
    <Menu></Menu>
    <TopBar></TopBar>
    <router-view></router-view>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>退货单</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="退货单" :visible.sync="dialogFormVisible">
        <el-form :model="dataInfo" :rules="goodReturnRules" ref="dataInfo">
          <el-form-item label="商品代码" :label-width="formLabelWidth" prop="gid">
            <el-input v-model="dataInfo.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="退货日期" :label-width="formLabelWidth" prop="rdate">
            <el-input v-model="dataInfo.rdate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="退货数量" :label-width="formLabelWidth" prop="rcount">
            <el-input v-model="dataInfo.rcount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="退货原因" :label-width="formLabelWidth" prop="rreason">
            <el-input v-model="dataInfo.rreason" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGoodsReturn">确 定</el-button>
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
          label="商品代码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="rdate"
          label="退货日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="rcount"
          label="退货数量">
        </el-table-column>

        <el-table-column
          prop="rreason"
          label="退货原因">
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
      reg_date,
      reg_count,
      reg_reason,

  } from "../login/validator";
  import TopBar from "D:/web/leduoFront/src/components/template/TopBar";
  import Menu from "D:/web/leduoFront/src/components/template/Menu";
  export default {
        name: "GoodReturn",
        components: {TopBar,Menu},
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
                    rdate: '',
                    rreason: '',
                    rcount:'',
                },
                formLabelWidth: '120px',
                pagesize:5,  //分页数量
                currentPage:1 ,//初始页
                searchInput:'',

                goodReturnRules:{
                    gid:[
                        {required:true ,validator: reg_gid,  trigger: 'blur'}
                    ],
                    rdate:[
                        {required:true ,validator: reg_date,  trigger: 'blur'}
                    ],
                    rcount: [
                        {required:true ,validator: reg_count,  trigger: 'blur'}
                    ],
                    rreason:[
                        {required:true ,validator: reg_reason,  trigger: 'blur'}
                    ]
                }
            }
        },
        // 创建的时候发送请求获取显示数据库所有退货单的列表数据
        created() {
            this.$axios.get("/goodsReturn").then(res=>{
                if(res.data){
                    console.log(res);
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
            //查询
            beginSearch(){
                this.$axios.get('/querygoodsReturn',{
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
            openAddPage() {
                this.dialogFormVisible = true;

            },
            addGoodsReturn() {
                this.$refs.dataInfo.validate()
                    .then(res =>{
                        this.$axios.post('/addgoodsReturn', {
                            gid: this.dataInfo.gid,
                            rdate: this.dataInfo.rdate,
                            rreason: this.dataInfo.rreason,
                            rcount: this.dataInfo.rcount,
                        }).then(successResponse => {
                            if (successResponse.data.code === 200) {
                                this.addSuccessful = true;
                                this.tableData.push(this.dataInfo);
                                this.$message({
                                    message: '成功添加一条记录',
                                    type: 'success'
                                });
                            }
                        }).catch(failedResponse => {
                            this.addSuccessful = false;
                            this.$message.error('插入数据失败');
                        });

                        // 将填写框置空，方便下次填写
                        this.dataInfo = {
                            gid: '',
                            rdate: '',
                            rreason: '',
                            rcount: '',
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

            // 删除选中下标的一行数据，index由click处的scope.$index传过来的下标，delItem由scope.$row传过来的元素
            del(delItem, index) {
                console.log(delItem);
                this.$confirm('你确定要删这条记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/delgoodsReturn', {
                        params: {
                            goodsId: delItem.gid
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

  .box-card {
    width: 75%;
  }
  .form {
    height: 100%;
    margin-top: 30px;
  }
</style>
