<template>
  <div id="banner">
    <div style="margin-left: 300px;margin-right: 300px;">
      <hooper :itemsToShow="6" :infiniteScroll="true">
        <slide>
          <img :src="image1" width="297px" height="155px" />
        </slide>
        <slide>
          <img :src="image2" width="297px" height="155px" style="margin-left: 10px" />
        </slide>
        <slide>
          <img :src="image3" width="297px" height="155px"  style="margin-left: 10px"/>
        </slide>
        <slide>
          <img :src="image4" width="297px" height="155px" style="margin-left: 10px"/>
        </slide>
        <slide>
          <img :src="image5" width="297px" height="155px" style="margin-left: 10px"/>
        </slide>
        <slide>
          <img :src="image6" width="297px" height="155px" style="margin-left: 10px"/>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>

        <hooper-pagination slot="hooper-addons"></hooper-pagination>
      </hooper>
    </div>
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
    return {
      image1: require("../../../images/qianduan/mxt.png"),
      image2: require("../../../images/qianduan/mxt.png"),
      image3: require("../../../images/qianduan/mxt.png"),
      image4: require("../../../images/qianduan/mxt.png"),
      image5: require("../../../images/qianduan/mxt.png"),
      image6: require("../../../images/qianduan/mxt.png"),
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

<style scoped>

</style>
