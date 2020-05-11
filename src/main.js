// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import md5 from 'js-md5'
import{Select,Option}from 'element-ui'
Vue.use(Select)
Vue.use(Option)
Vue.use(ElementUI)
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.$md5=md5
axios.defaults.baseURL = 'http://localhost:8088/api'
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
