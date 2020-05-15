<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    import resize from './mixins/resize'
    export default {
        mixins: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '200px'
            },
            height: {
                type: String,
                default: '200px'
            }
        },
        data() {
            return {
                chart: null,
                //入库数据
                inData:[122,1233,4333,2232,2330,3232,322,1231],
                //出库数据
                outData:[327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220],
                //利润
                proData:[-1036, 3693, 2962, 3810, 2519, 1915,1748, 4675, 6209, 4323, 2865, 4298],
                //日期
                xData:["星期一","星期二","星期三","星期三","星期四","星期五","星期六","星期天"],
            }
        },
        mounted() {
            this.initChart()
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose();
            this.chart = null
        },

        methods: {
            //构造图表
            initChart() {

                //帮助理解的测试部分，要注释掉
                this.inData=[2333,1000,233,2221,2323,123,2323];
                console.log(this.inData);


                //从后端获得数据的函数要写在这里,猪猪加油，有四个
                this.$axios.get("/getIn").then(res =>{
                    if(res.data){
                        console.log(res.data);
                        this.inData=res.data;

                    }
                }).catch(falseResponse =>{
                    // this.$message.error("无数据");
                });

                this.$axios.get("/getOut").then(res =>{
                    if(res.data){
                        console.log(res.data);
                        this.outData=res.data;
                    }
                }).catch(falseResponse =>{
                   // this.$message.error("无数据");
                });

                this.$axios.get("/getDate").then(res =>{
                    if(res.data){
                        console.log(res.data);
                        this.xData=res.data;
                    }
                }).catch(falseResponse =>{
                    // this.$message.error("无数据");
                });

                this.$axios.get("/getPro").then(res =>{
                    if(res.data){
                        console.log(res.data);
                        this.proData=res.data;
                    }
                }).catch(falseResponse =>{
                    // this.$message.error("无数据");
                });

                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption({
                    backgroundColor: 'white',
                    title: {
                        text: 'statistics',
                        x: '20',
                        top: '20',
                        textStyle: {
                            color: '#fff',
                            fontSize: '22'
                        },
                        subtextStyle: {
                            color: '#90979c',
                            fontSize: '16'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        borderWidth: 0,
                        top: 150,
                        bottom: 95,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    legend: {
                        x: '5%',
                        top: '10%',
                        textStyle: {
                            color: '#90979c'
                        },
                        data: ['入库单', '出库单', '总计']
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#90979c'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0

                        },
                        data: this.xData
                    }],
                    yAxis: [{
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#90979c'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0
                        },
                        splitArea: {
                            show: false
                        }
                    }],
                    dataZoom: [{
                        show: true,
                        height: 30,
                        xAxisIndex: [
                            0
                        ],
                        bottom: 30,
                        start: 10,
                        end: 80,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '110%',
                        handleStyle: {
                            color: '#d3dee5'

                        },
                        textStyle: {
                            color: '#fff' },
                        borderColor: '#90979c'

                    }, {
                        type: 'inside',
                        show: true,
                        height: 15,
                        start: 1,
                        end: 35
                    }],
                    series: [{
                        name: '入库单',
                        type: 'bar',
                        stack: 'total',
                        barMaxWidth: 35,
                        barGap: '10%',
                        itemStyle: {
                            normal: {
                                color: 'rgba(255,144,128,1)',
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff'
                                    },
                                    position: 'insideTop',
                                    formatter(p) {
                                        return p.value > 0 ? p.value : ''
                                    }
                                }
                            }
                        },
                        data: this.inData
                    },

                        {
                            name: '出库单',
                            type: 'bar',
                            stack: 'total',
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0,191,183,1)',
                                    barBorderRadius: 0,
                                    label: {
                                        show: true,
                                        position: 'top',
                                        formatter(p) {
                                            return p.value > 0 ? p.value : ''
                                        }
                                    }
                                }
                            },
                            data: this.outData
                        }, {
                            name: '总计',
                            type: 'line',
                            stack: 'total',
                            symbolSize: 10,
                            symbol: 'circle',
                            itemStyle: {
                                normal: {
                                    color: 'rgba(252,230,48,1)',
                                    barBorderRadius: 0,
                                    label: {
                                        show: true,
                                        position: 'top',
                                        formatter(p) {
                                            return p.value > 0 ? p.value : ''
                                        }
                                    }
                                }
                            },
                            data: this.proData
                        }
                    ]
                })
            }
        }
    }
</script>
