<template>
  <div id="shouye01">
  <el-row :gutter="20">
    <el-col :span="20" style="margin-left: 98px;margin-top: 20px;">
      <span>你在找什么?</span>
      <el-button size="small" type="success" plain style="margin-left: 868px;">查看更多</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="20" style="margin-top: 15px;">
    <el-col :span="20" style="margin-left: 98px;">
      <el-button style="width: 120px;height: 100px;text-align: center;">海鲜</el-button>
      <el-button style="width: 120px;height: 100px;text-align: center;">牛奶和鸡蛋</el-button>
      <el-button style="width: 120px;height: 100px;text-align: center;">面包</el-button>
      <el-button style="width: 120px;height: 100px;text-align: center;">冰冻的</el-button>
      <el-button style="width: 120px;height: 100px;text-align: center;">有机</el-button>
      <el-button style="width: 120px;height: 100px;text-align: center;">蔬菜</el-button>
      <el-button style="width: 120px;height: 100px;text-align: center;">水果</el-button>
      <el-button style="width: 120px;height: 100px;text-align: center;">肉</el-button>
    </el-col>
    <el-col :span="1" style="margin-left: 98px;">

    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="20" style="margin-left: 98px; margin-top:30px;">
      <span>促销给你</span>
      <el-button size="small" type="success" plain style="margin-left: 908px;">查看更多</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="1">
    <el-col :span="20" style="margin-left: 98px;">
      <template>
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="20" style="margin-left: 98px;">
      <span>今日精选</span>
      <el-button size="small" type="success" plain style="margin-left: 908px;">查看更多</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="20" style="margin-left: 98px;">
    <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
      <div>
        <el-image
          style="width: 230px; height: 155px;margin-top: 20px;"
          src="../images/v1.jpg"
          >
        </el-image>
        辣椒<br />
        $ 0.8 /公斤
      </div>
    </el-col>
    <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
      <div>
        <el-image
          style="width: 230px; height: 155px;margin-top: 20px;"
          src="../images/v1.jpg"
         >
        </el-image>
        辣椒<br />
        $ 0.8 /公斤
      </div>
    </el-col>
    <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
      <div>
        <el-image
          style="width: 230px; height: 155px;margin-top: 20px;"
          src="../images/v1.jpg"
         >
        </el-image>
        辣椒<br />
        $ 0.8 /公斤
      </div>
    </el-col>
    <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
      <div>
        <el-image
          style="width: 230px; height: 155px;margin-top: 20px;"
          src="../images/v1.jpg"
          >
        </el-image>
        辣椒<br />
        $ 0.8 /公斤
      </div>
    </el-col>
    <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
      <div>
        <el-image
          style="width: 230px; height: 155px;margin-top: 20px;"
          src="../images/v1.jpg"
         >
        </el-image>
        辣椒<br />
        $ 0.8 /公斤
      </div>
    </el-col>
    <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
      <div>
        <el-image
          style="width: 230px; height: 155px;margin-top: 20px;"
          src="../images/v1.jpg"
          >
        </el-image>
        辣椒<br />
        $ 0.8 /公斤
      </div>
    </el-col>
    <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
      <div>
        <el-image
          style="width: 230px; height: 155px;margin-top: 20px;"
          src="../images/v1.jpg"
         >
        </el-image>
        辣椒<br />
        $ 0.8 /公斤
      </div>
    </el-col>
    <el-col :span="5" style="background-color: white;margin-left: 15px;margin-top: 20px;">
      <div>
        <el-image
          style="width: 230px; height: 155px;margin-top: 20px;"
          src="../images/v1.jpg"
          >
        </el-image>
        辣椒<br />
        $ 0.8 /公斤
      </div>
    </el-col>
  </el-row>


  <el-row :gutter="20">
    <el-col :span="20" style="margin-left: 98px; margin-top:50px;">
      <span>为你推荐</span>
      <el-button size="small" type="success" plain style="margin-left: 908px;">查看更多</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="1" style="margin-left: 98px;margin-bottom: 30px;">
    <el-col :span="7" style="margin-left: 10px;margin-top: 20px;">
      <div class="block">
        <el-carousel trigger="click" height="200px" >
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
    <el-col :span="7" style="margin-left: 10px;margin-top: 20px;">
      <div class="block">
        <el-carousel trigger="click" height="200px" >
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
    <el-col :span="7" style="margin-left: 10px;margin-top: 20px;">
      <div class="block">
        <el-carousel trigger="click" height="200px" >
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: 'shouye01',
  data() {
    return {
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

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
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
