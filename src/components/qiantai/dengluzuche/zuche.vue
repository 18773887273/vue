<template>
  <div id="zuche">
    <el-row class="font1">
      <el-col :span="14" offset="2">
        <h1 style="font-size: 25px">注册新用户</h1>
        <el-form :model="zhuceform" status-icon  :rules="rules" ref="zhuceform">
          <el-form-item label="用户名"  >
            <el-input placeholder="输入用户名" size="small" v-model="zhuceform.username" autocomplete="off" style="width: 285px;"></el-input>
          </el-form-item>
          <el-form-item prop="pass" style="margin-top: -20px" label="密码" >
            <el-input placeholder="输入密码"  size="small" v-model="zhuceform.userpass" autocomplete="off" style="width: 285px;"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass"  label="确认密码" >
            <el-input placeholder="确认密码" size="small" v-model="zhuceform.checkuserpass" autocomplete="off" style="width: 285px;"></el-input>
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
    /*var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };*/
    var validatePass = (rule, value, callback) => {
      if (this.zhuceform.userpass == '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.zhuceform.checkuserpass != '') {
          this.$refs.zhuceform.validateField('checkuserpass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (this.zhuceform.checkuserpass == '') {
        callback(new Error('请再次输入密码'));
      } else if (this.zhuceform.checkuserpass != this.zhuceform.userpass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {

      zhuceform: {
        username: '',
        userpass: '',
        checkuserpass: '',

      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
       /* age: [
          { validator: checkAge, trigger: 'blur' }
        ]*/
      },
      timer: null,
      loading:false,

    }
  },
  methods:{
    zhuce()
    {
      var _this = this;
      var params = new URLSearchParams();
      params.append("username", this.zhuceform.username);
      params.append("userpass", this.zhuceform.userpass);
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.$axios.post("user/adduser.action",params).then(function(result) {
            alert(result.data.msg)


          })
            .catch(function(error) {

              alert("error")
            });

          this.timer = setTimeout(() => {
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {
          alert(123)
        });
    },
  },
}
</script>

<style scoped>

</style>
