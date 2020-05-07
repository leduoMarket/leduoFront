<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>库存账</span>
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
          prop="counts"
          label="库存量">
        </el-table-column>
        <el-table-column
          prop="stockAlert"
          label="库存提醒">
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
        name: "Inventory",
        data() {
            return {
                options: [],
                tableData: [],
                pagesize:5,  //分页数量
                currentPage:1, //初始页
                searchInput:''
            }
        },
        // 创建的时候发送请求获取显示数据库列表数据
        created() {
            console.log("vue被创建");
            this.$axios.get("/inventory").then(res => {
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
