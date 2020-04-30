import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import StockIn from "../components/markets/StockIn";
import StockOut from "../components/markets/StockOut";
import Vender from "../components/markets/Vender";
import LoginUser from "../components/markets/LoginUser";
import Debt from "../components/markets/Debt";
import Employees from "../components/markets/Employees";
import GoodPrice from "../components/markets/GoodPrice";
import GoodReturn from "../components/markets/GoodReturn";
import Inventory from "../components/markets/Inventory";
import InventoryRunningAccount from "../components/markets/InventoryRunningAccount";
import MarketMsg from "../components/markets/MarketMsg";
import PaymentOfFlowCount from "../components/markets/PaymentOfFlowCount";
import GoodClass from "../components/markets/GoodClass";
import RolePermission from "../components/markets/RolePermission";
import Log from "../components/markets/Log";
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/stockIn',
      name: 'StockIn',
      component: StockIn
    },{
      path: '/stockOut',
      name: 'StockOut',
      component: StockOut
    },{
      path: '/vender',
      name: 'Vender',
      component: Vender,
    },{
      path: '/user',
      name: 'LoginUser',
      component: LoginUser,
    },{
      path: '/debt',
      name: 'Debt',
      component: Debt,
    },{
      path: '/employee',
      name: 'employee',
      component: Employees,
    },{
      path: '/goodPrice',
      name: 'goodPrice',
      component: GoodPrice,
    },{
      path: '/goodReturn',
      name: 'goodReturn',
      component: GoodReturn,
    },{
      path: '/inventory',
      name: 'Inventory',
      component: Inventory,
    },{
      path: '/inventoryRunningAccount',
      name: 'inventoryRunningAccount',
      component: InventoryRunningAccount,
    },{
      path: '/goodReturn',
      name: 'goodReturn',
      component: GoodReturn,
    },{
      path: '/marketMsg',
      name: 'marketMsg',
      component: MarketMsg,
    },{
      path: '/flowCount',
      name: 'paymengOfFolowCount',
      component: PaymentOfFlowCount,
    },{
      path: '/goodClass',
      name: 'goodClass',
      component: GoodClass,
    },{
      path: '/rolePermission',
      name: 'RolePermission',
      component: RolePermission,
    },{
      path: '/log',
      name: 'log',
      component: Log,
    }
  ]
})
