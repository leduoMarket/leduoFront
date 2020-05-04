<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品定价</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="商品定价" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品代码" :label-width="formLabelWidth">
            <el-input v-model="form.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.gname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="历史价格" :label-width="formLabelWidth">
            <el-input v-model="form.pold_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="调整价格" :label-width="formLabelWidth">
            <el-input v-model="form.pnew_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="调整原因" :label-width="formLabelWidth">
            <el-input v-model="form.preason" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="调整日期" :label-width="formLabelWidth">
            <el-input v-model="form.pdate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="操作人员" :label-width="formLabelWidth">
            <el-input v-model="form.phandler" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="text item">
      <el-input style="width: 300px"
                placeholder="请输入商品编号"
                v-model="input"
                clearable>
      </el-input>
      <el-button round>查询</el-button>
    </div>
    <div class="form">
      <el-table
        :data="tableData"
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
            <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="del">删除</span></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span>共0条记录</span>
  </el-card>
</template>

<script>
    export default {
        name: "StockIn",
        data() {
            return {
                options: [],
                tableData: [],
                gridData: [],
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    gid: '',
                    gname: '',
                    pold_price: '',
                    pnew_price: '',
                    preason: '',
                    pdate: '',
                    phandler: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
            }
        },
        created() {
            this.$axios.get("/productprice").then(res=>{
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
    height: 200px;
  }
</style>
