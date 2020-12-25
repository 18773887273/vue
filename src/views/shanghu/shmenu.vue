<template>
  <div>
    <el-menu
      router
      :unique-opened="true"
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-postcard"></i>资料维护</template>
        <router-link to="personal"><el-menu-item index="personal">个人资料维护</el-menu-item></router-link>
        <el-menu-item to="mendianweihu" index="mendianweihu">门店资料维护</el-menu-item>
      </el-submenu>
      <router-link to="orders"><el-menu-item index="orders" style="float: left"><i class="el-icon-sell"></i>订单管理</el-menu-item></router-link>
      <el-menu-item index="3"><i class="el-icon-s-data"></i>统计营收</el-menu-item>
      <el-menu-item index="4"><i class="el-icon-chat-dot-square"></i>消息中心</el-menu-item>
      <el-col :span="8" style="float: right;margin-top: 10px">
        <div id="clock">
          <p class="date">{{ date }}</p>
          <p class="time">{{ time }}</p>
        </div>
      </el-col>
        <div style="margin-top: 20px;margin-left: 100px;color: #daf6ff;float: left;font-size: 14px">欢迎:
      <label >{{shname}}</label>
      </div>
    </el-menu>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    import Personal from '../../components/shanghu/maintain/personal'
    import Orders from '../../components/shanghu/orders/orders'
    import Mendianweihu from "../../components/shanghu/maintain/mendianweihu";
    export default {
        name: "shmenu.vue",
      comments:{
          personal:Personal,
          orders:Orders,
          mendianweihu:Mendianweihu
      },
      data() {
        return {
          shid:sessionStorage.getItem('shid'),
          shname: sessionStorage.getItem('shname'),
          activeIndex: '1',
          activeIndex2: 'personal',
          date:'',
          time:'',
          week : ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        };
      },
      mounted:function(){//定时执行更新时间的方法
        let _this = this ;
        _this.$nextTick(function () {
          setInterval(_this.updateTime, 1000);
        })
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        //更新时间的方法
        updateTime:function () {
          let _this = this ;
          let cd = new Date();
          //this.date;
          _this.time = _this.zeroPadding(cd.getHours(), 2) + ':'
            + _this.zeroPadding(cd.getMinutes(), 2) + ':'
            + _this.zeroPadding(cd.getSeconds(), 2);
          _this.date = _this.zeroPadding(cd.getFullYear(), 4) + '-'
            + _this.zeroPadding(cd.getMonth()+1, 2) + '-'
            + _this.zeroPadding(cd.getDate(), 2) + ' '
            + _this.week[cd.getDay()];
        },
        //更新时间的辅助方法
        zeroPadding:function(num, digit) {
          let zero = '';
          for(let i = 0; i < digit; i++) {
            zero += '0';
          }
          return (zero + num).slice(-digit);
        }
      },
      created() {   //钩子函数  组件创建好后，去浏览器获取登录成功的用户名，如果没有，跳转登录页面
        var shname = sessionStorage.getItem("shname");
        console.log(shname)
        if (shname == undefined || shname == null || shname == '') {
          this.$router.push("/login2");
        }

      }
    }
</script>

<style scoped>
  p {
    margin: 0;
    padding: 0;
  }
  #clock {
    font-family: 'Microsoft YaHei','Lantinghei SC','Open Sans',Arial,'Hiragino Sans GB','STHeiti','WenQuanYi Micro Hei','SimSun',sans-serif;
    color: #daf6ff;
  }

  #clock .time {
    letter-spacing: 0.05em;
    font-size: 14px;
    padding: 5px 0;
    text-align: center;
  }
  #clock .date {
    text-align: center;
    letter-spacing: 0.1em;
    font-size: 14px;
  }

</style>
