<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div id="app">
        <el-form  :inline="true" class="demo-form-inline" >
          <el-form-item label="商品名">
            <el-input v-model="queryshopname" style="width: 400px;"></el-input>
            <el-button type="primary" plain @click="getData()">查询</el-button>
            <el-button type="primary" plain @click="addcaigou()">采购</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%" border
                  :header-cell-style="headClass" :cell-style="rowClass" :row-class-name="tableRowClassName"

                  max-height="500"  border ref="multipleTable"
                  @selection-change="changeFun"
        >
          <el-table-column
            type="selection" ref="multipleTable"
            width="55"></el-table-column>
          <el-table-column prop="shopid" label="ID">
          </el-table-column>
          <el-table-column label="商品名">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p><img :src="scope.row.shopimg" min-width="100"  height="100"/></p><br>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.shopname }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="shoptyid.shoptyname" label="类型">
          </el-table-column>
          <el-table-column prop="shopmiaoshu" label="描述">
          </el-table-column>
          <el-table-column prop="shopprice" label="价格">
          </el-table-column>
          <el-table-column prop="shopdanwei" label="单位">
          </el-table-column>
          <el-table-column prop="wareid" label="进货仓库" width="180">
            <template slot-scope="scope">
              <el-select v-model="scope.row.wareid">
                <el-option :key="0" :label="xuanze"
                           :value="0">
                </el-option>
                <el-option v-for="item in warehouseData" :key="item.wareid" :label="item.warename"
                           :value="item.wareid">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="采购数量" width="180">
            <template slot-scope="scope">
              <el-input-number style="width: 150px" v-model="scope.row.number" controls-position="right"
                               :min="0"></el-input-number>
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
        multipleSelection:"",
        xuanze:'请选择',
        warehouseData:[],
        username:sessionStorage.getItem('username')
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
      warehouse(){
        var _this = this;
        _this.$axios.post("warehouse/queryall.action").then(function (result) {
          _this.warehouseData = result.data;
        })
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
      pagechange(pageindex) {
        this.page = pageindex;
        //根据pageindex  获取数据
        this.getData();

      },
      queryshop() {

      },
      addcaigou(){
        var _this = this;
        if (this.multipleSelection[0] == undefined) {
          this.$message({
            message: '请现在商品进行采购',
            type: 'error'
          });
          return;
        }
        for (var i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].wareid == 0) {
            this.$message({
              message: '请选择采购的仓库',
              type: 'error'
            });
            return;
          }
          if (this.multipleSelection[i].number == 0) {
            this.$message({
              message: '请选择需要采购的商数量',
              type: 'error'
            });
            return;
          }
        }
        this.$confirm('此操作将转移勾选的商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //商品id
          var shopid = "";
          //仓库id
          var warehouseid = "";
          //采购数量
          var shopcount = "";

          var wsshid = "";
          for (var i = 0; i < this.multipleSelection.length; i++) {
            shopid += this.multipleSelection[i].shopid + ",";
            warehouseid += this.multipleSelection[i].wareid + ",";
            shopcount += this.multipleSelection[i].number + ",";
          }
          // alert(shopid+"商品id"+"/n"+warehouseid+"转移仓库id"+"/n"+shopcount+"转移数量")
          var warehouses = new URLSearchParams();
          warehouses.append("shopid", shopid);
          warehouses.append("warehouseid", warehouseid);
          warehouses.append("shopcount", shopcount);
          //采购人
          warehouses.append("username", _this.username);
          this.$axios.post("warehouse/caigou.action", warehouses).then(function (result) {
              _this.$message({
                message: result.data.msg,
                type: result.data.type
              });
              _this.wareshopzhuanyidialogTableVisible = false;
            })
            .catch(function (error) {
              _this.$message({
                message: '采购失败',
                type: 'error'
              });
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消采购'
          });
        });
      },
      headClass() { //表头居中显示
        return "text-align:center"
      },
      rowClass() { //表格数据居中显示
        return "text-align:center"
      }
    },
    created() { //钩子函数  vue对象初始化完成后  执行
      this.warehouse();
      this.getData();
    },
    components: { //子组件
      addshop: Addshop,
    }

  }
</script>

<style>


</style>
