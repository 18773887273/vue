<template>
  <div id="banner">
    <el-row :gutter="24">
      <el-col :span="21" :offset="1">

        <div style="margin-left: 0px">
          <hooper :itemsToShow="8" :infiniteScroll="true">
            <slide >
              <el-button style="width: 105px;height: 98px;text-align: center;">
                <i class="el-icon-my-haixian" style="font-size: 40px"> </i><br>
                海鲜
              </el-button>
            </slide>
            <slide >
              <el-button style="width: 105px;height: 98px;text-align: center;">
                <i class="el-icon-my-rou" style="font-size: 40px"> </i><br>
                肉类
              </el-button>
            </slide>
            <slide >
              <el-button style="width: 105px;height: 98px;text-align: center;">
                <i class="el-icon-my-shucai" style="font-size: 40px"> </i><br>
                蔬菜
              </el-button>
            </slide>
            <slide >
              <el-button style="width: 105px;height: 98px;text-align: center;">
                <i class="el-icon-my-naishiping" style="font-size: 40px"> </i><br>
                奶制品
              </el-button>
            </slide>
            <slide >
              <el-button style="width: 105px;height: 98px;text-align: center;">
                <i class="el-icon-my-mianbao" style="font-size: 40px"> </i><br>
                面包
              </el-button>
            </slide>
            <slide >
              <el-button style="width: 105px;height: 98px;text-align: center;">
                <i class="el-icon-my-yingliao" style="font-size: 40px"> </i><br>
                酒水饮料
              </el-button>
            </slide>
            <slide >
              <el-button style="width: 105px;height: 98px;text-align: center;">
                <i class="el-icon-my-lingshi" style="font-size: 40px"> </i><br>
                休闲零食
              </el-button>
            </slide>
            <slide >
              <el-button style="width: 105px;height: 98px;text-align: center;"  >
                <i class="el-icon-my-shuigou" style="font-size: 40px"> </i><br>
                水果
              </el-button>
            </slide>
          </hooper>
        </div>

      </el-col>
    </el-row>
  </div>
</template>
<script>
import 'hooper/dist/hooper.css';
import {
  Hooper,
  Slide,
  Progress as HooperProgress,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from 'hooper';

export default {
  name: "banner",
  data() {
    return {};
  },
  methods: {
    al() {
      alert(1)
    },
  },
  components: {
    Hooper,
    Slide,
    HooperProgress,
    HooperPagination,
    HooperNavigation
  },
};
</script>

<style scoped>
.hooper:focus {
  outline: none;
}

.hooper-navigation {
  outline: none;
}

.el-icon-my-shucai {
  background: url("../../../images/qianduan/icon/shucai.png") center no-repeat;
}

.el-icon-my-shucai:before {
  content: "\8d3a";
  font-size: 64px;
  visibility: hidden;
}

.el-icon-my-haixian {
  background: url("../../../images/qianduan/icon/haixian.png") center no-repeat;
}

.el-icon-my-haixian:before {
  content: "\8d3a";
  font-size: 64px;
  visibility: hidden;
}

.el-icon-my-rou {
  background: url("../../../images/qianduan/icon/rou.png") center no-repeat;
}

.el-icon-my-rou:before {
  content: "\8d3a";
  font-size: 64px;
  visibility: hidden;
}

.el-icon-my-mianbao {
  background: url("../../../images/qianduan/icon/mianbao.png") center no-repeat;
}

.el-icon-my-mianbao:before {
  content: "\8d3a";
  font-size: 64px;
  visibility: hidden;
}

.el-icon-my-yingliao {
  background: url("../../../images/qianduan/icon/yingliao.png") center no-repeat;
}

.el-icon-my-yingliao:before {
  content: "\8d3a";
  font-size: 64px;
  visibility: hidden;
}

.el-icon-my-naishiping {
  background: url("../../../images/qianduan/icon/naizhiping.png") center no-repeat;
}

.el-icon-my-naishiping:before {
  content: "\8d3a";
  font-size: 64px;
  visibility: hidden;
}

.el-icon-my-shuigou {
  background: url("../../../images/qianduan/icon/shuiguo.png") center no-repeat;
}

.el-icon-my-shuigou:before {
  content: "\8d3a";
  font-size: 64px;
  visibility: hidden;
}

.el-icon-my-lingshi {
  background: url("../../../images/qianduan/icon/零食.png") center no-repeat;
}

.el-icon-my-lingshi:before {
  content: "\8d3a";
  font-size: 64px;
  visibility: hidden;
}

</style>
