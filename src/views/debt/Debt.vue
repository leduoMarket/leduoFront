<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>欠款单</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="欠款单" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="欠款单号" :label-width="formLabelWidth">
            <el-input v-model="form.vid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品代码" :label-width="formLabelWidth">
            <el-input v-model="form.vname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="form.gid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="金额" :label-width="formLabelWidth">
            <el-input v-model="form.gname" autocomplete="off"></el-input>
          </el-form-item>
<!--          <el-form-item label="信誉" :label-width="formLabelWidth">-->
<!--            <el-input v-model="form.inumber" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="日期" :label-width="formLabelWidth">
            <el-input v-model="form.date" autocomplete="off"></el-input>
          </el-form-item>
<!--          <el-form-item label="信誉" :label-width="formLabelWidth">-->
<!--            <el-input v-model="form.vcredit" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="贷款结算" :label-width="formLabelWidth">-->
<!--            <el-input v-model="form.payment" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
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
                  placeholder="请输入欠款单号"
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
          prop="vid"
          label="欠款单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="vname"
          label="商品代码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="gid"
          label="供应商名称">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="gid"-->
<!--          label="已付款">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="inumber"
          label="欠款">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="ddate"-->
<!--          label="信誉">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="vcredit"
          label="日期">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="dpayment"-->
<!--          label="贷款结算">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="esalary"
          label="操作">

          <template slot-scope="scope">
            <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="del">删除</span></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
                    vid: '',
                    vname: '',
                    gid: '',
                    gname: '',
                    inumber: '',
                    ddate: '',
                    vcredit: '',
                    dpayment: '',
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
