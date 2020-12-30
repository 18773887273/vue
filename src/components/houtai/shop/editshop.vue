<template>
  <div id="app" style="margin-top: -15px;">
    <el-form :model="editshop" label-width="100px">
      <el-form-item label="编号">
        <el-input v-model="editshop.shopid" autocomplete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="商品名">
        <el-input v-model="editshop.shopname" autocomplete="off" placeholder="请输入商品名称"></el-input>
      </el-form-item>

      <el-form-item label="商品类型">
        <el-select style="width: 620px;" v-model="editshop.shoptyid" filterable placeholder="请选择">
          <el-option v-for="item in shoptylist2" :key="item.shoptyid" :label="item.shoptyname" :value="item.shoptyid">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model="editshop.shopmiaoshu" type="textarea" placeholder="请输入商品描述"
                  :autosize="{ minRows: 2, maxRows: 4}"></el-input>
      </el-form-item>

      <el-form-item label="价格">
        <el-input-number v-model="editshop.shopprice" controls-position="right"
                         :step="1" :min="1" :max="1000000"
                         style="width: 620px;"></el-input-number>
      </el-form-item>

      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/fileUpload?dir=shop"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="单位">
        <el-select v-model="editshop.shopdanwei" placeholder="请选择" style="width: 620px;">
          <el-option
            v-for="item in optionsdw"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品详情图片">
        <el-upload
          class="upload-demo"
          action="http://localhost:8080/fileUpload?dir=shop"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="success"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      return {

        //------------------------------------其他自定义数据
        optionsdw: [{
          value: '斤',
          label: '斤'
        }, {
          value: 'L',
          label: 'L'
        },
          {
            value: '袋',
            label: '袋'
          }, {
            value: '包',
            label: '包'
          }, {
            value: '个',
            label: '个'
          }, {
            value: '支',
            label: '支'
          },
          {
            value: 'kg',
            label: 'kg'
          },
          {
            value: '把',
            label: '把'
          },
          {
            value: '箱',
            label: '箱'
          },
          {
            value: '只',
            label: '只'
          },
          {
            value: '罐',
            label: '罐'
          },
          {
            value: '桶',
            label: '桶'
          },
          {
            value: '条',
            label: '条'
          },
          {
            value: '瓶',
            label: '瓶'
          }
        ],
        value: '',
        editshop: {
          shopname: '',
          shoptyid: '',
          shopmiaoshu: '',
          shopdanwei: '',
          shopprice: 1,
          shopid: ''
        },
        shoptylist2: {},
        imageUrl: '',
        fileList: []
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        if (res.flag) { //成功
          this.imageUrl = "http://localhost:8080/" + res.msg;
        } else { //失败
          this.$message.error(res.msg)
        }
        console.log(res);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleRemove(file, fileList) {
        this.fileList=fileList;
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      success(res, file,fileList) {
        this.fileList=fileList;
        if (res.flag) { //成功
          file.url = "http://localhost:8080/" + res.msg
        } else { //失败
          this.$message.error(res.msg)
        }
      }
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
