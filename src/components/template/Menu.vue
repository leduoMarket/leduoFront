<template>
  <!--<el-row class="tac">-->
  <el-col :span="4">
    <img src="../../assets/pic/logo.png" height="70" width="70"/>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>采购</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <router-link to="/stockIn">入库单</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/vender">供应商表</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-shopping-cart-2"></i>
          <span>销售</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <router-link to="/stockOut">出库单</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/goodPrice">商品定价</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-sold-out"></i>
          <span>退货</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">
            <router-link to="goodReturn">退货单</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-present"></i>
          <span>商品</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">
            <router-link to="goodClass">商品分类</router-link>
          </el-menu-item>
          <el-menu-item index="4-2">
            <router-link to="/inventory">库存账</router-link>
          </el-menu-item>
          <el-menu-item index="4-3">
            <router-link to="/inventoryRunningAccount">库存流水账</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span>财务</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">
            <router-link to="/debt">尚未结清款项</router-link>
          </el-menu-item>
          <el-menu-item index="5-2">
            <router-link to="/flowCount">支付流水账</router-link>
          </el-menu-item>
          <el-menu-item index="5-3">
            <router-link to="">盈亏分析</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>员工</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="6-1">
            <router-link to="/rolePermission">角色权限</router-link>
          </el-menu-item>
          <el-menu-item index="6-2">
            <router-link to="/emploee">员工基本信息</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="7-1">
            <router-link to="/user">登录账号</router-link>
          </el-menu-item>
          <el-menu-item index="7-2">
            <router-link to="/marketMsg">我家超市</router-link>
          </el-menu-item>
          <el-menu-item index="7-3">
            <router-link to="/log">日志查询</router-link>
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
                console.log(key, keyPath)
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>

<style scoped>
  el-menu-item {
    text-align: center;
  }

  template {
    text-align: left;
  }

  a:link {
    text-decoration: none;
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
