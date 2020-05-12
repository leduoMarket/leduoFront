<template>
  <div id="homeStaff">
    <staff></staff>
    <TopBar></TopBar>
    <router-view></router-view>
  </div>
</template>
<script>
    import Menu from "./template/Menu";
    import TopBar from "./template/TopBar";
    import staff from "./template/staff";
    export default {
        name: "HomeStaff",
        components:{staff,TopBar}
    }
</script>
<style scoped>

</style>
