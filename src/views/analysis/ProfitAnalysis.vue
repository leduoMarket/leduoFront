<template>
  <div class="Analysis">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>盈亏分析</span>
      </div>
      <div class="chart-container">
        <chart height="85%" width="90%"  />
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
                gridData: [],
                dialogTableVisible: false,
                dialogFormVisible: false,

            }
        },
        methods:{

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

