<template>
 <div id="dingdan">
   <router-link to="/alldingdan">
   <el-tag>全部订单</el-tag>
   </router-link>
   <router-link to="/daifukuan">
   <el-tag>待付款</el-tag>
   </router-link>
   <router-link to="/daitihuo">
   <el-tag>代提货</el-tag>
   </router-link>
   <router-link to="/yiwancheng">
   <el-tag>已完成</el-tag>
   </router-link>
   <div>
     <router-view></router-view>
   </div>
 </div>
</template>

<script>
  import  Alldingdan from '../qiantai/dingdan/alldingdan'
  import  Daifukuan from '../qiantai/dingdan/daifukuan'
  import  Daitihuo from '../qiantai/dingdan/daitihuo'
  import  Yiwancheng from '../qiantai/dingdan/yiwancheng'
    export default {
    components:{
      alldingdan:Alldingdan,
      daifukuan:Daifukuan,
      daitihuo:Daitihuo,
      yiwancheng:Yiwancheng
    },
        name: "dingdan"
    }
</script>

<style scoped>

</style>
