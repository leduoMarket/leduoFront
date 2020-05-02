<template>
  <div id="app">
<!--    决定最外层的组件的显示-->
    <router-view/>
  </div>
</template>
<script>
  //导入定义的组件
    import Menu from './components/template/Menu'
    import TopBar from './components/template/TopBar'
    export default {
    name: 'App',
        components:{//注册组件
            Menu, TopBar
        }
}
</script>
<style>
#app {
}
  body{
    padding: 0;
    margin: 0;
    background-color: #6495ED;
  }
</style>
