<template>
  <div class="Analysis">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>盈亏分析</span>
<!--        <el-button style="float: right; padding: 3px 0" type="text" >编辑</el-button>-->
<!--        <el-button style="float: right; padding: 3px 0" type="text" >删除</el-button>-->
<!--        <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>-->
<!--        <el-dialog title="盈亏分析" :visible.sync="dialogFormVisible">-->
<!--          <el-form :model="form">-->
<!--            <el-form-item label="销售总额" :label-width="formLabelWidth">-->
<!--              <el-input v-model="form.sale" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="本金总额" :label-width="formLabelWidth">-->
<!--              <el-input v-model="form.principal" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="利润总额" :label-width="formLabelWidth">-->
<!--              <el-input v-model="form.profit" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--          <div slot="footer" class="dialog-footer">-->
<!--            <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
<!--          </div>-->
<!--        </el-dialog>-->
      </div>
      <div class="text item">
        <el-select v-model="value" placeholder="请选择"  value="">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button round>查询</el-button>
      </div>
      <div class="form">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="sale"
            label="销售总额"
            width="180">
          </el-table-column>
          <el-table-column
            prop="principal"
            label="本金总额"
            width="180">
          </el-table-column>
          <el-table-column
            prop="profit"
            label="利润总额">
          </el-table-column>
        </el-table>
      </div>
      <span>共0条记录</span>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "ProfitAnalysis",
        data() {
            return {
                options: [],
                tableData: [],
                gridData: [],
                dialogTableVisible: false,
                dialogFormVisible: false,
                // form: {
                //     sale: '',
                //     principal: '',
                //     profit: '',
                //     date1: '',
                //     date2: '',
                //     delivery: false,
                //     type: [],
                //     resource: '',
                //     desc: ''
                // },
                // formLabelWidth: '120px'
                searchInput:''
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
    width: 60%;
  }
  .el-breadcrumb{
    height: 30px;
    background-color: #EAEAFD;
    line-height: 30px;
    /*设置居中*/
  }
  .header-info{
    text-align: right;
    background-color: #F7F7FB;
    height: 30px;
  }
  .header-info span{
    margin-right: 25px;
    vertical-align: middle;
  }
</style>

