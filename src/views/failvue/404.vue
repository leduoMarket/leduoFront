<template>
  <div class="error-page">
    <div class="error-code">您还没有该权限</div>
    <div class="error-desc">如所需，请向上级部门申请相关权限</div>
    <div class="error-handle">
      <router-link to="/">
        <el-button type="primary" size="large">返回登录页面</el-button>
      </router-link>
      <el-button class="error-btn" type="primary" size="large" @click="goBack">返回上一级</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "404.vue",
        data () {
            return {
                // dateStart:"",
                // dateEnd:"",
                // iData:[
                //     {
                //         "idate":"2020-04-25",
                //         "sumin":250.00,
                //     },{
                //         "idate":"2020-04-26",
                //         "sumin":3200.00,
                //     },{
                //         "idate":"2020-04-27",
                //         "sumin":900.00,
                //     },{
                //         "idate":"2020-04-28",
                //         "sumin":200.00,
                //     },{
                //         "idate":"2020-04-29",
                //         "sumin":400.00,
                //     }
                // ],
                // oData:[
                //     {
                //         "sumout":300.00,
                //         "odate":"2020-04-25"
                //     },
                //     {
                //         "sumout":600.00,
                //         "odate":"2020-04-26"
                //     },
                //     {
                //         "sumout":880.00,
                //         "odate":"2020-04-27"
                //     },
                //     {
                //         "sumout":810.00,
                //         "odate":"2020-04-28"
                //     },{
                //         "sumout":200.00,
                //         "odate":"2020-05-29"
                //     },
                // ],

            }
        },
        methods:{
            goBack() {
                this.$router.go(-1)
            },
            // test(){
            //     let dayMin = this.iData[0].idate;
            //     let dayMax = this.iData[this.iData.length-1].idate;
            //     let day = "";
            //     let length1 = this.iData.length;
            //     let length2 = this.oData.length;
            //     for(let i=1; i<length1-1; i++){
            //         console.log("idate",day);
            //         day = this.iData[i].idate;
            //         if(day<dayMin){
            //             dayMin=day;
            //         }
            //         if(day>dayMax){
            //             dayMax=day;
            //         }
            //         day = "";
            //     }
            //     for(let i=1; i<length2; i++){
            //         day = this.oData[i].odate;
            //         if(day<dayMin){
            //             dayMin=day;
            //         }
            //         if(day>dayMax){
            //             dayMax=day;
            //         }
            //     }
            //     console.log("最小日期",dayMin);
            //     console.log("最大日期",dayMax);
            //     let day1 = dayMin;
            //     let day2 = dayMax;
            //     let getDate = function(str) {
            //         let tempDate = new Date();
            //         let list = str.split("-");
            //         tempDate.setFullYear(list[0]);
            //         tempDate.setMonth(list[1] - 1);
            //         tempDate.setDate(list[2]);
            //         return tempDate;
            //     };
            //     let date1 = getDate(day1);
            //     let date2 = getDate(day2);
            //     if (date1 > date2) {
            //         let tempDate = date1;
            //         date1 = date2;
            //         date2 = tempDate;
            //     }
            //     date1.setDate(date1.getDate() + 1);
            //     let dateArr = [];
            //     let i = 0;
            //     while (!(date1.getFullYear() == date2.getFullYear()
            //         && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
            //             .getDate())) {
            //         let dayStr =date1.getDate().toString();
            //         if(dayStr.length ==1){
            //             dayStr="0"+dayStr;
            //         }
            //         let month = '' + (date1.getMonth() + 1);
            //         if(month.length<2){
            //             month = '0'+month;
            //         }
            //         dateArr[i] = date1.getFullYear() + "-" + month + "-"
            //             + dayStr;
            //         i++;
            //         date1.setDate(date1.getDate() + 1);
            //     }
            //     dateArr.splice(0,0,day1);
            //     dateArr.push(day2);
            //     console.log(dateArr);
            //
            //     let inData = [];
            //     let outData = [];
            //     let proData = [];
            //
            //     let length = dateArr.length;
            //     for(let i=0 ;i<length ;i++){
            //         inData.push(0);
            //         outData.push(0);
            //         day = dateArr[i];
            //         for(let j=0;j<length1;j++){
            //             if(day==this.iData[j].idate){
            //                 inData[i]=this.iData[j].sumin;
            //             }
            //         }
            //         for(let j=0;j<length2;j++){
            //             if(day==this.oData[j].odate){
            //                 outData[i]=this.oData[j].sumout;
            //             }
            //         }
            //     }
            //     for(let i=0;i<length;i++){
            //         proData.push(inData[i]-outData[i]);
            //     }
            //     console.log(inData);
            //     console.log(outData);
            //     console.log(proData);
            // },
            //

        }

    }
</script>

<style scoped>
  .error-page{
    display: flex;
    padding-top: 100px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f3f3f3;
    box-sizing: border-box;
  }
  .error-code{
    line-height: 1;
    font-size: 50px;
    font-weight: bold;
    color: #2d8cf0;
  }
  .error-code span {
    color: #00a854;
  }
  .error-desc {
    font-size: 30px;
    color: #777;
  }
  .error-handle{
    margin-top: 30px;
    padding-bottom: 200px;
  }
  .error-btn{
    margin-left: 100px;
  }
</style>
