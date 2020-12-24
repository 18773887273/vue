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
        <el-button type="warning" round  class="but2"  @click="addemploy()"  size="medium">更改密码</el-button>
      </el-form>

        <!--修改密码模态框-->
      <el-dialog :visible.sync="addemploydialogFormVisible" :before-close="addemployhandleClose">
        <div slot="title" class="dialog-title">
          <i class="el-icon-circle-plus-outline"></i>
          <span class="title-text">修改密码</span>
          <div class="button-right">
            <span class="title-close"></span>
          </div>
        </div>
        <mimaxiugai ref="addemploychild"></mimaxiugai>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quxiaogaimi()">取 消</el-button>
          <el-button type="primary" @click="gaimima()">确认</el-button>
        </div>
      </el-dialog>
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
              addemploydialogFormVisible: false,
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
            /*打开模态框*/
            addemploy() {
              //index 索引  row对象 修改该条记录对象
              this.addemploydialogFormVisible = true;
            },
            addemployhandleClose(done) {
              this.$confirm('确认关闭？')
                .then(_ => {
                  this.$refs.addemploychild.addemploy = {};
                  done();
                })
                .catch(_ => {
                });
            },
            /*取消修改密码*/
            quxiaogaimi() {
              this.addemploydialogFormVisible = false;
              this.$refs.addemploychild.addemploy = {};
            },
            /*修改密码*/
            gaimima(){
              alert(1111)
              var addemploy = this.$refs.addemploychild.addemploy;
              var _this = this;
              var employs = new URLSearchParams();
              employs.append("username", addemploy.username);
              employs.append("userpass", addemploy.passworld);
              alert(11112)
              this.$axios.post("/user/xiugaimima.action", employs).then(function (result) {
                      if(result.data==1){
                        _this.$message({
                          message:"修改成功",
                          type: 'success'
                        });
                        sessionStorage.clear();
                        _this.$router.push({path: '/back'})
                        window.location.reload();
                      }else{
                        _this.$message({
                          message: "修改失败",
                          type: 'success'
                        });
                      }

                })
                .catch(function (error) {
                  _this.$message({
                    message: '添加失败',
                    type: 'error'
                  });
                });
              this.$refs.addemploychild.addemploy = {};
              this.addemploydialogFormVisible = false;
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
