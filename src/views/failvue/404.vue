<template>
  <div class="error-page">
    <div class="error-code">您还没有该权限</div>
    <div class="error-desc">如所需，请向上级部门申请相关权限</div>
    <div class="error-handle">
      <router-link to="/">
        <el-button type="primary" size="large"  @click="goLogin">返回登录页面</el-button>
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
            },
            goLogin(){
                this.$router.replace({path:'/'});
            }


        }

    }
</script>

<style scoped>
  .error-page{
    display: flex;
    padding-top: 100px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f3f3f3;
    box-sizing: border-box;
  }
  .error-code{
    line-height: 1;
    font-size: 50px;
    font-weight: bold;
    color: #2d8cf0;
  }
  .error-code span {
    color: #00a854;
  }
  .error-desc {
    font-size: 30px;
    color: #777;
  }
  .error-handle{
    margin-top: 30px;
    padding-bottom: 200px;
  }
  .error-btn{
    margin-left: 100px;
  }
</style>
