<template>
  <el-row :gutter="24">
    <el-col :span="21"  :offset="1">
      <div id="banner">
        <div style="width:1093px;margin-left: 0px ">
          <hooper :itemsToShow="3" :infiniteScroll="true">
            <slide>
              <img class="main_body_commodityImg" :src="image1" width="344px" height="168px"/>
            </slide>
            <slide>
              <img class="main_body_commodityImg" :src="image2" width="344px" height="168px"/>
            </slide>
            <slide>
              <img class="main_body_commodityImg" :src="image3" width="344px" height="168px"/>
            </slide>
            <slide>
              <img class="main_body_commodityImg" :src="image4" width="344px" height="168px"/>
            </slide>
            <slide>
              <img class="main_body_commodityImg" :src="image5" width="344px" height="168px"/>
            </slide>
            <slide>
              <img class="main_body_commodityImg" :src="image6" width="344px" height="168px"/>
            </slide>

          </hooper>
        </div>
      </div>
    </el-col>
  </el-row>
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
    return {
      image1: require("../../../images/qianduan/lunbo/lunbo1.jpg"),
      image2: require("../../../images/qianduan/lunbo/lunbo2.jpg"),
      image3: require("../../../images/qianduan/lunbo/lunbo3.jpg"),
      image4: require("../../../images/qianduan/lunbo/lunbo4.jpg"),
      image5: require("../../../images/qianduan/lunbo/lunbo1.jpg"),
      image6: require("../../../images/qianduan/lunbo/lunbo2.jpg"),
    };
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

<style>
.hooper:focus {
  outline: none;
}

.main_body_commodityImg {
  transition: all 0.5s; /*鼠标经过图片放大*/
  cursor: pointer;
  height: 85%;
  width: 98%;
  margin-top: 15px;
}

.main_body_commodityImg:hover {
  transform: scale(1.1); /*动画效果放慢*/
}
</style>
