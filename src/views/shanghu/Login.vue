<template>

    <div>
        <el-container>
            <el-aside width="50px"></el-aside>
            <el-container>
                <el-header style="height: 30px;">
                    <div id="topmydiv" >
                        <router-link id="router1" to="/back" :style=[colors] @mouseover="a" @mouseout="b">小跳购首页</router-link>
                </div>
                </el-header>
                <el-main>
                  <div style="margin-top: 20px">
                    <div id="mylogondiv1"><h1 style=" color: white;margin:20px ">商户</h1></div>
                    <div id="logo">
                      <img id="img1" alt="logo" src="../../images/shanghu/logo.png">
                    </div>
                    <div id="mylogodivright" class="mylogoli">
                      <ul>
                        <li class="logorightlia" style="background-color: #39b6f0;color:white"><a>商户登录</a></li>
                        <li class="logorightlib" :key="1" @mouseover="c(1,'#7cc472')" @mouseout="c1" :style=[colors1]><a>招商中心</a></li>
                        <li class="logorightlic" :key="2" @mouseover="c(2,'#ff5e5e')" @mouseout="c1" :style=[colors2]><a>数据中心</a></li>
                        <li class="logorightlid" :key="3" @mouseover="c(3,'#f1ad4e')" @mouseout="c1" :style=[colors3]><a>培训中心</a></li>
                        <li class="logorightlie" :key="4" @mouseover="c(4,'#e07fd2')" @mouseout="c1" :style=[colors4]><a>帮助中心</a></li>
                      </ul>
                    </div>
                  </div>
                    <div class="block" style="float: left;margin: 20px 20px 0px 0px;width: 100%;position:relative;">
                        <span class="demonstration"></span>
                        <el-carousel height="310px" style="margin-right: 0px">
                            <el-carousel-item v-for="item in imgList" :key="item.id">
                                <img style="width: 100%;height: 100%" :src="item.url" class="image">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div id="loginmydiv" style="background: url('./src/images/shanghu/loginback.png')">
                        <div style="text-align: center;font-size: 20px;">
                            商户登录
                        </div>
                        <el-divider></el-divider>
                        <form id="loginform">
                              <div>
                                <input type="text" placeholder="账号" v-model="shname" maxlength="10" minlength="6" class="loginname"></input>
                              </div>
                              <div>
                                <input type="password" placeholder="密码" v-model="shpass" minlength="6" class="loginpass"></input>
                              </div>
                          <el-button style="margin: 20px 80px;" type="danger" round @click="shdenglu()">立即登录</el-button>
                        </form>
                    </div>
                </el-main>
                <el-footer style="margin-top: 20px">
                </el-footer>
            </el-container>
            <el-aside width="50px"></el-aside>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                shname:"",
                shpass:"",
                colors: {color: "#8e8e8e"},
                colors1:{backgroundColor:"white",color:"black"},
                colors2:{backgroundColor:"white",color:"black"},
                colors3:{backgroundColor:"white",color:"black"},
                colors4:{backgroundColor:"white",color:"black"},
                loginnametype:{},
                imgList:[
                    {
                        url:require('../../images/shanghu/zmd1.jpg') //url: '../src../src/assets/lake.jpg'
                    },
                    {
                        url:require('../../images/shanghu/zmd2.png') //url: '../src../src/assets/build.jpg'
                    },
                    {
                        url:require('../../images/shanghu/zmd3.png') //url: '../src../src/assets/road.jpg'
                    }
                ]
            }
        },
        methods: {
          shdenglu(){
            var _this = this;
            var params = new URLSearchParams();
            params.append("username", this.shname);
            params.append("userpass", this.shpass);

            this.$axios.post("/user/login2.action",params).
            then(function(result) {
              if(result.data.code=="1"){
                _this.$message({
                  message:result.data.msg,
                  type:"success"
                })
                setTimeout(function () {
                  if(result.data.code=="1") {
                    sessionStorage.setItem("shid",result.data.id)
                    sessionStorage.setItem("shname",result.data.shname)
                    _this.$router.push({path: '/shshouye'})
                    //document.getElementById("date").style.display = "none";
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
          },
            a() {
                this.colors.color = "green";
            },
            b(){
                this.colors.color = "#8e8e8e";
            },
            c(index,value){
                if(index==1){
                    this.colors1.backgroundColor=value;
                    this.colors1.color="white";
                }else if(index==2){
                    this.colors2.backgroundColor=value;
                    this.colors2.color="white";
                }else if(index==3){
                    this.colors3.backgroundColor=value;
                    this.colors3.color="white";
                }else if(index==4){
                    this.colors4.backgroundColor=value;
                    this.colors4.color="white";
                }
            },
            c1(){
                this.colors1.backgroundColor="white";
                this.colors1.color="black";
                this.colors2.backgroundColor="white";
                this.colors2.color="black";
                this.colors3.backgroundColor="white";
                this.colors3.color="black";
                this.colors4.backgroundColor="white";
                this.colors4.color="black";
            }
        }
    }
</script>
<style scoped>
  .loginpass{
    width: 202px;
    height: 35px;
    background-image: url(../../images/shanghu/login_text_mm.png);
    margin-bottom: 5px;
    border: 0px;
    padding-left: 40px;
    padding-top: 5px;
    margin-left: 20px;
    margin-top: 10px;
  }
  .loginname{
    width: 202px;
    height: 35px;
    background-image: url(../../images/shanghu/login_text_yhm_item.png);
    margin-bottom: 5px;
    border: 0px;
    padding-left: 40px;
    padding-top: 5px;
    margin-left: 20px;
    margin-top: 50px;
  }
    #loginmydiv{
        position:absolute;
        top:165px;
        right:115px;
        width:274px;
        height:290px;
        z-index:100;
        background-color: gainsboro;
        background-color:rgba(255,255,255,0.9);
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .logorightlia{
        border-bottom: 3px #39b6f0 solid;
    }
    .logorightlib{
        border-bottom: 3px #7cc472 solid;
    }
    .logorightlic{
        border-bottom: 3px #ff5e5e solid;
    }
    .logorightlid{
        border-bottom: 3px #f1ad4e solid;
    }
    .logorightlie{
        border-bottom: 3px #e07fd2 solid;
    }
    *{
        margin: 0;
        padding: 0;
    }
    #mylogodivright{
        text-align: center;
        float:right;
    }
    .mylogoli ul li {
        height: 44px;
        font-size: 20px;
        float: left;
        width: 178px;
        font-weight: bold;
        padding: 23px 0px 0px 0px;
        margin: 0px;
        text-align: center;
        list-style: none;
        cursor: pointer;
    }
    #mylogondiv1{
        background-color: green;
        width:100px;
        height: 70px;
        text-align: center;
        float:left;
    }
    #logo{
        float:left;
    }
    a{
        text-decoration: none;
    }
    #img1{
        width: 170px;
        height: 70px;
        margin-left: 0px;
    }
    .bg-purple-dark {
        height: 30px;
        background: #f4f4f4;
    }
    .el-header, .el-footer {
        background: #f4f4f4;
        color: #333;
        text-align: center;
        line-height: 30px;
    }

    .el-aside {
        background-color: white;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {;
        color: #333;
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
