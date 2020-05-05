<template>
  <div class="error-page">
    <h1 class="error-code">ERROR</h1>
    <h4 class="error-desc">你访问的页面不在或者您的权限不够</h4>
    <div class="error-handle">
      <router-link to="/home">
        <el-button type="primary" size="large">返回首页</el-button>
      </router-link>
      <el-button class="error-btn" type="primary" size="large" @click="goBack">返回上一级</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "404.vue",
        data () {
            return {
            }
        },
        methods:{
            goBack() {
                this.$router.go(-1)
            }
        }

    }
</script>

<style scoped>
  /*.error-page{*/
  /*  display: flex;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*  flex-direction: column;*/
  /*  width: 81%;*/
  /*  height: 100%;*/
  /*  background: #f3f3f3;*/
  /*  box-sizing: border-box;*/
  /*}*/
  /*.error-code{*/
  /*  line-height: 1;*/
  /*  font-size: 250px;*/
  /*  font-weight: bold;*/
  /*  color: #2d8cf0;*/
  /*}*/
  /*.error-code span {*/
  /*  color: #00a854;*/
  /*}*/
  /*.error-desc {*/
  /*  font-size: 30px;*/
  /*  color: #777;*/
  /*}*/
  /*.error-handle{*/
  /*  margin-top: 30px;*/
  /*  padding-bottom: 200px;*/
  /*}*/
  /*.error-btn{*/
  /*  margin-left: 100px;*/
  /*}*/
</style>
