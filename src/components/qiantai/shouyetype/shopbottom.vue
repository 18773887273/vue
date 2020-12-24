<template>
  <el-row :gutter="24">
    <el-col :span="24" :offset="1">
      <div id="banner">
        <el-col :span="8" style="margin-left: 10px;margin-top: 20px;">
          <div class="block">
            <el-carousel trigger="click" height="200px">
              <el-carousel-item v-for="item in 3" :key="item">
                <h3 class="small">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
        <el-col :span="8" style="margin-left: 10px;margin-top: 20px;">
          <div class="block">
            <el-carousel trigger="click" height="200px">
              <el-carousel-item v-for="item in 3" :key="item">
                <h3 class="small">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
        <el-col :span="8" style="margin-left: 10px;margin-top: 20px;">
          <div class="block">
            <el-carousel trigger="click" height="200px">
              <el-carousel-item v-for="item in 3" :key="item">
                <h3 class="small">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
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

</style>
