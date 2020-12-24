<template>
  <div>
    <div v-for="item of items" :key="item">
      <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;margin-bottom: 20px">
          <div @click="getDescribe(item.shopid.shopid)">
            <el-card shadow="hover" body-style="border:0px;">
              <img
                style="width: 200px; height: 155px;margin-top: 10px;"
                :src="item.shopid.shopimg"
              >
            </el-card>
            <br>
            {{ item.shopid.shopname }}<br><br>
            <a style="color: red;font-size: 22px;">￥ {{ item.shopid.shopprice }} /{{ item.shopid.shopdanwei }}</a>
            <del style="color: #999999;font-size: 14px;">￥ {{ item.shopid.shopprice + 0.5 }} /{{ item.shopid.shopdanwei }}</del>
            <br> <br>
          </div>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "shouyedistilled",
  data() {
    return {
      items: [],
      imagesrc: '../../../images/shop/',
    }
  },
  methods: {
    getDescribe(id){
    //直接调用$router.push 实现携带参数的跳转
      this.$router.push({
        path:'/xiangqing',
        query:{
          id:id
        }
      })
    },
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
