<template>
  <el-col :span="4" class="leftMenu">
    <div class="logo">
      <!--      <img src="../../assets/pic/logo.png" height="70" />-->
      <p>欢迎光临，</p>
      <p>乐多超市！</p>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1" >
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span style="font-size: 18px;font-weight: bold">采购</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" >
            <router-link to="/homet/stockIn">入库单</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/homet/vender">供应商表</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-shopping-cart-2"></i>
          <span style="font-size: 18px;font-weight: bold">销售</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <router-link to="/homet/stockOut">出库单</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/homet/goodPrice">商品定价</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-sold-out"></i>
          <span style="font-size: 18px;font-weight: bold">退货</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">
            <router-link to="/homet/goodReturn">退货单</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-present"></i>
          <span style="font-size: 18px;font-weight: bold">商品</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">
            <router-link to="/homet/goods">商品表</router-link>
          </el-menu-item>
          <!--<el-menu-item index="4-1">
            <router-link to="/home/goodClass">商品分类</router-link>
          </el-menu-item>-->
          <el-menu-item index="4-2">
            <router-link to="/homet/inventory">库存账</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span style="font-size: 18px;font-weight: bold">财务</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">
            <router-link to="/homet/debt">欠款单</router-link>
          </el-menu-item>
          <el-menu-item index="5-2">
            <router-link to="/homet/flowCount">支付流水账</router-link>
          </el-menu-item>
          <el-menu-item index="5-3">
            <router-link to="/homet/profitAnalysis">盈亏分析</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span style="font-size: 18px;font-weight: bold">系统</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="7-1">
            <router-link to="/homet/user">登录账号</router-link>
          </el-menu-item>
          <el-menu-item index="7-2">
            <router-link to="/homet/marketMsg">我家超市</router-link>
          </el-menu-item>
          <el-menu-item index="7-3">
            <router-link to="/homet/log">日志查询</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>

</template>

<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {

            }
        }
    }
</script>
<style scoped>
  .leftMenu {
    text-align: left;
    margin-right: 40px;
    /*width: 13% !important;*/
  }
  .logo{
    text-align: center;
    size: 28px;
    font-family: "Adobe 明體 Std L";
    margin: 20px;
    color: white;
  }
  a:visited {
    color: purple;
    text-decoration: none;
  }
  a:hover {
    color: red;
    text-decoration: none;
  }
</style>
