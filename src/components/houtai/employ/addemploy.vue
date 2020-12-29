<template>
  <div id="app" style="margin-top: -15px;">
    <el-form :model="editemploy" :inline="true" class="demo-form-inline">
      <el-form-item label="姓名:">
        <el-input v-model="addemploy.empname" autocomplete="off" style="width: 200px" placeholder="请输入员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别:">
        <el-select v-model="addemploy.empsex" autocomplete="off" style="width:200px;" filterable>
          <el-option v-for="item in sexs" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名:" >
        <el-input v-model="addemploy.username" autocomplete="off" placeholder="请输入员工用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" style="width:200px;">
        <el-input v-model="addemploy.password" autocomplete="off" placeholder="请输入用户名登录密码"></el-input>
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
        },
        sexs: [
          {id: 1, name: "男"},
          {id: 0, name: "女"}
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped>

</style>
