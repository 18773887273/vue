<template>
  <div>
  <div v-for="item of items" :key="item">
    <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;margin-bottom: 20px">
      <div>
        <img
          style="width: 230px; height: 155px;margin-top: 20px;"
          :src="$host + item.shopid.shopimg"
        >
        </img>
        <br>
        {{ item.shopid.shopname }}<br><br>
        <a  style="color: red;font-size: 22px;">￥ {{ item.shopputprice }} /{{ item.shopid.shopdanwei }}</a>
        <del  style="color: #999999;font-size: 14px;">￥ {{ item.shopputprice }} /{{ item.shopid.shopdanwei }}</del>
        <br> <br>
      </div>
    </el-col>
  </div>
  </div>
</template>

<script>
export default {
  name: "shouyedistilled",
  data(){
    return{
      items:[],
      imagesrc:'../../../images/shop/',
    }
  },
  methods:{
    getData(func) { //获取数据方法
      var _this = this;
      this.$axios.post("shopput/querydistilled.action").then(function (result) {
        _this.items = result.data;

        func && func();
      }).catch(function (error) {
        alert(error)
      });
    },

  },
  created: function () {
    this.getData();
  }

}
</script>

<style scoped>

</style>
