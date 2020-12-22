<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="3">
        <div class="grid-content bg-purple">
          <div style="font-size: 25px;text-align: center;"><i class="el-icon-shopping-cart-2 el-icon--left"></i>购物车
            <el-divider></el-divider>
          </div>
          <div v-for="item of 3" :key="item">
            <el-row :gutter="20" style="margin-top: 15px">
              <el-col :span="5" :offset="1" style="background: white;width: 150px;height: 150px;">
                <div class="grid-content bg-purple" style="background: white">
                  <el-image
                    style="width: 120px; height: 125px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="contain">
                  </el-image>
                </div>
              </el-col>
              <el-col :span="8" style="background: white;width: 200px;height: 150px;">
                <div class="grid-content bg-purple" style="background: white">
                  <div style="margin-top: 15px">
                    <span style="font-size: 20px">面包</span><br>
                    <del style="color: #28a745;font-size:13px;">￥1.20公斤</del>
                    <span style="color: #6c757d;font-size:13px;">￥0.95公斤</span><br><br>
                    <span style="font-size:14px;">￥2.82公斤</span><br><br>
                  </div>
                </div>
              </el-col>
              <el-col :span="2" :offset="5" style="background: white;width: 150px;height: 150px;">
                <div class="grid-content bg-purple" style="background: white">
                  <div style="border-radius:45%;width: 100px;height: 40px;background: #F7F7F8;text-align: center;">
                    <div style="margin-top: 100px;padding-top: 6px">
                      <el-button size="mini" icon="el-icon-minus" circle></el-button>
                      <span>{{number}}</span>
                      <el-button size="mini" icon="el-icon-plus" circle></el-button>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-divider></el-divider>

          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-row :gutter="20">
            <el-col :span="4" :offset="1" style="margin-top: 20px ">
              <el-avatar :size="45" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
            </el-col>
            <el-col :span="18"  style="margin-top: 20px ">
              <a>大阪府新鲜商店</a><br>
              <a style="font-size: 10px">2036 2ND AVE，纽约，纽约10029</a>
            </el-col>
            <el-col :span="24" >
              <el-divider></el-divider>
            </el-col>
            <el-col :span="24" :offset="1" >
              <b style="font-size: 10px">账单明细</b><br>
              <a style="font-size: 14px">项目总计（3个项目）</a><span style="color: #6c757d;margin-left: 102px;font-size: 14px">$ 3140</span><br>
              <a style="font-size: 14px">储存费用</a><span style="color: #6c757d;margin-left: 180px;font-size: 14px">$ 62.8</span><br>
              <a style="font-size: 14px">送货费</a><span style="color: #6c757d;margin-left: 194px;font-size: 14px">$ 10</span><br>
              <br>
              <span style="font-size: 16px;color: #28a745;">总折扣</span>
              <span style="color: #28a745;margin-left: 183px;font-size: 16px">$ 1884</span><br>
            </el-col>
            <el-col :span="24">
              <el-divider></el-divider>
            </el-col>
            <el-col :span="24" :offset="1" style="margin-bottom: 20px">
              <a style="font-size: 20px;color: #212529">支付</a>
              <span style="font-size: 20px;color: #dc3545;margin-left: 175px">$ 1329</span>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  data() {
    return {
      number:2,
    };
  },
  methods: {
    handleChange(val) {

    },
    getData(func) { //获取数据方法
      var _this = this;
      var params = new URLSearchParams();
      var shopid = sessionStorage.getItem('')
      params.append("shopid.shopid",shopid)
      this.$axios.post("shopcard/querylike.action",params).then(function (result) {
        _this.items = result.data[0];
        // alert(result.data[0].shopputid)
        func && func();
      }).catch(function (error) {
        alert(error)
      });
    },
  }
}
</script>
<style scoped>

.bg-purple {
  background: white;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

</style>
