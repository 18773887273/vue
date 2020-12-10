<template>
  <div id="app" :style ="note" class="note">
    <div style="height:200px; width: 200px"  >
    <el-form ref="form" label-width="80px" id="data">
      <el-form-item>
        <h1>用户登录</h1>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userpass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="denglu()">
          登陆
        </el-button>
      </el-form-item>
    </el-form>

      <router-view></router-view>
    </div>
  </div>

</template>
<script>

export default {
  name: 'app',
  data () {
    return {
            username: '',
            userpass: '',
      note: {
        backgroundImage: "url(" + require("./assets/denglubeijing.jpg") + ")",
        backgroundRepeat: "no-repeat",
        width:"1086px",
        height:"847px",
      },
    }
    },
  methods: {
    denglu(){
      var _this = this;

      var params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.userpass);

      this.$axios.post("/employ/login.action",params,{
        emulateJSON:true
      }).
      then(function(result) {
        console.log(result.data)
        console.log(result.data.code)
        if(result.data.code==0){
          alert(result.data.msg)
          let routeData = _this.$router.push({path:'/menu'})
          document.getElementById("data").style.display = "none";
         // window.open(routeData.href);

        }
        else {
          alert(result.data.msg)
          _this.$router.push({path:'/menu'})

        }
      }.bind(this)).
      catch(function(error) {
        alert(error)
      });
    }
  }

  }
</script>

<style>

</style>
