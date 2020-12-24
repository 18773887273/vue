<template>
  <div id="app" style="margin-top: -15px;">
    <el-form :model="editemploy"  label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="editemploy.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="旧密码">
        <el-input v-model="editemploy.orldpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="editemploy.passworld" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="editemploy.passworld2"  autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
    export default {
        name: "mimaxiugai",
      data() {
        return {
          editemploy: {

            username: '',
            password: ''
          },

        }
      },
      methods: {}
    }
</script>

<style scoped>

</style>
