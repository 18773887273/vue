<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16" :offset="2">
        <div id="jiesuan-title-btn" class="jiesuan-title-div-off" @click="openAndClose"><span class="jiesuan-title-p">购物车</span></div>
        <div id="box" class="box">...</div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "jiesuan",
  data() {
    return {}
  },
  methods: {
    openAndClose() {

      let el = document.getElementById("box");
      let dl = document.getElementById("jiesuan-title-btn");
      if (window.getComputedStyle(el).height == "0px") {
        // mac Safari下，貌似auto也会触发transition, 故要none下~
        el.style.transition = "none";
        el.style.height = "auto";
        el.style.transition = "height 600ms"
        el.style.height = "200px";
        el.style.maxHeight = "50px";
        el.style.height = "200px";

        dl.className = 'jiesuan-title-div-oppen'

      } else {
        el.style.height = "0px";
        setTimeout(() => {
          dl.className = 'jiesuan-title-div-off'
        }, 600);

      }
    },
  }
}


</script>

<style scoped>
.box {
  background: white;
  overflow: hidden;
  max-height: 0px;
  max-width: 780px;
}



.jiesuan-title-div-off {
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom: 2px solid #28A745;
  text-align: center;
  width: 780px;
  height: 50px;
  background: white;
}
.jiesuan-title-div-oppen {
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  text-align: center;
  width: 780px;
  height: 50px;
  background: white;
}
</style>
