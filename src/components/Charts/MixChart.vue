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
                iData:[
                    {
                        "idate":"2020-04-25",
                        "sumin":250.00,
                    },{
                        "idate":"2020-04-26",
                        "sumin":3200.00,
                    },{
                        "idate":"2020-04-27",
                        "sumin":900.00,
                    },{
                        "idate":"2020-04-28",
                        "sumin":200.00,
                    },{
                        "idate":"2020-04-29",
                        "sumin":400.00,
                    }
                ],
                oData:[
                    {
                        "sumout":300.00,
                        "odate":"2020-04-25"
                    },
                    {
                        "sumout":600.00,
                        "odate":"2020-04-26"
                    },
                    {
                        "sumout":880.00,
                        "odate":"2020-04-27"
                    },
                    {
                        "sumout":810.00,
                        "odate":"2020-04-28"
                    },{
                        "sumout":200.00,
                        "odate":"2020-05-29"
                    },
                ],

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
                this.dateArr=[];
                this.inData=[];
                this.outData=[];
                this.proData=[];
                //从后端获得数据的函数要写在这里



                //数据处理函数
                let dayMin = this.iData[0].idate;
                let dayMax = this.iData[this.iData.length-1].idate;
                let day = "";
                let length1 = this.iData.length;
                let length2 = this.oData.length;
                //找到最大日期和最小日期
                for(let i=1; i<length1-1; i++){
                    day = this.iData[i].idate;
                    if(day<dayMin){
                        dayMin=day;
                    }
                    if(day>dayMax){
                        dayMax=day;
                    }
                    day = "";
                }
                for(let i=1; i<length2; i++){
                    day = this.oData[i].odate;
                    if(day<dayMin){
                        dayMin=day;
                    }
                    if(day>dayMax){
                        dayMax=day;
                    }
                }
                console.log("最小日期",dayMin);
                console.log("最大日期",dayMax);
                let day1 = dayMin;
                let day2 = dayMax;
                let getDate = function(str) {
                    let tempDate = new Date();
                    let list = str.split("-");
                    tempDate.setFullYear(list[0]);
                    tempDate.setMonth(list[1] - 1);
                    tempDate.setDate(list[2]);
                    return tempDate;
                };
                let date1 = getDate(day1);
                let date2 = getDate(day2);
                if (date1 > date2) {
                    let tempDate = date1;
                    date1 = date2;
                    date2 = tempDate;
                }
                date1.setDate(date1.getDate() + 1);
                let dateArr = [];
                let i = 0;
                while (!(date1.getFullYear() == date2.getFullYear()
                    && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
                        .getDate())) {
                    let dayStr =date1.getDate().toString();
                    if(dayStr.length ==1){
                        dayStr="0"+dayStr;
                    }
                    let month = '' + (date1.getMonth() + 1);
                    if(month.length<2){
                        month = '0'+month;
                    }
                    dateArr[i] = date1.getFullYear() + "-" + month + "-"
                        + dayStr;
                    i++;
                    date1.setDate(date1.getDate() + 1);
                }
                dateArr.splice(0,0,day1);
                dateArr.push(day2);
                console.log(dateArr);

                let inData = [];
                let outData = [];
                let proData = [];

                let length = dateArr.length;
                for(let i=0 ;i<length ;i++){
                    inData.push(0);
                    outData.push(0);
                    day = dateArr[i];
                    for(let j=0;j<length1;j++){
                        if(day==this.iData[j].idate){
                            inData[i]=this.iData[j].sumin;
                        }
                    }
                    for(let j=0;j<length2;j++){
                        if(day==this.oData[j].odate){
                            outData[i]=this.oData[j].sumout;
                        }
                    }
                }
                for(let i=0;i<length;i++){
                    proData.push(inData[i]-outData[i]);
                }


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
                        data: dateArr
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
                        data: inData
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
                            data: outData
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
                            data: proData
                        }
                    ]
                })
            }
        }
    }
</script>
