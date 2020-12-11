
import Vue from 'vue'
import VueRouter from "vue-router";

import Houtai from '../router/houtai/router.config'
import Qiantai from '../router/qiantai/router.config'
import Shanghu from '../router/shanghu/router.config'
import  Qiantaishouye from '../views/qiantai/shouye.vue'
import  Shouyetest from '../views/houtai/shoplist.vue'


import  Houtaishouye from '../views/houtai/menu.vue'
import  Login from '../views/houtai/login'
import  Shanghushouye from '../views/shanghu/Login.vue'

Vue.use(VueRouter)

/**
 * 这里的嵌套路由不需要加上父级路由地址,后面的处理器会自动加上
 */
const routes = [
  /**
   * 首页路由
   */
  {
    path: '/',
    component: Houtaishouye
  },
  {
    path: '/login',
    component: Login
  },
  /**
   * 后台路由,访问地址 /back/.....
   */
  {
    path: '/back',
    component: Qiantaishouye,
    //children: Qiantai
  },
  {
    path: '/shop',
    component: Shanghushouye,
   //children: Shanghu
   },
  {
    path: '/shouyetest',
    component: Shouyetest,
    //children: Shanghu
  },
  /**
   * 前台路由, 访问地址 /.....
   */
  //...FontRouter,
];
const router = new VueRouter({
  routes:routes
})


export default router
