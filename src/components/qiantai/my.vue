<template>

  <div id="my">

    <el-row :gutter="24">

      <el-col :span="6" style="margin-left: 100px;height: 500px">
        <div class="grid-content bg-purple"  style="height: 500px"  >
          <div class="block">
            <el-avatar :size="120" :src="12" style="margin-top: 25px"></el-avatar>
            <label>用户</label>
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
            <router-link to="">
            <div class="icons">
              <i class="el-icon-setting" style="font-size: 30px"></i>
              <label>实名认证</label>
            </div>
            </router-link>
            <el-divider></el-divider>
            <router-link to="">
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
  import  Myzhanghao from '../qiantai/myzhanghao'
  import  Dingdan from '../qiantai/dingdan'
    export default {
    components:{
      myzhanghao:Myzhanghao,
      dingdan:Dingdan
    },
      data:{
      return:{
        yonghuming:"12345"
      }
      }
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
