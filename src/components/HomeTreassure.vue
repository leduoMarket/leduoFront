<template>
  <div id="home">
    <Treassure></Treassure>
    <TopBar></TopBar>
    <router-view></router-view>

  </div>
</template>
<script>
    import Treassure from "./template/treassure";
    import TopBar from "./template/TopBar";
    export default {
        name: "Home",
        components:{ Treassure,TopBar}
    }
</script>
<style scoped>

</style>
