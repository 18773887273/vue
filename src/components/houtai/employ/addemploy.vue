<template>
  <div id="app" style="margin-top: -15px;">
    <el-form :model="editemploy" label-width="100px">
      <el-form-item label="姓名:">
        <el-input v-model="addemploy.empname" autocomplete="off" placeholder="请输入员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别:">
        <el-select style="width:620px;" v-model="addemploy.empsex" filterable>
          <el-option :label="男" :value="1" :key="1"></el-option>
          <el-option :label="女" :value="0" :key="0" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model="addemploy.empnumber" autocomplete="off" placeholder="请输入员工手机号"></el-input>
      </el-form-item>
      <el-form-item label="地址:">
        <el-input v-model="addemploy.empaddress" autocomplete="off" placeholder="请输入员工地址"></el-input>
      </el-form-item>
      <el-form-item label="身份证:">
        <el-input v-model="addemploy.empcard" autocomplete="off" placeholder="请输入员工身份证号码"></el-input>
      </el-form-item>
      <el-form-item label="用户名:">
        <el-input v-model="addemploy.username" autocomplete="off" placeholder="请输入员工用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="addemploy.password" autocomplete="off" placeholder="请输入用户名登录密码"></el-input>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入员工备注信息"
          v-model="addemploy.empremark">
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      return {
        addemploy: {
          empname: '',
          empsex: '',
          empnumber: '',
          empaddress: '',
          empcard: '',
          empremark: '',
          username: '',
          password: ''
        }
      }
    },
    methods: {}
  }
</script>

<style scoped>

</style>
