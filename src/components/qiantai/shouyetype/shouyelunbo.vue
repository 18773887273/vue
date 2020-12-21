<template>
  <div id="banner">
    <div style="width:1050px;margin-left: 100px ">
      <hooper :itemsToShow="3" :infiniteScroll="true">
        <slide>
          <img :src="image1" width="297px" height="155px" />
        </slide>
        <slide>
          <img :src="image2" width="297px" height="155px"  />
        </slide>
        <slide>
          <img :src="image3" width="297px" height="155px"  />
        </slide>
        <slide>
          <img :src="image4" width="297px" height="155px"  />
        </slide>
        <slide>
          <img :src="image5" width="297px" height="155px"  />
        </slide>
        <slide>
          <img :src="image6" width="297px" height="155px"  />
        </slide>

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
</style>
