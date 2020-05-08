<template>
  <div id="home">
    <Menu></Menu>
    <TopBar></TopBar>
    <router-view></router-view>

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

</style>
