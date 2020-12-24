<template>
  <div id="shiming">
    <div v-if="flag">
      <el-col :span="24" style="margin-top: 5px">
      <div class="grid-content bg-purple-dark"><h2>实名认证</h2></div>
    </el-col>
      <el-form :label-position="top">
        <el-col :span="24" style="margin-top: 5px">
          <el-form-item label="姓名">
            <el-input v-model="names"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 5px">
          <el-form-item label="身份证号码">
            <el-input v-model="userID"></el-input>
          </el-form-item>
        </el-col>
        <el-button type="warning" round  class="but2"    size="medium" @click="shiming()">确认认证</el-button>
      </el-form>
    </div>
    <div v-if="!flag">
  <el-col :span="24" style="margin-top: 5px">
    <div class="grid-content bg-purple-dark"><h2>实名认证</h2></div>
  </el-col>
  <el-form :label-position="top">
    <el-col :span="24" style="margin-top: 5px">
      <el-form-item label="姓名" >
        <el-input v-model="names" readonly="readonly"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24" style="margin-top: 5px">
      <el-form-item label="身份证号码">
        <el-input v-model="userID" readonly="readonly"></el-input>
      </el-form-item>
    </el-col>
    <el-button type="warning" round  class="but2"    size="medium">已经认证</el-button>
  </el-form>
    </div>
  </div>

</template>

<script>
    export default {
        name: "shiming",
      data() {
        return {
          yonghuname: sessionStorage.getItem('yonghuname'),
          names:"",
          userID:"",
          flag:true
        }
      },
      methods:{
        shiming(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("username",this.yonghuname)
          params.append("shname",this.names);
          params.append("usercard",this.userID)
          this.$axios.post("/user/updatayonghu.action", params,{
            emulateJSON:true
          }).
          then(function(result){
            if(result.data==1){
               alert("实名成功")
              _this.flag=false;
            }else{
            }
          }).
          catch(function(error) {
            alert(error)
          });
        },
        yesno(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("username",this.yonghuname);
          this.$axios.post("/user/queryuser.action", params,{
            emulateJSON:true
          }).
          then(function(result) {
            if(result.data.usercard==null){
              _this.flag=true

            }else{
              _this.names=result.data.shname
              _this.userID=result.data.usercard
              _this.flag=false
            }
          }).
          catch(function(error) {
            alert(error)
          });
        }

      },created() {
          this.yesno()
      }

    }
</script>

<style scoped>
  .bg-purple-dark{
    background-color: white;
  }
  .but1{
    margin-left: 20px;
  }
  .but2{
    margin-left: 650px;
  }
</style>
