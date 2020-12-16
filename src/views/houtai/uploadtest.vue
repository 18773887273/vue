<template>
  <el-form :model="addform">
    <el-form-item label="商品名" :label-width="formLabelWidth">
      <el-input v-model="addform.shopname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" :label-width="formLabelWidth">
      <el-input v-model="addform.shopprice" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品图片" :label-width="formLabelWidth">
      <input type="file" @change="getFile($event)">
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
    <div>
      <el-button >取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-form>

</template>

<script>
export default {
  name: "uploadtest",
  data(){
    return{
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      formLabelWidth: '120px',
      addform:{
        shopname:'',
        shopprice:'',
        shopimg:''
      }
    }
  },
  methods:{
    onSubmit(event) {   //添加模态框上执行添加操作 出发该方法
      var _this =this;

      //阻止元素发生默认的行为
      event.preventDefault();
      let  formData = new FormData();
      // formData.append("img",this.addform.img);
      //将需要提交的表单数据 快速组装为H5定义的类型FormData
      Object.keys(_this.addform).forEach((key) => {
        formData.append(key, _this.addform[key]);
      });
     /* formData.append("shopname",_this.addform.shopname)
      formData.append("shopprice",_this.addform.shopprice)
      formData.append("shopimg",_this.addform.shopimg)*/
      //此处使用原生的axios，因为文件提交 要设置 类型Content-Type=multipart/form-data，切记，需要post提交
      //此处axios原生类似于 jquery的 原生  $.ajax 和 $.get  $.post
      this.$axios({
        method: 'post',
        url: 'shoptype/addgoods.action',
        data:formData,
        headers: {
          'Content-Type':'multipart/form-data'
        }
      })
        .then(function (response) {
          alert(response.data.msg)
          alert('添加成功');


        })
        .catch(function (error) {
          alert("上传失败");
          console.log(error);
        });

    },
    getFile: function (event) {  //文件每次选中，触发此方法  将选中的文件内容填充到addform中的img  后台通过img获取文件内容
      this.addform.shopimg = event.target.files[0];
      console.log(this.addform.shopimg);
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
}
</script>

<style scoped>

</style>
