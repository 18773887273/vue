<template>
  <div id="shangjiashen">
    <!--未认证-->
    <div v-if="!flag">
    <el-col :span="24" style="margin-top: 5px">
      <div class="grid-content bg-purple-dark"><h2>商家认证</h2></div>
    </el-col>
    <el-form>
      <el-col :span="12" style="margin-top: 5px">
        <el-form-item label="姓名">
          <el-input v-model="tableData.names" readonly="readonly"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="margin-top: 5px">
        <el-form-item label="身份证号码">
          <el-input v-model="tableData.userID" readonly="readonly"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="margin-top: 5px">
        <el-form-item label="门店名">
          <el-input v-model="tableData.storename"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="margin-top: 5px">
        <el-form-item label="门店联系方式">
          <el-input v-model="tableData.storenumber"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24" style="margin-top: 5px">
        <el-form-item label="门店地址">
          <el-input v-model="tableData.shaddress"></el-input>
        </el-form-item>
      </el-col>
      <el-button type="success" round  class="but1"  @click="shenqing()"   size="medium">确认申请</el-button>
    </el-form>
    </div>
    <!--审核中-->
    <div v-if="flag">
      <el-col :span="24" style="margin-top: 5px">
        <div class="grid-content bg-purple-dark"><h2>商家认证</h2></div>
      </el-col>
      <el-form>
        <el-col :span="12" style="margin-top: 5px">
          <el-form-item label="姓名">
            <el-input v-model="tableData.names" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="margin-top: 5px">
          <el-form-item label="身份证号码">
            <el-input v-model="tableData.userID" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="margin-top: 5px">
          <el-form-item label="门店名">
            <el-input v-model="tableData.storename"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="margin-top: 5px">
          <el-form-item label="门店联系方式">
            <el-input v-model="tableData.storenumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 5px">
          <el-form-item label="门店地址">
            <el-input v-model="tableData.shaddress"></el-input>
          </el-form-item>
        </el-col>
        <el-button type="success" round  class="but1" size="medium"  isabled>申请中</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "shangjiashen",
      data() {
        return {
          addemploydialogFormVisible: false,
          tableData:{
            names:"",
            userID:"",
            storename:'',
            storenumber:'',
            shaddress:''
          },
          yonghuname: sessionStorage.getItem('yonghuname'),
          flag:false

        }
      },
      methods: {
        getdata() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("username", this.yonghuname);
          this.$axios.post("/user/queryuser.action", params, {
            emulateJSON: true
          }).then(function (result) {
           // alert(result.data.shname)
            //alert(result.data.useard)
            if(result.data.shstate==2){
              //alert(111)
             // alert(result.data.usercard)
              _this.tableData.names = result.data.shname
              _this.tableData.userID = result.data.usercard.usercard
              _this.tableData.storename = result.data.storename
              _this.tableData.storenumber = result.data.storenumber
              _this.tableData.shaddress = result.data.shaddress
              _this.flag=true
            }else{
              //alert(2222)
              alert(result.data.usercard)
              _this.tableData.names = result.data.shname
              _this.tableData.userID = result.data.usercard
              _this.tableData.storename = result.data.storename
              _this.tableData.storenumber = result.data.storenumber
              _this.tableData.shaddress = result.data.shaddress

            }

          }).catch(function (error) {
            alert(error)
  });
        },
        shenqing(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("username", this.yonghuname);
          params.append("shname",this.tableData.names)
          params.append("usercard",this.tableData.userID)
          params.append("storename",this.tableData.storename)
          params.append("storenumber",this.tableData.storenumber)
          params.append("shaddress",this.tableData.shaddress)
          this.$axios.post("/user/shengqingsh.action", params, {
            emulateJSON: true
          }).then(function (result) {
            // alert(result.data.shname)
            //alert(result.data.usercard)
            if(result.data.code=="1"){
              _this.$message({
                showClose: true,
                message: '申请成功，待管理员审核！！'
              });
            }else{
              _this.$message({
                showClose: true,
                message: '申请失败！！'
              });
            }
          }).catch(function (error) {
            alert(error)
          });
        },
/*/*********************************************************************************************************************/
        // 身份证验证
        isCardID (rule, value, callback) {
          console.log(value)
          if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
            callback(new Error('你输入的身份证长度或格式错误'))
          }
          //身份证城市
          var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
          if (!aCity[parseInt(value.substr(0, 2))]) {
            callback(new Error('你的身份证地区非法'))
          }

          // 出生日期验证
          var sBirthday = (value.substr(6, 4) + "-" + Number(value.substr(10, 2)) + "-" + Number(value.substr(12, 2))).replace(/-/g, "/"),
            d = new Date(sBirthday)
          if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
            callback(new Error('身份证上的出生日期非法'))
          }

          // 身份证号码校验
          var sum = 0,
            weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
            codes = "10X98765432"
          for (var i = 0; i < value.length - 1; i++) {
            sum += value[i] * weights[i];
          }
          var last = codes[sum % 11]; //计算出来的最后一位身份证号码
          if (value[value.length - 1] != last) {
            callback(new Error('你输入的身份证号非法'))
          }

          callback()
        }
        /****************************************************************************************/

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
