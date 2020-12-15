<template>
  <div id="shoptylist">
    <el-form label-width="100px">
      <el-form-item label="类型名:">
        <el-input v-model="queryshoptyname" style="width: 400px;"></el-input>
        <el-button type="primary" plain @click="getData()" style="width: 100px">查询</el-button>
        <el-button type="primary" plain @click="addshop()"  style="width: 100px;">添加</el-button>
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



    <el-dialog title="添加页面" :visible.sync="addshopdialogFormVisible">

      <addshop ref="addshopchild"></addshop>
      <!--将编辑页面子组件加入到列表页面 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="addshopdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addshopdialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>



export default {
  name: 'shoptylist',
  data() {
    return {
      tableData: [],
      queryshoptyname:'',
      addshopdialogFormVisible: false,
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
    addshop() {
      //index 索引  row对象 修改该条记录对象
      this.addshopdialogFormVisible = true;
    },
    addshopquxiao() {
      this.addshopdialogFormVisible = false;
      this.$refs.addshopchild.addshop = {};
    },
    shopadd() {
      var addshop = this.$refs.addshopchild.addshop;
      var _this = this;
      var shops = new URLSearchParams();
      /*roles.append("rname", addrole.rname);
      roles.append("rremart", addrole.rremart);*/
      this.$axios.post("role/editshop.action", roles).then(function(result) {
        _this.$message({
          message: result.data.msg,
          type: 'success'
        });
        _this.getData();
      })
        .catch(function(error) {
          _this.$message({
            message: '添加失败',
            type: 'error'
          });
        });
      this.$refs.addshopchild.addshop = {};
      this.addshopdialogFormVisible = false;
    },
  },
  created() { //钩子函数  vue对象初始化完成后  执行
    this.getData();
  },
  components: { //子组件

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
