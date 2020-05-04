<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>支付流水帐</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="支付流水帐" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="交易号" :label-width="formLabelWidth">
            <el-input v-model="form.pnumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="交易时间" :label-width="formLabelWidth">
            <el-input v-model="form.pdate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="交易类别" :label-width="formLabelWidth">
            <el-input v-model="form.pcategory" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="来源店铺" :label-width="formLabelWidth">
            <el-input v-model="form.psource_shop" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="交易金额" :label-width="formLabelWidth">
            <el-input v-model="form.ptrading_amount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="现余额" :label-width="formLabelWidth">
            <el-input v-model="form.premainning_amount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-input v-model="form.ptype" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="已付款项" :label-width="formLabelWidth">
            <el-input v-model="form.ppayment" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="text item">
      <div class="text item">
        <el-input style="width: 300px"
                  placeholder="请输入供应商代码"
                  v-model="input"
                  clearable>
        </el-input>
        <el-button round>查询</el-button>
      </div>
    </div>
    <div class="form">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="pnumber"
          label="交易号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pdate"
          label="交易时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pcategory"
          label="交易类别">
        </el-table-column>
        <el-table-column
          prop="psource_shop"
          label="来源店铺">
        </el-table-column>
        <el-table-column
          prop="ptrading_amount"
          label="交易金额">
        </el-table-column>
        <el-table-column
          prop="premainning_amount"
          label="现余额">
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
                    pnumber: '',
                    pdate: '',
                    pcatecory: '',
                    psource_shop: '',
                    ptrading_amount: '',
                    premainning_amount: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
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
    height: 200px;
  }
</style>
