<template>
  <div>
    <div>
      提现金额<br>
      <el-input-number v-model="num" @change="handleChange" :min="0" :max=shmoney label="描述文字"></el-input-number><button style="margin-left: 10px" @click="qbu()">全部</button><br>
    </div>
    <div style="margin-top: 20px">
      <el-radio-group @change="agreeChange" v-model="radioTreaty">
        <el-radio label="1" border>{{this.shyhcard}}</el-radio>
        <el-radio label="2" border>选择新卡</el-radio>
      </el-radio-group>
    </div>
    <div style="margin-top: 20px">
      <el-input oninput="if(value.length>19)value=value.slice(0,19)"
                placeholder="请输入你的新卡号"
                v-model="input"
                :disabled="btnstatus" style="width: 300px"
                type="number" >
      </el-input>
    </div>
  </div>
</template>

<script>
  export default {
    name: "shtx",
    data(){
      return{
        shyhcard:'',
        shmoney:'',
        radioTreaty:'1',
        num:1,
        btnstatus:true,
        input:''
      }
    },methods:{
      agreeChange:function(val){
        let that = this
        that.btnstatus=(val==='1')?true:false;
      },
      qbu(){
        let that=this;
        that.num=that.shmoney
      }

    }
  }
</script>

<style scoped>

</style>
