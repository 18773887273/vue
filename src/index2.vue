<template>
  <div id="app" class="homeWrap">
    <el-container style="height:100%" direction="vertical">
      <el-header height="100px" >Header</el-header>
      <el-container>
        <el-aside>

          <el-button
            size="small"
            @click="addTab('用户列表','userlist')"
          >用户列表
          </el-button>
<br>
            <el-button
              size="small"
              @click="addTab('部门列表','deptlist')"
            >部门列表
            </el-button>

        </el-aside>
        <el-main>

          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <component :is="item.content"></component>
            </el-tab-pane>
          </el-tabs>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import MenuVue from '../components/menu.vue'
  import Userlist from "../components/userlist";
  import Deptlist from "../components/deptlist";

    export default {
        components:{
          menuvue:MenuVue,
          userlist:Userlist,
          deptlist:Deptlist
        },
      data(){
          return {
            editableTabsValue: '1',
            editableTabs: [],
            tabIndex: 0
          }
      },

      methods: {
        addTab(titleName,comval) {


          var res =this.editableTabs.filter((item)=>{return  item.title ==titleName});
          if(res.length==0){
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
              title: titleName,
              name: newTabName,
              content: comval
            });
            this.editableTabsValue = newTabName;
          }else{
            this.editableTabsValue =res[0].name;
          }

        },
        removeTab(targetName) {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
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
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  .homeWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

</style>
