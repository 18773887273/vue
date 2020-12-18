<template>
 <div id="dingdan">
   <el-tabs type="card">

     <el-tab-pane label="全部订单"><router-link to="/alldingdan">全部订单</router-link></el-tab-pane>


     <router-link to="/daifukuan">
     <el-tab-pane label="待付款">待付款</el-tab-pane>
     </router-link>
     <router-link to="/daitihuo">
     <el-tab-pane label="代提货">代提货</el-tab-pane>
     </router-link>
     <router-link to="/yiwancheng">
     <el-tab-pane label="已完成">已完成</el-tab-pane>
     </router-link>
     <router-link to="/yiquxiao">
     <el-tab-pane label="已取消">已取消</el-tab-pane>
     </router-link>
   </el-tabs>
   <div>
     <router-view></router-view>
   </div>
 </div>
</template>

<script>
  import  Alldingdan from './dingdan/alldingdan'
  import  Daifukuan from './dingdan/daifukuan'
  import  Daitihuo from './dingdan/daitihuo'
  import  Yiwancheng from './dingdan/yiwancheng'
  import Yiquxiao from "./dingdan/yiquxiao";
    export default {
    components:{
      alldingdan:Alldingdan,
      daifukuan:Daifukuan,
      daitihuo:Daitihuo,
      yiwancheng:Yiwancheng,
      yiquxiao:Yiquxiao
    },
        name: "dingdan"
    }
</script>

<style scoped>

</style>
