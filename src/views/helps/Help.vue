<template>
  <div class="help">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>帮助文档</span>
     <!-- <a href="http://localhost:8080/home">-->
        <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">返回</el-button>
      <!--</a>-->
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="为什么部分页面无法访问？" name="1">
        <div>关于部分页面无法访问问题：由于该超市系统设置了员工级别权限，按照员工级别授权部分页面访问权限。</div>
        <div>员工只可访问所属部门权限的页面。如有其他权限请求，请上报经理。</div>
      </el-collapse-item>
      <el-collapse-item title="如何修改密码？" name="2">
        <div>账户信息页面，可直接对密码进行修改。</div>
      </el-collapse-item>
      <el-collapse-item title="什么是分类规则？" name="3">
        <div>分类规则是按照相应标准对商品进行规范的分类，便于管理。</div>
        <div>并根据商品分类规则规范了商品代码的编写。</div>
      </el-collapse-item>
      <el-collapse-item title="关于我们" name="4">
        <div>如若对该系统有什么意见或建议，烦请联系我们，我们将尽快解决。</div>
        <div>联系邮箱：2516035648@qq.com</div>
      </el-collapse-item>
    </el-collapse>
    </div>
  </el-card>
  </div>
</template>

<script>
    export default {
        name: "Help",
        data() {
            return {
                activeNames: ['1']
            };
        },
        methods: {
            handleChange(val) {
                console.log(val);
            },
            goBack() {
                    this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
  .box-card{
    width: 75%;
    height: 500px;
  }
</style>
