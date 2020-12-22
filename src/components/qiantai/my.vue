<template>

  <div id="my">

    <el-row :gutter="24">

      <el-col :span="6" style="margin-left: 100px;height: 500px">
        <div class="grid-content bg-purple"  style="height: 500px"  >
          <div class="block">
            <el-avatar :size="120" :src="tupian" style="margin-top: 25px"></el-avatar>
            <label>用户{{yonghuname}}</label>
          </div>
          <el-divider></el-divider>
          <div>
            <router-link to="/myzhanghao">
          <div class="icons">
            <i class="el-icon-user" style="font-size: 30px"></i>
            <label >我的账户</label>
          </div>
            </router-link>
            <el-divider></el-divider>
            <router-link to="/dingdan">
            <div class="icons">
              <i class="el-icon-sell" style="font-size: 30px"></i>
              <label>我的订单</label>
            </div>
            </router-link>
            <el-divider></el-divider>
            <router-link to="/shiming">
            <div class="icons">
              <i class="el-icon-setting" style="font-size: 30px"></i>
              <label>实名认证</label>
            </div>
            </router-link>
            <el-divider></el-divider>
            <router-link to="/shangjiashen">
            <div class="icons">
              <i class="el-icon-s-goods" style="font-size: 30px"></i>
              <label>商家认证</label>
            </div>
            </router-link>
          </div>
        </div>
      </el-col>
      <el-col :span="15" style="height: 500px">
        <div class="grid-content bg-purple"  style="height: 500px" >
            <router-view></router-view>
        </div>

      </el-col>

    </el-row>
  </div>
</template>

<script>
  import  Myzhanghao from './myzhanghao'
  import  Dingdan from './dingdan'
  import  Shiming from './shiming'
  import Shangjiashen from "./shangjiashen";
    export default {
      name:"my",
    components:{
      myzhanghao:Myzhanghao,
      dingdan:Dingdan,
      shiming:Shiming,
      shangjiashen:Shangjiashen
    },
      data(){
      return {
        tupian:require('../../images/shanghu/logo.png'),
        yonghuming:"12345",
        yonghuname: sessionStorage.getItem('yonghuname'),

      }
      },
      methods:{


      },

    }
</script>

<style scoped>
.bg-purple{
  background-color: white;

}
.block{
  text-align: center;
}
  /*.icons{
    font-size: 50px;
  }*/
</style>
