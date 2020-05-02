<template>
  <div class="home">
    <Menu></Menu>
    <TopBar></TopBar>
    <router-view></router-view>
<!--    <image src="../assets/pic/welcome.jpg" style="height: 100%;width: 100%;">-->
<!--    <div>-->
<!--      <p >welcome to leduomarket!</p>-->
<!--      <p>Have a good time!</p>-->
<!--    </div>-->
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
    line-height: inherit;
  }
  .home{
  }
</style>
