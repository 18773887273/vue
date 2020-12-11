<template>
  <div id="app">
    <!-- @click="drawer = true" -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>


      </el-header>
      <el-container>
        <!-- 左边区域 -->
        <el-aside :width="isCollapse  ? '65px' : '210px'">
          <!--  <el-menu style="height: 900px;"  @select="childMenuSelect"> -->
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu style="height: 880px;" :default-openeds="['1']" :collapse="isCollapse" :unique-opened="true"
                   :default-active="activationInedx" :collapse-transition="false" background-color="#fff" @select="handleSelect">
            <el-submenu :index="item.id" v-for="item in menus" :key="item.path">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.childMenu" :key="subItem.path">
                <template slot="title">
                  <i class="el-icon-menu" style="font-size: 15px"></i>
                  <span>{{ subItem.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>

        </el-aside>
        <!-- 中间区域 -->
        <el-main>
          <el-tabs v-model="editableTabsValue" type="card" closable="closable" @tab-remove="removeTab" @tab-click="tab_click(editableTabsValue)">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            </el-tab-pane>

          </el-tabs>
          <!--<el-tabs>

            <el-tab-pane label="用户管理">
              <el-input style="width: 250px;" clearable v-model="search" placeholder="输入关键字搜索">
                <el-button @click="addUser" slot="append">添加</el-button>
              </el-input>
              <br /><br />

              <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                border>
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="date" label="日期">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column label="操作">
                  <el-button type="warning" icon="el-icon-edit" plain circle></el-button>
                  <el-button type="danger" icon="el-icon-delete" plain circle @click="del"></el-button>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane label="员工管理">
            </el-tab-pane>

          </el-tabs>-->
          <!-- 分页 -->



        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data() {
      return {
        iconsObj: {
          '101': "el-icon-coin",
          '102': "el-icon-house",
          '103': "el-icon-search",
          '104': "el-icon-setting",
        },
        //菜单数据 数组对象
        menus: [],
        editableTabsValue: "welcome",
        activationInedx: "0 ",
        isCollapse: false,
        collapse: true,
        search: '',
        flag: true,
        addDialogVisible: false,
        editableTabs: [{
          title: "首页",
          name: "homepage",
          //closable: false,
          content: "首页",
        }],
      }
    },


      methods: {

      //异步加载数据
      getdata(){
        var _this=this;
        this.$axios.post("/menu/queryallmenus.action",
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
        var _this = this;
        if (this.flag) {
          this.menus.map((item) => {
            const itemList = item.childMenu;
            itemList.map((res) => {
              if (res.path == keys) {
                _this.editableTabs.push({
                  title: res.name,
                  name: keys,
                  content: res.name,
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
