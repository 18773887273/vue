<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div id="app">
        <el-form :inline="true" class="demo-form-inline" style="margin-top: 0px">
          <el-form-item label="商品名">
            <el-input v-model="queryshopname" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-select v-model="queryshoptyid"
                       style="width: 200px;">
              <el-option :key="0" :label="suoyou" :value="0"></el-option>
              <el-option v-for="item in shoptypelist" :key="item.shoptyid" :label="item.shoptyname"
                         :value="item.shoptyid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" plain @click="getData()">查询</el-button>
          <el-button type="success" plain @click="addshop()">添加</el-button>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%" border
                  :header-cell-style="headClass" :cell-style="rowClass" :row-class-name="tableRowClassName">
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
            <template slot-scope="scope">
              <img :src="scope.row.shopimg" min-width="70"  height="50"/>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="success" @click="editshop(scope.row)" plain circle>编辑</el-button>
              <el-popconfirm title="确定删除该商品吗？" @confirm="delshop(scope.row)">
                <el-button type="danger" slot="reference" plain circle>删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="pagechange"
                       :page-size="rows"
                       layout="total, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>

        <el-dialog :visible.sync="addshopdialogFormVisible" :before-close="addshophandleClose">
          <div slot="title" class="dialog-title">
            <i class="el-icon-circle-plus-outline"></i>
            <span class="title-text">商品添加</span>
            <div class="button-right">
              <span class="title-close"></span>
            </div>
          </div>
          <addshop ref="addshopchild"></addshop>
          <!--将编辑页面子组件加入到列表页面 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="addshopdialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="shopadd">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="editshopdialogFormVisible" :before-close="editshophandleClose">
          <div slot="title" class="dialog-title">
            <i class="el-icon-edit-outline"></i>
            <span class="title-text">商品编辑</span>
            <div class="button-right">
              <span class="title-close"></span>
            </div>
          </div>
          <editshop ref="editshopchild"></editshop>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editshopdialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="shopsave()">修改</el-button>
          </div>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>

<script>

  import Addshop from "../../components/houtai/shop/addshop.vue"
  import Editshop from "../../components/houtai/shop/editshop.vue"

  export default {
    name: 'app',
    data() {
      return {
        queryshopname: '',
        tableData: [],
        addshopdialogFormVisible: false,
        editshopdialogFormVisible: false,
        total: 1,
        page: 1,
        rows: 6,
        minprice: 0,
        maxprice: 1000000,
        shoptypelist: [],
        queryshoptyid: 0,
        suoyou: "全部",
        multipleSelection:[]
      }
    },
    methods: {
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
        params.append("shopname", _this.queryshopname)
        params.append("shoptyid.shoptyid", _this.queryshoptyid);
        params.append("rows", this.rows);
        this.$axios.post("shop/querylike.action", params).then(function (result) {
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
      addshophandleClose(done) {
        var _this = this;
        this.$confirm('确认关闭？')
          .then(_ => {
            _this.$refs.addshopchild.addshop = {};
            done();
          })
          .catch(_ => {
          });
      },
      editshophandleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      shopsave() {
        var _this = this;
        var editshop = this.$refs.editshopchild.editshop;
        var shopimg = this.$refs.editshopchild.imageUrl;
        var fileList=_this.$refs.editshopchild.fileList;
        var fileurl = "";
        for (var i = 0; i < fileList.length; i++) {
          fileurl += fileList[i].url + ",";
        }
        var shops = new URLSearchParams();
        shops.append("shopid", editshop.shopid);
        shops.append("shopname", editshop.shopname);
        shops.append("shoptyid.shoptyid", editshop.shoptyid);
        shops.append("shopmiaoshu", editshop.shopmiaoshu);
        shops.append("shopprice", editshop.shopprice);
        shops.append("shopimg", shopimg);
        shops.append("shopdanwei", editshop.shopdanwei);
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
              message: '修改失败',
              type: 'error'
            });
          });
        _this.editshopdialogFormVisible = false;
        this.$refs.editshopchild.editshop = {};
        this.$refs.editshopchild.fileList = [];
        this.$refs.editshopchild.imageUrl = '';
      },
      delshop(row){
        var _this = this;
        //异步获取数据
        var params = new URLSearchParams();
        params.append("shopid", row.shopid);
        this.$axios.post("shop/delshop.action", params).then(function (result) {
          _this.getData(() => {
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
          });
        })
          .catch(function (error) {
            _this.$message({
              message: '删除失败',
              type: 'error'
            });
          });
      },
      editshop(row) {
        var _this = this;
        this.$axios.post("shoptype/queryall.action").then(function (result) {
          _this.$refs.editshopchild.shoptylist2 = result.data;
        }).catch(function (error) {
          alert(error)
        });
        setTimeout(() => {
          this.selectDate = {
            ...row
          }
          for (var i=0;i<this.selectDate.shopxqs.length;i++){
            _this.$refs.editshopchild.fileList.push({url:this.selectDate.shopxqs[i].shopimg})
          }
          _this.$refs.editshopchild.imageUrl = this.selectDate.shopimg;
          this.$refs.editshopchild.editshop = this.selectDate;
          this.$refs.editshopchild.editshop.shoptyid = this.selectDate.shoptyid.shoptyid;
        })
        //index 索引  row对象 修改该条记录对象
        this.editshopdialogFormVisible = true;
      },
      addshop() {
        var _this = this;
        this.$axios.post("shoptype/queryall.action").then(function (result) {
          _this.$refs.addshopchild.shoptylist1 = result.data;
        }).catch(function (error) {
          alert(error)
        });
        this.addshopdialogFormVisible = true;
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
        var fileList=_this.$refs.addshopchild.fileList;
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
        shops.append("fileurl",fileurl);
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
      tableRowClassName({
                          row,
                          rowIndex
                        }) {
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
      addshop: Addshop,
      editshop: Editshop,
    }

  }
</script>

<style>

</style>
