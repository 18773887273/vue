<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="14" :offset="2">
        <div>
          <div id="jiesuan-title-btn" class="jiesuan-title-div-off" @click="openAndClose"><span>购物车</span>
          </div>
          <div id="box" class="box-off">
            <el-divider></el-divider>
            <div v-for="item of items">
              <el-row :gutter="20" style="margin-top: 0px">
                <el-col :span="5" :offset="1" style="background: white;width: 150px;height: 80px;">
                  <div class="grid-content bg-purple" style="background: white">
                    <el-image
                      style="width: 120px; height: 80px"
                      :src="item.shopid.shopid.shopimg"
                      fit="contain">
                    </el-image>
                  </div>
                </el-col>
                <el-col :span="8" style="background: white;width: 200px;height: 80px;">
                  <div class="grid-content bg-purple" style="background: white">
                    <div style="margin-top: 0px">
                      <span style="font-size: 20px">{{ item.shopid.shopid.shopname }}</span><br>
                      <del style="color: #28a745;font-size: 13px;">￥{{ item.shopid.shopputprice }}
                      </del>
                      <span
                        style="color: #6c757d;font-size:13px;">￥ {{
                          chenNum(item.shopid.shopputprice, (item.shopid.shopzhe / 10))
                        }} /{{
                          item.shopid.shopdanwei
                        }}
                        {{ item.shopid.shopid.shopdanwei }}</span><br>
                      <div style="font-size:20px;margin-top: 8px">￥{{
                          chenNum(item.number, (chenNum(item.shopid.shopputprice, (item.shopid.shopzhe / 10))))
                        }}
                      </div>
                      <br><br>
                    </div>
                  </div>
                </el-col>
                <el-col :span="2" style="margin-left:209px;background: white;width: 150px;height: 80px;">
                  <div class="grid-content bg-purple" style="background: white">
                    <div class="jia-div-btn" style="width: 100px;height: 40px;background: #F7F7F8;text-align: center;">
                      <div style="margin-top: 52px;padding-top: 4px">
                        <el-button
                          @click="downNumber(item.shopgwid,1,chenNum(item.shopid.shopputprice,(item.shopid.shopzhe/10)),item.number)"
                          size="mini" icon="el-icon-minus" circle></el-button>
                        <span style="padding-top: 2px">{{ item.number }}</span>
                        <el-button
                          @click="upNumber(item.shopgwid,1,chenNum(item.shopid.shopputprice,(item.shopid.shopzhe/10)),item.number)"
                          size="mini" icon="el-icon-plus" circle></el-button>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-divider style="margin-top: -10px"></el-divider>
            </div>
          </div>
        </div>
        <div>
          <div id="jiesuan-body-btn" class="jiesuan-body-div-off" @click="openAndClosebody"><span
            style="margin-left: 319px">订单地址</span><a v-on:click="addAddress()" class="addr-edit-a"><i
            class="el-icon-circle-plus el-icon--left"></i>添加新的收货地址</a>
          </div>
          <div id="jiesuan-body-box" class="jiesuan-body-box-off">
            <div v-for="addr of address">
              <el-row :gutter="20">
                <el-col :span="10" :offset="1">
                  <el-card style="border: 1px solid #28A745;" :body-style="{ padding: '0px' }" shadow="hover">
                    <div style="padding: 14px;">
                      <div class="font-class">地址备注：{{ addr.nicheng }}
                        <el-tag size="mini" style="margin-left: 84px" type="success">默认<i class="el-icon-success"></i>
                        </el-tag>
                      </div>
                      <div class="bottom clearfix">

                        <div style="margin-top: 15px" class="font-class">提货地址：{{ addr.shid.storename }}</div>
                        <div style="margin-top: 15px" class="font-class">联系电话：{{ addr.telephone }}</div>
                        <a style="margin-top: 3px;margin-left: 225px" class="addr-edit">编辑</a>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div>
          <div id="jiesuan-bottem-btn" class="jiesuan-bottem-div-off" @click=""><span>付款</span>
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
      </el-col>
      <el-dialog
        title="添加收货地址"
        :visible.sync="centerDialogVisible"
        width="30%"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="交货地址" prop="dizhi">
            <el-select v-model="ruleForm.dizhi" placeholder="请选择活动区域">
              <el-option v-for="item in stroename" :label="item.storename" :value="item.userid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话" prop="telephone">
            <el-input v-model="ruleForm.telephone"></el-input>
          </el-form-item>
          <el-form-item label="地址备注" prop="beizhu">
            <el-input v-model="ruleForm.beizhu"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nicheng">
            <el-input v-model="ruleForm.nicheng"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>


  </div>
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      huiyuan: sessionStorage.getItem('hyname'),
      huiyuanzhekou: sessionStorage.getItem('hyzhekou'),
      items: [],
      iprice: 0,
      priceitems: [],
      address: [],
      numberprice: 0,
      sumprice: 0,
      stroename:[],
      ruleForm: {
        dizhi: '',
        telephone:'',
        beizhu: '',
        delivery: false,
        nicheng: ''
      },
      rules: {
        telephone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入联系电话', trigger: 'blur' }
        ],
        beizhu: [
          { required: true, message: '请填写备注信息', trigger: 'blur' },
        ],
        dizhi: [
          { required: true, message: '请选择配送地址', trigger: 'change' }
        ],
        nicheng: [
          { required: true, message: '请选择昵称', trigger: 'blur' },
          { min: 1, max: 8, message: '昵称 1 到 8 个文字', trigger: 'blur' }
        ],

      }

    };
  },
  methods: {
    getData() { //获取数据方法
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
      }).catch(function (error) {
      });
    },
    getAddress() {
      var _this = this;
      var params = new URLSearchParams();
      var userid = sessionStorage.getItem('yonghuid')
      params.append("userid", userid)
      this.$axios.post("shopcardaddress/queryByuserid.action", params).then(function (result) {
        _this.address = result.data;
        console.log(_this.address)
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
      let divheight = 153;
      let as = 0;
      if (this.items.length > 1) {
        as = (divheight * this.items.length);
      } else if (this.items.length == 1) {
        as = divheight * this.items.length;
      }
      let el = document.getElementById("box");
      let dl = document.getElementById("jiesuan-title-btn");
      if (window.getComputedStyle(el).height == "0px") {
        // mac Safari下，貌似auto也会触发transition, 故要none下~
        el.style.transition = "none";
        el.style.height = "auto";
        el.style.transition = "height 600ms"
        el.style.height = "" + as + "px";
        el.style.maxHeight = "" + as + "px";
        el.style.height = "" + as + "px";
        dl.className = 'jiesuan-title-div-oppen'
        el.className = 'box-oppen'
      } else {
        el.style.height = "0px";
        setTimeout(() => {
          dl.className = 'jiesuan-title-div-off'
          el.className = 'box-off'
        }, 500);
      }
    },

    openAndClosebody() {
      let divheight = 153;
      let as = 200;
      /*  if (this.address.length>1){
          as = (divheight * this.items.length)-75;
        }else if (this.address.length == 1) {
          as = divheight * this.address.length;
        }*/
      let el = document.getElementById("jiesuan-body-box");
      let dl = document.getElementById("jiesuan-body-btn");
      if (window.getComputedStyle(el).height == "0px") {
        // mac Safari下，貌似auto也会触发transition, 故要none下~
        el.style.transition = "none";
        el.style.height = "auto";
        el.style.transition = "height 600ms"
        el.style.height = "" + as + "px";
        el.style.maxHeight = "" + as + "px";
        el.style.height = "" + as + "px";
        dl.className = 'jiesuan-body-div-oppen'
        el.className = 'jiesuan-body-box-oppen'
      } else {
        el.style.height = "0px";
        setTimeout(() => {
          dl.className = 'jiesuan-body-div-off'
          el.className = 'jiesuan-body-box-off'
        }, 500);

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
      } catch (e) {
        curr_l = 0;
      }
      try {
        next_l = next.toString().split(".")[1].length;
      } catch (e) {
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
      return (curr - next) / m;
    },

    editblur() {
      alert(1)
    },

    upNumber(id, number, price, index) {//增加商品数量
      let _this = this;
      if (index == 100) {
        _this.$message("最少一件商品");
      } else if (index < 99) {
        var params = new URLSearchParams();
        params.append("shopgwid", id);
        params.append("number", number)
        params.append("price", price)
        this.$axios.post("shopcard/upNumer.action", params).then(function (result) {
          //_this.$message(result.data.msg);
          _this.numberprice = 0;
          _this.getData()
        }).catch(function (error) {
          alert(error)
        });
      }

    },
    downNumber(id, number, price, index) {//扣除商品数量
      let _this = this;
      if (index == 1) {
        _this.$message("最少一件商品");
      } else if (index > 1) {
        var params = new URLSearchParams();
        params.append("shopgwid", id);
        params.append("number", number)
        params.append("price", price)
        this.$axios.post("shopcard/downNumer.action", params).then(function (result) {
          //_this.$message(result.data.msg);
          _this.numberprice = 0;
          _this.getData()
        }).catch(function (error) {
          alert(error)
        });
      }
    },

    addAddress() {
      this.$message("打开")
      this.centerDialogVisible = true;
      this.getStroename();
    },
    getStroename(func) { //获取数据方法
      var _this = this;
      this.$axios.post("user/querylike2.action").then(function (result) {
        _this.stroename = result.data.rows;

        func && func();
      }).catch(function (error) {
        alert(error)
      });
    },
    submitForm(formName) {//添加收货地址
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.getData();
    this.getAddress();
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

.jia-div-btn {
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

.jiesuan-body-div-off {
  margin-top: 10px;
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom: 3px solid #28A745;
  width: 720px;
  height: 45px;
  background: white;
}

.jiesuan-body-div-oppen {
  margin-top: 10px;
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  text-align: center;
  width: 720px;
  height: 45px;
  background: white;
}

.jiesuan-body-box-off {
  background: white;
  overflow: hidden;
  max-height: 0px;
  max-width: 720px;
}

.jiesuan-body-box-oppen {
  background: white;
  overflow: hidden;
  max-height: 0px;
  max-width: 720px;
  border-bottom: 3px solid #28A745;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

.font-class {
  color: #28A745;
  font-size: 16px;
}

.addr-edit {
  color: #62ABD1;
  font-size: 12px;
  cursor: pointer;
}

.addr-edit:hover {
  color: #0F0808;
  font-size: 12px;
}

.addr-edit-a {
  margin-left: 180px;
  color: #28A745;
  font-size: 14px;
  cursor: pointer;
}

.addr-edit-a:hover {
  color: #19692C;
  font-size: 14px;
}

.jiesuan-bottem-div-off {
  margin-top: 10px;
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

.jiesuan-bottem-div-oppen {
  margin-top: 10px;
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  text-align: center;
  width: 720px;
  height: 45px;
  background: white;
}
</style>
