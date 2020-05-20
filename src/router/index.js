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
const NotFound = ()=>import("../views/failvue/404")
const HomeTreassure =()=>import("../components/HomeTreassure")
const HomeStaff =()=>import("../components/HomeStaff")
const Register =()=>import("../views/failvue/register")



Vue.use(Router)
const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        requireAuth: false,
      },
    },{
      path: '/404',
      name:'404',
      component: NotFound,
      meta:{
        requireAuth:false
      }
    },{
      path: '/register',
      name:'Register',
      component: Register,
      meta:{
        requireAuth:false
      }
    },
    {
      path: '/homet',
      name:'hometreassure',
      component: HomeTreassure,
      meta:{
        requireAuth:true,
        roles:[ '1','2']
      },
      children:[
        {
          path: 'firstPage',
          meta:{
            requireAuth:true,
            roles:[ '1','2']
          },
          component: resolve => require(['../views/firstPage/FirstPage'], resolve)
        },
        {
          path: 'stockOut',
          name: 'StockOut',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: StockOut
        },{
          path: 'profitAnalysis',
          name: 'profit',
          meta: {
            requireAuth: true,
            roles: ['1','2'],
          },
          component: ProfitAnalysis
        },{
          path: 'log',
          name: 'log',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: Log,
        },{
          path: 'stockIn',
          name: 'StockIn',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: StockIn
        },{
          path: 'vender',
          name: 'Vender',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: Vender,
        },{
          path: 'marketMsg',
          name: 'marketMsg',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: MarketMsg,
        },{
          path: 'goodReturn',
          name: 'goodReturn',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: GoodReturn,
        },{
          path: 'goodClass',
          name: 'goodClass',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: GoodClass,
        },{
          path: 'goods',
          name: 'goods',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: Goods,
        },{
          path: 'flowCount',
          name: 'paymentOfFlowCount',
          meta: {
            requireAuth: true,
            roles: ['1','2'],
          },
          component: PaymentOfFlowCount,
        },{
          path: 'inventory',
          name: 'Inventory',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: Inventory,
        },{
          path: 'goodReturn',
          name: 'goodReturn',
          component: GoodReturn,
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
        },{
          path: 'goodPrice',
          name: 'goodPrice',
          component: GoodPrice,
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
        },{
          path: 'employee',
          name: 'employee',
          component: Employees,
          meta: {
            requireAuth: true,
            roles: ['1'],
          },
        },{
          path: 'debt',
          name: 'Debt',
          meta: {
            requireAuth: true,
            roles: ['1','2'],
          },
          component: Debt,
        },{
          path: 'user',
          name: 'LoginUser',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: LoginUser,
        },
        {
          path: 'error',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: resolve => require(['../views/failvue/Error'], resolve)
        },
        {
          path: 'help',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: resolve => require(['../views/helps/Help'], resolve)
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      //添加该字段，表示进入这个路由需要登录
      meta: {
        requireAuth: true,
        roles: ['1','2','3'],
      },
      children:[
        {
          path: 'stockOut',
          name: 'StockOut',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: StockOut
        },{
          path: 'profitAnalysis',
          name: 'profit',
          meta: {
            requireAuth: true,
            roles: ['1','2'],
          },
          component: ProfitAnalysis
        },{
          path: 'log',
          name: 'log',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: Log,
        },{
          path: 'stockIn',
          name: 'StockIn',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: StockIn
        },{
          path: 'vender',
          name: 'Vender',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: Vender,
        },{
          path: 'marketMsg',
          name: 'marketMsg',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: MarketMsg,
        },{
          path: 'goodReturn',
          name: 'goodReturn',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: GoodReturn,
        },{
          path: 'goodClass',
          name: 'goodClass',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: GoodClass,
        },{
          path: 'goods',
          name: 'goods',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: Goods,
        },{
          path: 'flowCount',
          name: 'paymentOfFlowCount',
          meta: {
            requireAuth: true,
            roles: ['1','2'],
          },
          component: PaymentOfFlowCount,
        },{
          path: 'inventory',
          name: 'Inventory',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: Inventory,
        },{
          path: 'goodReturn',
          name: 'goodReturn',
          component: GoodReturn,
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
        },{
          path: 'goodPrice',
          name: 'goodPrice',
          component: GoodPrice,
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
        },{
          path: 'employee',
          name: 'employee',
          component: Employees,
          meta: {
            requireAuth: true,
            roles: ['1'],
          },
        },{
          path: 'debt',
          name: 'Debt',
          meta: {
            requireAuth: true,
            roles: ['1','2'],
          },
          component: Debt,
        },{
          path: 'user',
          name: 'LoginUser',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: LoginUser,
        },{
          path: 'rolePermissinon',
          name: 'RolePermission',
          meta: {
            requireAuth: true,
            roles: ['1'],
          },
          component: RolePermission,
        },{
          path: 'firstPage',
          meta: {
            requireAuth: true,
            roles: ['1'],
          },
          component: resolve => require(['../views/firstPage/FirstPage'], resolve)
        },
        {
          path: 'error',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: resolve => require(['../views/failvue/Error'], resolve)
        },
        {
          path: 'help',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: resolve => require(['../views/helps/Help'], resolve)
        }
      ]
    },
    {
      path: '/homes',
      name: 'HomeStaff',
      component: HomeStaff,
      //添加该字段，表示进入这个路由需要登录
      meta: {
        requireAuth: true,
        roles:['1','2','3'],
      },
      children:[
        {
          path: 'firstPage',
          meta: {
            requireAuth: true,
            roles:['1','2','3'],
          },
          component: resolve => require(['../views/firstPage/FirstPage'], resolve)
        }, {
          path: 'stockOut',
          name: 'StockOut',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: StockOut
        },{
          path: 'log',
          name: 'log',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: Log,
        },{
          path: 'stockIn',
          name: 'StockIn',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: StockIn
        },{
          path: 'vender',
          name: 'Vender',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: Vender,
        },{
          path: 'marketMsg',
          name: 'marketMsg',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: MarketMsg,
        },{
          path: 'goodReturn',
          name: 'goodReturn',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: GoodReturn,
        },{
          path: 'goodClass',
          name: 'goodClass',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: GoodClass,
        },{
          path: 'goods',
          name: 'goods',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: Goods,
        },{
          path: 'inventory',
          name: 'Inventory',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: Inventory,
        },{
          path: 'goodReturn',
          name: 'goodReturn',
          component: GoodReturn,
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
        },{
          path: 'goodPrice',
          name: 'goodPrice',
          component: GoodPrice,
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
        },{
          path: 'user',
          name: 'LoginUser',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: LoginUser,
        },
        {
          path: 'error',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: resolve => require(['../views/failvue/Error'], resolve)
        },
        {
          path: 'help',
          meta: {
            requireAuth: true,
            roles: ['1','2','3'],
          },
          component: resolve => require(['../views/helps/Help'], resolve)
        }

      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  //从SessionStorage里面取出需要的角色和user ==> cookie
  let user = sessionStorage.getItem("user");
  let role = sessionStorage.getItem("role");
  //不允许未登录的可以访问的页面
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (user) { // 判断本地是否存在cookie
      if (to.meta.roles.length !== 0) {
        //1,2,3,分别代表什么权限？
        for (let i = 0; i < to.meta.roles.length; i++) {
          if (role===to.meta.roles[i]) {
            next();
            break;
          } else if (i === to.meta.roles.length - 1) {
            next({
              path: '/404'
            })
          }
        }
      } else {
        next();
      }
    } else {
      next({
        path: '/404'
      })
    }
  } else {
    next()
  }

});
export default router


