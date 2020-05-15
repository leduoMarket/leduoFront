<template>
  <div class="Analysis">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>盈亏分析</span>
      </div>
      <div class="chart-container">
        <chart height="90%" width="95%" />
      </div>
    </el-card>
  </div>
</template>


<script>
    import Chart from '@/components/Charts/MixChart'
    export default {
        name: "ProfitAnalysis",
        components: { Chart },
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

  .box-card {
    width: 75%;
  }
  .header-info span{
    margin-right: 25px;
    vertical-align: middle;
  }
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }
</style>

