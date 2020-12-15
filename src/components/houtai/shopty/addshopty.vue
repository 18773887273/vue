<template>
  <div id="app" style="">
    <el-form :model="addshoptype" status-icon :rules="rules" ref="addshoptype" label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="类型名" prop="shoptyname">
        <el-input v-model.number="addshoptype.shoptyname"  placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="商品类型描述" prop="shoptymiaoshu">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="addshoptype.shoptymiaoshu"
          maxlength="30"
          show-word-limit
        >
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'app',
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
      addshoptype: {
        shoptyname: '',
        shoptymiaoshu: '',

      },
      rules: {
        shoptyname: [
          {validator: checkName, trigger: 'blur'}
        ],

      }
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
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

  },
  watch: {},
  created() { //钩子函数  vue对象初始化完成后  执行

  },
}
</script>

<style>

</style>
