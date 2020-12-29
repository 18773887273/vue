<template>
  <div id="app" style="margin-top: -15px;">
    <el-form :model="addemploy"  label-width="100px">
      <el-form-item label="旧密码">
        <el-input v-model="addemploy.orldpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="addemploy.passworld" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="addemploy.passworld2"  autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
    export default {
        name: "mimaxiugai",
      data() {
        return {
          addemploy: {

            username: '',
            orldpass:'',
            passworld: '',
            passworld2:""
          },

        }
      },
      methods: {}
    }
</script>

<style scoped>

</style>
