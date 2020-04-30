<template>
  <div id="app">
    <Menu></Menu>
    <TopBar></TopBar>
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
    background-color: #EAEAFD;
  }
</style>
