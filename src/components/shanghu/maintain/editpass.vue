<template>
  <div id="app3" style="margin-top: -15px;">
    <el-form label-width="100px">
      <el-form-item label="旧密码">
        <el-input v-model="oldpass" type="password" autocomplete="off" placeholder="请输入您原先的密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="newpass" type="password" autocomplete="off" placeholder="请输入新的密码"></el-input>
      </el-form-item>
      <el-form-item label="请再次确认">
        <el-input v-model="newpass1" type="password" autocomplete="off" placeholder="请再次输入"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "editpass",
      data(){
          return{
            oldpass:'',
            newpass:'',
            newpass1:''
          }
      }
    }
</script>

<style scoped>

</style>
