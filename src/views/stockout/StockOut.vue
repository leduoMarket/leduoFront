<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>出库单</span>
      <!--        出库单弹窗-->
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="出库单" :visible.sync="dialogFormVisible">
        <el-form :model="addform">
          <el-form-item label="商品代码" :label-width="formLabelWidth">
            <el-input v-model="addform.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="addform.vname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出库单号" :label-width="formLabelWidth">
            <el-input v-model="addform.onumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出库日期" :label-width="formLabelWidth">
            <el-input v-model="addform.odate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="addform.oprice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="已付款项" :label-width="formLabelWidth">
            <el-input v-model="addform.opayment" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input v-model="addform.oaccount" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStockOut">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--      搜索框-->
<!--    <div class="text item">-->
<!--      <el-input style="width: 300px"-->
<!--                placeholder="请输出库单编号"-->
<!--                v-model="input"-->
<!--                clearable>-->
<!--      </el-input>-->
<!--      <el-button round>查询</el-button>-->
<!--    </div>-->
    <!-- table展示框-->
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
          prop="vname"
          label="供应商名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="onumber"
          label="出库单号">
        </el-table-column>
        <el-table-column
          prop="odate"
          label="出库日期">
        </el-table-column>
        <el-table-column
          prop="oprice"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="opayment"
          label="已付款项">
        </el-table-column>
        <el-table-column
          prop="ocount"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="esalary"
          label="操作">

          <template slot-scope="scope">
            <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="del">删除</span></el-button>
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
</template>

<script>
    export default {
        name: "StockOut",
        data() {
            return {
                // 标记删除或者添加是否成功
                addSuccessful: false,
                //显示页面的表单数据
                tableData: [],
                //删除的元素是谁
                delItem: [],
                // 控制员工新增页面的form表单可见性
                dialogTableVisible: false,
                dialogFormVisible: false,
                //新增表单数据的绑定
                addform: {
                    gid: '',
                    vname: '',
                    onumber: '',
                    odate: '',
                    oprice: '',
                    opayment: '',
                    oaccount: '',
                },
                formLabelWidth: '120px',
                pagesize: 5,
                currentPage: 1, //初始页
            }
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
            addStockOut() {
                if (!this.addform.inumber) {
                    console.log("单号为空");
                    return;
                }
                this.$axios.post('/stockOut', {
                    gid: this.addform.gid,
                    vname: this.addform.vname,
                    onumber: this.addform.onumber,
                    date: this.addform.odate,
                    price: this.addform.oprice,
                    payment: this.addform.opayment,
                    account: this.addform.oaccount,
                }).then(successResponse => {
                    if (successResponse.data.code === 200) {
                        this.addSuccessful = true;
                        this.$message({
                            message: '成功添加一条记录',
                            type: 'success',
                        });
                        //将信息刷新到表格中
                        this.tableData.push(this.addform);
                        //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                        this.addform = {
                            gid : '',
                            vname : '',
                            onumber : '',
                            odate : '',
                            oprice: '',
                            opayment: '',
                            oaccount: '',
                        };
                    }
                }).catch(failedResponse => {
                    this.addSuccessful = false;
                });

                // 将填写框置空，方便下次填写
                this.addform = {
                    gid: '',
                    vname: '',
                    inumber: '',
                    odate: '',
                    oprice: '',
                    opayment: '',
                    oaccount: '',
                };
                // 让表格消失
                this.dialogFormVisible = false;
            },
            del(delItem, index) {
                console.log(delItem);
                this.$confirm('你确定要删除这条记录吗？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() =>{
                    //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                    this.$axios.delete('/delstockOut',{
                        params:{
                            empId: delItem.onumber
                        }
                    }).then(successResponse =>{
                        //数据库删除成功在table表里进行删除,
                        this.tableData.splice(index, 1);
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
        },
        created() {
            console.log("vue被创建");
            this.$axios.get("/stockout").then(res=>{
                if(res.data){
                    console.log(res);
                    this.tableData = res.data;
                }
            }).catch(failResponse=>{

            })
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
