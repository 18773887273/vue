<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="20" :offset="2">
        <a class="title-leixing">{{items[0].shopid.shoptyid.shoptyname}}</a>
      </el-col>
      <el-col :span="20" :offset="2" class="el-row-body">
        <el-row :gutter="24">
          <div v-for="item of items">
            <el-col :span="6" >
              <div class="lx-div-for" v-on:click="getDescribes(item.shopputid)">
                <div>
                  <el-tag size="medium" class="query-tag" type="success">{{ (10-item.shopzhe)*10}}%</el-tag>
                  <el-image class="main_body_queryImg" :src="item.shopid.shopimg">

                  </el-image>
                </div>
                <div class="query-shopname">
                  {{item.shopid.shopname}}
                </div>
                <div class="query-price">
                  ￥{{chenNum(item.shopputprice,(item.shopzhe/10))}}/{{item.shopid.shopdanwei}}
                </div>
              </div>
            </el-col>
          </div>
        </el-row>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name: "shouyequery",
  data() {
    return {
      items: [],
      shopnamequery:'',
    }
  },
  methods: {
    getDescribes(id) {
      //直接调用$router.push 实现携带参数的跳转
      this.$router.push({
        path: '/xiangqing',
        query: {
          id: id
        }
      })
    },
    getData(func) { //获取数据方法
      this.items = [];
      var _this = this;
      var params = new URLSearchParams();
      var shoptyid = '';
      let qf = _this.$route.query.qf;

      if (qf == 1){
        this.shopnamequery = _this.$route.query.queryname;
      } else if(qf == 2){
        shoptyid = _this.$route.query.id;
      }
      if (shoptyid != ''){
        params.append("shopid.shoptyid.shoptyid", shoptyid);
      }
      if (this.shopnamequery != ''){
        params.append("shopid.shopname",this.shopnamequery)
      }
      this.$axios.post("shopput/querylike.action", params).then(function (result) {
        _this.items = result.data;
        console.log(result.data)
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
  created() {
    this.getData();
  }
}
</script>

<style scoped>

.title-leixing {
  color: #212529;
  font-size: 24px;
}

.el-row-body{

}

.query-shopname{
  font-size: 16px;
  color: #343A40;
  margin-left: 50px;

}

.query-tag{
  margin-top: 10px;
  margin-left: 10px;
}

.query-price{
  font-size: 14px;
  color: #28a745;
  margin-left: 50px;
  margin-top: 10px;
}


.lx-div-for{
  background-color: white;
  height: 230px;
  margin-top: 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
}

.main_body_queryImg {
  transition: all 0.5s; /*鼠标经过图片放大*/
  cursor: pointer;
  height: 60%;
  width: 70%;
  margin-top: 10px;
  margin-left: 36px;
}

.main_body_queryImg:hover {
  transform: scale(1.1); /*动画效果放慢*/
}

</style>
