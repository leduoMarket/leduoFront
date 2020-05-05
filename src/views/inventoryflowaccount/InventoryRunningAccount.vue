<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>库存流水账</span>
    </div>
    <div class="text item">
      <div class="text item">
        <!--按照商品代码查询-->
        <!--按照供应商名称查询-->
        <!--按日期查询-->
        <!--按价格查询-->
        <el-select v-model="value" placeholder="请选择" @change="selectGet">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input style="width: 300px"
                  placeholder="请输入搜索条件"
                  v-model="input"
                  clearable>
        </el-input>
        <el-button round>查询</el-button>
      </div>
    </div>
    <div class="form">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%">
        <el-table-column
          prop="vid"
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
          label="单号">
        </el-table-column>
        <el-table-column
          prop="idate"
          label="日期">
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
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3,5, 10, 20, 40]"
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
                // 下拉选项的options列表的展示值和接收值
                options: [{
                    value: '商品代码',
                    label: '商品代码'
                }, {
                    value: '供应商名称',
                    label: '供应商名称'
                }, {
                    value: '日期',
                    label: '日期'
                }, {
                    value: '价格',
                    label: '价格'
                }],
                //默认的搜索类型显示
                value: '商品代码',
                tableData: [],
                dialogTableVisible: false,
                dialogFormVisible: false,
                pagesize: 5,  //分页数量
                currentPage: 1 //初始页
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
            selectGet(selectedItem) {
                console.log(selectedItem);
            }
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
