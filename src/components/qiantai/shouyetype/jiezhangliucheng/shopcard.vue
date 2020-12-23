<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="3">
        <div class="grid-content bg-purple">
          <div style="font-size: 25px;text-align: center;padding-top: 15px"><i
            class="el-icon-shopping-cart-2 el-icon--left"></i>购物车
            <el-divider></el-divider>
          </div>
          <div v-for="item of items" :key="item">
            <el-row :gutter="20" style="margin-top: 15px">
              <el-col :span="5" :offset="1" style="background: white;width: 150px;height: 150px;">
                <div class="grid-content bg-purple" style="background: white">
                  <el-image
                    style="width: 120px; height: 125px"
                    :src="item.shopid.shopimg"
                    fit="contain">
                  </el-image>
                </div>
              </el-col>
              <el-col :span="8" style="background: white;width: 200px;height: 150px;">
                <div class="grid-content bg-purple" style="background: white">
                  <div style="margin-top: 15px">
                    <span style="font-size: 20px">{{ item.shopid.shopname }}</span><br>
                    <del style="color: #28a745;font-size:13px;">￥1.20公斤</del>
                    <span style="color: #6c757d;font-size:13px;">￥{{ item.shopid.shopprice }}斤</span><br><br>
                    <span style="font-size:20px;">￥{{ item.number * item.shopid.shopprice }}</span><br><br>
                  </div>
                </div>
              </el-col>
              <el-col :span="2" :offset="4" style="background: white;width: 150px;height: 150px;">
                <div class="grid-content bg-purple" style="background: white">
                  <div style="border-radius:45%;width: 100px;height: 40px;background: #F7F7F8;text-align: center;">
                    <div style="margin-top: 100px;padding-top: 6px">
                      <el-button size="mini" icon="el-icon-minus" circle></el-button>
                      <span>{{ item.number }}</span>
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
              <el-avatar :size="45"
                         src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
            </el-col>
            <el-col :span="18" style="margin-top: 20px ">
              <a>大阪府新鲜商店</a><br>
              <a style="font-size: 10px">2036 2ND AVE，纽约，纽约10029</a>
            </el-col>
            <el-col :span="24">
              <el-divider></el-divider>
            </el-col>
            <el-col :span="24" :offset="1">
              <b style="font-size: 10px">账单明细</b><br>
              <a style="font-size: 14px">项目总计（{{ items.length }}个项目）</a><span
              style="color: #6c757d;margin-left: 102px;font-size: 14px">￥ {{ this.numberprice }}</span><br>
              <a style="font-size: 14px">会员等级</a><span
              style="color: #6c757d;margin-left: 175px;font-size: 14px">{{ this.huiyuan }}</span><br>

              <br>
              <span style="font-size: 16px;color: #28a745;">总折扣</span>
              <span style="color: #28a745;margin-left: 150px;font-size: 16px">￥ {{
                  this.numberprice * (this.huiyuanzhekou / 100)
                }}</span><br>
            </el-col>
            <el-col :span="24">
              <el-divider></el-divider>
            </el-col>
            <el-col :span="24" :offset="1" style="margin-bottom: 20px">
              <a style="font-size: 20px;color: #212529">支付</a>
              <span
                style="font-size: 20px;color: #dc3545;margin-left: 150px">￥ {{
                  this.numberprice - (this.numberprice * (this.huiyuanzhekou / 100))
                }}</span>
            </el-col>
          </el-row>
        </div>
        <el-button style="margin-top: 12px;width: 308px" type="success" round>结算</el-button>
      </el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  data() {
    return {
      huiyuan: sessionStorage.getItem('hyname'),
      huiyuanzhekou: sessionStorage.getItem('hyzhekou'),
      items: [],
      numberprice: 0,
    };
  },
  methods: {
    handleChange(val) {

    },
    getData(func) { //获取数据方法
      var _this = this;
      var params = new URLSearchParams();
      var userid = sessionStorage.getItem('yonghuid')
      params.append("userid.userid", userid)
      this.$axios.post("shopcard/query.action", params).then(function (result) {
        _this.items = result.data;
        for (let item of _this.items) {
          _this.numberprice = _this.addNum(_this.numberprice, item.price);
        }
        console.log(_this.items)
        // alert(result.data[0].shopputid)
        func && func();
      }).catch(function (error) {
        alert(error)
      });
    },
    jiesuan() {
      sessionStorage.setItem("carditems", this.items)
      sessionStorage.setItem("numberprice", this.numberprice)

    },

    addNum (n1, n2) {
      let s1,s2,m;
      try {
        s1 = n1.toString().split(".")[1].length;
      }
      catch (e) {
        s1 = 0;
      }
      try {
        s2 = n2.toString().split(".")[1].length;
      }
      catch (e) {
        s2 = 0;
      }
      m = Math.pow(10,Math.max(s1, s2));
      alert(m)
      return (n1 * m + n2 * m) / m;
    }

  },
  created() {
    this.getData();
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
