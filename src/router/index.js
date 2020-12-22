
import Vue from 'vue'
import VueRouter from "vue-router";

import Houtai from '../router/houtai/router.config'
import Qiantai from '../router/qiantai/router.config'
import Shanghu from '../router/shanghu/router.config'
import  Qiantaishouye from '../views/qiantai/shouye.vue'
import  Shouyetest from '../views/houtai/shoplist.vue'
import  Shoptytest from '../views/houtai/shoptylist.vue'
import  Shoptyadd from '../components/houtai/shopty/addshopty'
import  Shop from '../views/houtai/shoplist.vue'
/*首页分类展示*/
import Shouyetyshow from  '../components/qiantai/shouyetype/typeye'
/*头像上传测试*/
import  Uploadtest from '../views/houtai/uploadtest.vue'
import Yonghu from '../components/houtai/yuangong'
import  Houtaishouye from '../views/houtai/menu.vue'
import  Login from '../views/houtai/login'
import  Employ from '../views/houtai/employlist'
import  Login2 from '../views/shanghu/Login'
import shmenu from "../views/shanghu/shmenu.vue";
import  Shouquan from '../views/houtai/shouquan'
import  Warehouse from '../views/houtai/warehouse'
import   Shouye01 from '../components/qiantai/shouye01'
import  My from '../components/qiantai/my'
import  Myzhanghao from '../components/qiantai/myzhanghao'
import  Dingdan from '../components/qiantai/dingdan'
import  Role from '../views/houtai/rolelist'

import  Shoptype from '../views/houtai/shoptylist.vue'
import  Addshopty from '../components/houtai/shopty/addshopty'
import  Caigou from '../views/houtai/caigou.vue'
import Alldingdan from "../components/qiantai/dingdan/alldingdan";
import Daifukuan from "../components/qiantai/dingdan/daifukuan";
import Daitihuo from "../components/qiantai/dingdan/daitihuo";
import Yiwancheng from '../components/qiantai/dingdan/yiwancheng'
import Yiquxiao from "../components/qiantai/dingdan/yiquxiao";

import Shiming from "../components/qiantai/shiming";
import Shangjiashen from "../components/qiantai/shangjiashen";



/*登录*/
import Denglu from "../components/qiantai/dengluzuche/denglu"
import Personal from "../components/shanghu/maintain/personal";

Vue.use(VueRouter)
/*订单管理*/
import Allorders from '../views/houtai/allorder.vue'
import Daipeisong from '../views/houtai/daipsorder.vue'
import Peisongzhong from '../views/houtai/peiszorder.vue'
import Yipeisong from '../views/houtai/yipsorder.vue'
import Shopcard from "../components/qiantai/shouyetype/jiezhangliucheng/shopcard";
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
      },
      {path:'/shoplist',
        component: Shop
      },
      {
        path: '/allorder',
        component: Allorders
      },
      {
        path: '/daipeisong',
        component: Daipeisong
      },
      {
        path: '/peisongzhong',
        component: Peisongzhong
      },
      {
        path: '/yipeisong',
        component: Yipeisong
      },
      {path:'/caigou',
        component: Caigou
      }
    ]
  },
  {
    path: '/',
    component: Login
  },
  {
    path: '/shouyetypeshow',
    component: Shouyetyshow
  },
  {
    path: '/shopcard',
    component: Shopcard
  },

  {
    path: '/login2',
    component: Login2
  },
  {
    path: '/uploadtest',
    component: Uploadtest
  },
  {
    path: '/denglu',
    component: Denglu
  },
  /**
   * 后台路由,访问地址 /back/.....
   */
  {
    path: '/back',
    component: Qiantaishouye,
    redirect:'/main',
    children: [{
      path: '/main',
      component: Shouye01
    },
      {
        path: '/mys',
        component: My,
        redirect:'/myzhanghao',
        children:[{
          path:'/myzhanghao',
          component:Myzhanghao,
        },
          {
            path: '/dingdan',
            component: Dingdan,
            redirect:'/alldingdan',
            children:[{
              path:'/alldingdan',
              component:Alldingdan
            },{
              path:'/daifukuan',
              component:Daifukuan
            },{
              path:'/daitihuo',
              component:Daitihuo
            },{
              path: '/yiwancheng',
              component:Yiwancheng
            },
              {
                path: '/yiquxiao',
                component: Yiquxiao
              }]
          },
          {
            path: '/shiming',
            component:Shiming
          },
          {path: "/shangjiashen",
            component: Shangjiashen}]
      }]
  },
  {
    path: '/shshouye',
    component: shmenu,
    redirect: '/personal',
    children: [{
      path: '/personal',
      component: Personal,
    }]
  },
  {
    path: '/shouyetest',
    component: Shouyetest,
    //children: Shanghu
  },
  {
    path: '/shoptylist',
    component: Shoptytest,
    //children: Shanghu
  },
  {
    path: '/shoptyadd',
    component: Shoptyadd,
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
