<template>
  <div class="loginuser">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>登陆账号</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">返回</el-button>
    </div>
    <div  class="text item">

      <el-form :model="form" >
        <el-form-item label="账号" :label-width="formLabelWidth">
          <div class="label1">
          <el-input v-model="form.eid" autocomplete="off"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <div class="label1">
          <el-input v-model="form.ename" autocomplete="off"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <div class="label1">
          <el-input v-model="form.ephone" autocomplete="off"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <div class="label1">
          <el-input v-model="form.erole" autocomplete="off"></el-input>
          </div>
        </el-form-item>
        <div class="label2">
        <el-form-item label="原始密码" :label-width="formLabelWidth" >
          <el-input v-model="form.name" style="width: 125%" placeholder="**********"></el-input>
        </el-form-item>
        <el-form-item label="修改密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" style="width: 125%"></el-input>
        </el-form-item>
          <div class="button1">
          <el-button style="width: 120%" type="primary" plain>修改密码</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </el-card>
  </div>
</template>

<script>

    export default {
        name: 'LoginUser',
        data () {
            return {
                form: {
                    eid: '2017110936',
                    ename: '欧阳',
                    ephone: '15760232967',
                    erole: '经理',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
            }
        },
        methods:{
            goBack() {
                this.$router.go(-1)
            },
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
