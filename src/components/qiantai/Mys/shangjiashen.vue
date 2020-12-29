<template>
  <div id="shangjiashen">
    <!--未认证-->
    <div v-if="wflag">
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
            <el-input v-model="tableData.storename"  readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="margin-top: 5px">
          <el-form-item label="门店联系方式">
            <el-input v-model="tableData.storenumber"  readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 5px">
          <el-form-item label="门店地址">
            <el-input v-model="tableData.shaddress"  readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-button type="success" round  class="but1" size="medium"  isabled>申请中</el-button>
      </el-form>
    </div>


    <!--申请成功-->
    <div v-if="xflag">
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
            <el-input v-model="tableData.storename"  readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="margin-top: 5px">
          <el-form-item label="门店联系方式">
            <el-input v-model="tableData.storenumber"  readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 5px">
          <el-form-item label="门店地址">
            <el-input v-model="tableData.shaddress"  readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-button type="success" round  class="but1" size="medium"  isabled>申请成功</el-button>
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
          /*未申请中*/
          wflag:true,
          /*申请中*/
          flag:false,
          /*申请成功*/
          xflag:false
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
            alert(result.data.shstate)
            if(result.data.shstate===2){
              //alert(111)
             // alert(result.data.usercard)
              _this.tableData.names = result.data.shname
              _this.tableData.userID = result.data.usercard
              _this.tableData.storename = result.data.storename
              _this.tableData.storenumber = result.data.storenumber
              _this.tableData.shaddress = result.data.shaddress
              _this.flag=true
              _this.wflag=false
              _this.xflag=false
            }else if(result.data.shstate===3) {
              _this.tableData.names = result.data.shname
              _this.tableData.userID = result.data.usercard
              _this.tableData.storename = result.data.storename
              _this.tableData.storenumber = result.data.storenumber
              _this.tableData.shaddress = result.data.shaddress
              _this.flag=false
              _this.wflag=false
              _this.xflag=true
            }else {
              //alert(2222)
              //alert(result.data.usercard)
              _this.tableData.names =result.data.shname
              _this.tableData.userID =result.data.usercard
              _this.tableData.storename = result.data.storename
              _this.tableData.storenumber =result.data.storenumber
              _this.tableData.shaddress =result.data.shaddress
              _this.flag=false
              _this.width=true
              _this.xflag=false

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
              _this.flag=true
              _this.width=false
              _this.xflag=false
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
