<template>
  <div class="Analysis">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>盈亏分析</span>
      </div>
      <div style="margin-left: 10%">
        <panel-group  @handleSetLineChartData="handleSetLineChartData " v-bind:sumData="sumData" />
      </div>

      <div class="chart-container">
        <chart height="85%" width="95%" :chart-data="lineChartData" />
      </div>
    </el-card>
  </div>
</template>
<script>
    import Chart from '../../components/Charts/MixChart'
    import PanelGroup from "../../components/Charts/PanelGroup";
    let lineChartData = {
        year:{
            dateArr:[],
            inData:[],
            outData:[],
            proData:[],
        },
        month:{
            dateArr:[],
            inData:[],
            outData:[],
            proData:[],
        },
        day:{
            dateArr:[],
            inData:[],
            outData:[],
            proData:[],
        }
    };
    export default {
        name: "ProfitAnalysis",
        components: { Chart,PanelGroup },
        data() {
            return {
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
                        "odate":"2020-05-01"
                    },
                ],

                lineChartData:lineChartData["day"],
                sumData:{
                    "year" : 0,
                    "month":0,
                    "day":0,
                },
            }
        },
        created(){
            //从后端获取数据
            this.$axios.get("/treasure/analyseinsum").then(res =>{
                if(res.data.code === 200){
                    this.iData = [];
                    let item = {
                        "idate":"",
                        "sumin":""
                    };
                    res.data.data.forEach(value=>{
                        item.idate = ""+value.idate;
                        item.sumin = value.sumin;
                        this.iData.push(item);
                        item = {
                            "idate":"",
                            "sumin":""
                        }
                    })
                }else{
                    this.$message({
                        type:'info',
                        message:res.data.message
                    });
                }
            }).catch( failResponse =>{
                this.$message({
                    type: 'info',
                    message: failResponse.message
                });
            });
            this.$axios.get("/treasure/analyseoutsum").then(res =>{
                if(res.data.code === 200){
                    this.oData=[];
                    let item = {
                        "sumout":"",
                        "odate":""
                    };
                    res.data.data.forEach(value=>{
                        item.odate = ""+value.odate;
                        item.sumout = value.sumout;
                        this.oData.push(item);
                        item = {
                            "sumout":"",
                            "odate":""
                        };
                    });
                }else{
                    this.$message({
                        type:'info',
                        message:res.data.message
                    })
                }
            }).catch( failResponse =>{
                this.$message({
                    type: 'info',
                    message: failResponse.message
                });
            });

        },
        methods:{
            handleSetLineChartData(type) {
                this.dataProcessing(type);
                this.lineChartData = lineChartData[type]
            },
            dataProcessing(type) {

                //日期处理函数
                let getDate = function (str) {
                    let tempDate = new Date();
                    let list = str.split("-");
                    tempDate.setFullYear(list[0]);
                    tempDate.setMonth(list[1] - 1);
                    tempDate.setDate(list[2]);
                    return tempDate;
                };
                let DateToNumber = function (str) {
                    let list = str.split("-");
                    list[0]=Number(list[0]);
                    list[1]=Number(list[1]);
                    list[2]=Number(list[2]);
                    return list[0]*10000+list[1]*100+list[2];
                };
                //数据处理函数
                let dayMinN = DateToNumber(this.iData[0].idate);
                let dayMaxN = DateToNumber(this.iData[this.iData.length - 1].idate);

                 let day;
                 let dayMin = this.iData[0].idate;
                 let dayMax = this.iData[this.iData.length-1].idate;
                 let length1 = this.iData.length;
                 let length2 = this.oData.length;
                 //找到最大日期和最小日期
                for (let i = 0; i < length1; i++) {
                    day = DateToNumber(this.iData[i].idate);
                    if (day < dayMinN) {
                        dayMin = this.iData[i].idate
                    }
                    if (day > dayMaxN) {
                        dayMax = this.iData[i].idate;
                    }
                }
                for (let i = 0; i < length2; i++) {
                    day = DateToNumber(this.oData[i].odate);
                    if (day < dayMinN) {
                        dayMin = this.oData[i].odate;
                    }
                    if (day > dayMaxN) {
                        dayMax = this.oData[i].odate;
                    }
                }
                let day1 = dayMin;
                let day2 = dayMax;


                if(type==="day"){
                    //day的构造
                    lineChartData[type].dateArr=[];
                    lineChartData[type].inData=[];
                    lineChartData[type].outData=[];
                    lineChartData[type].proData=[];


                    let date1 = getDate(day1);
                    let date2 = getDate(day2);
                    if (date1 > date2) {
                        let tempDate = date1;
                        date1 = date2;
                        date2 = tempDate;
                    }
                    let i = 0;
                    while (!(date1.getFullYear() === date2.getFullYear()
                        && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate())) {
                        let dayStr =date1.getDate().toString();
                        if(dayStr.length ===1){
                            dayStr="0"+dayStr;
                        }
                        let month = '' + (date1.getMonth() + 1);
                        if(month.length<2){
                            month = '0'+month;
                        }
                        lineChartData["day"].dateArr[i] = date1.getFullYear() + "-" + month + "-"
                            + dayStr;
                        i++;
                        date1.setDate(date1.getDate() + 1);
                    }
                    if(dayMin === dayMax){
                        lineChartData["day"].dateArr.push(dayMin);
                    }else {
                        lineChartData["day"].dateArr.push(day2);
                    }

                    let length = lineChartData["day"].dateArr.length;
                    for(let i=0 ;i<length ;i++){
                        lineChartData["day"].inData.push(0);
                        lineChartData["day"].outData.push(0);
                        day = lineChartData["day"].dateArr[i];
                        for(let j=0;j<length1;j++){
                            if(day===this.iData[j].idate){
                                lineChartData["day"].inData[i]=this.iData[j].sumin;
                            }
                        }
                        for(let j=0;j<length2;j++){
                            if(day===this.oData[j].odate){
                                lineChartData["day"].outData[i]=this.oData[j].sumout;
                            }
                        }
                    }
                    this.sumData.day=0;
                    for(let i=0;i<length;i++){
                        lineChartData["day"].proData.push(lineChartData["day"].outData[i]-lineChartData["day"].inData[i]);
                        this.sumData.day=this.sumData.day+lineChartData["day"].proData[i];
                    }
                }
                 if(type==="month"){
                     lineChartData[type].dateArr=[];
                     lineChartData[type].inData=[];
                     lineChartData[type].outData=[];
                     lineChartData[type].proData=[];
                   //月的构造
                   //获得月的日期
                   lineChartData["month"].dateArr=[];
                   //获得首尾日期
                   let date1 = getDate(day1);
                   let date2 = getDate(day2);
                   if (date1 > date2) {
                       let tempDate = date1;
                       date1 = date2;
                       date2 = tempDate;
                   }
                   let i = 0;
                   while (!(date1.getFullYear() === date2.getFullYear()
                       && date1.getMonth() === date2.getMonth())) {
                       let month = '' + (date1.getMonth() + 1);
                       if(month.length<2){
                           month = '0'+month;
                       }
                       lineChartData["month"].dateArr[i] = date1.getFullYear() + "-" + month ;
                       i++;
                       date1.setDate(date1.getDate() + 30);
                   }
                     let m = '' + (date2.getMonth() + 1);
                     if(m.length<2){
                         m = '0'+m;
                     }
                     let month2 = date2.getFullYear()+"-"+m;
                     let month1 = "" + lineChartData["month"].dateArr[i-1];
                     if(month1 !== month2){
                         lineChartData["month"].dateArr.push(month2);
                     }
                   //数据构造
                     let length = lineChartData["month"].dateArr.length;
                     for(let i=0 ;i<length ;i++){
                         lineChartData["month"].inData.push(0);
                         lineChartData["month"].outData.push(0);
                         let month =""+ lineChartData["month"].dateArr[i];
                         let monthSum=0;
                         for(let j=0;j<length1;j++){
                             let day = ""+this.iData[j].idate;
                             if(day.search(month)!==-1){
                                 monthSum = monthSum+this.iData[j].sumin;
                             }
                         }
                         lineChartData["month"].inData[i]=monthSum;
                         monthSum=0;
                         for(let j=0;j<length2;j++){
                             let day = ""+this.oData[j].odate;
                             if(day.search(month)!==-1){
                                 monthSum = monthSum+this.oData[j].sumout;
                             }
                         }
                         lineChartData["month"].outData[i]=monthSum;
                         monthSum=0;
                     }
                     lineChartData["month"].proData=[];
                     this.sumData.month=0;
                     for(let i=0;i<length;i++){
                         let pro = lineChartData["month"].outData[i] - lineChartData["month"].inData[i];
                         lineChartData["month"].proData.push(pro);
                         this.sumData.month=this.sumData.month+lineChartData["month"].proData[i];
                     }

                 }
                 if(type === "year"){
                     lineChartData["year"].dateArr=[];
                     lineChartData["year"].inData=[];
                     lineChartData[type].outData=[];
                     lineChartData[type].proData=[];
                     let date1 = getDate(day1);
                     let date2 = getDate(day2);

                     if (date1 > date2) {
                         let tempDate = date1;
                         date1 = date2;
                         date2 = tempDate;
                     }
                     let i = 0;
                     while (!(date1.getFullYear() === date2.getFullYear())) {
                         lineChartData["year"].dateArr[i] = '' + date1.getFullYear();
                         i++;
                         date1.setDate(date1.getDate() + 365);
                     }
                     let year2 = '' + date2.getFullYear();
                     let year1 = "" + lineChartData["year"].dateArr[i-1];
                     if(year1 !== year2){
                         lineChartData["year"].dateArr.push(year2);
                     }
                     let length = lineChartData["year"].dateArr;
                     for(let i=0 ;i<length ;i++){
                         lineChartData["year"].inData.push(0);
                         lineChartData["year"].outData.push(0);
                         let year =""+ lineChartData["year"].dateArr[i];
                         let yearSum=0;
                         for(let j=0;j<length1;j++){
                             let day = ""+this.iData[j].idate;
                             if(day.search(year)!==-1){
                                 yearSum = yearSum+this.iData[j].sumin;
                             }
                         }
                         lineChartData["year"].inData[i]=yearSum;
                         yearSum=0;
                         for(let j=0;j<length2;j++){
                             let day = ""+this.oData[j].odate;
                             if(day.search(year)!==-1){
                                 yearSum = yearSum+this.oData[j].sumout;
                             }
                         }
                         lineChartData["year"].outData[i]=yearSum;
                         yearSum=0;
                     }
                     lineChartData["year"].proData=[];
                     this.sumData.year=0;
                     for(let i=0;i<length;i++){
                         let pro = lineChartData["year"].outData[i] - lineChartData["year"].inData[i];
                         lineChartData["year"].proData.push(pro);
                         this.sumData.year=this.sumData.year+lineChartData["year"].proData[i];
                     }

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
    margin-left: 5%;
    height: calc(100vh - 84px);
    flex: auto;
  }
</style>

