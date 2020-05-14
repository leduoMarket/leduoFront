

<template>
  <div class="Analysis">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>盈亏分析</span>
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
          style="width: 100%" @sort-change="changeTableSort">
          <el-table-column
            prop="sale"
            label="销售总额"
            width="180"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="principal"
            label="本金总额"
            width="180"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="profit"
            label="利润总额"
            sortable="custom"
          >
          </el-table-column>
        </el-table>
      </div>
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
                searchInput:''
            }
        },
        methods:{
            //分页排序整体表格数据
            changeTableSort(column){
                console.log(column);
                //获取字段名称和排序类型
                var fieldName = column.prop;
                var sortingType = column.order;
                //按照降序排序
                if(sortingType == "descending"){
                    this.tableData = this.tableData.sort((a, b) => b[fieldName] - a[fieldName]);
                }
                //按照升序排序
                else{
                    this.tableData = this.tableData.sort((a, b) => a[fieldName] - b[fieldName]);
                    console.log(this.tableData)
                }
            },
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

