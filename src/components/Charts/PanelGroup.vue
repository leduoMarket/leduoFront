<template>
  <el-row :gutter="130" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('year')">
        <div class="card-panel-description">
          <div class="card-panel-text">
            ByYear
          </div>
          <count-to :start-val="0" :end-val=sumData.year :duration="5600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('month')">
        <div class="card-panel-description">
          <div class="card-panel-text">
            ByMonth
          </div>
          <count-to :start-val="0" :end-val=sumData.month :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('day')">

        <div class="card-panel-description">
          <div class="card-panel-text">
            ByDay
          </div>
          <count-to :start-val="0" :end-val=sumData.day :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<script>
    import CountTo from 'vue-count-to'
    export default {
        name: "PanelGroup",
        components:{
            CountTo
        },
        props:{
            sumData:{
                type:Object,
                default: {
                    "year" : 0,
                    "month":0,
                    "day":0,
                },
            }
        },
        methods: {
            handleSetLineChartData(type) {
                this.$emit('handleSetLineChartData', type)
            }
        }
    }
</script>
<style scoped>
  .panel-group {
    margin-top: 2px;
    margin-left: 10%;
  }

  .card-panel-col {
    margin-bottom: 2px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
  }
  .card-panel-description {
    float: right;
    font-weight: bold;
    margin: 26px 26px 26px 0px;
  }

  .card-panel-text {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
  }

  .card-panel-num {
    font-size: 20px;
  }
</style>
