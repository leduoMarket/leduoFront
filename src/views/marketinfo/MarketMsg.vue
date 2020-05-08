<template>
  <div class="marketmsg">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>我家超市</span>
    </div>
    <div  class="text item">
      <p>超市名称：乐多超市</p>
      <p>所在地址：四川省成都市龙泉驿区</p>
      <p>联系电话：8208208820</p>
      <p>注册日期：2020-3-30</p>
      <p>经营范围：超市百货</p>
      <p>联系人：某先生</p>
      <p>招商电话：66776677</p>
      <p>详细地址：龙泉驿大面街道1819号</p>
    </div>
  </el-card>
  </div>
</template>

<script>

    export default {
        name: "MarketMsg",

    }
</script>

<style scoped>
  .text {
    font-size: 18px;
  }
  .item {
    margin-bottom: 280px;
  }
  .box-card{
    width: 75%;
    height: 500px;
  }
  </style>
