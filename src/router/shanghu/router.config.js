import Vue from 'vue'
import VueRouter from "vue-router";

/*import Userlist from "../../components/houtai/userlist";
import Deptlist from "../../components/houtai/deptlist";
import Menu from "../../components/houtai/menu";*/

Vue.use(VueRouter)

var routes=[
  /*{path:"/userlist",component:Userlist},
  {path:"/deptlist",component:Deptlist},
  {path:"/menu",component:Menu},*/
]


var router =new VueRouter({
  routes:routes
})

export default router
