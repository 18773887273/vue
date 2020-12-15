
import Vue from 'vue'
import VueRouter from "vue-router";

import Houtai from '../router/houtai/router.config'
import Qiantai from '../router/qiantai/router.config'
import Shanghu from '../router/shanghu/router.config'
import  Qiantaishouye from '../views/qiantai/shouye.vue'
import  Shouyetest from '../views/houtai/shoplist.vue'
import  Shoptype from '../views/houtai/shoptylist.vue'
import  Shoptyadd from '../components/houtai/shopty/addshopty'
/*头像上传测试*/
import uploadtest from '../views/houtai/uploadtest.vue';

import Yonghu from '../components/houtai/yuangong'
import  Houtaishouye from '../views/houtai/menu.vue'
import  Login from '../views/houtai/login'
import  Employ from '../views/houtai/employlist'
import  Login2 from '../views/shanghu/Login'
import shmenu from "../views/shanghu/shmenu.vue";
import  Shouquan from '../views/houtai/shouquan'
import  Warehouse from '../views/houtai/warehouse'
import  Role from '../views/houtai/rolelist'
Vue.use(VueRouter)

/**
 * 这里的嵌套路由不需要加上父级路由地址,后面的处理器会自动加上
 */
const routes = [
  /**
   * 首页路由
   */
  {
    path: '/caidan',
    component: Houtaishouye,
     children:[
      {path:'/yonghu',
         component: Yonghu},
       {path:'/employlist',
         component: Employ
       },
       {path:'/shouquan',
         component: Shouquan
       },
       {path:'/warehouse',
         component: Warehouse
       },
       {path:'/rolelist',
         component: Role
       },
       {path:'/shoptype',
         component: Shoptype
       }
     ]
  },
  {
    path: '/',
    component: Login
  },

  {
    path: '/login2',
    component: Login2
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
    path: '/shshouye',
    component: shmenu,
   //children: Shanghu
   },
  {
    path: '/shouyetest',
    component: Shouyetest,
    //children: Shanghu
  },
  {
    path: '/shoptylist',
    component: Shoptype,
    //children: Shanghu
  },
  {
    path: '/uploadtest',
    component: uploadtest,
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
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router
