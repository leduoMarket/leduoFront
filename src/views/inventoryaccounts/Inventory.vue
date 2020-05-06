<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>库存账</span>
<!--      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新建</el-button>-->
<!--      <el-dialog title="库存账" :visible.sync="dialogFormVisible">-->
<!--        <el-form :model="form">-->
<!--          <el-form-item label="商品代码" :label-width="formLabelWidth">-->
<!--            <el-input v-model="form.gid" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="商品名称" :label-width="formLabelWidth">-->
<!--            <el-input v-model="form.gname" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="库存量" :label-width="formLabelWidth">-->
<!--            <el-input v-model="form.inumber" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <div slot="footer" class="dialog-footer">-->
<!--          <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
<!--        </div>-->
<!--      </el-dialog>-->
    </div>
    <div class="text item">
      <div class="text item">
        <el-input style="width: 300px"
                  placeholder="请输入商品编号"
                  v-model="searchInput"
                  clearable>
        </el-input>
        <el-button round @click="beginSearch">查询</el-button>
      </div>
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
          prop="gname"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="inumber"
          label="库存量">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="esalary"-->
<!--          label="操作">-->

<!--          <template slot-scope="scope">-->
<!--            <el-button style="float: left; padding-right: 3px;" type="text"><span style="color: red" @click="del">删除</span></el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
        name: "Inventory",
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
                    inumber: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                pagesize:5,  //分页数量
                currentPage:1, //初始页
                searchInput:''
                // form: {
                //     gid: '',
                //     gname: '',
                //     inumber: '',
                //     date1: '',
                //     date2: '',
                //     delivery: false,
                //     type: [],
                //     resource: '',
                //     desc: ''
                // },
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
            //查询
            beginSearch(){
                this.$axios.get('/queryInventory',{
                    params:{
                        gid:this.searchInput,
                    }
                }).then(successfulResponse=>{
                    console.log('this.tableData'+successfulResponse.data);
                    this.tableData=[];
                    this.tableData.push(successfulResponse.data);
                    this.$message({
                        message: '成功找到记录',
                        type: 'success'
                    });
                }).catch(failedResponse=>{
                    this.$message('没有找到记录哦');
                })
            },
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
