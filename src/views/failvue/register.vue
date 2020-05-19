<template >
  <div class="register">
    <!--  <RandomCode></RandomCode>-->
    <div id="poster">
    <div id="logo">
      <!--    <img src="../../assets/pic/logo.png" style="width: 100px; height: 100px" alt=""/>-->
    </div>
    <el-form class="register-container" label-position="left"
             label-width="0px"   :rules="rules" ref="registerForm" :model="registerForm">
      <h3 class="register_title">用户注册</h3>
      <el-form-item  prop="userName">
        <el-col :span="2"><i class="el-icon-s-custom"></i></el-col>
        <el-col :span="22"><el-input type="text" v-model="registerForm.userName"
                                     auto-complete="off" placeholder="用户名"></el-input></el-col>
      </el-form-item>
      <el-form-item prop="userId" >
        <el-col :span="2"><i class="el-icon-user-solid"></i></el-col>
        <el-col :span="22"><el-input type="text" v-model="registerForm.userId"
                                     auto-complete="off" placeholder="用户账号"></el-input></el-col>
      </el-form-item>
      <el-form-item   prop="userPhone">
        <el-col :span="2"><i class="el-icon-phone"></i></el-col>
        <el-col :span="22"><el-input type="text" v-model="registerForm.userPhone"
                                     auto-complete="off" placeholder="用户电话"></el-input></el-col>
      </el-form-item>
      <el-form-item >
        <el-col :span="2"><i class="el-icon-s-check"></i></el-col>
        <el-col :span="22"><el-select v-model="registerForm.userRole" placeholder="用户角色" value="">
          <el-option label="经理" value="管理员"></el-option>
          <el-option label="财务" value="财务"></el-option>
          <el-option label="员工" value="员工"></el-option>
        </el-select></el-col>
      </el-form-item>
      <el-form-item  prop="userpassword" >
        <el-col :span="2"><i class="el-icon-s-flag"></i></el-col>
        <el-col :span="22"><el-input type="password" v-model="registerForm.userpassword"
                                     auto-complete="off" placeholder="用户密码"></el-input></el-col>
      </el-form-item>
      <!--注册按钮-->
      <el-form-item >
        <el-col :span="12"><el-button type="primary" style="width: 45%;background: #000066;border: none;margin-left: 80px" @click="addRegister">注册</el-button></el-col>
        <!--        <el-button type="primary" style="width: 100%;background: #000066;border: none" v-on:click="login" :loading="loadingBtn">注册</el-button>-->
        <el-col :span="12"><el-button style="width: 45%;background: #000066;border: none" @click="resetForms" >重置</el-button></el-col>
      </el-form-item>
      <el-button type="text" style="width: 100%; margin-left: 45%" size="mini" v-on:click="gotoLogin" >返回登录</el-button>
    </el-form>
    </div>
  </div>
</template>

<script>
    import {
        reg_ename,
        reg_userName,
        reg_password,
        reg_phone,

    } from "../login/validator";
    import md5 from 'js-md5';
    export default {
        name:'Register.vue',
        data() {
            return {
                //添加表单成功吗
                addSuccessful:false,

                registerForm: {
                    userName: '',
                    userId: '',
                    userPhone: '',
                    userRole:'',
                    userpassword: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules:{
                    userName:[{
                        required:true,
                        validator:reg_ename,
                        trigger:'blur',
                    }],
                    userId:[{
                        required: true,
                        validator: reg_userName,
                        trigger: 'blur',
                    }],
                    userPhone:[{
                        required:true,
                        validator:reg_phone,
                        trigger:'blur',
                    }],
                    userpassword: [{
                        required:true,
                        validator:reg_password,
                        trigger:'blur',
                    }]
                }
            }
        },

        methods: {
            gotoLogin(){
                this.$router.replace('/');
            },
            resetForms(){
                this.registerForm = {
                    userName: '',
                    userId: '',
                    userPhone: '',
                    userRole: '',
                    Password: '',
                };
            },
            addRegister() {
                this.$refs.registerForm.validate()
                    .then(() => {
                        this.$axios.post('/register', {
                            uid: this.registerForm.userId,
                            userName: this.registerForm.userName,
                            phone: this.registerForm.userPhone,
                            role: this.registerForm.userRole,
                            password: md5(this.registerForm.userpassword),
                            status: 0,
                        }).then(successResponse => {
                            if (successResponse.data.code === 200) {
                                this.addSuccessful = true;
                                this.$message({
                                    message: successResponse.data.message,
                                    type: 'success',
                                });
                                //将信息刷新到表格中
                                //清空填写单的信息放到请求体中，避免请求延迟已经被清空才刷新在信息到表格中
                                this.registerForm = {
                                    userName: '',
                                    userId: '',
                                    userPhone: '',
                                    userRole: '',
                                    Password: '',
                                };
                            }
                        }).catch(failedResponse => {
                            this.addSuccessful = false;
                            this.$message.warning(failedResponse.data.message);
                        });

                    }).catch(() => {
                    console.log("提交失败");
                    this.$message({
                        message: '无法提交，数据有错误',
                        type: 'error'
                    });
                });
            }
        },
    }
</script>

<style>
  .register-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 20px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .register_title {
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
  #poster{
    margin: 1px;
  }
  /*img{*/
  /*  margin: 40px;*/
  /*}*/
  #logo{
    text-align: center;
  }
</style>
