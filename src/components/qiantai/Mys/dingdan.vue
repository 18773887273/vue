<template>
  <div id="dingdan">
    <el-row>
      <el-col>
        <el-tabs type="card" v-model="activeName" @tab-click="tiao(tab)">
          <router-link to="/alldingdan">
            <el-tag class="tag-size" type="success">全部订单</el-tag>
          </router-link>
          <router-link to="/daifukuan">
            <el-tag class="tag-size" type="success">待付款</el-tag>
          </router-link>
          <router-link to="/fahuozhong">
            <el-tag class="tag-size" type="success">发货中</el-tag>
          </router-link>
          <router-link to="/daitihuo">
            <el-tag class="tag-size" type="success">待提货</el-tag>
          </router-link>
          <router-link to="/yiwancheng">
            <el-tag class="tag-size" type="success">已完成</el-tag>
          </router-link>
          <router-link to="/yiquxiao">
            <el-tag class="tag-size" type="success">已取消</el-tag>
          </router-link>
        </el-tabs>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div  style="margin-top: 20px">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Alldingdan from '../dingdan/alldingdan'
  import Daifukuan from '../dingdan/daifukuan'
  import Daitihuo from '../dingdan/daitihuo'
  import Yiwancheng from '../dingdan/yiwancheng'
  import Yiquxiao from "../dingdan/yiquxiao";
  import Fahouzhong from "../dingdan/fahouzhong";

  export default {
    components: {
      alldingdan: Alldingdan,
      daifukuan: Daifukuan,
      daitihuo: Daitihuo,
      yiwancheng: Yiwancheng,
      yiquxiao: Yiquxiao,
      fahuozhong: Fahouzhong
    },
    name: "dingdan",
    data() {
      return {
        currentTab: "/alldingdan",//默认选择系统推送
        activeName: 'receivedAutoNotice',
      }
    },
    methods: {
      tiao(tab) {
        alert(tab.name)
        this.$router.push({path: "'" + tab.name + "'"});
      }
    }
  }
</script>

<style scoped>
  .tag-size {
    margin-top: 5px;
    margin-left: 22px;
    width: 120px;
    text-align: center;
  }
</style>
