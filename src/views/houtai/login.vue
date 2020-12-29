<template>
  <div id="app" style="background: url('./src/images/shanghu/444.jpg');width: 100%;height: 100vh">
    <div style="height:400px; width: 300px;background: url('./src/images/shanghu/loginback.png')" id="date">
      <el-form label-width="80px">
        <el-form-item>
          <h1 style="margin-left: 40px">登录</h1>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input  v-model="username" placeholder="用户名" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="密码">

          <el-input  v-model="userpass" placeholder="密码" style="width: 200px" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="denglu()" style="margin-left: 40px">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'app',
    data () {
      return {
        username: '',
        userpass: ''
      }
    },
    methods: {
      denglu(){
        //alert(1111)
        var _this = this;
        var params = new URLSearchParams();
        params.append("username", this.username);
        params.append("password", this.userpass);

        this.$axios.post("/employ/login.action",params,
          {emulateJSON:true}).
        then(function(result) {
          //alert(result.data.code)
          if(result.data.code==1){
           // alert(result.data.employ)
            sessionStorage.setItem("username",result.data.employ)
            _this.$message({
              message:result.data.msg,
              type:"success"
            })
            setTimeout(function () {

              if(result.data.code==1) {
                _this.$router.push({path: '/caidan'})
               // document.getElementById("date").style.display = "none";
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
          alert("error")
        });
      }
    }
  }
</script>

<style>
  #date{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
