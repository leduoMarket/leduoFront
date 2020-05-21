<template>
  <div class="loginUser">
  <el-card class="box-card">
    <div slot="header" class="clearFix">
      <span>登陆账号</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">返回首页</el-button>
    </div>
    <div  class="text item">

      <el-form :model="form" :rules="formRules" ref="form">
        <el-form-item label="账号" :label-width="formLabelWidth"  >
          <div class="label1">
          <el-input v-model="form.eid" autocomplete="off" readonly style="width:100%"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" >
          <div class="label1">
          <el-input v-model="form.ename" autocomplete="off" readonly style="width: 100%"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" >
          <div class="label1">
          <el-input v-model="form.ephone" autocomplete="off" readonly style="width: 100%"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" >
          <div class="label1">
          <el-input v-model="form.erole" autocomplete="off" readonly style="width: 100%"></el-input>
          </div>
        </el-form-item>
        <div class="label2">
        <el-form-item label="原始密码"  :label-width="formLabelWidth">
          <el-input type="password" show-password v-model="form.epwd1" prop="epwd1"  style="width: 133%"  placeholder="请输入原始密码"></el-input>
        </el-form-item>
        <el-form-item label="修改密码" :label-width="formLabelWidth">
          <el-input type="password" show-password v-model="form.epwd2" prop="epwd2" style="width: 133%"  placeholder="请输入新密码"></el-input>
        </el-form-item>
          <div class="button1">
          <el-button style="width: 120%" type="primary" plain @click="submit">修改密码</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </el-card>
  </div>
</template>

<script>
  import {
      reg_password
  } from "../login/validator";
  import md5 from 'js-md5';
  export default {
        name: 'LoginUser',
        data () {
            return {
                readonly:true,
                form: {
                    eid: '',
                    ename: '',
                    ephone: '',
                    erole: '',
                    epwd1:'',
                    epwd2:'',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                formRules:{
                    epwd1:[{
                        required:true ,validator: reg_password, trigger:'blur'
                    }],
                    epwd2:[{
                        required:true ,validator: reg_password, trigger:'blur'
                    }],

                }
            }
        },
        created(){
            let eid = JSON.parse(sessionStorage.getItem('uid'));
            let role =sessionStorage.getItem('role');
            if(role === '1'){
                this.form.erole='管理员';
            }else if (role === '2'){
                this.form.erole='财务';
            }else{
                this.form.erole='员工';
            }
            this.form.eid=eid;
            this.$axios.get('/staff/getCurrentUserMessage',{
                params:{
                    uid:this.form.eid,
                }
            }).then(res =>{
                if(res.data.code===200){
                    this.form.eid=res.data.data.uid;
                    this.form.ename=res.data.data.userName;
                    this.form.ephone=res.data.data.phone;
                    this.form.erole=res.data.data.role;
                }
            }).catch(failResponse =>{
                this.$message.error(failResponse.message);
            });

        },
        methods:{
            goBack() {
                let role = sessionStorage.getItem("role");
                if(role === "1"){
                    this.$router.replace({path: '/home/firstPage'});
                }else if(role === "2"){
                    this.$router.replace({path:'/homet/firstPage'})
                }else if(role === "3"){
                    this.$router.replace({path:'/homes/firstPage'})
                }
            },
            submit(){
                this.$refs.form.validate()
                    .then(()=>{
                        this.$confirm('此操作将修改你的密码, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            if(this.form.epwd1 === this.form.epwd2){
                                console.log("原始密码"+this.form.epwd1);
                                console.log("新密码"+this.form.epwd2);
                                this.$message.error("原始密码和新密码一样");
                                return;
                            }
                            this.$axios.get('/staff/changePassWd',{
                                params:{
                                    uid:this.form.eid,
                                    pwd1:md5(this.form.epwd1),
                                    pwd2:md5(this.form.epwd2),
                                }
                            }).then(successResponse =>{
                                if(successResponse.data.code === 200){
                                    this.$message({
                                        type: 'success',
                                        message: successResponse.data.message
                                    });
                                }else{
                                    this.$message({
                                        type: 'error',
                                        message: successResponse.data.message
                                    });
                                }
                            }).catch(failedResponse =>{
                                this.$message({
                                    type: 'info',
                                    message: failedResponse.message
                                });
                            } );
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消修改'
                            });
                        });
                    }).catch(() =>{
                        this.$message.error("密码格式不对");
                });
            }
        }
       /* methods: {
            handleChange (val) {
                console.log(val)
            },
            onSubmit () {
                console.log('submit!')
            }
        }*/
    }
</script>

<style scoped>
  .text {
    font-size: 18px;
  }
  .item {
    margin-bottom: 200px;
  }
  .box-card{
    margin-left: 150px;
    width: 65%;
    height: 520px;
  }
  .label1{
    width: 35%;
  }
  .label2{
    margin-left: 30px;
    text-align: right;
    width: 35%;
  }
  .button1{
    text-align: left;
    margin-left: 50px;
  }
</style>
