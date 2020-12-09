<template>
  <div id="app">
    <div style="height:200px">
    <el-form ref="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userpass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          登陆
        </el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>

</template>
<script>
import MenuVue from "../components/menu";
import Userlist from "../components/userlist";
import Deptlist from "../components/deptlist";

export default {
  name: 'app',
  data () {
    return {
            username: '',
            userpass: ''
    }
    },
  /*methods: {
    denglu(){
      var _this = this;

      var params = new URLSearchParams();
      params.append("username", this.froms.username);
      params.append("password", this.froms.userpass);

      this.$axios.post("/login.action",params).
      then(function(result) {

      }).
      catch(function(error) {
        alert(error)
      });
    }
  },*/
  components:{
    menuvue:MenuVue,
    userlist:Userlist,
    deptlist:Deptlist
  },
  }
</script>

<style>

</style>
