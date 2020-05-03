<template>
  <div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>员工基本信息</span>
      <el-button style="float: right; padding-right: 3px;" type="text"><span style="color: red">删除</span></el-button>
      <el-button style="float: right; padding-right: 3px;" type="text">编辑</el-button>
      <el-button style="float: right; padding-right: 3px;" type="text">
        <router-link to="addemployee">新建</router-link>
      </el-button>
      <el-dialog title="员工基本信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="员工编号" :label-width="formLabelWidth">
            <el-input v-model="form.eid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" :label-width="formLabelWidth">
            <el-input v-model="form.ename" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.ephone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-input v-model="form.erole" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="工资" :label-width="formLabelWidth">
            <el-input v-model="form.esalary" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!--      新增员工弹出框-->
        <el-button type="text" @click="dialogTableVisible = true" style="float: right">新增员工</el-button>
        <el-dialog title="新增员工" :visible.sync="dialogTableVisible" >
          <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible= false">取 消</el-button>
            <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
          </div>
        </el-dialog>
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
          prop="eid"
          label="员工编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ename"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ephone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="erole"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="esalary"
          label="工资/月">
          <el-table-column
            prop="esalary"
            label="操作">

            <template slot-scope="scope">
              <!--            <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="delemp">删除</span></el-button>-->
              <el-button style="float: right; padding-right: 3px;" type="text" @click="editemp">编辑</el-button>
            </template>

          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <span>共{{itemCount}}条记录</span>
  </el-card>
  </div>
</template>

<script>
    export default {
        name: "StockIn",
        data() {
            return {
                options: ['员工编号','员工姓名'],
                tableData: [],
                itemCount: [],
                dialogTableVisible: false,
                userInfo: {
                    eid: "20171103337",
                    ename: "wx",
                    ephone: "12675897623",
                    erole: "员工",
                    esalary: "20000"
                },
                delItem: 0
            }
        },  created() {
            console.log("vue被创建");
            this.$axios.get("/emps").then(res => {
                if (res.data) {
                    console.log(res)
                    this.tableData = res.data;
                    if(res.data.length==0){
                        this.itemCount = 0;
                    }else{
                        this.itemCount = res.data.length;
                    }
                    console.log(this.itemCount);
                }
            }).catch(failResponse => {

            })
        },
        methods: {
            currentOperatorChange(val){
                console.log("selected is changed!",val);
                this.showValue = val;
            },
            addemp() {
                this.tableData.push(this.userInfo);
                console.log("新增被点击")
            },
            // delemp(index){
            //     console.log("删除被点击"+index);
            //     delItem = this.tableData.splice(index,1);
            //     console.log(delItem);
            // },
            editemp() {
                console.log("编辑被点击")
            },
            // delemp() {
            //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         this.$message({
            //             type: 'success',
            //             message: '删除成功!'
            //         });
            //     }).catch(() => {
            //         this.$message({
            //             type: 'info',
            //             message: '已取消删除'
            //         });
            //     });
            // }
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
