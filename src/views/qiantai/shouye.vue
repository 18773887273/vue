<template>
  <div id="app">

    <el-menu class="el-menu-demo" style="height:65px;" mode="horizontal">
      <el-menu-item style="width: 100px"></el-menu-item>
      <el-menu-item>
        <el-image style="width: 100px; height: 50px" :src="image1"></el-image>
      </el-menu-item>
      <el-menu-item>
        <el-button size="mini" circle><i class="el-icon-location-outline"></i></el-button>

      </el-menu-item>
      <el-menu-item style="width: 40px"></el-menu-item>
      <el-menu-item>
        <el-input size="small" style="width: 428px;" placeholder="请输入内容" v-model="shouyequeryname">
        </el-input>
        <el-button @click="shouyequery" type="success" style="margin-left: -4px;margin-top: 3px; background-color: #28A745;height: 33px;"
                   size="mini">
          <i class="el-icon-search" style="color: white;"></i>
        </el-button>
      </el-menu-item>
      <el-menu-item style="width: 120px;">

      </el-menu-item>
      <el-menu-item>
        <el-button v-if="!touxian" size="mini" @click="dialog = true" circle style="background-color: #F8F9FA; "><i
          class="el-icon-user"></i></el-button>
        <el-dropdown>
          <el-avatar v-if="touxian"> user</el-avatar>
          <el-dropdown-menu slot="dropdown" v-if="touxian">
            <el-dropdown-item>
              <router-link to="/mys" class="shouye-luyou-title">我的账号</router-link>
            </el-dropdown-item>
            <el-dropdown-item>我的地址</el-dropdown-item>
            <el-dropdown-item>
              <router-link class="shouye-luyou-title" to="/personal">商户中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item><div @click="tuichu()">登出</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="mini" circle style="background-color: #F8F9FA; "><i class="el-icon-bell"></i></el-button>
        <el-button @click="oppencard" size="mini" circle style="background-color: #F8F9FA; "><i class="el-icon-shopping-cart-2"></i>
        </el-button>
      </el-menu-item>
    </el-menu>
    <el-container>
      <el-header style="height: 35px;">
        <el-row :gutter="10">

          <el-col :span="1" style="margin-left: 89px;">
            <el-link :underline="false" style="color: #FFFAE8;"><router-link to="/back" class="shouye-luyou">家</router-link></el-link>
          </el-col>
          <el-col :span="2" style="margin-left: -10px;">
            <el-dropdown>
              <el-link :underline="false" style="color: #FFFAE8;">产品展示<i class="el-icon-arrow-down el-icon--right"></i>
              </el-link>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>趋向</el-dropdown-item>
                <el-dropdown-item>推荐的</el-dropdown-item>
                <el-dropdown-item>受欢迎的</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="2" style="margin-left: -10px;">
            <el-dropdown>
              <el-link :underline="false" style="color: #FFFAE8;">我的订单<i class="el-icon-arrow-down el-icon--right"></i>
              </el-link>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的订单</el-dropdown-item>
                <el-dropdown-item>已完成</el-dropdown-item>
                <el-dropdown-item>进行中</el-dropdown-item>
                <el-dropdown-item>已取消</el-dropdown-item>
                <el-dropdown-item>评论</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <!--路由-->

        <router-view></router-view>
      </el-main>
      <el-footer>
        <el-row :gutter="20">
          <el-col :span="20" style="margin-left: 98px; margin-top:30px;">
            <span>促销给你</span>
            <el-button size="small" type="success" plain style="margin-left: 908px;">查看更多</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row style="margin-bottom: 35px;">
          <el-col :span="4" style="margin-left: 98px; margin-top:30px;">
            <span>产品展示</span><br/>
            <el-link class="el-linka" :underline="false">清单</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">详情</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">趋向</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">推荐的</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">最受欢迎的</el-link>
            <br/>
          </el-col>
          <el-col :span="4" style="margin-left: 20px; margin-top:30px;">
            <span>结帐流程</span><br/>
            <el-link class="el-linka" :underline="false">购物车</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">订单地址</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">交货时间</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">订单付款</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">查看</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">成功的</el-link>
            <br/>
          </el-col>
          <el-col :span="4" style="margin-left: 20px; margin-top:30px;">
            <span>我的订单</span><br/>
            <el-link class="el-linka" :underline="false">我的订单</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">状态完成</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">进行中状态</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">状态已取消</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">评论</el-link>
            <br/>

          </el-col>
          <el-col :span="4" style="margin-left: 20px; margin-top:30px;">
            <span>我的帐户</span><br/>
            <el-link class="el-linka" :underline="false">我的帐户</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">宣传片</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">我的地址</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">条款及规则</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">帮助支持</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">帮助票</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">等出</el-link>
            <br/>
          </el-col>
          <el-col :span="4" style="margin-left: 20px; margin-top:30px;">
            <span>额外页面</span><br/>
            <el-link class="el-linka" :underline="false">促销详情</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">条件</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">帮助支持</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">退款支持</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">常见问题</el-link>
            <br/>
            <el-link class="el-linka" :underline="false">登入</el-link>
            <br/>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row style="margin-bottom: 35px;">
          <el-col :span="5" style="margin-left: 90px;">
            <span class="el-linkb">©2020 Grofarweb</span>
            <el-link class="el-linkb" :underline="false">隐私</el-link>
            <el-link class="el-linkb" :underline="false">条款和条件</el-link>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>

    <!--dialog-->
    <el-drawer
      title="我是标题"
      :with-header="false"
      :visible.sync="dialog"
      size="25%"

    >
      <el-row class="el-row2">
        <el-col :span="11" class="el-col2">
          <div ref="ssc" class="grid-content bg-purple el-col2-div" :style="coldiv1"
               @click="denglu1" @mouseover="mouseOver(1,'2px #42b983 solid')" @mouseout="mouseLeave">登录
          </div>
        </el-col>
        <el-col :span="11" class="el-col2">
          <div class="grid-content bg-purple-light el-col2-div" :style="coldiv2"
               @click="zuche1" @mouseover="mouseOver(2,'2px #42b983 solid')" @mouseout="mouseLeave">注册
          </div>
        </el-col>
        <el-col :span="2" class="el-col2">
          <div class="grid-content bg-purple-light el-col2-div" :style="coldiv3"
               @mouseover="mouseOver(3,'2px #42b983 solid')" @mouseout="mouseLeave"><span class="span1"><i
            class="el-icon-close"></i></span></div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 3px">
        <el-col :span="24">
          <div style="height: 500px">
            <component :is="path" ref="childprpo" v-bind:sg="dialog" v-on:propvalue="dengluclose"></component>
          </div>
        </el-col>
      </el-row>

    </el-drawer>

  </div>
</template>

<script>
import Shouyemain from "../../components/qiantai/shouye01"
import My from "../../components/qiantai/Mys/my"
import Denglu from "../../components/qiantai/dengluzuche/denglu"
import Zuche from "../../components/qiantai/dengluzuche/zuche"

export default {
  components: { //子组件
    mains: Shouyemain,
    mys: My,
    denglu: Denglu,
    zuche: Zuche
  },
  name: 'app',
  data() {
    return {
      shouyequeryname:'',
      image1: require("../../images/qianduan/mxt.png"),
      shouyeusername: sessionStorage.getItem("yonghuname"),
      coldiv1: {borderBottom: "2px #42b983 solid"},
      coldiv2: {borderBottom: "2px #42b983 solid"},
      coldiv3: {borderBottom: "2px #42b983 solid"},
      path: 'denglu',
      dialog: false,
      touxian: false,
      loading: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      timer: null,
    }
  },

  methods: {
    tuichu(){
      sessionStorage.clear();
      this.$router.push({path: '/back'})
      window.location.reload();
    },
    asdasd2(){
      if(this.shouyeusername!=null){
        this.touxian=true
        //alert(shouyeusername)
      }else{
        this.touxian=false
      }
    },
    dengluclose(msg, msg2) {
      console.log(msg,msg2)
      if (!msg) {
        this.dialog = msg;
        this.touxian = msg2;
      }
      if (msg =="denglu"){
        this.path = msg;
      }
    },
    /*打开登录*/
    denglu1() {
      this.path = 'denglu';
    },
    /*打开注册*/
    zuche1() {
      this.path = 'zuche';
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确认登录吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {
        });
    },

    mouseOver(index, value) {
      if (index == 1) {

        this.coldiv1.borderBottom = "2px #42b983 solid";
      } else if (index == 2) {
        this.coldiv2.borderBottom = "2px #42b983 solid";
      } else if (index == 3) {
        this.coldiv3.borderBottom = "2px #42b983 solid";
      }

    },
    mouseLeave() {
      this.coldiv1.borderBottom = "";
      this.coldiv2.borderBottom = "";
      this.coldiv3.borderBottom = "";
    },

    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    /*打开购物车*/
    oppencard(){
      let name = sessionStorage.getItem("yonghuname");
      if (name != null){
        this.$router.push("shopcard");
      }else {
        this.$message("请先登录")
        setTimeout(() => {
          this.dialog = true;
        }, 700);
      }
    },
    shouyequery(id) {
      //直接调用$router.push 实现携带参数的跳转
      this.$router.push({
        path: '/shouyequery',
        query: {
          queryname: this.shouyequeryname,
          qf:1
        }
      })
    },

  },
  created() {
    //alert(12312)
    this.asdasd2()
   // localStorage.getItem('state') && this.$store.replaceState(JSON.parse(localStorage.getItem('state')));
  },
 /* watch:{
    shouyeusername:function (newVal,oldVal) {
       this.asdasd2();

    }
  }*/



}
</script>

<style>
#app {

  color: #2c3e50;
}

.el-drawer:focus {
  outline: none;
}

a {
  color: #42b983;
}

.el-row2 {
  text-align: center;
  font-size: 18px;

}

.el-row3 {

}

.el-col2-div {
  height: 50px;
  padding-top: 25px;
}

.el-row {


&
:last-child {
  margin-bottom: 0;
}

}

.el-col {
  border-radius: 4px;

}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {

}

.bg-purple-light {

}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-header {
  background-color: #28A745;
  text-align: center;
  line-height: 30px;
}

.el-linka {
  margin-top: 12px;
  font-size: 10px;
}

.el-linkb {
  margin-left: 5px;
  font-size: 14px;
}


.el-footer {
  background-color: #FFFFFF;
  color: #333;


}

.el-main {
  background-color: #F0F2F5;
  color: #333;
  font-size: 20px;

}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-carousel__item h3 {
  color: #FFFFFF;
  font-size: 30px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #e5e9f2;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #e5e9f2;
}

.shouye-luyou{
  text-decoration:none;
  color: #FFFAE8;
}

.shouye-luyou-title{
  text-decoration:none;
  color: #333333;
}
</style>
