import Vue from 'vue'
import VueRouter from "vue-router";

import Userlist from "../components/userlist";
import Deptlist from "../components/deptlist";
import Menu from "../components/menu";

Vue.use(VueRouter)

  var routes=[
    {path:"/userlist",component:Userlist},
    {path:"/deptlist",component:Deptlist},
    {path:"/menu",component:Menu},
  ]


var router =new VueRouter({
    routes:routes
})

export default router
