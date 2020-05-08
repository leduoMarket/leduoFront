import Vue from 'vue'
import Router from 'vue-router'
const StockIn = ()=>import("../views/stockin/StockIn")
const StockOut = ()=>import("../views/stockout/StockOut")
const Vender = ()=>import("../views/vender/Vender")
const LoginUser = ()=>import("../views/loginuser/LoginUser")
const Home = ()=>import("../components/Home")
const Log = ()=>import("../views/log/Log")
const Login = ()=>import("../views/login/Login")
const RolePermission = ()=>import("../views/rolepermission/RolePermission")
const GoodClass = ()=>import("../views/goodsclassification/GoodClass")
const PaymentOfFlowCount = ()=>import("../views/flowpayment/PaymentOfFlowCount")
const MarketMsg = ()=>import("../views/marketinfo/MarketMsg")
const Inventory = ()=>import("../views/inventoryaccounts/Inventory")
const GoodReturn = ()=>import("../views/goodsreturn/GoodReturn")
const GoodPrice = ()=>import("../views/goodsprice/GoodPrice")
const Debt = ()=>import("../views/debt/Debt")
const Employees = ()=>import("../views/employees/Employees")
const ProfitAnalysis=()=>import("../views/analysis/ProfitAnalysis")
const Goods=()=>import("../views/goods/Goods")
/*const Help=()=>import("../views/helps/Help")*/


Vue.use(Router)
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },{
      path: '/404',
      component: resolve => require(['../views/failvue/404'], resolve)
    }, {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
    {
        path: 'stockOut',
        name: 'StockOut',
        component: StockOut
      },{
        path: 'profitAnalysis',
        name: 'profit',
        component: ProfitAnalysis
      },
        {
          path: 'log',
          name: 'log',
          component: Log,
        },{
          path: 'stockIn',
          name: 'StockIn',
          component: StockIn
        },{
          path: 'vender',
          name: 'Vender',
          component: Vender,
        },{
          path: 'marketMsg',
          name: 'marketMsg',
          component: MarketMsg,
        },{
          path: 'goodReturn',
          name: 'goodReturn',
          component: GoodReturn,
        },{
          path: 'goodClass',
          name: 'goodClass',
          component: GoodClass,
        },
        {
          path: 'goods',
          name: 'goods',
          component: Goods,
        },{
          path: 'flowCount',
          name: 'paymentOfFlowCount',
          component: PaymentOfFlowCount,
        },{
          path: 'inventory',
          name: 'Inventory',
          component: Inventory,
        },{
          path: 'goodReturn',
          name: 'goodReturn',
          component: GoodReturn,
        },{
          path: 'goodPrice',
          name: 'goodPrice',
          component: GoodPrice,
        },{
          path: 'employee',
          name: 'employee',
          component: Employees,
        },{
          path: 'debt',
          name: 'Debt',
          component: Debt,
        },{
          path: 'user',
          name: 'LoginUser',
          component: LoginUser,
        },{
          path: 'rolePermissinon',
          name: 'RolePermission',
          component: RolePermission,
        },/*{
          Path:'helps',
          name:'Help',
          component:Help,
        },*/{
          path: 'firstPage',
          component: resolve => require(['../views/firstPage/FirstPage'], resolve)
        },
        {
          path: 'error',
          component: resolve => require(['../views/failvue/Error'], resolve)
        },
        {
          path: 'help',
          component: resolve => require(['../views/helps/Help'], resolve)
        }
      ]
    }
  ]
})
