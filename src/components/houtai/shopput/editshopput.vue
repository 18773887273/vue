<template>
  <div id="app" style="margin-top: -15px;">
    <el-form :model="editshopput" label-width="100px">
      <el-form-item label="编号">
        <el-input v-model="editshopput.shopputid" autocomplete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="商品名">
        <el-input v-model="editshopput.shopid.shopname" autocomplete="off" readonly placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品上架价格">
        <el-input-number v-model="editshopput.shopputprice" controls-position="right" :precision="2"
                         :step="1" :min="1" :max="1000000"
                         style="width: 620px;"></el-input-number>
      </el-form-item>
      <el-form-item label="商品折扣">
        <el-input-number v-model="editshopput.shopzhe" controls-position="right"
                         :step="1" :min="1" :max="10" :precision="0"
                         style="width: 620px;"></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      return {
        value: '',
        editshopput: {
          shopputid:'',
          shopid:{},
          shopputprice: 1,
          shopzhe: ''
        },
      }
    },
    methods: {
    },
    created() { //钩子函数  vue对象初始化完成后  执行

    },
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
