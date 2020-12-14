<template>
  <div id="app">
    <el-form label-width="100px">
      <el-form-item label="商品名:">
        <el-input v-model="queryshopname"></el-input>
      </el-form-item>
      <el-button type="info" plain @click="queryrole()">查询</el-button>
      <el-button type="primary" plain @click="addshop()">添加</el-button>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="shopid" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="shopname" label="商品名" width="180">
      </el-table-column>
      <el-table-column prop="shoptyid.shoptyname" label="类型">
      </el-table-column>
      <el-table-column prop="shopmiaoshu" label="描述">
      </el-table-column>
      <el-table-column prop="shopprice" label="价格">
      </el-table-column>
      <el-table-column prop="shopdanwei" label="单位">
      </el-table-column>
      <el-table-column prop="shopimg " label="图片">
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

    <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]">
    </el-tree>



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

  import Addshop from "../../components/houtai/shop/addshop.vue"

  export default {
    name: 'app',
    data() {
      return {
        tableData: [],
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
        params.append("minprice", this.minprice);
        params.append("maxprice", this.maxprice);
        this.$axios.post("shop/querylike.action",params).
        then(function(result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
        }).
        catch(function(error) {
          alert(error)
        });

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
      addshop: Addshop,
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}



</style>
