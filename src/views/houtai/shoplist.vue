<template>
  <div id="app">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="shopid" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="shopname" label="商品名" width="180">
      </el-table-column>
      <el-table-column prop="shoptyid" label="类型">
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
          <el-button type="success" @click="edituser(scope.row.id)">编辑</el-button>

          <el-popconfirm title="确定删除这条记录吗？" @confirm="deluser(scope.row.id)">
            <el-button type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
    </el-pagination>

    <el-dialog title="编辑页面" :visible.sync="dialogFormVisible">
      <h1>加载添加页面/编辑页面</h1>
      <edituser></edituser>
      <!--将编辑页面子组件加入到列表页面 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
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
      deluser(val) { //删除数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", val);

        this.$axios.post("deteleuser.action", params).
        then(function(result) {
          _this.$message({
            message: result.data.msg,
            type: 'success'
          });

          //刷新数据
          _this.getData();

        }).
        catch(function() {
          _this.$message({
            message: '删除失败',
            type: 'success'
          });
        });

      },
      edituser(val) { //编辑按钮按下  打开编辑模态框
        //获取到要编辑的巨记录  通过val（id）
        this.dialogFormVisible = true;

      },
      pagechange(pageindex){  //页码变更时
        //console.log(pageindex)
        this.page = pageindex;
        //根据pageindex  获取数据
        this.getData();

      }
    },
    created() { //钩子函数  vue对象初始化完成后  执行
      this.getData();
    },
    components: { //子组件

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

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
