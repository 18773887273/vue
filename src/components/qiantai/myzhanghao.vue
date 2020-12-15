<template>
    <div id="myzhanghao">
          <el-col :span="24" style="margin-top: 5px">
            <div class="grid-content bg-purple-dark"><h2>我的账号</h2></div>
          </el-col>
      <el-form :label-position="top" :model="formLabelAlign">
        <el-col :span="24" style="margin-top: 5px">
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
      </el-col>
        <el-col :span="24" style="margin-top: 5px">
        <el-form-item label="性别">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 5px">
        <el-form-item label="电话">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
        </el-col>
        <el-button type="success" round  class="but1"   size="medium">修改信息</el-button>
        <el-button type="warning" round  class="but2"    size="medium">更改密码</el-button>
      </el-form>
    </div>
</template>
  <script>
        export default {
          data() {
            return {
              formLabelAlign: {
                name: '',
                region: '',
                type: ''
              }
            }
          }
        }
</script>

<style scoped>
.bg-purple-dark{
  background-color: white;
}
.but1{
  margin-left: 20px;
}
  .but2{
    margin-left: 650px;
  }
</style>
