<template>
  <div id="app">
    <!-- @click="drawer = true" -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <el-row>
        <el-col :span="3">
          <el-image :src="image1"  style="width: 100px; height: 50px"></el-image>
        </el-col>

        <el-col :span="3">
          <span>欢迎{{username}}登陆</span>
        </el-col>
        <el-col :span="2" class="grid-content bg-purple">
          <div  class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
          <h1>小跳购后台管理系统</h1>
        </el-col>
        <el-col :span="6" >
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="2">
          <div  v-on:click="tuchu">
          <i class="el-icon-switch-button" style="color: red;" >退出</i>
          </div>
        </el-col>
        </el-row>
      </el-header>
      <el-container>
        <!-- 左边区域 -->
        <el-aside :width="isCollapse  ? '65px' : '210px'">
          <!--  <el-menu style="height: 900px;"  @select="childMenuSelect"> -->
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu style="height: 880px;"
                   router
                   :collapse="isCollapse"
                   :unique-opened="true"
                   :default-active="activationInedx"
                   :collapse-transition="false"
                   background-color="#fff"
                   @select="handleSelect">
            <el-submenu :index="item.id" v-for="item in menus" :key="item.path">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.childMenu" :key="subItem.path">
                <template slot="title">
                  <i class="el-icon-menu" style="font-size: 15px"></i>
                  <span>{{ subItem.name}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>

        </el-aside>
        <!-- 中间区域 -->
        <el-main>
          <el-tabs v-model="editableTabsValue" type="card" closable="closable" @tab-remove="removeTab" @tab-click="tab_click(editableTabsValue)">
            <el-tab-pane v-for="item in editableTabs"
                         :key="item.name"
                         :label="item.title"
                         :name="item.name">
              <component :is="item.content"></component>
            </el-tab-pane>

          </el-tabs>



        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import  Yonghu from '../../components/houtai/yuangong'
  import  Employ from '../../views/houtai/employlist'
  import  Shouquan from '../../views/houtai/shouquan'
  import  Warehouse from '../../views/houtai/warehouse'
  import  Role from '../../views/houtai/rolelist'
  import  Shoptype from '../../views/houtai/shoptylist.vue'
  import  Shop from '../../views/houtai/shoplist.vue'
  import  Caigou from '../../views/houtai/caigou.vue'
  import  Shanghulist from '../../views/houtai/shanghulist'
  import Xbbaobiao from "./xbbaobiao";
  import Churukubaobiao from "./churukubaobiao";
  import Caiwubaobiao from "./caiwubaobiao";
  import Shshenhe from "./shshenhe";
  import Shopput from "./shopputlist";
  /*订单管理*/
  import Allorders from '../../views/houtai/allorder.vue'
  import Daipeisong from '../../views/houtai/daipsorder.vue'
  import Peisongzhong from '../../views/houtai/peiszorder.vue'
  import Yipeisong from '../../views/houtai/yipsorder.vue'
  export default {
    components:{
      yonghu:Yonghu,
      employlist:Employ,
      shouquan:Shouquan,
      warehouse:Warehouse,
      rolelist:Role,
      shoptype:Shoptype,
      shoplist:Shop,
      caigou:Caigou,
      peisongzhong:Peisongzhong,
      allorder:Allorders,
      daipeisong:Daipeisong,
      yipeisong:Yipeisong,
      shanghulist:Shanghulist,
      xbbaobiao:Xbbaobiao,
      caiwubaobiao:Caiwubaobiao,
      churukubaobiao:Churukubaobiao,
      shshenhe:Shshenhe,
      shopput:Shopput
    },
    data() {
      return {
        username: sessionStorage.getItem('username'),
        iconsObj: {
          '101': "el-icon-coin",
          '102': "el-icon-house",
          '103': "el-icon-search",
          '104': "el-icon-setting",
        },
        //菜单数据 数组对象
        menus: [],
        editableTabsValue: "welcome",
        activationInedx: "0",
        isCollapse: false,
        collapse: true,
        search: '',
        flag: true,
        addDialogVisible: false,
        editableTabs: [{
          title: "首页",
          name: "homepage",
          content: "首页",

        }],
        image1:require("../../images/qianduan/mxt.png"),
      }
    },
    /*,*/
    methods: {
      //异步加载数据
      getdata(){
        var _this=this;
        var params = new URLSearchParams();
        params.append("username", this.username);
        this.$axios.post("/menu/queryall.action",params,
          {emulateJSON:true}).
        then(function(result) {
          //alert(result.data)
          _this.menus=result.data;
          //console.log(_this.data)
        }.bind(this)).
        catch(function(error) {
          alert("error")
        });
      },
      //折叠菜单栏
      toggleCollapse() {
        this.isCollapse = !this.isCollapse;
      },
      //选中tab菜单触发事件
      tab_click(index) {
        // 对子菜单的联动
        this.activationInedx = "/" + index;
      },
      //点击菜单项触发事件
      handleSelect(key, keyPath) {
        const keys = key.split("/")[1];
        var _this = this;
        for (let s = 0; s < this.editableTabs.length; s++) {
          this.editableTabs.map((tabs) => {
            if (tabs.name == keys) {
              _this.editableTabsValue = keys;
              _this.activationInedx = "/" + keys;
              _this.flag = false;
            }
          })
        }
        if (this.flag) {
          this.menus.map((item) => {
            const itemList = item.childMenu;
            itemList.map((res) => {
              if (res.path == keys) {
                //alert(res.path)
                _this.editableTabs.push({
                  title: res.name,
                  name: keys,
                  content:res.path
                });
                _this.editableTabsValue = keys;
                _this.activationInedx = "/" + keys;
              }
            });
          });
        }
        this.flag = true;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (targetName === "homepage") {
          return;
        }
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      },
      tuchu(){
        //alert(111)
        sessionStorage.clear();
        this.$router.push({path:'/'})
      }
    },
    created() {
      this.getdata();
    }
  }
</script>

<style>
  * {
    margin: 0px;
    padding: 0px;
  }
  .el-tabs__nav .el-tabs__item:nth-child(1) span {
    display: none;
  }
  .toggle-button {
    background-color: #409eff;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .el-main {
    text-align: center;
  }
  .el-header {
    text-align: center;
    border-bottom: 1px solid #E6E6E6;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }

  .el-row {
    margin-bottom: 20px;
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
    background: white;
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
</style>
