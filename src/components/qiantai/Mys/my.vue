<template xmlns="http://www.w3.org/1999/html">

  <div id="my">

    <el-row :gutter="24">

      <el-col :span="6" style="margin-left: 100px;height: 640px">
        <div class="grid-content bg-purple"  style="height: 640px;"  >
          <div class="block">
            <el-row :gutter="20">
              <el-col>
                <el-avatar :size="120" :src="tupian" style="margin-top: 25px"></el-avatar>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <label>{{yonghuname}}</label>
              </el-col>
            </el-row>
          </div>
          <el-divider></el-divider>
          <div class="my-left">
            <router-link to="/myzhanghao" class="my-luyou">
          <div class="icons my-left-div" >
            <i class="el-icon-user my-edit-a" style="font-size: 30px" ></i>
            <label class="my-edit-a">我的账户</label>
          </div>
            </router-link>
            <el-divider></el-divider>
            <router-link to="/dingdan" class="my-luyou">
            <div class="icons my-left-div">
              <i class="el-icon-sell my-edit-a" style="font-size: 30px" ></i>
              <label class="my-edit-a">我的订单</label>
            </div>
            </router-link>
            <el-divider></el-divider>
            <router-link to="/shiming" class="my-luyou">
            <div class="icons my-left-div">
              <i class="el-icon-setting my-edit-a" style="font-size: 30px" ></i>
              <label class="my-edit-a">实名认证</label>
            </div>
            </router-link>
            <el-divider></el-divider>
            <div class="icons my-left-div">
              <i class="el-icon-s-goods  my-edit-a" style="font-size: 30px"></i>
              <label @click="shangjia()"  class="my-edit-a">商家认证</label>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="15" style="height: 640px">
        <div class="grid-content bg-purple"  style="height: 640px" >
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
        tupian:require('../../.././images/shanghu/logo.png'),
        yonghuname: sessionStorage.getItem('yonghuname'),

      }
      },
      methods:{
          shangjia(){
            var _this = this;
            var params = new URLSearchParams();
            params.append("username", this.yonghuname);
            this.$axios.post("/user/queryuser.action", params, {
              emulateJSON: true
            }).then(function (result) {
              if (result.data.usercard == null || result.data.usercard=="") {
                _this.$message({
                  showClose: true,
                  message: '请您先实名认证！！'
                });
                _this.$router.push({path:'/shiming'})
              } else {
                _this.$router.push({path:'/shangjiashen'})
              }
            }).catch(function (error) {
              alert(error)
            });
          }

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
.my-luyou{
  text-decoration:none;
}

.my-edit-a {
  color: #28A745;
  font-size: 22px;
  cursor: pointer;
  margin-top: 12px;
}

.my-edit-a:hover{
  color: #19692C;
  font-size: 22px;
}

  .my-left{
    text-align: center;
  }

  .my-left-div{
    height: 60px;
  }
</style>
