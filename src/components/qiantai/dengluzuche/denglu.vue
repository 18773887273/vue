<template>
  <div id="denglu">
    <el-row class="font1">
      <el-col :span="14" :offset="2">
        <h1 style="font-size: 25px">欢迎回来</h1>
      登录以继续<br><br>
      <el-form :model="loginform">
        <el-form-item label="用户名" >
          <el-input placeholder="输入用户名" size="small" v-model="loginform.username" autocomplete="off" style="width: 285px;"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: -20px" label="密码" >
          <el-input type="password" placeholder="输入密码" size="small" v-model="loginform.userpass" autocomplete="off" style="width: 285px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="denglu" :loading="loading" style="width: 285px;">{{ loading ? '提交中 ...' : '登 录' }}</el-button>
        </el-form-item>
      </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "denglu",
  props:["sg"],
  data() {
    return {

      loginform: {
        username: '',
        userpass: ''
      },
      propvalue:{
        propdialog:false,
        proptouxian:true
      },
      timer: null,
      loading:false,
      falodchild:false
    }
  },
  methods:{
    denglu()
    {
      var _this = this;
      var params = new URLSearchParams();
      params.append("username", this.loginform.username);
      params.append("userpass", this.loginform.userpass);
      if (this.loading) {
        return;
      }
          this.loading = true;
          this.$axios.post("user/login.action",params).then(function(result) {
            if (result.data.code=0 || result.data.msg == '密码错误,请重新输入'){
              _this.$message(result.data.msg);
              _this.loginform.userpass="";
              return
            }
            else if(result.data.code=0 || result.data.msg == '账号不存在,请重新输入'){
              _this.$message(result.data.msg);
              _this.loginform.userpass="";
              return
            }else {
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
              //将登录成功的用户名存入store中
              sessionStorage.setItem("yonghuname",result.data.username);
              //将登录成功的用户id存入store中
              sessionStorage.setItem("yonghuid",result.data.userid);
              //将登录成功的用户mima存入store中
              sessionStorage.setItem("yonghupass",_this.loginform.userpass);
              //将登录成功的用户会员存入store中
              sessionStorage.setItem("hyname",result.data.hyname);
              //将登录成功的用户id存入store中
              sessionStorage.setItem("hyzhekou",result.data.hyzhekou);
              _this.$emit("propvalue",false,true);
            }

            /* _this.$emit("propvalue",_this.propvalue);*/

         /*   _this.$router.push("/back");*/


          })
            .catch(function(error) {
              alert(error)
            });

          this.timer = setTimeout(() => {
            // 动画关闭需要一定的时间
            setTimeout(() => {

              this.loading = false;
            }, 400);
          }, 2000);
        }

    },

}
</script>

<style scoped>
.font1{
  font-size: 8px;
}
</style>
