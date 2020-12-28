<template>
  <div>
    <a style="margin-left:110px;font-size: 15px;color: #2c3e50">产品详情</a>
    <div style="margin-top: 20px">


      <el-row :gutter="23">
        <el-col :span="10" :offset="2">
          <div class="grid-content bg-purple">
            <hooper style="height: 350px" :progress="true" :autoPlay="true" :playSpeed="2000">
              <slide>
                <img :src="images[0]" width="547px" height="350px"/>
              </slide>
              <slide>
                <img :src="images[1]" width="547px" height="350px"/>
              </slide>
              <slide>
                <img :src="images[2]" width="547px" height="350px"/>
              </slide>
              <hooper-pagination slot="hooper-addons"></hooper-pagination>
            </hooper>
          </div>
          <el-button type="success" @click="checkgouwu"
                     style="margin-top:20px;margin-left:160px;width: 200px;height:70px;background: #28A745"><i
            class="el-icon-shopping-cart-2 el-icon--left"></i>加入购物车
          </el-button>
        </el-col>
        <el-col :span="9" style="">
          <div style="background: white;width: 521px;height: 440px">
            <el-col>
              <div style="margin-top: 20px;margin-left: 20px">
                <a class="a-color" style="font-size:27px;">{{ items.shopid.shopname }}</a><br><br>
                <a class="a-color" style="font-size:18px;">产品价格 : ￥{{chenNum(items.shopputprice,(items.shopzhe/10))}}</a><br><br>
                <div>
                  <el-rate
                    value="5"
                    :colors="colors">
                  </el-rate>
                </div>
                <br>
                <a class="a-color" style="font-size: 15px">交货</a><a class="a-color"
                                                                    style="margin-left: 385px;font-size: 15px">适用于:</a><br>
                <a style="font-size: 13px;color: #8E8B8B">自由</a><a
                style="color: #8E8B8B;margin-left: 400px;font-size: 13px">1{{ items.shopid.shopdanwei }}</a><br><br>


                <a class="a-color" style="font-size:18px;">产品详情</a><br>
                <a class="a-color" style="font-size:15px;">{{ items.shopid.shopmiaoshu }}</a><br><br>
              </div>
            </el-col>
          </div>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import {
  Hooper,
  Slide,
  Pagination as HooperPagination
} from 'hooper';
import Shopcard from "./shopcard";
export default {
  components: {
    Hooper,
    Slide,
    HooperPagination,
    shopcard:Shopcard,
  },
  name: "chanpinxiangqing",
  data() {
    return {
      bk:[],
      items: [],
      id: '',
      value: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      image2: require("../../../../images/qianduan/lunbo/lunbo1.jpg"),
      image3: require("../../../../images/qianduan/lunbo/lunbo2.jpg"),
      image4: require("../../../../images/qianduan/lunbo/lunbo3.jpg"),
      images:[],
    }
  },
  methods: {
    getData(func) { //获取数据方法
      var _this = this;
      var params = new URLSearchParams();
      var shopid = _this.$route.query.id;
      params.append("shopid.shopid", shopid)
      this.$axios.post("shopput/querylike.action", params).then(function (result) {
        _this.items = result.data[0];
        // alert(result.data[0].shopputid)l
        console.log(_this.items)
        for(let img of _this.items.shopid.shopxqs){
          _this.images.push(img.shopimg)
        }
        console.log(_this.images)
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
    checkgouwu(){
      var _this = this;
      var params = new URLSearchParams();
      var shopid = _this.items.shopputid;
      var userid = sessionStorage.getItem("yonghuid");
      params.append("shopid.shopputid", shopid);
      params.append("userid.userid", userid);
      if (userid == '' || userid == null){
        this.$message('请先登录');
        return
      }
      this.$axios.post("shopcard/query.action", params).then(function (result) {
        if (result.data[0] != null){
          _this.$message("成功加入购物车")
          _this.editgouwu(result.data[0].shopgwid);

        }else {
          _this.$message("已加入购物车")
          _this.addgouwu();

        }


        // alert(result.data[0].shopputid)
      }).catch(function (error) {
        alert(error)
      });

    },
    addgouwu() {
      var _this = this;
      var params = new URLSearchParams();
      var shopid = _this.items.shopputid;
      var userid = sessionStorage.getItem("yonghuid");
      var number = 1;
      var price = _this.chenNum(_this.items.shopputprice,(_this.items.shopzhe/10));
      alert(shopid)
      params.append("shopid.shopputid", shopid);
      params.append("userid.userid", userid)
      params.append("number", number)
      params.append("price", price)
      this.$axios.post("shopcard/addshopgouwu.action", params).then(function (result) {
        // alert(result.data[0].shopputid)
        _this.$router.push("shopcard")
      }).catch(function (error) {
        alert(error)
      });
    },
    editgouwu(shopgwid){
      var _this = this;
      var params = new URLSearchParams();

      var number = 1;
      var price = _this.chenNum(_this.items.shopputprice,(_this.items.shopzhe/10));

      params.append("shopgwid", shopgwid);
      params.append("number", number)
      params.append("price", price)
      this.$axios.post("shopcard/editshopgouwu.action", params).then(function (result) {
        // alert(result.data[0].shopputid)
        _this.$router.push("shopcard")
      }).catch(function (error) {
        alert(error)
      });
    }
  },
  created: function () {
    this.getData();
  }
}
</script>

<style scoped>
.hooper:focus {
  outline: none;
}

.a-color {
  color: #2c3e50;
}
</style>
