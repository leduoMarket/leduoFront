<template >
  <div class="login">
    <!--  <RandomCode></RandomCode>-->
    <div  id="poster">
    <div id="logo">
      <!--    <img src="../../assets/pic/logo.png" style="width: 100px; height: 100px" alt=""/>-->
    </div>
    <el-form class="login-container" label-position="left"
             label-width="0px"   :rules="rules" ref="loginForm" :model="loginForm" >
      <h3 class="login_title">系统登录</h3>
      <el-form-item prop="uid">
        <el-col :span="2"><i class="el-icon-s-custom"></i></el-col>
        <el-col :span="22"><el-input type="text" v-model="loginForm.uid"
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
          <el-button @click="refreshCode" type='text' class="textBtn">看不清，换一张</el-button>

        </el-col>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #000066;border: none" v-on:click="login" >登录</el-button>
      </el-form-item>
      <el-button type="text" style="width: 100%; margin-left: 50%" size="mini" v-on:click="gotoRegister" >注册</el-button>
    </el-form>
    </div>
  </div>
</template>
<script>
    import {
        reg_userName,
        reg_password,
    } from "./validator";
    import md5 from 'js-md5';
    import RandomCode from "../../components/template/RandomCode";
    export default {
        name: 'Login',
        components:{RandomCode},
        data () {
            // 自定义验证规则：验证码验证规则
            const validateVerifycode = (rule, value, callback) => {
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
                    uid: '',
                    password: '',
                    verifycode: '',
                    verifycode1:'',
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
                    uid:[{
                              required:true,
                              validator:reg_userName,
                              trigger:'blur',
                    }],
                    password:[{
                                   required:true,
                                 validator: reg_password,
                                   trigger: 'blur'
                    }],
                        verifycode: [
                            { required: true, trigger: 'blur', validator: validateVerifycode },
                        ],
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
            },
            gotoRegister(){
                this.$router.replace('/register');
            },
            login () {

                //前端测试代码
                // if(this.loginForm.uid === this.user1.username){
                //     sessionStorage.setItem('user','1234567');
                //     sessionStorage.setItem('role','1');
                //     sessionStorage.setItem('uid',JSON.stringify(this.loginForm.uid));
                //     this.$router.replace({path: '/home/firstPage'});
                // }else if(this.loginForm.uid === this.user2.username){
                //     sessionStorage.setItem('user','2234567');
                //     sessionStorage.setItem('role','2');
                //
                //     sessionStorage.setItem('uid',JSON.stringify(this.loginForm.uid));
                //     this.$router.replace({path:'/homet/firstPage'});
                //
                // }else if(this.loginForm.uid === this.user3.username){
                //     sessionStorage.setItem('user','3234567');
                //     sessionStorage.setItem('role','3');
                //     sessionStorage.setItem('uid',JSON.stringify(this.loginForm.uid));
                //     this.$router.replace({path:'/homes/firstPage'})
                // }
                this.$refs.loginForm.validate()
                    .then(() => {
                        this.loadingBtn = false;
                        //这里是验证码的地方
                        this.refreshCode();
                        this.$axios
                            .post('/login', {
                                uid:this.loginForm.uid,
                                password: md5(this.loginForm.password),
                            })
                            .then(successResponse => {
                                if (successResponse.data.code === 200) {
                                    sessionStorage.setItem('uid',JSON.stringify(this.loginForm.uid));
                                    sessionStorage.setItem('user',successResponse.data.data.sessionId);
                                    if(successResponse.data.data.role === 1){
                                        sessionStorage.setItem('role','1');
                                        this.$message.success(successResponse.data.message);
                                        this.$router.replace({path: '/home/firstPage'});
                                    }else if(successResponse.data.data.role === 2){
                                        sessionStorage.setItem('role','2');
                                        this.$message.success(successResponse.data.message);
                                        this.$router.replace({path:'/homet/firstPage'})
                                    }else if(successResponse.data.data.role === 3){
                                        sessionStorage.setItem('role','3');
                                        this.$message.success(successResponse.data.message);
                                        this.$router.replace({path:'/homes/firstPage'})
                                    }
                                }else{
                                    this.$message.error(successResponse.data.message);
                                }
                            })
                            .catch(failResponse => {
                                this.$message({
                                    message: failResponse.message,
                                    type: 'error'
                                });
                            })

                   }).catch(() =>{
                     this.$message({
                      message: '无法提交，用户名或者密码格式错误或者验证码错误',
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

  #poster {
    /*background:url("../../assets/pic/background.jpg") no-repeat;*/
    height: 100%;
    width: 100%;
    background-size: 100% 120%;
    position: fixed;
  }
  body{
    margin: 1px;
  }
  img{
    margin: 40px;
  }
  #logo{
    text-align: center;
  }
  .identifybox {
    display: flex;
    justify-content: space-between;
    /*margin-top: 7px;*/
    margin-left: 50px;
    margin-right: 10px;
  }
</style>
