<template>
  <div id="app" style="margin-top: -15px;">
    <el-form :model="addshop" label-width="100px">
      <el-form-item label="商品名">
        <el-input style="width: 218px" v-model="addshop.shopname" autocomplete="off" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品类型">
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.shoptyid"
            :label="item.shoptyname"
            :value="item.shoptyid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input style="width: 218px" v-model="addshop.shopmiaoshu"  placeholder="请输入商品描述"></el-input>
      </el-form-item>

      <el-form-item label="价格">
        <el-input-number style="width: 218px" v-model="addshop.shopprice" controls-position="right" @change="handleChange" :step="1" :min="1" :max="1000000"></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品详情图片">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="单位">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in optionsdw"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      options: [],
      optionsdw: [{
        value: '选项1',
        label: '斤'
      }, {
        value: '选项2',
        label: '克'
      }],
      value: '',
      addshop: {
        shopname: '',
        shoptyid: '',
        shopmiaoshu:'',
        shopprice:1,
      },

    }
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
      }).catch(function (error) {
        alert(error)
      });
    },

  },
  created() { //钩子函数  vue对象初始化完成后  执行
    this.getData();
  },
}
</script>

<style>

</style>
