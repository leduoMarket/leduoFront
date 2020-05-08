<template >
  <body id="poster">
  <div id="logo">
<!--    <img src="../../assets/pic/logo.png" style="width: 100px; height: 100px" alt=""/>-->
  </div>
  <el-form class="login-container" label-position="left"
           label-width="0px"   :rules="rules" ref="loginForm" :model="loginForm">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="userName">
      <el-col :span="2"><i class="el-icon-s-custom"></i></el-col>
      <el-col :span="22"><el-input type="text" v-model="loginForm.userName"
                                   auto-complete="off" placeholder="账号"></el-input></el-col>
    </el-form-item>
    <el-form-item prop="password">
      <el-col :span="2"><i class="el-icon-cold-drink"></i></el-col>
      <el-col :span="22"><el-input type="password" v-model="loginForm.password"
                                   auto-complete="off" placeholder="密码"></el-input></el-col>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #000066;border: none" v-on:click="login" :loading="loadingBtn">登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
    import {
        reg_userName,
        reg_password,
    } from "./validator";

    export default {
        name: 'Login',
        data () {
            return {
                loadingBtn: false,
                loginForm: {
                    userName: '',
                    password: ''
                },
                responseResult: [],
                //表单验证规则的设置
                rules:{
                    userName:[{
                        required:true,
                        validator:reg_userName,
                        trigger:'blur',
                    }],
                    password:[
                        {
                            required:true,
                            validator: reg_password,
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            login () {
                this.loadingBtn = true;
                this.$refs.loginForm.validate()
                    .then(res => {
                        this.$axios
                            .post('/login', {
                                userName: this.loginForm.userName,
                                password: this.loginForm.password
                            })
                            .then(successResponse => {
                                if (successResponse.data.code === 200) {
                                    this.$router.replace({path: '/home/stockIn'})
                                }
                            })
                            .catch(failResponse => {
                            })

                    }).catch(error =>{
                    this.$message({
                        message: '无法提交，用户名或者密码格式错误',
                        type: 'error'
                    });
                });
            }
        }
    }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 20px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }

  #poster {
    /*background:url("../../assets/pic/background.jpg") no-repeat;*/
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  img{
    margin: 40px;
  }
  #logo{
    text-align: center;
  }
</style>
