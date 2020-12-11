<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo" style="height:65px;" mode="horizontal" @select="handleSelect">
      <el-menu-item style="width: 100px"></el-menu-item>
      <el-menu-item>
        <el-image style="width: 100px; height: 50px" :src=require('@/images/qianduan/mxt.png') :fit="scale-down"></el-image>
      </el-menu-item>
      <el-menu-item>
        <el-button size="mini" circle><i class="el-icon-location-outline"></i></el-button>

      </el-menu-item>
      <el-menu-item style="width: 40px"></el-menu-item>
      <el-menu-item>
        <el-input size="small" style="width: 428px;" placeholder="请输入内容">
        </el-input>
        <el-button type="success" style="margin-left: -4px;margin-top: 3px; background-color: #28A745;height: 33px;"
                   size="mini">
          <i class="el-icon-search" style="color: white;"></i>
        </el-button>
      </el-menu-item>
      <el-menu-item style="width: 120px;">

      </el-menu-item>
      <el-menu-item>
        <el-button size="mini" circle style="background-color: #F8F9FA; "> <i class="el-icon-user"></i></el-button>
        <el-dropdown>
          <el-avatar> user </el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的账号</el-dropdown-item>
            <el-dropdown-item>我的地址</el-dropdown-item>
            <el-dropdown-item>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="mini" circle style="background-color: #F8F9FA; "> <i class="el-icon-bell"></i></el-button>
        <el-button size="mini" circle style="background-color: #F8F9FA; "><i class="el-icon-shopping-cart-2"></i></el-button>
      </el-menu-item>
    </el-menu>
    <el-container>
      <el-header style="height: 35px;">
        <el-row :gutter="10">

          <el-col :span="1" style="margin-left: 89px;">
            <el-link :underline="false" style="color: #FFFAE8;">家</el-link>
          </el-col>
          <el-col :span="2" style="margin-left: -10px;">
            <el-dropdown>
              <el-link :underline="false" style="color: #FFFAE8;">产品展示<i class="el-icon-arrow-down el-icon--right"></i></el-link>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>趋向</el-dropdown-item>
                <el-dropdown-item>推荐的</el-dropdown-item>
                <el-dropdown-item>受欢迎的</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="2" style="margin-left: -10px;">
            <el-dropdown>
              <el-link :underline="false" style="color: #FFFAE8;">我的订单<i class="el-icon-arrow-down el-icon--right"></i></el-link>
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
        <el-row :gutter="20">
          <el-col :span="20" style="margin-left: 98px;margin-top: 20px;">
            <span>你在找什么?</span>
            <el-button size="small" type="success" plain style="margin-left: 868px;">查看更多</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 15px;">
          <el-col :span="20" style="margin-left: 98px;">
            <el-button style="width: 120px;height: 100px;text-align: center;">海鲜</el-button>
            <el-button style="width: 120px;height: 100px;text-align: center;">牛奶和鸡蛋</el-button>
            <el-button style="width: 120px;height: 100px;text-align: center;">面包</el-button>
            <el-button style="width: 120px;height: 100px;text-align: center;">冰冻的</el-button>
            <el-button style="width: 120px;height: 100px;text-align: center;">有机</el-button>
            <el-button style="width: 120px;height: 100px;text-align: center;">蔬菜</el-button>
            <el-button style="width: 120px;height: 100px;text-align: center;">水果</el-button>
            <el-button style="width: 120px;height: 100px;text-align: center;">肉</el-button>
          </el-col>
          <el-col :span="1" style="margin-left: 98px;">

          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="20" style="margin-left: 98px; margin-top:30px;">
            <span>促销给你</span>
            <el-button size="small" type="success" plain style="margin-left: 908px;">查看更多</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="20" style="margin-left: 98px;">
            <template>
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                  <h3 class="medium">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="20" style="margin-left: 98px;">
            <span>今日精选</span>
            <el-button size="small" type="success" plain style="margin-left: 908px;">查看更多</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-left: 98px;">
          <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
            <div>
              <el-image
                style="width: 230px; height: 155px;margin-top: 20px;"
                src="../images/v1.jpg"
                :fit="fit">
              </el-image>
              辣椒<br />
              $ 0.8 /公斤
            </div>
          </el-col>
          <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
            <div>
              <el-image
                style="width: 230px; height: 155px;margin-top: 20px;"
                src="../images/v1.jpg"
                :fit="fit">
              </el-image>
              辣椒<br />
              $ 0.8 /公斤
            </div>
          </el-col>
          <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
            <div>
              <el-image
                style="width: 230px; height: 155px;margin-top: 20px;"
                src="../images/v1.jpg"
                :fit="fit">
              </el-image>
              辣椒<br />
              $ 0.8 /公斤
            </div>
          </el-col>
          <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
            <div>
              <el-image
                style="width: 230px; height: 155px;margin-top: 20px;"
                src="../images/v1.jpg"
                :fit="fit">
              </el-image>
              辣椒<br />
              $ 0.8 /公斤
            </div>
          </el-col>
          <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
            <div>
              <el-image
                style="width: 230px; height: 155px;margin-top: 20px;"
                src="../images/v1.jpg"
                :fit="fit">
              </el-image>
              辣椒<br />
              $ 0.8 /公斤
            </div>
          </el-col>
          <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
            <div>
              <el-image
                style="width: 230px; height: 155px;margin-top: 20px;"
                src="../images/v1.jpg"
                :fit="fit">
              </el-image>
              辣椒<br />
              $ 0.8 /公斤
            </div>
          </el-col>
          <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
            <div>
              <el-image
                style="width: 230px; height: 155px;margin-top: 20px;"
                src="../images/v1.jpg"
                :fit="fit">
              </el-image>
              辣椒<br />
              $ 0.8 /公斤
            </div>
          </el-col>
          <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
            <div>
              <el-image
                style="width: 230px; height: 155px;margin-top: 20px;"
                src="../images/v1.jpg"
                :fit="fit">
              </el-image>
              辣椒<br />
              $ 0.8 /公斤
            </div>
          </el-col>
        </el-row>


        <el-row :gutter="20">
          <el-col :span="20" style="margin-left: 98px; margin-top:50px;">
            <span>为你推荐</span>
            <el-button size="small" type="success" plain style="margin-left: 908px;">查看更多</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="1" style="margin-left: 98px;margin-bottom: 30px;">
          <el-col :span="7" style="margin-left: 10px;margin-top: 20px;">
            <div class="block">
              <el-carousel trigger="click" height="200px" >
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
          <el-col :span="7" style="margin-left: 10px;margin-top: 20px;">
            <div class="block">
              <el-carousel trigger="click" height="200px" >
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
          <el-col :span="7" style="margin-left: 10px;margin-top: 20px;">
            <div class="block">
              <el-carousel trigger="click" height="200px" >
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
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
            <span>产品展示</span><br />
            <el-link class="el-linka" :underline="false">清单</el-link><br />
            <el-link class="el-linka" :underline="false">详情</el-link><br />
            <el-link class="el-linka" :underline="false">趋向</el-link><br />
            <el-link class="el-linka" :underline="false">推荐的</el-link><br />
            <el-link class="el-linka" :underline="false">最受欢迎的</el-link><br />
          </el-col>
          <el-col :span="4" style="margin-left: 20px; margin-top:30px;">
            <span>结帐流程</span><br />
            <el-link class="el-linka" :underline="false">购物车</el-link><br />
            <el-link class="el-linka" :underline="false">订单地址</el-link><br />
            <el-link class="el-linka" :underline="false">交货时间</el-link><br />
            <el-link class="el-linka" :underline="false">订单付款</el-link><br />
            <el-link class="el-linka" :underline="false">查看</el-link><br />
            <el-link class="el-linka" :underline="false">成功的</el-link><br />
          </el-col>
          <el-col :span="4" style="margin-left: 20px; margin-top:30px;">
            <span>我的订单</span><br />
            <el-link class="el-linka" :underline="false">我的订单</el-link><br />
            <el-link class="el-linka" :underline="false">状态完成</el-link><br />
            <el-link class="el-linka" :underline="false">进行中状态</el-link><br />
            <el-link class="el-linka" :underline="false">状态已取消</el-link><br />
            <el-link class="el-linka" :underline="false">评论</el-link><br />

          </el-col>
          <el-col :span="4" style="margin-left: 20px; margin-top:30px;">
            <span>我的帐户</span><br />
            <el-link class="el-linka" :underline="false">我的帐户</el-link><br />
            <el-link class="el-linka" :underline="false">宣传片</el-link><br />
            <el-link class="el-linka" :underline="false">我的地址</el-link><br />
            <el-link class="el-linka" :underline="false">条款及规则</el-link><br />
            <el-link class="el-linka" :underline="false">帮助支持</el-link><br />
            <el-link class="el-linka" :underline="false">帮助票</el-link><br />
            <el-link class="el-linka" :underline="false">等出</el-link><br />
          </el-col>
          <el-col :span="4" style="margin-left: 20px; margin-top:30px;">
            <span>额外页面</span><br />
            <el-link class="el-linka" :underline="false">促销详情</el-link><br />
            <el-link class="el-linka" :underline="false">条件</el-link><br />
            <el-link class="el-linka" :underline="false">帮助支持</el-link><br />
            <el-link class="el-linka" :underline="false">退款支持</el-link><br />
            <el-link class="el-linka" :underline="false">常见问题</el-link><br />
            <el-link class="el-linka" :underline="false">登入</el-link><br />
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row style="margin-bottom: 35px;">
          <el-col :span="5" style="margin-left: 90px;">
            <span  class="el-linkb">©2020 Grofarweb</span>
            <el-link class="el-linkb" :underline="false">隐私 </el-link>
            <el-link class="el-linkb" :underline="false">条款和条件</el-link>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>


  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {

    }
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }

  },
}
</script>

<style>
#app {
  color: #2c3e50;
}


a {
  color: #42b983;
}

.el-row {


&:last-child {
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
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
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
.el-linka{
  margin-top: 12px;
  font-size: 10px;
}

.el-linkb{
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
</style>
