<template>
  <el-row :gutter="24">
    <el-col :span="24" :offset="1" >
      <div>
        <div v-for="item of items">
          <el-col :span="5" style="background-color: white;margin-left: 10px;margin-top: 20px;margin-bottom: 20px">
            <div class="distilled-div" @click="getDescribe(item.shopid.shopid)">
              <img
                class="main_body_commodityImg"
                style="width: 223px; height: 168px;margin-top: 10px;"
                :src="item.shopid.shopimg"
              >
              <br>
              {{ item.shopid.shopname }}<br><br>
              <a style="color: red;font-size: 22px;">￥{{chenNum(item.shopputprice,(item.shopzhe/10))}} /{{ item.shopid.shopdanwei }}</a>
              <del style="color: #999999;font-size: 14px;">￥ {{ item.shopputprice}}
                /{{ item.shopid.shopdanwei }}
              </del>
              <br> <br>
            </div>
          </el-col>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "shouyedistilled",
  data() {
    return {
      items: [],
    }
  },
  methods: {
    getDescribe(id) {
      //直接调用$router.push 实现携带参数的跳转
      this.$router.push({
        path: '/xiangqing',
        query: {
          id: id
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
    chenNum(curr, next) {
      let m = 0, s1 = curr.toString(), s2 = next.toString();
      try {
        m += s1.split(".")[1].length
      } catch (e) {
      }
      try {
        m += s2.split(".")[1].length
      } catch (e) {
      }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    },

  },
  created: function () {
    this.getData();
  }

}
</script>

<style scoped>

.distilled-div{
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

.main_body_commodityImg {
  transition: all 0.5s; /*鼠标经过图片放大*/
  cursor: pointer;
  height: 60%;
  width: 70%;
  margin-top: 15px;
}

.main_body_commodityImg:hover {
  transform: scale(1.1); /*动画效果放慢*/
}
</style>
