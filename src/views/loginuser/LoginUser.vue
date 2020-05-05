<template>
  <div class="loginuser">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>登陆账号</span>
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
        <el-form-item label="原始密码" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="修改密码" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
          <div class="button1">
          <el-button type="primary" plain>修改密码</el-button>
          </div>
        </div>
      </el-form>
     <!-- <el-row>
        <el-col :span="8" style="width: 100%">
         &lt;!&ndash; <div class="fourth">
            <span>密码：</span>
          </div>&ndash;&gt;
          <div class="fourth1">
            <span>原始密码：</span><el-input class="fourth2" v-model="form.name"></el-input>
            <span>修改密码：</span><el-input class="fourth2" v-model="form.name"></el-input>
            <el-button type="primary" plain>修改密码</el-button>
          </div>
        </el-col>
      </el-row>-->
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
                    eid: '1',
                    ename: '张三',
                    ephone: '123456',
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
    width: 65%;
    height: 500px;
  }
  /*.third1{*/
  /*  height: 10px;*/
  /*  margin-bottom: 60px;*/
  /*}*/
  /*.third2{*/
  /*  height: 20px;*/
  /*}*/
  /*!*.fourth{*/
  /*  background-color: white;*/
  /*  text-align: left;*/
  /*}*!*/
  /*.fourth1{*/
  /*  text-align: left;*/
  /*  margin-left: 50px;*/
  /*}*/
  /*.fourth2{*/
  /*  height: 40px;*/
  /*  width: 100px;*/
  /*}*/
  .label1{
    width: 35%;
  }
  .label2{
    text-align: right;
    width: 35%;
  }
  .button1{
    text-align: left;
  }
</style>
