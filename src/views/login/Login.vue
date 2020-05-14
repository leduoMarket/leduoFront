<template >
  <div class="login">
    <!--  <RandomCode></RandomCode>-->
    <body id="poster">
    <div id="logo">
      <!--    <img src="../../assets/pic/logo.png" style="width: 100px; height: 100px" alt=""/>-->
    </div>
    <div class="form">
    <el-form class="login-container" label-position="left"
             label-width="0px"   :rules="rules" ref="loginForm" :model="loginForm" >
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
      <!-- 随机验证码 输入框 -->
      <el-form-item prop="verifycode">
        <el-col :span="2"><i class="el-icon-setting"></i></el-col>
        <el-col :span="22"><el-input type= "verifycode" v-model="loginForm.verifycode"
                                     auto-complete="off" placeholder="请输入验证码" class="identifyinput"></el-input></el-col>
      </el-form-item>
      <!-- 随机验证码 -->
      <el-form-item prop="verifycode1">
        <el-col :span="16">
          <div class="identifybox">
            <div @click="refreshCode">

              <s-identify :identifyCode="identifyCode"><RandomCode :identifyCode="identifyCode">
              </RandomCode></s-identify>

            </div>
          </div>
        </el-col>
        <!--        &lt;!&ndash; 刷新验证码 &ndash;&gt;-->
        <el-col :span="8">
          <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>

        </el-col>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 48%;background: #000066;border: none" v-on:click="login" >登录</el-button>
        <el-button type="primary" style="width: 48%;background: #000066;border: none" v-on:click="register" >注册</el-button>
      </el-form-item>
     <!-- <el-button type="primary" style="width: 50%;background: #000066;border: none" v-on:click="register" >注册</el-button>-->
    </el-form>
    </div>
    </body>
  </div>
</template>

<script>
    import {
        reg_userName,
        reg_password,
    } from "./validator";
    import RandomCode from "../../components/template/RandomCode";
    export default {
        name: 'Login',
        components:{RandomCode},
        data () {
            // 自定义验证规则：验证码验证规则
            const verifycode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'))
                } else if (value !== this.identifyCode) {
                    console.log('validateVerifycode:', value);
                    callback(new Error('验证码不正确'))
                } else {
                    callback()
                }
            };
            return {
                identifyCodes: '1234567890',
                identifyCode: '',
                loadingBtn: false,
                loginForm: {
                    userName: '',
                    password: ''
                },
                user1:{
                  username:"1234567",
                  password: "a12345678",
                  role:"1",
                },
                user2:{
                    username:"2234567",
                    password: "a12345678",
                    role:"2",
                },
                user3:{
                    username:"3234567",
                    password: "a12345678",
                    role:"3",
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
                    ],
                    /*verifycode: [
                        { required: true, trigger: 'blur', validator: validateVerifycode },
                    ]*/
                }
            }
        },
        mounted() {
            // 验证码初始化
            this.identifyCode = '';
            this.makeCode(this.identifyCodes, 4)
        },
        computed: {},
        methods: {
            // 生成随机数
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min)
            },
            // 切换验证码
            refreshCode() {
                this.identifyCode = '';
                this.makeCode(this.identifyCodes, 4)
            },
            // 生成四位随机验证码
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += o[this.randomNum(0, o.length)]
                }
                console.log(this.identifyCode)
            },
            accessDenied(){
                this.$axios.get("/identifyFailed").then(successulResponse=>{
                    console.log(successulResponse.data.code);
                    console.log(successulResponse.data.msg);
                    this.$router.replace({path:"/"});
                    console.log("重定向发生！");
                }).catch(failedResponse=>{
                    this.$notify({
                        title: '对不起',
                        message: '权限控制失败',
                        offset: 100
                    });
                })
            },
            register(){
              this.$router.replace('/Register');
            },
            login () {
                //前端测试代码
                if(this.loginForm.userName == this.user1.username){
                    console.log(this.user1.role);
                    sessionStorage.setItem('user',JSON.stringify(this.loginForm.userName));
                    sessionStorage.setItem('role',JSON.stringify(this.user1.role));
                    this.$router.replace({path: '/home/firstPage'});
                }else if(this.loginForm.userName == this.user2.username){
                    console.log(this.user2.role);
                    sessionStorage.setItem('user',JSON.stringify(this.loginForm.userName));
                    sessionStorage.setItem('role',JSON.stringify(this.user2.role));
                    this.$router.replace({path:'/homet/firstPage'})

                }else if(this.loginForm.userName == this.user3.username){
                    console.log(this.user3.role);
                    sessionStorage.setItem('user',JSON.stringify(this.loginForm.userName));
                    sessionStorage.setItem('role',JSON.stringify(this.user3.role));
                    this.$router.replace({path:'/homes/firstPage'})

                }
                this.$refs.loginForm.validate()
                    .then(res => {
                        this.loadingBtn = false;
                        this.$axios
                            .post('/login', {
                                userName: this.loginForm.userName,
                                password: this.loginForm.password
                            })
                            .then(successResponse => {
                                if (successResponse.data.code === 200) {
                                    //得到响应中的role值，1：系统管理员，2.财务人员，3.普通员工
                                    //获得从后端得到role的代码可能有误
                                    var role = successResponse.data.role;
                                    sessionStorage.setItem('user',JSON.stringify(this.loginForm.userName));
                                    sessionStorage.setItem('role',JSON.stringify(role));
                                    if(role == '1'){
                                        this.$router.replace({path: '/home/firstPage'})
                                    }else if(role == '2'){
                                        this.$router.replace({path:'/homet/firstPage'})
                                    }else if(role == '3'){
                                        this.$router.replace({path:'/homes/firstPage'})
                                    }
                                    this.$router.replace({path: '/404'})
                                }
                            })
                            .catch(failResponse => {
                                // this.$router.replace({path: '/404'})
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
    margin: 110px auto;
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
  .login {
    text-align: center;

  }
  .form {
    margin: 0 auto;
  }
  #poster {
    background:url("../../assets/pic/background.jpg") no-repeat;
    height: 100%;
    width: 100%;
    background-size: 100% 120%;
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
  /*.randomcodeuse{
    width: 60%;
    margin: auto;
    display: flex;
    align-items: center;
  }*/
  .identifybox {
    display: flex;
    justify-content: space-between;
    /*margin-top: 7px;*/
    margin-left: 50px;
    margin-right: 10px;
  }
</style>
