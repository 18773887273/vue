

  <template>
    <el-container>

      <el-header>
        <div style="float: left; cursor:pointer" @click="isOpen">
          <i :class="{'el-icon-s-fold': isCollapse == false?true:false, 'el-icon-s-unfold': isCollapse == true?true:false}"></i>
        </div>
        <el-dropdown trigger="click" style="cursor: pointer; float: right">
          <i class="fa fa-ellipsis-v fa-lg"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>关闭全部页面</el-dropdown-item>
            <el-dropdown-item>刷新页面</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container :style="{height: setHeight+'px'}">
        <el-aside style="width: auto">
          <el-menu :default-active="String(activeNav)" router class="el-menu-vertical-demo" :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">基础设置</span>
              </template>
              <el-menu-item index="/nav">导航</el-menu-item>
              <el-menu-item index="/mineInfo">个人信息</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="fa fa-book"></i>
                <span slot="title">文章管理</span>
              </template>
              <el-menu-item index="/fuillEditor">fuillEditor</el-menu-item>
              <el-menu-item index="/category">分类管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main :style="{height: setHeight+'px', padding: 0}">
          <el-tabs v-model="activeTab" type="card" @tab-remove="removeTab" @tab-click="tabClick">
            <el-tab-pane v-for="(item, index) in tabsItem"
                         :key="item.name"
                         :label="item.title"
                         :name="item.name"
                         :closable="item.closable"
                         :ref="item.ref">
              <component :is="item.content"></component>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </template>


  <script>
    export default {
      data() {
        return {
          isCollapse: false,  //false为展开 true为收缩
          activeTab: '1', //默认显示的tab
          tabIndex: 1, //tab目前显示数
          tabsItem: [
            {
              title: '首页',
              name: '1',
              closable: false,
              ref: 'tabs',
              content: welcome
            }
          ],
          tabsPath: [{
            name: "1",
            path: '/welcome'
          }]
        }
      },
      methods: {
        isOpen() { //判断左侧栏是否展开或收缩
          if (this.isCollapse == false) {
            this.isCollapse = true
          } else {
            this.isCollapse = false
          }
        },
        removeTab(targetName) { //删除Tab
          let tabs = this.tabsItem; //当前显示的tab数组
          let activeName = this.activeTab; //点前活跃的tab

          //如果当前tab正活跃 被删除时执行
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                  this.tabClick(nextTab)
                }
              }
            });
          }
          this.activeTab = activeName;
          this.tabsItem = tabs.filter(tab => tab.name !== targetName);
          //在tabsPath中删除当前被删除tab的path
          this.tabsPath = this.tabsPath.filter(item => item.name !== targetName)
        },
        tabClick(thisTab) {
          /*
          * thisTab:当前选中的tabs的实例
          * 通过当前选中tabs的实例获得当前实例的path 重新定位路由
          * */
          let val = this.tabsPath.filter(item => thisTab.name == item.name)
          this.$router.push({
            path: val[0].path
          })
        }

      }
    }
  </script>




<style scoped>

</style>
