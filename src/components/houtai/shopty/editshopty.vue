<template>
  <div id="editshoptyapp" style="margin-top: -15px;">
    <el-form :model="editshopty"  status-icon :rules="rules" ref="editshopty" label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="编号" >
        <el-input v-model="editshopty.shoptyid" readonly="readonly" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型名" prop="shoptyname">
        <el-input v-model.number="editshopty.shoptyname"  autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="editshopty.shopremart" autocomplete="off" placeholder="备注"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'editshoptyapp',
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('类型名不能为空'));
      }
      setTimeout(() => {
        this.getData();
        if (this.kilometers == value) {
          callback(new Error('类型已存在'));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      kilometers: '',
      editshopty: {
        shoptyid: '',
        shoptyname: '',
        shopremart: ''
      },
      rules: {
        shoptyname: [
          {validator: checkName, trigger: 'blur'}
        ],

      }
    }
  },
  methods: {
    getData() { //获取数据方法
      var _this = this;
      var params = new URLSearchParams();
      this.$axios.post("shoptype/querylike.action", params).then(function (result) {
        _this.options = result.data;
        _this.kilometers = result.data.rows[0].shoptyname;
      }).catch(function (error) {
        alert(error)
      });
    },
  }
}
</script>
