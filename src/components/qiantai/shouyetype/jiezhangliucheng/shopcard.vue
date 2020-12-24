<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="14" :offset="3">
        <div class="grid-content">
          <div id="jiesuan-title-btn" class="jiesuan-title-div-off" @click="openAndClose"><span class="jiesuan-title-p">购物车</span>
          </div>

          <div id="box" class="box-off">
            <el-divider></el-divider>
            <div v-for="item of items" :key="item">
              <el-row :gutter="20" style="margin-top: 0px">
                <el-col :span="5" :offset="1" style="background: white;width: 150px;height: 80px;">
                  <div class="grid-content bg-purple" style="background: white">
                    <el-image
                      style="width: 120px; height: 80px"
                      :src="item.shopid.shopimg"
                      fit="contain">
                    </el-image>
                  </div>
                </el-col>
                <el-col :span="8" style="background: white;width: 200px;height: 80px;">
                  <div class="grid-content bg-purple" style="background: white">
                    <div style="margin-top: 0px">
                      <span style="font-size: 20px">{{ item.shopid.shopname }}</span><br>
                      <del style="color: #28a745;font-size:13px;">￥1.20斤</del>
                      <span style="color: #6c757d;font-size:13px;">￥{{ item.shopid.shopprice }}斤</span><br>
                      <div style="font-size:20px;margin-top: 8px">￥{{
                         chenNum(item.number,item.shopid.shopprice)

                        }}</div><br><br>
                    </div>
                  </div>
                </el-col>
                <el-col :span="2" style="margin-left:209px;background: white;width: 150px;height: 80px;">
                  <div class="grid-content bg-purple" style="background: white">
                    <div class="jia-div-btn" style="width: 100px;height: 40px;background: #F7F7F8;text-align: center;">
                      <div style="margin-top: 52px;padding-top: 4px">
                        <el-button size="mini" icon="el-icon-minus" circle></el-button>
                        <span style="padding-top: 2px">{{ item.number }}</span>
                        <el-button size="mini" icon="el-icon-plus" circle></el-button>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-divider style="margin-top: -10px"></el-divider>

            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple card-left-div">
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
              style="color: #6c757d;margin-left: 94px;font-size: 14px">￥ {{ this.numberprice }}</span><br>
              <a style="font-size: 14px">会员等级</a><span
              style="color: #6c757d;margin-left: 172px;font-size: 14px">{{ this.huiyuan }}</span><br>

              <br>
              <span style="font-size: 16px;color: #28a745;">总折扣</span>
              <span style="color: #28a745;margin-left: 159px;font-size: 16px">￥ {{
                  this.chenNum(this.numberprice, (this.huiyuanzhekou / 100))
                }}</span><br>
            </el-col>
            <el-col :span="24">
              <el-divider></el-divider>
            </el-col>
            <el-col :span="24" :offset="1" style="margin-bottom: 20px">
              <a style="font-size: 20px;color: #212529">支付</a>
              <span
                style="font-size: 20px;color: #dc3545;margin-left: 150px">￥ {{
                this.accSub(this.numberprice, this.chenNum(this.numberprice, (this.huiyuanzhekou / 100)))
                }}</span>
            </el-col>
          </el-row>
        </div>
        <el-button @click="jiesuan" style="margin-top: 12px;width: 308px" type="success" round>结算</el-button>
      </el-col >

      <el-col>
        <div id="jiesuan-zhifu-btn" class="jiesuan-zhifu-div-off" @click=""><span>购物车</span>
        </div>
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
      sumprice:0,
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
      /*sessionStorage.setItem("carditems", this.items)
      sessionStorage.setItem("numberprice", this.numberprice)
      this.$router.push("/Jiesuan")*/
    },
    openAndClose() {

      let divheight=153;

      /*for (let item of this.items){
        divheight = divheight + 153;
      }*/
      let as = divheight*this.items.length;
      let el = document.getElementById("box");
      let dl = document.getElementById("jiesuan-title-btn");
      let zl = document.getElementById("jiesuan-zhifu-btn");
      if (window.getComputedStyle(el).height == "0px") {
        // mac Safari下，貌似auto也会触发transition, 故要none下~
        el.style.transition = "none";
        el.style.height = "auto";
        el.style.transition = "height 600ms"
        el.style.height = ""+as+"px";
        el.style.maxHeight = ""+as+"px";
        el.style.height = ""+as+"px";

        dl.className = 'jiesuan-title-div-oppen'

        el.className = 'box-oppen'
      } else {
        el.style.height = "0px";
        setTimeout(() => {

          dl.className = 'jiesuan-title-div-off'
          el.className = 'box-off'
        }, 600);

      }
    },
    addNum(n1, n2) {
      let s1, s2, m;
      try {
        s1 = n1.toString().split(".")[1].length;
      } catch (e) {
        s1 = 0;
      }
      try {
        s2 = n2.toString().split(".")[1].length;
      } catch (e) {
        s2 = 0;
      }
      m = Math.pow(10, Math.max(s1, s2));
      return (n1 * m + n2 * m) / m;
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
    accSub(curr, next) {
      var curr_l, next_l, m, c;
      try {
        curr_l = curr.toString().split(".")[1].length;
      }
      catch (e) {
        curr_l = 0;
      }
      try {
        next_l = next.toString().split(".")[1].length;
      }
      catch (e) {
        next_l = 0;
      }
      c = Math.abs(curr_l - next_l);
      m = Math.pow(10, Math.max(curr_l, next_l));
      if (c > 0) {
        var cm = Math.pow(10, c);
        if (curr_l > next_l) {
          curr = Number(curr.toString().replace(".", ""));
          next = Number(next.toString().replace(".", "")) * cm;
        } else {
          curr = Number(curr.toString().replace(".", "")) * cm;
          next = Number(next.toString().replace(".", ""));
        }
      } else {
        curr = Number(curr.toString().replace(".", ""));
        next = Number(next.toString().replace(".", ""));
      }
      return (curr- next) / m;
    },

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

.box-oppen {
  background: white;
  overflow: hidden;
  max-height: 0px;
  max-width: 720px;
  border-bottom: 3px solid #28A745;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
.box-off {
  background: white;
  overflow: hidden;
  max-height: 0px;
  max-width: 720px;
}

.jia-div-btn{
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

.card-left-div {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

.jiesuan-title-div-off {
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom: 3px solid #28A745;
  text-align: center;
  width: 720px;
  height: 45px;
  background: white;
}

.jiesuan-title-div-oppen {
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  text-align: center;
  width: 720px;
  height: 45px;
  background: white;
}

.jiesuan-zhifu-div-off {
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom: 3px solid #28A745;
  text-align: center;
  width: 720px;
  height: 45px;
  background: white;
  z-index: 9999;
  position: absolute ! important;
  left:  174px; top: 100px;
}

.jiesuan-zhifu-div-oppen{
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  text-align: center;
  width: 720px;
  height: 45px;
  background: white;
}
</style>
