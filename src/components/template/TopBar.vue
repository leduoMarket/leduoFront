<template>
  <el-container style="height: auto;">
    <el-col :span="12" style="width: 100%">
      <div class="header-info">
        <el-button style="float: right; padding: 3px 8px" type="text"  @click="logOut">退出</el-button>
        <el-button style="float: right; padding: 3px 8px;" type="text" @click="gotoUserInfo" >账户</el-button>
        <el-button style="float: right; padding: 3px 8px" type="text" @click="gotoHelp">帮助</el-button>
        <el-button style="float: right; padding: 3px 8px" type="text" @click="gotoHome">超市</el-button>

      </div>
    </el-col>
  </el-container>
</template>
<script>
export default {
  name: 'TopBar',
    methods:{
        goBack() {
            this.$router.go(-1);
        },
        logOut(){

            this.$axios.get("/staff/logout").then(successfulResponse=>{
                if(successfulResponse.data.code===405){
                    sessionStorage.removeItem('user');
                    sessionStorage.removeItem('role');
                    sessionStorage.removeItem('uid');
                    this.$router.replace({path: '/'});
                }else{
                    this.$message.info("退出失败");
                    sessionStorage.removeItem('user');
                    sessionStorage.removeItem('role');
                    sessionStorage.removeItem('uid');
                    this.$router.replace({path:'/'});
                }
            }).catch(()=>{
                this.$notify({
                    title: '对不起',
                    message: '中断服务器连接了',
                    offset: 100
                });
            })
        },
        gotoUserInfo(){
            let role = sessionStorage.getItem("role");
            if(role==='1'){
                this.$router.replace({path:'/home/user'})
            }
            else if(role === '2'){
                this.$router.replace({path:'/homet/user'})
            }else {
                this.$router.replace({path:'/homes/user'})
            }

        },
        gotoHelp(){
            let role = sessionStorage.getItem("role");
            if(role==='1'){
                this.$router.replace({path:'/home/help'})
            }
            else if(role === '2'){
                this.$router.replace({path:'/homet/help'})
            }else {
                this.$router.replace({path:'/homes/help'})
            }

        },
        gotoHome(){
            let role = sessionStorage.getItem("role");
            if(role==='1'){
                this.$router.replace({path:'/home/marketmsg'})
            }
            else if(role === '2'){
                this.$router.replace({path:'/homet/marketmsg'})
            }else {
                this.$router.replace({path:'/homes/marketmsg'})
            }

        },


    }
}
</script>
<style scoped>
  .header-info{
    text-align: right;
    background-color: #F7F7FB;
    height: 30px;
    background-color:rgba(0,0,0,0);
    margin-bottom: 25px;
    margin-top: 10px;
  }
  .header-info button{
    margin-right: 25px;
    vertical-align: middle;
    color: white !important;
  }
</style>
