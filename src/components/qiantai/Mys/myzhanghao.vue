<template>
    <div id="myzhanghao">
          <el-col :span="24" style="margin-top: 5px">
            <div class="grid-content bg-purple-dark"><h2>我的账号</h2></div>
          </el-col>
      <el-form>
        <el-col :span="24" style="margin-top: 5px">
        <el-form-item label="用户名">
          <el-input v-model="tableData.username"></el-input>
        </el-form-item>
      </el-col>
        <el-col :span="24" style="margin-top: 5px">
        <el-form-item label="性别">
          <el-input v-model="tableData.sex"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 5px">
        <el-form-item label="电话">
          <el-input v-model="tableData.usernumber"></el-input>
        </el-form-item>
        </el-col>
        <el-button type="success" round  class="but1"  @click="xiugai()"   size="medium">修改信息</el-button>
        <el-button type="warning" round  class="but2"   size="medium">更改密码</el-button>
      </el-form>
    </div>
</template>
  <script>
    import Mimaxiugai from "./mimaxiugai";

        export default {
          components:{
            mimaxiugai:Mimaxiugai,
          },
          data() {
            return {
              tableData:[],
              yonghuname: sessionStorage.getItem('yonghuname'),
            }
          },
          methods:{
            getdata(){
              var _this = this;
              var params = new URLSearchParams();
              params.append("username",this.yonghuname);
              //alert(this.yonghuname)
              this.$axios.post("/user/queryuser.action",params).
              then(function(result) {
                 // alert("133321")
                _this.tableData = result.data;
              }).
              catch(function(error) {
                alert(error)
              });
            },
            /*修改个人信息*/
            xiugai(){
              var _this = this;
              var params = new URLSearchParams();
              params.append("username",this.yonghuname)
              params.append("sex",this.tableData.sex);
              params.append("usernumber",this.tableData.usernumber)
              this.$axios.post("/user/xiugaigeren.action", params,{
                emulateJSON:true
              }).
              then(function(result){
                if(result.data==1){
                  alert("修改成功")
                  _this.flag=false;
                }else{
                }
              }).
              catch(function(error) {
                alert(error)
              });
            },
            gaimima(){

            }

          },
          created() {
            this.getdata();
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
