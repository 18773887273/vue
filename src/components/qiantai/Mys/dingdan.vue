<template>
 <div id="dingdan">
     <el-tabs type="card" v-model="activeName" @tab-click="tiao(tab)">
       <router-link to="/alldingdan">
       <el-tag>全部订单</el-tag>
       </router-link>
       <router-link to="/daifukuan">
         <el-tag>待付款</el-tag>
       </router-link>
       <router-link to="/daitihuo">
         <el-tag>待收货</el-tag>
       </router-link>
       <router-link to="/yiwancheng">
         <el-tag>已完成</el-tag>
       </router-link>
       <router-link to="/yiquxiao">
         <el-tag>已取消</el-tag>
       </router-link>
   </el-tabs>
   <div>
     <router-view></router-view>
   </div>
 </div>
</template>

<script>
  import  Alldingdan from '../dingdan/alldingdan'
  import  Daifukuan from '../dingdan/daifukuan'
  import  Daitihuo from '../dingdan/daitihuo'
  import  Yiwancheng from '../dingdan/yiwancheng'
  import Yiquxiao from "../dingdan/yiquxiao";
    export default {
    components:{
      alldingdan:Alldingdan,
      daifukuan:Daifukuan,
      daitihuo:Daitihuo,
      yiwancheng:Yiwancheng,
      yiquxiao:Yiquxiao
    },
        name: "dingdan",
      data(){
      return{
        currentTab:"/alldingdan",//默认选择系统推送
        activeName:'receivedAutoNotice',
      }
      },
      methods:{
      tiao(tab){
        alert(tab.name)
        this.$router.push({path:"'"+tab.name+"'"});
      }
      }
    }
</script>

<style scoped>

</style>
