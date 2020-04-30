
<template>
  <el-main>
    <el-row>
      <el-col :span="24" style="width: 100%">
        <div class="first">
          登录账号
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" style="width: 100%">
        <div class="second">
          <span>头像：</span>
        </div>
      </el-col>
      <el-col :span="8" style="width: 100%">
        <div class="imagediv">
          <img class="image1" src="../../assets/pic/logo.png" height="70" width="70"/>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" style="width: 100%">
        <div class="third">
          <span>
            基本信息：
          </span>
        </div>
      </el-col>
      <el-col :span="8" style="width: 100%">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item class="third1" title="账号" name="1">
            <div class="third2">123456</div>
          </el-collapse-item>
          <el-collapse-item class="third1" title="姓名" name="2">
            <div class="third2">王小明</div>
          </el-collapse-item>
          <el-collapse-item class="third1" title="手机号" name="3">
            <div class="third2">12345678901</div>
          </el-collapse-item>
          <el-collapse-item class="third1" title="角色" name="4">
            <div class="third2">经理</div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" style="width: 100%">
        <div class="fourth">
          <span>密码：</span>
        </div>
        <div class="fourth1">
          <span>原始密码：</span><el-input class="fourth2" v-model="form.name"></el-input>
          <span>修改密码：</span><el-input class="fourth2" v-model="form.name"></el-input>
          <el-button type="primary" plain>修改密码</el-button>
        </div>
      </el-col>
    </el-row>
<!--    <el-row>-->
<!--      <el-col>-->
<!--        <div class="five">-->
<!--          <el-button type="danger" icon="el-icon-close" circle></el-button>-->
<!--          <el-button type="success" icon="el-icon-check" circle></el-button>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </el-main>
</template>

<script>
    export default {
        name: 'LoginUser',
        data () {
            return {
                activeNames: ['1'],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            handleChange (val) {
                console.log(val)
            },
            onSubmit () {
                console.log('submit!')
            }
        }
    }
</script>

<style scoped>
  .first{
    background-color: #99cccc;
    text-align: left;
  }
  .second{
    text-align: left;
    margin-top: 10px;
  }
  .third{
    background-color: #99cccc;
    text-align: left;
  }
  .third1{
    height: 10px;
    margin-bottom: 60px;
  }
  .third2{
    height: 20px;
  }
  .imagediv{
    text-align: left;
    margin-left: 100px;
  }
  .fourth{
    background-color: #99cccc;
    text-align: left;
  }
  .fourth1{
    text-align: left;
    margin-left: 50px;
  }
  .fourth2{
    height: 40px;
    width: 100px;
  }
  /*.five{*/
  /*  text-align: right;*/
  /*  margin-right: 30px;*/
  /*}*/
</style>


