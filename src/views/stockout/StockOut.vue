<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>出库单</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="入库单" :visible.sync="dialogFormVisible">
        <el-form :model="dataInfo">
          <el-form-item label="商品代码" :label-width="formLabelWidth">
            <el-input v-model="dataInfo.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="dataInfo.vname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出库单号" :label-width="formLabelWidth">
            <el-input v-model="dataInfo.onumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出库日期" :label-width="formLabelWidth">
            <el-input v-model="dataInfo.odate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="dataInfo.oprice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="已付款项" :label-width="formLabelWidth">
            <el-input v-model="dataInfo.opayment" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input v-model="dataInfo.oaccount" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStockOut">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="text item">
      <el-input style="width: 300px"
                placeholder="请输入商品代码"
                v-model="input"
                clearable>
      </el-input>
      <el-button round>查询</el-button>
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
        :page-sizes="[3,5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>

  </el-card>
</template>

<script>
    export default {
        name: "StockIn",
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
                    oaccount: ''
                },
                formLabelWidth: '120px',
                pagesize:5,
                currentPage:1 //初始页
            }
        },
        // 创建的时候发送请求获取显示数据库所有退货单的列表数据
        created() {
            this.$axios.get("/stockOut").then(res=>{
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
            addStockOut() {
                if (!this.dataInfo.gid) {
                    console.log("商品编号为空");
                    return;
                }
                this.$axios.post('/addstockOut', {
                    gid: this.dataInfo.gid,
                    vname: this.dataInfo.vname,
                    onumber: this.dataInfo.onumber,
                    odate: this.dataInfo.odate,
                    oprice: this.dataInfo.oprice,
                    opayment: this.dataInfo.opayment,
                    oaccount: this.dataInfo.oaccount
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
                }
                // 将填写框置空，方便下次填写
                this.dataInfo = {
                    gid: '',
                    vname: '',
                    onumber: '',
                    odate: '',
                    oprice: '',
                    opayment: '',
                    oaccount: ''
                };
                // 让表格消失
                this.dialogFormVisible = false;
            },

            // 删除选中下标的一行数据，index由click处的scope.$index传过来的小标，delItem由scope.$row传过来的元素
            del(delItem, index) {
                this.$confirm('你确定要删这条记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delItem = this.tableData.splice(index, 1),
                        this.$axios.get('/delstockOut/'+String(delItem.gid)).then(successResponse => {
                            this.$message({
                                type: 'success',
                                // 删除index处的一条记录
                                message: '删除成功!'
                            });
                        }).catch(failedResponse => {
                            this.$message({
                                type: 'info',
                                message: '删除失败'
                            });
                        })
                }).catch(() => {
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
