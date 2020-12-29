<template>
  <div id="zuche">
    <el-row class="font1">
      <el-col :span="14" :offset="2">
        <h1 style="font-size: 25px">注册新用户</h1>
        <el-form :model="zhuceform" status-icon  :rules="rules" ref="zhuceform" @submit.native.prevent>
          <el-form-item label="用户名"  prop="username">
            <el-input type="text" placeholder="输入用户名" size="small" v-model="zhuceform.username" autocomplete="off" style="width: 285px;"></el-input>
          </el-form-item>
          <el-form-item prop="pass" style="margin-top: -20px" label="密码" >
            <el-input type="password" placeholder="输入密码"  size="small" v-model="zhuceform.userpass" autocomplete="off" style="width: 285px;"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass"  label="确认密码" >
            <el-input type="password" placeholder="确认密码" size="small" v-model="zhuceform.checkuserpass" autocomplete="off" style="width: 285px;"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="zhuce" :loading="loading" style="width: 285px;">{{ loading ? '提交中 ...' : '注 册' }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

  name: "zuche",
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.zhuceform.userpass == '') {
        this.flag = false;
        callback(new Error('请输入密码'));
      } else {
        if (this.zhuceform.checkuserpass != '') {
          this.flag = false;
          this.$refs.zhuceform.validateField('checkuserpass');
        }
        callback();
      }
      if (this.zhuceform.userpass != ''){
        this.flag = true;
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (this.zhuceform.checkuserpass == '') {
        this.flag = false;
        callback(new Error('请再次输入密码'));
      } else if (this.zhuceform.checkuserpass != this.zhuceform.userpass) {
        this.flag = false;
        callback(new Error('两次输入密码不一致!'));
      } else {
        this.flag = true;
        callback();
      }
    };
    return {
      flag:false,
      checkname:'',
      zhuceform: {
        username: '',
        userpass: '',
        checkuserpass: '',

      },
      rules: {
        username: [{
          required: true, //是否必填
          message: '名称不能为空', //规则提示
          trigger: 'blur' //何事件触发
        },
          //可以设置多重验证标准
          {
            min: 2,
            max: 8,
            message: '长度在 2 到 8 个字符'
          },
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      timer: null,
      loading:false,

    }
  },
  methods:{
    getdate(){
      var _this = this;

      var params = new URLSearchParams();
      params.append("username", this.zhuceform.username)

      this.$axios.post("user/querylike.action", params).then(function (result) {
       _this.checkname = result.data.rows[0].username;
      }).catch(function (error) {

      });
    },
    zhuce()
    {
      var _this = this;
      _this.getdate();
      var params = new URLSearchParams();
      params.append("username", this.zhuceform.username);
      params.append("userpass", this.zhuceform.userpass);
      if (this.loading) {
        return;
      }
      if (this.flag){
        this.$confirm('确定注册吗？')
          .then(_ => {
            this.loading = true;
            if (_this.checkname == _this.zhuceform.username){
              this.$message({
                message: '用户名重复',
                type: 'warning'
              });
              this.loading = false;
              return
            }else {
              this.$axios.post("user/adduser.action",params).then(function(result) {
                _this.$message({
                  message: result.data.msg,
                  type: 'success'
                });
              _this.$emit("propvalue",'denglu');

            })
              .catch(function(error) {

                alert(error)
              });
            }



            this.timer = setTimeout(() => {
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
          })
          .catch(_ => {
            alert(123)
            this.loading = false;
          });
      }else {
        alert("请填写正确信息")
      }

    },
  },
}
</script>

<style scoped>

</style>
