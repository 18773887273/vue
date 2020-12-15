<template>
  <div id="app" style="margin-top: -15px;">
    <el-form :model="editemploy" label-width="100px">
      <el-form-item label="编号">
        <el-input v-model="editemploy.empid" readonly="readonly" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="editemploy.empname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="editemploy.empsex" autocomplete="off" style="width:620px;" filterable>
          <el-option v-for="item in sexs" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="editemploy.empnumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="editemploy.empaddress" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="editemploy.empcard" readonly="readonly" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="editemploy.username" readonly="readonly" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入员工备注信息"
          v-model="editemploy.empremark">
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
        editemploy: {
          empid: '',
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
