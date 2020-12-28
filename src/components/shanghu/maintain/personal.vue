<template>
  <div style="background:#eff3ef;width: 100%;height: 100vh">
    <div class="card" style="float: left">
      <img :src="user.userimg" class="cardimage" @click="editpersonal1()">
      <p class="cardname" @click="editpersonal1()">{{user.shname}}</p>
      <div class="grid-container">
        <div>余额</div>
        <div>{{user.shmoney}}￥</div>
      </div>
      <ul class="social-icons"><i class="fa fa-instagram"></i></ul>
      <button @click="tx()" class="btn draw-border">
        提现
      </button>
    </div>
    <div class="safeindex-authlist clearfix" style="float: left">
      <div class="list-item" style="margin-left: 20px;margin-top: 100px;">
        <div class="list-ico sjh-ico">
        </div>
        <div class="list-tit">联系方式</div>
        <div class="list-desc">{{user.storenumber}}</div>
        <div class="list-opbtn">
          <a class="list-btn" @click="editstorenumber()">修改联系方式</a>
        </div>
      </div>
    </div>

    <div class="safeindex-authlist clearfix" style="float: left">
      <div class="list-item" style="margin-left: 20px;margin-top: 100px;">
        <div class="list-ico dlmm-ioc">
        </div>
        <div class="list-tit">登录密码</div>
        <div class="list-desc">定期更换密码有助于账号安全</div>
        <div class="list-opbtn">
          <a class="list-btn" @click="editpass()">修改登录密码</a>
        </div>
      </div>
    </div>

    <div class="safeindex-authlist clearfix" style="float: left">
      <div class="list-item" style="margin-left: 20px;margin-top: 100px;">
        <div class="list-ico smrz-ico">
        </div>
        <div class="list-tit">实名认证</div>
        <div class="list-desc">账号已实名认证</div>
        <div class="list-opbtn">
          <a class="list-btn">已实名</a>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="editpersonaldialogFormVisible" :before-close="editpersonalhandleClose">
      <div slot="title" class="dialog-title">
        <i class="el-icon-edit-outline"></i>
        <span class="title-text">信息编辑</span>
        <div class="button-right">
          <span class="title-close"></span>
        </div>
      </div>
      <editpersonal ref="editpersonalchild"></editpersonal>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editpersonaldialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="personalsave()">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="editstorenumberdialogFormVisible" :before-close="editstorenumberhandleClose">
      <div slot="title" class="dialog-title">
        <i class="el-icon-edit-outline"></i>
        <span class="title-text">修改联系方式</span>
        <div class="button-right">
          <span class="title-close"></span>
        </div>
      </div>
      <editstorenumber ref="editstorenumberchild"></editstorenumber>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editstorenumberdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="storenumbersave()">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="passdialogFormVisible" :before-close="editpasshandleClose">
      <div slot="title" class="dialog-title">
        <i class="el-icon-edit-outline"></i>
        <span class="title-text">修改登录密码</span>
        <div class="button-right">
          <span class="title-close"></span>
        </div>
      </div>
      <editpass ref="editpasschild"></editpass>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="passsave()">修改</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="shtxdialogFormVisible" :before-close="editshtxhandleClose">
      <div slot="title" class="dialog-title">
        <i class="el-icon-edit-outline"></i>
        <span class="title-text">提现</span>
        <div class="button-right">
          <span class="title-close"></span>
        </div>
      </div>
      <shtx ref="shtxchild"></shtx>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shtxdialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="qdtx()">确定提现</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Editpersonal from "./editpersonal"
  import Editstorenumber from "./editstorenumber"
  import Editpass from "./editpass"
  import Shtx from "./shtx"

  export default {
    name: "personal",
    data() {
      return {
        passdialogFormVisible:false,
        editstorenumberdialogFormVisible: false,
        editpersonaldialogFormVisible: false,
        shtxdialogFormVisible:false,
        shid: sessionStorage.getItem("shid"),
        user: []
      };
    },
    methods: {
      getdata(func) {
        var _this = this
        var params = new URLSearchParams();
        params.append("userid", this.shid)
        this.$axios.post("/user/Shanghugrwh.action", params).then(function (result) {
          _this.user = result.data
          func && func();
        }.bind(this)).catch(function (error) {
          alert(error)
        });
      },
      tx() {
        var _this = this;
        setTimeout(() => {
          this.$refs.shtxchild.shyhcard = this.user.shyhcard;
          this.$refs.shtxchild.shmoney = this.user.shmoney;
        }, 1)
        _this.shtxdialogFormVisible = true;
      },
      editpersonal1() {
        var _this = this;
        setTimeout(() => {
          this.$refs.editpersonalchild.imageUrl = this.user.userimg;
          this.$refs.editpersonalchild.shname = this.user.shname;
          this.$refs.editpersonalchild.shaddress=this.user.shaddress;
          this.$refs.editpersonalchild.storename=this.user.storename;
        }, 1)
        _this.editpersonaldialogFormVisible = true;
      },
      editpersonalhandleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      personalsave() {
        var _this = this;
        var shname = this.$refs.editpersonalchild.shname;
        var storename=this.$refs.editpersonalchild.storename;
        var shaddress=this.$refs.editpersonalchild.shaddress;
        var userimg = this.$refs.editpersonalchild.imageUrl;
        var user = new URLSearchParams();
        user.append("shname", shname);
        user.append("storename", storename);
        user.append("shaddress", shaddress);
        user.append("userimg", userimg);
        user.append("userid", this.shid)

        _this.$axios.post("user/editsh.action", user).then(function (result) {
          _this.getdata(() => {
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
          })
            .catch(function (error) {
              _this.$message({
                message: '修改失败',
                type: 'error'
              });
            })
        })
        _this.editpersonaldialogFormVisible = false;
      },
      editstorenumber() {
        var _this = this;
        setTimeout(() => {
          this.$refs.editstorenumberchild.storenumber = this.user.storenumber;
        }, 1)
        _this.editstorenumberdialogFormVisible = true;
      },
      editstorenumberhandleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      qdtx() {
        var _this = this;
        var shmoney = this.$refs.shtxchild.num;
        var user = new URLSearchParams();
        alert(this.user.shname)
        user.append("shmoney", shmoney);
        user.append("userid", this.shid)
        user.append("shname", this.user.shname)
        _this.$axios.post("user/qdtx.action", user).then(function (result) {
          _this.getdata(() => {
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
          })
            .catch(function (error) {
              _this.$message({
                message: '提现失败',
                type: 'error'
              });
            })
        })
        _this.editstorenumberdialogFormVisible = false;
      },
      storenumbersave() {
        var _this = this;
        var storenumber = this.$refs.editstorenumberchild.storenumber;
        var user = new URLSearchParams();
        user.append("storenumber", storenumber);
        user.append("userid", this.shid)

        _this.$axios.post("user/edituser1.action", user).then(function (result) {
          _this.getdata(() => {
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
          })
            .catch(function (error) {
              _this.$message({
                message: '修改失败',
                type: 'error'
              });
            })
        })
        _this.editstorenumberdialogFormVisible = false;
      },
      editpass() {
        var _this = this;
        _this.passdialogFormVisible = true;
      },
      editpasshandleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      passsave() {
        var _this = this;
        var oldpass = _this.$refs.editpasschild.oldpass;
        var newpass = _this.$refs.editpasschild.newpass;
        var newpass1 = _this.$refs.editpasschild.newpass1;
        var params = new URLSearchParams();
        params.append("username", this.user.username);
        params.append("userpass", oldpass);

        this.$axios.post("/user/login2.action",params).
        then(function(result) {
          if(result.data.code!="1"){
            alert("原密码输入有误，修改失败")
            _this.$refs.editpasschild.oldpass='';
            return;
          }else if(newpass!=newpass1){
            alert("再次输入新密码不一致")
            _this.$refs.editpasschild.newpass='';
            _this.$refs.editpasschild.newpass1='';
            return;
          }else{
            var user = new URLSearchParams();
            user.append("userpass", newpass1);
            user.append("userid", this.shid);
            user.append("username", this.user.username);
            _this.$axios.post("user/edituser1.action", user).then(function (result) {
              _this.getdata(() => {
                _this.$message({
                  message: result.data.msg,
                  type: 'success'
                });
              })
                .catch(function (error) {
                  _this.$message({
                    message: '修改失败',
                    type: 'error'
                  });
                })
            })
            _this.$refs.editpasschild.newpass='';
            _this.$refs.editpasschild.newpass1='';
            _this.$refs.editpasschild.oldpass='';
            _this.passdialogFormVisible = false;
          }
        }.bind(this)).
        catch(function(error) {
          alert(error)
        });
      },
    },
      created() {
        this.getdata()
      },
      components: {
        editpersonal: Editpersonal,
        editstorenumber: Editstorenumber,
        editpass: Editpass,
        shtx: Shtx,
      }
    }

</script>

<style scoped>
  .safeindex-authlist .smrz-ico {
    background-position: -94px -240px;
  }

  .safeindex-authlist .dlmm-ioc {
    background-position: 0 -80px;
  }

  .safeindex-authlist .list-btn {
    display: block;
    background: #fff;
    border: 1px solid #999;
    width: 198px;
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    color: #333;
    letter-spacing: -.25px;
    text-align: center;
    text-decoration: none;
  }

  .safeindex-authlist .list-desc {
    height: 18px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #999;
    letter-spacing: -.22px;
    line-height: 18px;
    text-align: center;
  }

  .safeindex-authlist .list-tit {
    margin-bottom: 17px;
    font-size: 20px;
    color: #333;
    letter-spacing: -.31px;
    text-align: left;
    text-align: center;
  }

  .safeindex-authlist .list-ico {
    width: 84px;
    height: 70px;
    margin: 0 auto 25px;
    background-repeat: no-repeat;
    background-image: url(//misc.360buyimg.com/user/myjd/safe/auth/rubik/2.0.29/css/i/auth-index-ico.png);
    overflow: hidden;
  }

  .safeindex-authlist .sjh-ico {
    background-position: 0 0;
  }

  .safeindex-authlist .list-item {
    position: relative;
    float: left;
    width: 200px;
    height: 240px;
    padding: 36px 33px 25px;
    margin: 0 21px 21px 0;
    background: #fff;
  }

  .safeindex-authlist {
    margin: 20px auto 0;
  }

  .social-icons li {
    display: inline-block;
    margin: .15em;
    position: relative;
    font-size: 1em;
  }

  .social-icons {
    padding: 0;
    list-style: none;
    margin: 1em;
  }

  .draw-border {
    box-shadow: inset 0 0 0 4px #58cdd1;
    color: #58afd1;
    -webkit-transition: color .25s .0833333333s;
    transition: color .25s .0833333333s;
    position: relative;
  }

  .btn {
    background: 0;
    border: 0;
    cursor: pointer;
    line-height: 1.5;
    font: 700 1.2rem 'Roboto Slab', sans-serif;
    padding: .75em 2em;
    letter-spacing: .05rem;
    margin: 1em;
    width: 13rem;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    font-size: 1.2em;
  }

  .cardname {
    margin-top: 15px;
    font-size: 1.5em;
  }

  .cardimage {
    height: 160px;
    width: 160px;
    border-radius: 50%;
    border: 5px solid #272133;
    margin-top: 20px;
    box-shadow: 0 10px 50px rgba(235, 25, 110, 1);
  }

  .card {
    margin-top: 50px;
    margin-left: 50px;
    height: 500px;
    width: 300px;
    background-color: #222831;
    height: 32rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.7);
    color: white;
  }

  .el-header, .el-footer {
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
