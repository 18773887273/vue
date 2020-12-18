<template>
  <div id="app">
    <!-- @click="drawer = true" -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <span>欢迎{{username}}登陆</span>

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
  export default {
    components:{
      yonghu:Yonghu,
      employlist:Employ,
      shouquan:Shouquan,
      warehouse:Warehouse,
      rolelist:Role,
      shoptype:Shoptype,
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
</style>
