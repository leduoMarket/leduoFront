<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>入库单</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="入库单" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品代码" :label-width="formLabelWidth">
            <el-input v-model="form.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="form.vname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入库单号" :label-width="formLabelWidth">
            <el-input v-model="form.inumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入库日期" :label-width="formLabelWidth">
            <el-input v-model="form.date" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="已付款项" :label-width="formLabelWidth">
            <el-input v-model="form.payment" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input v-model="form.account" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStockIn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--      搜索框-->
    <div class="text item">
      <el-input style="width: 300px"
                placeholder="请输入入库单编号"
                v-model="input"
                clearable>
      </el-input>
      <el-button round>查询</el-button>
    </div>

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
          prop="inumber"
          label="入库单号">
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
        name: "StockIn",
        data() {
            return {
                // 标记删除或者添加是否成功
                addSuccessful: false,
                options: [],
                //显示页面的表单数据
                tableData: [

                ],
                //删除的元素是谁
                delItem: [],
                // 控制员工新增页面的form表单可见性
                dialogTableVisible: false,
                dialogFormVisible: false,
                // 用于新增表单数据时的绑定
                form: {
                    gid:'',
                    vname:'',
                    inumber:'',
                    date:'',
                    price:'',
                    payment:'',
                    account:''
                },
                formLabelWidth: '120px',
                pagesize:5,
                currentPage:1, //初始页
                //搜索框查询内容
                input:'',
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
            addStockIn(){
                if (!this.form.gid){
                    console.log("员工号为空");
                    return;
                }
                this.$axios.post('/stockIn',{
                    gid:this.form.gid,
                    vname:this.form.vname,
                    inumber:this.form.inumber,
                    date:this.form.date,
                    price:this.form.price,
                    payment:this.form.payment,
                    account:this.form.account,
                }).then(successResponse =>{
                    if(successResponse.data.code === 200){
                        this.addSuccessful = true;
                    }
                }).catch(failedResponse =>{
                    this.addSuccessful = false;
                } );
                if(!this.addSuccessful){
                    this.message.error('插入数据失败')
                }else{
                    this.tableData.push(this.form);
                    this.$message({
                        message: '成功添加一条记录',
                        type: 'success'
                    });
                }
                // 将填写框置空，方便下次填写
                this.form = {
                    gid : '',
                    vname : '',
                    inumber : '',
                    date : '',
                    price: '',
                    payment: '',
                    account: '',
                };
                // 让表格消失
                this.dialogFormVisible = false;
            },
            // 删除选中下标的一行数据，index由click处的scope.$index传过来的小标，delItem由scope.$row传过来的元素
            del(delItem, index){
                console.log('del');
            }

        },
        created() {
            this.$axios.get("/stock").then(res=>{
                if(res.data){
                    console.log(res)
                    this.tableData = res.data;
                    this.itemCount = res.data.length;
                    console.log(this.itemCount);
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
