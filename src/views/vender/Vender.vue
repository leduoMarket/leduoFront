<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>供应商表</span>
      <el-button style="float: right; padding: 3px 0" type="text" >编辑</el-button>
      <el-button style="float: right; padding: 3px 0" type="text" >删除</el-button>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>
      <el-dialog title="供应商表" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="供应商代码" :label-width="formLabelWidth">
            <el-input v-model="form.vid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="form.vname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.vaddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.vphone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="传真" :label-width="formLabelWidth">
            <el-input v-model="form.vfax" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="信誉" :label-width="formLabelWidth">
            <el-input v-model="form.vcredit" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="贷款结算" :label-width="formLabelWidth">
            <el-input v-model="form.vsettle_account" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
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
          prop="vid"
          label="供应商代码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="vname"
          label="供应商名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="vaddress"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="iphone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="iemail"
          label="E-mail">
        </el-table-column>
        <el-table-column
          prop="ifax"
          label="传真">
        </el-table-column>
        <el-table-column
          prop="vcredit"
          label="信誉">
        </el-table-column>
        <el-table-column
          prop="vsettle_account"
          label="贷款结算">
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
                    vid: '',
                    vname: '',
                    vaddress: '',
                    vphone: '',
                    vemail: '',
                    vfax: '',
                    vcredit: '',
                    vsettle_account: '',
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
            this.$axios.get("/vender").then(res=>{
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
