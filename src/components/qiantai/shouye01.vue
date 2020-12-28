<template>
  <div id="shouye01">
  <el-row :gutter="20">
    <el-col :span="24" style="margin-left:105px;margin-top: 46px;">
      <span>你在找什么?</span>
      <el-button size="small" type="success" plain style="margin-left: 871px;">查看更多</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="22" style="margin-top: 26px;">
    <el-col :span="24" style="margin-left: 39px; " >
    <sypeye></sypeye>
    </el-col>

    <el-col :span="1" style="margin-left: 98px;">

    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="24" style="margin-left: 105px; margin-top:0px;">
      <span>促销给你</span>
      <el-button size="small" type="success" plain style="margin-left: 901px;">查看更多</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="22" style="margin-top: 26px;">
    <el-col :span="24" style="margin-left:39px; ">
      <lunbo></lunbo>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="20" style="margin-left: 105px;">
      <span>今日精选</span>
      <el-button size="small" type="success" plain style="margin-left: 901px;">查看更多</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="24" style="margin-left: 25px;">
    <distilled></distilled>
  </el-row>


  <el-row :gutter="24">
    <el-col :span="24" style="margin-left: 105px; margin-top:50px;">
      <span>为你推荐</span>
      <el-button size="small" type="success" plain style="margin-left: 901px;">查看更多</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="24" style="margin-left: 75px;margin-bottom: 30px;">
    <el-col :span="7" style="margin-top: 20px;">
      <div class="block">
        <el-carousel trigger="click" height="200px" >
          <el-carousel-item v-for="item in img" >
           <el-image :src="item.img1"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
    <el-col :span="7" style="margin-left:25px;margin-top: 20px;">
      <div class="block">
        <el-carousel trigger="click" height="200px" >
          <el-carousel-item v-for="item in img2" >
            <el-image :src="item.imgz"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
    <el-col :span="7" style="margin-left:25px;margin-top: 20px;">
      <div class="block">
        <el-carousel trigger="click" height="200px" >
          <el-carousel-item v-for="item in img3" >
            <el-image :src="item.imgx"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>

import Tupianqie1 from  '../../components/qiantai/shouyetype/typeye'
import Shouyelunbo from "./shouyetype/shouyelunbo";
import Shouyedistilled from "./shouyetype/shouyedistilled";
import Shopbottom from "./shouyetype/shopbottom";

import {
  Hooper,
  Slide,
  Progress as HooperProgress,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from 'hooper';

export default {
  name: 'shouye01',
  data() {
    return {
      img:[
        {img1:require("../../images/qianduan/distilled/r1.jpg")},
        {img1:require("../../images/qianduan/distilled/r2.jpg")},
        {img1:require("../../images/qianduan/distilled/r3.jpg")}
      ],
      img2:[
        {imgz:require("../../images/qianduan/distilled/r4.jpg")},
        {imgz:require("../../images/qianduan/distilled/r5.jpg")},
        {imgz:require("../../images/qianduan/distilled/r6.jpg")}
      ],
      img3:[
        {imgx:require("../../images/qianduan/distilled/r7.jpg")},
        {imgx:require("../../images/qianduan/distilled/r8.jpg")},
        {imgx:require("../../images/qianduan/distilled/r9.jpg")}
      ],
      dialog: false,
      loading: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      timer: null,
    }
  },
  components: {
    shopbottom:Shopbottom,
    sypeye:Tupianqie1,
    lunbo:Shouyelunbo,
    distilled:Shouyedistilled,
    Hooper,
    Slide,
    HooperProgress,
    HooperPagination,
    HooperNavigation
  },
  methods: {
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  }


}
</script>

<style scoped>
.el-col {
  border-radius: 4px;

}

.bg-purple-dark {
  background: #99a9bf;
}

</style>
