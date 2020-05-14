<template>
  <div class="error-page">
<!--    <h1 class="error-code">ERROR</h1>-->
<!--    <h4 class="error-desc">你访问的页面不在或者您的权限不够</h4>-->
<!--    <div class="error-handle">-->
<!--      <router-link to="/home/firstPage">-->
<!--        <el-button type="primary" size="large">返回首页</el-button>-->
<!--      </router-link>-->
<!--      <el-button class="error-btn" type="primary" size="large" @click="goBack">返回上一级</el-button>-->
<!--    </div>-->

    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>

<script>
    export default {
        name: "Error.vue",
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted(){
            this.drawLine();
        },
        methods:{
            // goBack() {
            //     this.$router.go(-1)
            // }

        }

    }
</script>

<style scoped>

</style>
