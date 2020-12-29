<template>
    <div id="myzhanghao">
          <el-col :span="24" style="margin-top: 5px">
            <div class="grid-content bg-purple-dark"><h2>我的账号</h2></div>
          </el-col>
      <el-form>
        <el-col :span="24" style="margin-top: 5px">
        <el-form-item label="用户名"><br/>
          <el-input v-model="tableData.username" readonly="readonly"></el-input>
        </el-form-item>
      </el-col>
        <el-col :span="24" style="margin-top: 5px">
          <el-form-item label="性别">
          <el-select v-model="tableData.sex" style="width: 100%">
            <el-option v-for="item in sexs" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 5px">
        <el-form-item label="电话">
          <el-input v-model="tableData.usernumber"></el-input>
        </el-form-item>
        </el-col>
        <el-button type="success" round  class="but1"  @click="xiugai()"   size="medium">修改信息</el-button>
        <el-button type="warning" round  class="but2"  @click="addemploys"  size="medium">更改密码</el-button>
      </el-form>

        <!--修改密码模态框-->
      <el-dialog :visible.sync="addemploydialogFormVisible" :before-close="addemployhandleClose">
        <div slot="title" class="dialog-title">
          <span class="title-text">修改密码</span>
          <div class="button-right">
            <span class="title-close"></span>
          </div>
        </div>
        <el-form :model="addemploy"  label-width="100px" :rules="rules" status-icon  ref="addemploy" @submit.native.prevent>
          <el-form-item label="旧密码" prop="orldpass">
            <el-input v-model="addemploy.orldpass" autocomplete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="passworld">
            <el-input v-model="addemploy.passworld" autocomplete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passworld2">
            <el-input v-model="addemploy.passworld2"  autocomplete="off" type="password"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quxiaogaimi()">取 消</el-button>
          <el-button type="primary" @click="gaimima">确认</el-button>
        </div>
      </el-dialog>
    </div>
</template>
  <script>

        export default {

          data() {
            var validatePass2 = (rule, value, callback) => {
              if (value === '') {
                this.flag=false
                callback(new Error('请再次输入密码'))
              } else if (value !== this.addemploy.passworld) {
                this.flag=false
                callback(new Error('两次输入密码不一致!'))
              } else {
                this.flag=true
                callback()
              }
            }
            var orldpasssss = (rule, value, callback) => {
              if (value === '') {
                this.falf=false
                callback(new Error('请输入老密码'))
              } else if (value !== this.yonghupass) {
                this.falf=false
                callback(new Error('原密码不正确'))
              } else {
                this.falf=true
                callback()
              }
            }


            return {
              addemploydialogFormVisible: false,
              tableData:[],
              yonghuname: sessionStorage.getItem('yonghuname'),
              yonghupass:sessionStorage.getItem('yonghupass'),
              sexs: [
                {id: 1, name: "男"},
                {id: 0, name: "女"}
              ],
              addemploy:{
                orldpass:"",
                passworld:"",
                passworld2:""
              },
              flag:false,
              falf:false,
              rules: {
                orldpass: [
                  { required: true, validator: orldpasssss, trigger: 'blur' }
                ],
                passworld: [
                  { required: true, message: '请输入密码', trigger: 'blur' },
                  { pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,30}$/,
                    message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种，' +
                      '长度为 8 - 30位'}
                ],
                passworld2: [
                  { required: true, validator: validatePass2, trigger: 'blur' }
                ]
              }

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
                params.append("username", this.yonghuname)
                params.append("sex", this.tableData.sex);
                params.append("usernumber", this.tableData.usernumber)
                this.$axios.post("/user/xiugaigeren.action", params, {
                  emulateJSON: true
                }).then(function (result) {
                  if (result.data == 1) {
                    alert("修改成功")
                    _this.flag = false;
                  } else {
                  }
                }).catch(function (error) {
                  alert(error)
                });

            },
            /*打开模态框*/
            addemploys() {
              //index 索引  row对象 修改该条记录对象
              this.addemploydialogFormVisible = true;
            },
            addemployhandleClose(done) {
              this.$confirm('确认关闭？')
                .then(_ => {
                  this.addemploy = {};
                  done();
                })
                .catch(_ => {
                });
            },
            /*取消修改密码*/
            quxiaogaimi() {
              this.addemploydialogFormVisible = false;
              this.addemploy = {};
            },
            /*修改密码*/
            gaimima(){

              //alert(1111)
              var _this = this;
          if(this.flag && this.falf) {
            var employs = new URLSearchParams();
            employs.append("username", this.yonghuname);
            employs.append("userpass", this.addemploy.passworld);
            //alert(11112)
            this.$axios.post("/user/xiugaimima.action", employs).then(function (result) {
              if (result.data == 1) {
                _this.$message({
                  message: "修改成功",
                  type: 'success'
                });
                sessionStorage.clear();
                _this.$router.push({path: '/back'})
                window.location.reload();
              } else {
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
          }else{
            alert("请提交正确信息")
          }
            },


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
    margin-top: -200px;
  }
</style>
