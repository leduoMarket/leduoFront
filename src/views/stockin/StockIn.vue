<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>入库单</span>
      <!--      新建页面-->
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="入库单" :visible.sync="dialogFormVisible">
        <el-form :model="addform">
          <el-form-item label="商品代码" :label-width="formLabelWidth">
            <el-input v-model="addform.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="addform.vname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入库单号" :label-width="formLabelWidth">
            <el-input v-model="addform.inumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入库日期" :label-width="formLabelWidth">
            <el-input v-model="addform.idate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="addform.iprice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="已付款项" :label-width="formLabelWidth">
            <el-input v-model="addform.ipayment" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input v-model="addform.iaccount" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStockIn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--    查询模块-->
    <div class="text item">
      <el-input style="width: 300px"
                placeholder="请输入商品代码"
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
          prop="inumber"
          label="入库单号">
        </el-table-column>
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
          prop="idate"
          label="入库日期">
        </el-table-column>
        <el-table-column
          prop="iprice"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="ipayment"
          label="已付款项">
        </el-table-column>
        <el-table-column
          prop="icount"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="esalary"
          label="操作">
          <!--          默认为每一行增加删除操作，只需要在methods里面定义就好-->
          <template slot-scope="scope">
            <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red"
                                                                                  @click="del(scope.row,scope.$index)">删除</span>
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
</template>

<script>
    export default {
        name: "StockIn",
        data() {
            return {
                // 标记删除或者添加是否成功
                addSuccessful: false,
                //显示页面的表格的数据
                tableData: [],
                //删除的元素是谁
                delItem: [],
                // 控制员工新增页面的form表单可见性
                dialogTableVisible: false,
                dialogFormVisible: false,
                // 用于新增表单数据时的绑定
                addform: {
                    gid: '',
                    vname: '',
                    inumber: '',
                    idate: '',
                    iprice: '',
                    ipayment: '',
                    iaccount: ''
                },
                formLabelWidth: '120px',
                pagesize: 5,
                currentPage: 1, //初始页
                searchInput: ''
            }
        },
        // 创建的时候发送请求获取显示数据库所有员工的列表数据
        created() {
            console.log("vue被创建");
            this.$axios.get("/stockins").then(res => {
                if (res.data) {
                    console.log(res);
                    this.tableData = res.data;
                }
            }).catch(failResponse => {

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
            beginSearch() {
                //以入库单号为参数向后端发送请求，请求参数为search搜索框里面的内容，保存在searchInput中
                this.$axios.get('/queiryStockIn', {
                    params: {
                        inumber: this.searchInput,
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
            //新增的一条记录里面最后一个操作是删除，默认每一行代码都有，所以必须要有del函数，不然会报错
            del(delItem, delIndex) {
                console.log("执行了删除函数")
            }
        },
        created() {
            this.$axios.get("/stock").then(res => {
                if (res.data) {
                    console.log(res)
                    this.tableData = res.data;
                    this.itemCount = res.data.length;
                    console.log(this.itemCount);
                }
            }).catch(failResponse => {

            })
        },

        //新增表单操作
        addStockIn() {
            if (!this.addform.gid) {
                console.log("商品代码为空");
                return;
            }
            this.$axios.post('/stockIn', {
                gid: this.addform.gid,
                vname: this.addform.vname,
                inumber: this.addform.inumber,
                idate: this.addform.date,
                iprice: this.addform.price,
                ipayment: this.addform.payment,
                iaccount: this.addform.account,
            }).then(successResponse => {
                if (successResponse.data.code == 200) {
                    this.addSuccessful = true;
                    this.$message({
                        message: '成功添加一条记录',
                        type: 'success',
                    });
                    //将信息刷新到表格中
                    this.tableData.push(this.addform);
                    //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                    this.addform = {
                        gid: '',
                        vname: '',
                        inumber: '',
                        idate: '',
                        iprice: '',
                        ipayment: '',
                        iaccount: '',
                    };
                }
            }).catch(failedResponse => {


            });
            // 让表格消失
            this.addform = {
                gid: '',
                vname: '',
                inumber: '',
                idate: '',
                iprice: '',
                ipayment: '',
                iaccount: '',
            };
            this.dialogFormVisible = false;
        },
        // 删除选中下标的一行数据，index由click处的scope.$index传过来的小标，delItem由scope.$row传过来的元素
        del(delItem, index) {
            console.log(delItem);
            this.$confirm('你确定要删除这条记录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //如果用户确实要删除，则用delete方式删除，并且传递要删除的记录的eid
                this.$axios.delete('/delstockIn', {
                    params: {
                        stockInId: delItem.inumber
                    }
                }).then(successResponse => {
                    //数据库删除成功在table表里进行删除,
                    this.tableData.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(failResponse => {
                    //用户同意删除情况下数据库删除失败
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
