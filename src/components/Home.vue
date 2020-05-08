<template>
  <div id="home">
    <Menu></Menu>
    <TopBar></TopBar>
    <router-view></router-view>
    <!--<el-card class="box-card">-->
     <div id="welcome">
    <!--<img src="../assets/pic/welcome1.jpg" style="height: 75%;width: 65%;border-radius: 30px;"  alt=""/>-->
     </div>
  </div>
  </template>
<script>
    import Menu from "./template/Menu";
    import TopBar from "./template/TopBar";
    export default {
        name: "Home",
        components:{Menu,TopBar}
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
