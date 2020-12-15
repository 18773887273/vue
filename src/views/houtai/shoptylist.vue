<template>
  <div id="shoptylist">
    <el-form label-width="100px">
      <el-form-item label="类型名:">
        <el-input v-model="queryshoptyname" style="width: 400px;"></el-input>
        <el-button type="primary" plain @click="getData()" style="width: 100px">查询</el-button>
        <el-button type="primary" plain @click="addshopty()"  style="width: 100px;">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="shoptyid" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="shoptyname" label="商品类型名" width="180">
      </el-table-column>
      <el-table-column prop="shopremart" label="类型描述">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="editrole(scope.row)" plain circle>编辑</el-button>
          <el-popconfirm title="确定删除这条记录吗？" @confirm="delrole(scope.row)">
            <el-button type="danger" slot="reference" plain circle>删除</el-button>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>

    <el-pagination id="app1" @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
    </el-pagination>



    <el-dialog title="添加类型" :visible.sync="addshoptydialogFormVisible">

      <addShopty ref="addshoptychild"></addShopty>
      <!--将编辑页面子组件加入到列表页面 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="addshopquxiao()">取 消</el-button>
        <el-button type="primary" @click="shoptyadd()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import AddShopty from '../../components/houtai/shopty/addshopty.vue'

export default {
  name: 'shoptylist',
  data() {
    return {
      tableData: [],
      queryshoptyname:'',
      addshoptydialogFormVisible: false,
      total:1,
      page:1,
      minprice:0,
      maxprice:1000000
    }
  },
  methods: {
    getData() { //获取数据方法

      var _this = this;

      var params = new URLSearchParams();
      params.append("page", this.page);
      params.append("shoptyname",this.queryshoptyname)
      this.$axios.post("shoptype/querylike.action",params).
      then(function(result) {
        _this.tableData = result.data.rows;
        _this.total = result.data.total;
      }).
      catch(function(error) {
        alert(error)
      });

    },
    pagechange(pageindex){  //页码变更时
      //console.log(pageindex)
      this.page = pageindex;
      //根据pageindex  获取数据
      this.getData();

    },
    addshopty() {
      //index 索引  row对象 修改该条记录对象
      this.addshoptydialogFormVisible = true;
    },
    addshopquxiao() {
      this.addshoptydialogFormVisible = false;
      this.$refs.addshoptychild.addshoptype = {};
    },
    shoptyadd() {
      var addshopty = this.$refs.addshoptychild.addshoptype;
      var _this = this;
      var shoptype = new URLSearchParams();
      shoptype.append("shoptyname",addshopty.shoptyname)
      shoptype.append("shopremart",addshopty.shoptymiaoshu)
      this.$axios.post("shoptype/editshoptype.action", shoptype).then(function(result) {
        if (result.data.msg=="添加成功"){
          _this.$message({
            message: result.data.msg,
            type: 'success'
          });

          _this.getData();

        }
      }).catch(function(error) {
          _this.$message({
            message: error,
            type: 'error'
          });
        });
      _this.$refs.addshoptychild.addshoptype = {};
      _this.addshoptydialogFormVisible = false;

    },
  },
  created() { //钩子函数  vue对象初始化完成后  执行
    this.getData();
  },
  components: { //子组件
      addShopty:AddShopty,
  }
}
</script>

<style>
#app1 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

#shoptylist {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}



</style>
