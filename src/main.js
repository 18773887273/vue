import Vue from 'vue'

import  App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'hooper/dist/hooper.css';

import Axios from 'axios'


import Store from './vuex/store.js'

Axios.defaults.baseURL = "http://localhost:8080/Buysystem"
// 将API方法绑定到全局
Vue.prototype.$axios = Axios
Vue.prototype.$host = "http://localhost:10086/vue/images/shop/"

Vue.use(ElementUI)
import Router from './router/index';

new Vue({
  el: '#app',
  render: h => h(App),
  router:Router,
  store:Store,//vuex挂载

})

