import Vue from 'vue'
import VueRouter from "vue-router";

import Userlist from "../components/userlist";
import Deptlist from "../components/deptlist";

Vue.use(VueRouter)

export  default  new VueRouter({
  routes:[
    {path:"/userlist",component:Userlist},
    {path:"/deptlist",component:Deptlist},
  ]
})
