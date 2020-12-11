<template>
  <div id="app">
    <!--<div style="height:200px; width: 200px" id="date">
      <el-form label-width="80px">
        <el-form-item>
          <h1>用户登录</h1>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input  v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input  v-model="userpass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="denglu()">
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </div>-->
    <router-view></router-view>
  </div>

</template>
<script>
 /* export default {
    name: 'app',
    data () {
      return {
        username: '',
        userpass: ''
      }
    },
    methods: {
      denglu(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("username", this.username);
        params.append("password", this.userpass);

        this.$axios.post("/employ/login.action",params,
          {emulateJSON:true}).
        then(function(result) {
          if(result.data.code==1){
            _this.$message({
              message:result.data.msg,
              type:"success"
            })
            setTimeout(function () {
              if(result.data.code==1) {
                _this.$router.push({path: '/'})
                document.getElementById("date").style.display = "none";
              }
            },2000)



          }else{
            _this.$message({
              message:result.data.msg,
              type:"error"
            })
            _this.username=""
            _this.userpass=""
          }
        }.bind(this)).
        catch(function(error) {
          alert(error)
        });
      }
    }
  }*/
</script>

<style>

</style>
