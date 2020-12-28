<template>
  <div id="app2" style="margin-top: -15px;">
    <el-form label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="shname" autocomplete="off" placeholder="请输入商户名"></el-input>
      </el-form-item>

      <el-form-item label="门店名">
        <el-input v-model="storename" autocomplete="off" placeholder="请输入门店名"></el-input>
      </el-form-item>

      <el-form-item label="门店地址">
        <el-input v-model="shaddress" autocomplete="off" placeholder="请输入门店地址"></el-input>
      </el-form-item>

      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/fileUpload?dir=shop"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" style="height: 250px;width: 250px">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "editpersonal",
      data(){
          return{
            shname: '',
            storename:'',
            shaddress:'',
            imageUrl: ''
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
        }
      },
      created() { //钩子函数  vue对象初始化完成后  执行

      },
    }
</script>

<style scoped>

</style>
