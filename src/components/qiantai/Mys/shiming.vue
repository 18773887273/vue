<template>
  <div id="shiming">
    <div v-if="flag">
      <el-col :span="24" style="margin-top: 5px">
      <div class="grid-content bg-purple-dark"><h2>实名认证</h2></div>
    </el-col>
      <el-form :rules="rules"  :model="yonghu" status-icon ref="yonghu" @submit.native.prevent>
        <el-col :span="24" style="margin-top: 5px">
          <el-form-item label="姓名" prop="names">
            <el-input v-model="yonghu.names"  autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 5px" >
          <el-form-item label="身份证号码" prop="userID">
            <el-input v-model="yonghu.userID" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-button type="warning" round  class="but2"    size="medium" @click="shiming()">确认认证</el-button>
      </el-form>
    </div>
    <div v-if="!flag">
  <el-col :span="24" style="margin-top: 5px">
    <div class="grid-content bg-purple-dark"><h2>实名认证</h2></div>
  </el-col>
  <el-form :model="yonghu">
    <el-col :span="24" style="margin-top: 5px">
      <el-form-item label="姓名" >
        <el-input v-model="yonghu.names" readonly="readonly"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24" style="margin-top: 5px">
      <el-form-item label="身份证号码">
        <el-input v-model="yonghu.userID" readonly="readonly"></el-input>
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

        var isCardID =(rule, value, callback)=> {
          // 身份证号码校验
          var sum = 0,
            weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
            codes = "10X98765432"
         for (var i = 0; i < value.length - 1; i++) {
            sum += value[i] * weights[i];
          }
          var last = codes[sum % 11]; //计算出来的最后一位身份证号码
          // 身份证验证
          // 出生日期验证
          var sBirthday = (value.substr(6, 4) + "-" + Number(value.substr(10, 2)) + "-" + Number(value.substr(12, 2))).replace(/-/g, "/"),
            d = new Date(sBirthday)
          //身份证城市
          var aCity = {
            11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
            if (value ==="") {
              this.falf=false
              callback(new Error('请输入身份证号码'))
            } else if (!/(^\d{18}$)|(^\d{16}(\d|X|x)$)/.test(value)) {
            callback(new Error('你输入的身份证长度或格式错误'))
            }

          else if (!aCity[parseInt(value.substr(0, 2))]) {
            callback(new Error('你的身份证地区非法'))
          }
         else if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
            callback(new Error('身份证上的出生日期非法'))
          }


         else if (value[value.length - 1] != last) {
            callback(new Error('你输入的身份证号非法'))
          }else {
              this.falf = true
              callback()
            }
        }

        var xingmingss =(rule, value, callback)=> {
          //alert(value)
          var pan=/^([\u4e00-\u9fa5]{2,20}|[a-zA-Z\.\s]{2,20})$/
          if (value ==="") {
            this.xflag=false
            callback(new Error('请输入用户名'))
          } else if (!pan.test(value)) {
            this.xflag=false
            callback(new Error('姓名输入有误'))
          } else {
            this.xflag=true
            callback()
          }
        }
          return {
          yonghuname: sessionStorage.getItem('yonghuname'),
            yonghu: {
              names: "",
              userID: "",
            },
            /*name和ID的验证状态*/
              xflag:false,
              falf:false,
               /*显示*/
            flag:true,
            rules: {
              userID: [
                { required: true, validator:isCardID , trigger: 'blur' }
              ],
              names:[
                { required: true, validator:xingmingss , trigger: 'blur' }
              ]
            },
            houtaiid:[],
        }
      },
      methods:{
        shiming(){
          var _this = this;
          if(this.falf&&this.xflag) {

            var paramss = new URLSearchParams();
           // alert(this.yonghu.names)
            paramss.append("shname", this.yonghu.names);
            this.$axios.post("/user/getnamesfh.action", paramss, {
              emulateJSON: true
            }).then(function (result) {
             // alert(result.data)
             // alert(result.data.length)
              _this.houtaiid = result.data
            //  alert(_this.houtaiid)


             // alert(_this.houtaiid.length)
              if (_this.houtaiid.length == 0) {
                var params = new URLSearchParams();
                params.append("username", _this.yonghuname)
                params.append("shname", _this.yonghu.names);
                params.append("usercard", _this.yonghu.userID)
                _this.$axios.post("/user/updatayonghu.action", params, {
                  emulateJSON: true
                }).then(function (result) {
                  if (result.data == 1) {
                    alert("实名成功")
                    _this.flag = false;
                  } else {
                  }
                }).catch(function (error) {
                  alert(error)
                });
              } else {
                for (var i = 0; i < _this.houtaiid.length; i++) {
                  //alert(_this.houtaiid)
                  if (_this.yonghu.userID == _this.houtaiid) {
                    alert("实名信息已存在")
                    _this.yonghu.userID = ""
                  } else {
                    //alert(_this.yonghu.names)
                    var params = new URLSearchParams();
                    params.append("username", _this.yonghuname);
                    params.append("shname", _this.yonghu.names);
                    params.append("usercard", _this.yonghu.userID)
                    _this.$axios.post("/user/updatayonghu.action", params, {
                      emulateJSON: true
                    }).then(function (result) {
                      if (result.data == 1) {
                        alert("实名成功")
                        _this.flag = false;
                      } else {
                      }
                    }).catch(function (error) {
                      alert(error)
                    });
                  }
                  return
                }
              }
            }).catch(function (error) {
              alert(error)
            });
          }else{
            alert("请提交正确信息")
          }

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
              _this.yonghu.names=result.data.shname
              _this.yonghu.userID=result.data.usercard
              _this.flag=false
            }
          }).
          catch(function(error) {
            alert(error)
          });
        },

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
