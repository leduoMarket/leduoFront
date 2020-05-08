<template>
  <div id="home">
    <Menu></Menu>
    <TopBar></TopBar>
    <router-view></router-view>
    <!--<el-card class="box-card">-->
     <div id="welcome">
<!--    <img src="../assets/pic/welcome1.jpg" style="height: 75%;width: 65%;border-radius: 30px;"  alt=""/>-->
     </div>
    <!--</el-card>-->
    <!--<div>
      <p >welcome to leduomarket!</p>
      <p>Have a good time!</p>
    </div>-->
  </div>
  </template>
<script>
    import TopBar from "./template/TopBar";
    import Menu from "./template/Menu";
    export default {
        name: "Home",
        components: {TopBar,Menu},
    }
</script>
<style scoped>
  #welcome{
    text-align: center;
    /*line-height: inherit;*/
  }
  /*.box-card {
    width: 75%;
  }*/
</style>
