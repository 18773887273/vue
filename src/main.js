import Vue from 'vue'

import  App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import Axios from 'axios'

import Router from '../router/router.config'


Axios.defaults.baseURL = "http://127.0.0.1:8080/oasystem"
// 将API方法绑定到全局
Vue.prototype.$axios = Axios

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})

