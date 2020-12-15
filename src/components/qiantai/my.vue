<template>

  <div id="my">

    <el-row :gutter="24">

      <el-col :span="6" style="margin-left: 100px">
        <div class="grid-content bg-purple"  >
          <div class="block"><el-avatar :size="120" :src="12" style="margin-top: 25px"></el-avatar></div>
          <el-divider></el-divider>
          <div>
          <div class="icons"><i class="el-icon-user" style="font-size: 30px"></i>
            <label>我的账户</label>

          </div>

          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple" >

        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
    export default {
        name: "my"
    }
</script>

<style scoped>
.bg-purple{
  background-color: white;

}
.block{
  text-align: center;
}
  /*.icons{
    font-size: 50px;
  }*/
</style>
