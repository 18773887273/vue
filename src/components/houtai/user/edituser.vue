<template>
  <div id="app" style="margin-top: -15px;">
    <el-form :model="edituser" label-width="100px">
      <el-form-item label="编号">
        <el-input v-model="edituser.userid" readonly="readonly" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商户名">
        <el-input v-model="edituser.shname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="edituser.sex" autocomplete="off" style="width:320px;float: left" filterable>
          <el-option v-for="item in sexs" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="edituser.storenumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="门店名">
        <el-input v-model="edituser.storename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="门店地址">
        <el-input v-model="edituser.shaddress" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="edituser.username" readonly="readonly" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      return {
        edituser: {
          userid: '',
          shname: '',
          sex: '',
          storenumber: '',
          shaddress: '',
          storename:'',
          username:''
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
