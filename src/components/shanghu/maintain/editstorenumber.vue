<template>
  <div id="app3" style="margin-top: -15px;">
    <el-form label-width="100px">
      <el-form-item label="联系方式">
        <el-input v-model="storenumber" autocomplete="off" placeholder="请输入新的联系方式"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "editstorenumber",
      data(){
          return{
              storenumber:''
          }
      }
    }
</script>

<style scoped>

</style>
