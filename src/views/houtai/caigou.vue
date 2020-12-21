<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div id="app">
        <el-form  :inline="true" class="demo-form-inline" style="margin-top: -50px">
          <el-form-item label="商品名">
            <el-input v-model="queryshopname" style="width: 400px;"></el-input>
            <el-button type="primary" plain @click="getData()">查询</el-button>
            <el-button type="primary" plain @click="addshop()">添加</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%" border
                  :header-cell-style="headClass" :cell-style="rowClass" :row-class-name="tableRowClassName"

                  max-height="500"  border ref="multipleTable"
                  @selection-change="changeFun1"
        >
          <el-table-column
            type="selection" ref="multipleTable"
            width="55"></el-table-column>
          <el-table-column prop="shopid" label="ID">
          </el-table-column>
          <el-table-column prop="shopname" label="商品名">
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
          <el-table-column prop="shopid.number" label="退货数量" width="180">
            <template slot-scope="scope">
              <el-input-number style="width: 150px" v-model="scope.row.shopid.number" controls-position="right"
                               :min="0" :max="scope.row.shopcount"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="pagechange"
                       :page-size="rows"
                       layout="total, prev, pager, next, jumper"
                       :total="total">
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
    </el-col>
  </el-row>
</template>

<script>

  import Addshop from "../../components/houtai/shop/addshop.vue"

  export default {
    name: 'app',
    data() {
      return {
        queryshopname: '',
        tableData: [],
        addshopdialogFormVisible: false,
        total: 1,
        page: 1,
        rows:6,
        minprice: 0,
        maxprice: 1000000,
        multipleSelection:""
      }
    },
    methods: {
      tableRowClassName({
                          row,
                          rowIndex
                        }) {
        if (rowIndex % 2 == 1) {
          return 'info-row';
        } else {
          return 'success-row';
        }
        return '';
      },
      changeFun(val) {
        this.multipleSelection = val;
      },
      getData() { //获取数据方法

        var _this = this;

        var params = new URLSearchParams();
        params.append("page", this.page);
        params.append("shopname", this.queryshopname)
        params.append("minprice", this.minprice);
        params.append("rows", this.rows);
        params.append("maxprice", this.maxprice);
        this.$axios.post("shop/querylike.action", params).then(function (result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
        }).catch(function (error) {
          alert(error)
        });

      },
      pagechange(pageindex) {  //页码变更时
        //console.log(pageindex)
        this.page = pageindex;
        //根据pageindex  获取数据
        this.getData();

      },
      queryshop() {

      },
      /*addshop() {
        //index 索引  row对象 修改该条记录对象
        this.addshopdialogFormVisible = true;
      },*/
      /*addshopquxiao() {
        this.addshopdialogFormVisible = false;
        this.$refs.addshopchild.addshop = {};
      },*/
      headClass() { //表头居中显示
        return "text-align:center"
      },
      rowClass() { //表格数据居中显示
        return "text-align:center"
      },
      shopadd() {
        var addshop = this.$refs.addshopchild.addshop;
        var _this = this;
        var shops = new URLSearchParams();
        /*roles.append("rname", addrole.rname);
        roles.append("rremart", addrole.rremart);*/
        this.$axios.post("role/editshop.action", roles).then(function (result) {
          _this.$message({
            message: result.data.msg,
            type: 'success'
          });
          _this.getData();
        })
          .catch(function (error) {
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
    color: #2c3e50;
    text-align: center;
  }


</style>
