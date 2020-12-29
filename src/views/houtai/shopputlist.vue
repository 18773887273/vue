<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div id="app">
        <el-form :inline="true" class="demo-form-inline" style="margin-top: 0px">
          <el-form-item label="商品名">
            <el-input v-model="queryshopname" style="width: 200px;" size="small"></el-input>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-select v-model="queryshoptyid"
                       style="width: 200px;"  size="small">
              <el-option :key="0" :label="suoyou" :value="0"></el-option>
              <el-option v-for="item in shoptypelist" :key="item.shoptyid" :label="item.shoptyname"
                         :value="item.shoptyid">
              </el-option>
            </el-select>
            <el-button type="primary" plain @click="getData()"  size="small">查询</el-button>
            <el-button type="success" plain @click="addshopput()"  size="small">上架商品</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%" border
                  :header-cell-style="headClass" :cell-style="rowClass" :row-class-name="tableRowClassName">
          <el-table-column prop="shopid.shopname" label="商品名">
          </el-table-column>
          <el-table-column prop="shopid.shoptyid.shoptyname" label="类型">
          </el-table-column>
          <el-table-column prop="shopid.shopprice" label="进货价">
            <template slot-scope="scope">
              {{scope.row.shopid.shopprice}}元
            </template>
          </el-table-column>
          <el-table-column prop="shopzhe" label="折扣">
            <template slot-scope="scope">
              <span v-if="scope.row.shopzhe!=10">{{scope.row.shopzhe}}折</span>
              <span v-if="scope.row.shopzhe==10">商品暂时无折扣</span>
            </template>
          </el-table-column>
          <el-table-column prop="shopputprice" label="零售价">
            <template slot-scope="scope">
              {{scope.row.shopputprice}}元/{{scope.row.shopid.shopdanwei}}
            </template>
          </el-table-column>
          <el-table-column prop="shopid.shopimg " label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.shopid.shopimg" min-width="70" height="50"/>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="success" @click="editshopput(scope.row)"  size="small" plain circle>编辑</el-button>
              <el-popconfirm title="确定下架该商品吗？" @confirm="delshopput(scope.row)">
                <el-button type="danger" slot="reference" plain circle  size="small">下架</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="pagechange"
                       :page-size="rows"
                       layout="total, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>

        <el-dialog :visible.sync="addshopputdialogFormVisible" style="width:1700px;margin-left: -100px" >
          <div slot="title" class="dialog-title">
            <i class="el-icon-circle-plus-outline"></i>
            <span class="title-text">商品上架添加</span>
            <div class="button-right">
              <span class="title-close"></span>
            </div>
          </div>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="商品名">
              <el-input v-model="queryshopname1" style="width: 200px;" size="small"></el-input>
              <el-button type="primary" plain @click="shopshangjia()" size="small">查询</el-button>
            </el-form-item>
          </el-form>
          <el-row :gutter="22">
            <el-col :span="22" :offset="1">
              <el-table :data="tableData1" stripe style="width: 100%" border max-height="500"
                        :header-cell-style="headClass" :cell-style="rowClass" :row-class-name="tableRowClassName" border
                        ref="multipleTable"
                        @selection-change="changeFun1"
              >

                <el-table-column
                  type="selection" ref="multipleTable"
                  width="55"></el-table-column>
                <el-table-column label="商品名" prop="shopname">
                </el-table-column>
                <el-table-column prop="shopimg " label="图片">
                  <template slot-scope="scope">
                    <img :src="scope.row.shopimg" min-width="70" height="50"/>
                  </template>
                </el-table-column>


                <el-table-column prop="shopprice" label="进货价格">
                  <template slot-scope="scope">
                    {{scope.row.shopprice}}元/{{scope.row.shopdanwei}}
                  </template>
                </el-table-column>

                <el-table-column prop="wareid" label="商品上架价格" width="180">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.number" controls-position="right" :precision="2"
                                     :step="1" :min="0" :max="1000000"
                                     size="small"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column prop="wareid" label="商品上架折扣" width="180">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.wareid" controls-position="right"
                                     :step="1" :min="1" :max="10" :precision="0"
                                     size="small"></el-input-number>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <!--将编辑页面子组件加入到列表页面 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="addshopputdialogFormVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="shopputadd()"  size="small">上 架</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="editshopputdialogFormVisible">
          <div slot="title" class="dialog-title">
            <i class="el-icon-edit-outline"></i>
            <span class="title-text">编辑上架商品</span>
            <div class="button-right">
              <span class="title-close"></span>
            </div>
          </div>
          <editshopput ref="editshopputchild"></editshopput>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editshopputdialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="shopputsave()">修改</el-button>
          </div>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>

<script>

  import Editshopput from "../../components/houtai/shopput/editshopput.vue"

  export default {
    name: 'app',
    data() {
      return {
        queryshopname1: '',
        queryshopname: '',
        tableData: [],
        tableData1:[],
        multipleSelection1:[],
        addshopputdialogFormVisible: false,
        editshopputdialogFormVisible: false,
        total: 1,
        page: 1,
        rows: 6,
        minprice: 0,
        maxprice: 1000000,
        shoptypelist: [],
        queryshoptyid: 0,
        suoyou: "全部",
        multipleSelection: [],
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      }
    },
    methods: {
      shopputadd() {
        var _this = this;
        if (this.multipleSelection[0] == undefined) {
          this.$message({
            message: '请选择商品上架',
            type: 'error'
          });
          return;
        }
        for (var i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].number == 0) {
            this.$message({
              message: '上架的商品价格不能为0',
              type: 'error'
            });
            return;
          }
        }
        this.$confirm('此操作将上架勾选的商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var shopids = "";
          var shopputprice = "";
          var shopputzhekou = "";
          for (var i = 0; i < this.multipleSelection.length; i++) {
            shopids += this.multipleSelection[i].shopid + ",";
            shopputzhekou += this.multipleSelection[i].wareid + ",";
            shopputprice += this.multipleSelection[i].number + ",";
          }
          var shopputs = new URLSearchParams();
          shopputs.append("shopids", shopids);
          shopputs.append("shopputprice", shopputprice);
          shopputs.append("shopputzhekou", shopputzhekou);
          this.$axios.post("shopput/addshopput.action", shopputs).then(function (result) {
            _this.getData(() => {
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
              _this.addshopputdialogFormVisible = false;
            });
          })
            .catch(function (error) {
              _this.$message({
                message: '修改失败',
                type: 'error'
              });
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消转移'
          });
        });
      },
      getshoptylist() { //获取数据方法
        var _this = this;
        this.$axios.post("shoptype/queryall.action").then(function (result) {
          _this.shoptypelist = result.data;
        }).catch(function (error) {
          alert(error)
        });
      },
      getData(func) { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", _this.page);
        params.append("shopid.shopname", _this.queryshopname)
        params.append("shopid.shoptyid.shoptyid", _this.queryshoptyid);
        params.append("rows", this.rows);
        this.$axios.post("shopput/queryLikehoutai.action", params).then(function (result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
          func && func();
        }).catch(function (error) {
          alert(error)
        });
      },
      pagechange(pageindex) {
        this.page = pageindex;
        this.getData();
      },
      shopputsave() {
        var _this = this;
        var editshopput = this.$refs.editshopputchild.editshopput;
        var shops = new URLSearchParams();
        shops.append("shopputid", editshopput.shopputid);
        shops.append("shopputprice", editshopput.shopputprice);
        shops.append("shopzhe", editshopput.shopzhe);
        this.$axios.post("shopput/editshopput.action", shops).then(function (result) {
          _this.getData(() => {
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
          });
        })
          .catch(function (error) {
            alert(error)
          });
        _this.editshopputdialogFormVisible = false;
        this.$refs.editshopputchild.editshopput = {};
      },
      delshopput(row) {
        var _this = this;
        //异步获取数据
        var params = new URLSearchParams();
        params.append("shopputid", row.shopputid);
        this.$axios.post("shopput/delshopput.action", params).then(function (result) {
          _this.getData(() => {
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
          });
        })
          .catch(function (error) {
            alert(error)
          })
      },
      editshopput(row) {
        setTimeout(() => {
          this.selectDate = {
            ...row
          }
          this.$refs.editshopputchild.editshopput = this.selectDate;
        })
        //index 索引  row对象 修改该条记录对象
        this.editshopputdialogFormVisible = true;
      },
      shopshangjia(){
        var _this = this;
        var shops = new URLSearchParams();
        shops.append("shopname", this.queryshopname1);
        this.$axios.post("shop/queryallshangjia.action",shops).then(function (result) {
          _this.tableData1 = result.data;
        }).catch(function (error) {
          alert(error)
        });
      },
      addshopput() {
        var _this = this;
        _this.shopshangjia();
        this.addshopputdialogFormVisible = true;
      },
      headClass() { //表头居中显示
        return "text-align:center"
      },
      rowClass() { //表格数据居中显示
        return "text-align:center"
      },
      changeFun1(val) {
        this.multipleSelection = val;
      },
      shopadd() {
        var _this = this;
        var addshop = _this.$refs.addshopchild.addshop;
        var shopimg = _this.$refs.addshopchild.imageUrl;
        var fileList = _this.$refs.addshopchild.fileList;
        var fileurl = "";
        for (var i = 0; i < fileList.length; i++) {
          fileurl += fileList[i].url + ",";
        }
        var shops = new URLSearchParams();
        shops.append("shopname", addshop.shopname);
        shops.append("shoptyid.shoptyid", addshop.shoptyid);
        shops.append("shopmiaoshu", addshop.shopmiaoshu);
        shops.append("shopprice", addshop.shopprice);
        shops.append("shopimg", shopimg);
        shops.append("shopdanwei", addshop.shopdanwei);
        shops.append("fileurl", fileurl);
        this.$axios.post("shop/editshop.action", shops).then(function (result) {
          _this.getData(() => {
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
          });
        })
          .catch(function (error) {
            _this.$message({
              message: '添加失败',
              type: 'error'
            });
          });
        this.$refs.addshopchild.addshop = {};
        this.$refs.addshopchild.fileList = [];
        this.$refs.addshopchild.imageUrl = '';
        this.addshopdialogFormVisible = false;
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 1) {
          return 'info-row';
        } else {
          return 'success-row';
        }
        return '0';
      }
    },
    created() { //钩子函数  vue对象初始化完成后  执行
      this.getshoptylist();
      this.getData();
    },
    components: { //子组件
      editshopput: Editshopput,
    }

  }
</script>

<style>

</style>
