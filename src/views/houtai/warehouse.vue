<template>
  <div id="app">
    <el-row :gutter="20">
      <el-col :span="22" :offset="1">
        <!-- 条件查询-->
        <el-form :inline="true" class="demo-form-inline" style="margin-top: -50px">
          <el-form-item label="仓库名">
            <el-input v-model="querywarehousename" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="仓库地址">
            <el-input v-model="querywarehouseaddress" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="querywarehouse()" plain>查询</el-button>
            <el-button type="success" @click="addwarehouse()" plain>添加</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="warehousetableData" style="width: 100%" :row-class-name="tableRowClassName" max-height="437px"
                  border :header-cell-style="headClass" :cell-style="rowClass">
          <el-table-column prop="wareid" label="编号">
          </el-table-column>
          <el-table-column label="仓库名称">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>仓库负责人:{{scope.row.empid.empname}}</p><br>
                <p>联系电话:{{scope.row.empid.empnumber}}</p><br>
                <p>地址: {{scope.row.wareaddress }}</p><br>
                <p>备注: {{ scope.row.wareremark }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.warename }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="warecount" label="最大容量">
          </el-table-column>
          <el-table-column prop="shopcount" label="目前容量">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <el-table :data="scope.row.wareshops" max-height="500"
                          :header-cell-style="headClass" :cell-style="rowClass">
                  <el-table-column prop="shopid.shopname" label="商品名">
                  </el-table-column>
                  <el-table-column prop="shopid.shopimg " label="图片">
                    <template slot-scope="scope">
                      <img :src="scope.row.shopid.shopimg" min-width="70"  height="70"/>
                    </template>
                  </el-table-column>
                  <el-table-column prop="shopcount" label="库存">
                  </el-table-column>
                  <el-table-column prop="shopid.shopdanwei" label="单位">
                  </el-table-column>
                </el-table>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.shopcount }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="typecount" label="商品种类">
          </el-table-column>
          <el-table-column label="操作" width="260">
            <template slot-scope="scope">
              <el-button type="success" @click="editwarehouse(scope.row)" plain circle>编辑</el-button>
              <el-popconfirm title="确定删除这条记录吗？" @confirm="delwarehouse(scope.row)">
                <el-button type="danger" slot="reference" plain circle>删除</el-button>
              </el-popconfirm>
              <el-button type="primary" plain circle @click="wareshopzhuanyi(scope.row)">转移</el-button>
              <el-button type="info" plain circle @click="wareshoptuihuo(scope.row)">退货</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页显示  -->
        <el-pagination @current-change="pagechange"
                       :page-size="rows"
                       layout="total, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
        <!--模态框  -->
        <el-dialog :visible.sync="editwarehousedialogFormVisible" :before-close="editwarehousehandleClose">
          <div slot="title" class="dialog-title">
            <i class="el-icon-edit-outline"></i>
            <span class="title-text">仓库编辑</span>
            <div class="button-right">
              <span class="title-close"></span>
            </div>
          </div>
          <editwarehouse ref="editwarehousechild"></editwarehouse>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editwarehousedialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="warehousesave()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="addwarehousedialogFormVisible" :before-close="addwarehousehandleClose">
          <div slot="title" class="dialog-title">
            <i class="el-icon-circle-plus-outline"></i>
            <span class="title-text">仓库添加</span>
            <div class="button-right">
              <span class="title-close"></span>
            </div>
          </div>
          <addwarehouse ref="addwarehousechild"></addwarehouse>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addwarehousequxiao()">取 消</el-button>
            <el-button type="primary" @click="warehouseadd()">添加</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="wareshopzhuanyidialogTableVisible" style="width:1700px;margin-left: -100px">
          <div slot="title" class="dialog-title">
            <i class="el-icon-chat-line-square"></i>
            <span class="title-text">{{warexiangqing}}</span>
            <div class="button-right">
              <span class="title-close"></span>
            </div>
          </div>
          <el-row :gutter="22">
            <el-col :span="22" :offset="1">
              <el-table :data="wareshopData" max-height="500" border :row-class-name="tableRowClassName"
                        border :header-cell-style="headClass" :cell-style="rowClass" ref="multipleTable"
                        @selection-change="changeFun">
                <el-table-column
                  type="selection"
                  width="55"></el-table-column>
                <el-table-column prop="shopid.shopname" label="商品名">
                </el-table-column>
                <el-table-column prop="shopid.shoptyid.shoptyname" label="类型">
                </el-table-column>
                <el-table-column prop="shopid.shopdanwei" label="单位">
                </el-table-column>
                <el-table-column prop="shopcount" label="库存">
                </el-table-column>
                <el-table-column prop="shopid.wareid" label="转移仓库" width="180">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.shopid.wareid">
                      <el-option :key="0" :label="xuanze"
                                 :value="0">
                      </el-option>
                      <el-option v-for="item in warehouseData" :key="item.wareid" :label="item.warename"
                                 :value="item.wareid">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>

                <el-table-column prop="shopid.number" label="转移数量" width="180">
                  <template slot-scope="scope">
                    <el-input-number style="width: 150px" v-model="scope.row.shopid.number" controls-position="right"
                                     :min="0" :max="scope.row.shopcount"></el-input-number>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button @click="wareshopzhuanyidialogTableVisible=false">取 消</el-button>
            <el-button type="primary" @click="wareshopzhuanyi1">转移</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="wareshoptuihuodialogTableVisible" style="width:1700px;margin-left: -100px">
          <div slot="title" class="dialog-title">
            <i class="el-icon-chat-line-square"></i>
            <span class="title-text">{{warexiangqing}}</span>
            <div class="button-right">
              <span class="title-close"></span>
            </div>
          </div>
          <el-row :gutter="22">
            <el-col :span="22" :offset="1">
              <el-table :data="wareshopData" max-height="500" border :row-class-name="tableRowClassName"
                        border :header-cell-style="headClass" :cell-style="rowClass" ref="multipleTable"
                        @selection-change="changeFun1">
                <el-table-column
                  type="selection" ref="multipleTable"
                  width="55"></el-table-column>
                <el-table-column prop="shopid.shopname" label="商品名">
                </el-table-column>
                <el-table-column prop="shopid.shoptyid.shoptyname" label="类型">
                </el-table-column>
                <el-table-column prop="shopid.shopprice" label="价格(元)">
                </el-table-column>
                <el-table-column prop="shopid.shopdanwei" label="单位">
                </el-table-column>
                <el-table-column prop="shopid.shopimg " label="图片">
                </el-table-column>
                <el-table-column prop="shopcount" label="库存">
                </el-table-column>
                <el-table-column prop="shopid.number" label="退货数量" width="180">
                  <template slot-scope="scope">
                    <el-input-number style="width: 150px" v-model="scope.row.shopid.number" controls-position="right"
                                     :min="0" :max="scope.row.shopcount"></el-input-number>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button @click="wareshoptuihuodialogTableVisible=false">取 消</el-button>
            <el-button type="primary" @click="wareshoptuihuo1">退货</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<style>
</style>

<script>
  import Editwarehouse from "../../components/houtai/warehouse/editwarehouse.vue"
  import Addwarehouse from "../../components/houtai/warehouse/addwarehouse.vue"

  export default {
    name: 'app',
    data() {
      return {
        //num: 1
        editwarehousedialogFormVisible: false,
        addwarehousedialogFormVisible: false,
        wareshoptuihuodialogTableVisible: false,
        wareshopzhuanyidialogTableVisible: false,
        warehousetableData: [],
        wareshopData: [],
        multipleSelection: [],
        total: 1,
        page: 1,
        rows: 6,
        xuanze: "请选择",
        selectDate: {},
        querywarehousename: "",
        querywarehouseaddress: "",
        editwarecount: 0,
        warexiangqing: "",
        warehouseData: [],
        wareid1: "",
        multipleSelection1: [],
        zhuanyi: {
          wareid: 1,
          warecount: 1
        },
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
      getData(func) { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        params.append("warename", this.querywarehousename);
        params.append("wareaddress", this.querywarehouseaddress);
        params.append("page", this.page);
        params.append("rows", _this.rows);
        this.$axios.post("warehouse/querylike.action", params).then(function (result) {
          _this.warehousetableData = result.data.rows;
          _this.total = result.data.total;
          func && func();
        }).catch(function (error) {
          alert(error)
        });
      },
      changeFun(val) {
        this.multipleSelection = val;
      },
      changeFun1(val) {
        this.multipleSelection1 = val;
      },
      wareshopzhuanyi(row) {
        var _this = this;
        this.wareshopData = row.wareshops;
        _this.wareid1 = row.wareid;
        _this.$axios.post("warehouse/queryall.action").then(function (result) {
          _this.warehouseData = result.data.filter(function (item) {
            return item.wareid != _this.wareid1;
          });
        })
        this.warexiangqing = row.warename + "----商品转移";
        this.wareshopzhuanyidialogTableVisible = true;
      },
      wareshoptuihuo(row) {
        this.wareid1 = row.wareid;
        this.wareshopData = row.wareshops;
        this.warexiangqing = row.warename + "----商品退货";
        this.wareshoptuihuodialogTableVisible = true;
      },
      wareshopzhuanyi1() {
        var _this = this;
        if (this.multipleSelection[0] == undefined) {
          this.$message({
            message: '请现在商品进行转移',
            type: 'error'
          });
          return;
        }
        for (var i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].shopid.wareid == 0) {
            this.$message({
              message: '请选择转移的仓库',
              type: 'error'
            });
            return;
          }
        }
        for (var i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].shopid.number == 0) {
            this.$message({
              message: '请选择需要转移的商品 数量',
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
          var shopid = "";
          var warehouseid = "";
          var shopcount = "";
          var wsshid = "";
          var wareid = this.wareid1;
          for (var i = 0; i < this.multipleSelection.length; i++) {
            shopid += this.multipleSelection[i].shopid.shopid + ",";
            warehouseid += this.multipleSelection[i].shopid.wareid + ",";
            shopcount += this.multipleSelection[i].shopid.number + ",";
            wsshid += this.multipleSelection[i].wsshid + ",";
          }
          // alert(shopid+"商品id"+"/n"+warehouseid+"转移仓库id"+"/n"+shopcount+"转移数量")
          var warehouses = new URLSearchParams();
          warehouses.append("shopid", shopid);
          warehouses.append("warehouseid", warehouseid);
          warehouses.append("shopcount", shopcount);
          warehouses.append("wareid", wareid);
          warehouses.append("wsshid", wsshid);
          warehouses.append("username", _this.username);
          this.$axios.post("warehouse/zhuanyi.action", warehouses).then(function (result) {
            _this.getData(() => {
              _this.$message({
                message: result.data.msg,
                type: result.data.type
              });
              _this.wareshopzhuanyidialogTableVisible = false;
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
      wareshoptuihuo1() {
        var _this = this;
        if (_this.multipleSelection1[0] == undefined) {
          this.$message({
            message: '请现在商品进行退货',
            type: 'error'
          });
          return;
        }
        for (var i = 0; i < this.multipleSelection1.length; i++) {
          if (this.multipleSelection1[i].shopid.number == 0) {
            this.$message({
              message: '请选择需要退货的商品数量',
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
          var shopcount = "";
          var wsshid = "";
          var warehouseid = "";
          var shopid = "";
          var wareid = this.wareid1;
          for (var i = 0; i < this.multipleSelection1.length; i++) {
            shopcount += this.multipleSelection1[i].shopid.number + ",";
            wsshid += this.multipleSelection1[i].wsshid + ",";
            shopid += this.multipleSelection1[i].shopid.shopid + ",";
          }
          var warehouses = new URLSearchParams();
          warehouses.append("shopcount", shopcount);
          warehouses.append("wsshid", wsshid);
          warehouses.append("wareid", wareid);
          warehouses.append("username", _this.username);
          warehouses.append("shopid", shopid);
          this.$axios.post("warehouse/tuihuo.action", warehouses).then(function (result) {
            _this.getData(() => {
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
              _this.wareshoptuihuodialogTableVisible = false;
            });
          })
            .catch(function (error) {
              _this.$message({
                message: error,
                type: 'error'
              });
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退货'
          });
        })
      },
      addwarehousehandleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$refs.addwarehousechild.addwarehouse = {};
            done();
          })
          .catch(_ => {
          });
      },
      editwarehousehandleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      querywarehouse() {
        this.getData();
      },
      //选中行进行修改
      editwarehouse(row) {
        var _this = this;
        this.$axios.post("employ/queryall.action").then(function (result) {
          _this.$refs.editwarehousechild.editemploys = result.data;
        }).catch(function (error) {
          alert(error)
        });
        setTimeout(() => {
          this.selectDate = {
            ...row
          }
          _this.editwarecount = row.shopcount;
          this.$refs.editwarehousechild.editwarehouse = this.selectDate;
        })
        //index 索引  row对象 修改该条记录对象
        this.editwarehousedialogFormVisible = true;
      },
      addwarehouse() {
        var _this = this;
        this.$axios.post("employ/queryall.action").then(function (result) {
          _this.$refs.addwarehousechild.addemploys = result.data;
        }).catch(function (error) {
          alert(error)
        });
        //index 索引  row对象 修改该条记录对象
        this.addwarehousedialogFormVisible = true;
      },
      addwarehousequxiao() {
        this.addwarehousedialogFormVisible = false;
        this.$refs.addwarehousechild.addwarehouse = {};
      },
      warehouseadd() {
        var addwarehouse = this.$refs.addwarehousechild.addwarehouse;
        var _this = this;
        var warehouses = new URLSearchParams();
        warehouses.append("warename", addwarehouse.warename);
        warehouses.append("wareremark", addwarehouse.wareremark);
        warehouses.append("warecount", addwarehouse.warecount);
        warehouses.append("empid.empid", addwarehouse.empid);
        warehouses.append("wareaddress", addwarehouse.wareaddress);
        this.$axios.post("warehouse/editwarehouse.action", warehouses).then(function (result) {
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
        this.$refs.addwarehousechild.addwarehouse = {};
        this.addwarehousedialogFormVisible = false;
      },
      //修改保存操作
      warehousesave() {
        var _this = this;
        var editwarehouse = this.$refs.editwarehousechild.editwarehouse;
        if (editwarehouse.warecount < _this.editwarecount) {
          _this.$message({
            message: '仓库最大容量不能小于当前容量',
            type: 'error'
          });
          return;
        }
        var warehouses = new URLSearchParams();
        warehouses.append("wareid", editwarehouse.wareid);
        warehouses.append("warename", editwarehouse.warename);
        warehouses.append("wareremark", editwarehouse.wareremark);
        warehouses.append("warecount", editwarehouse.warecount);
        warehouses.append("empid.empid", editwarehouse.empid.empid);
        warehouses.append("wareaddress", editwarehouse.wareaddress);
        this.$axios.post("warehouse/editwarehouse.action", warehouses).then(function (result) {
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
        this.editwarehousedialogFormVisible = false;
      },
      //删除选中行
      delwarehouse(row) {
        var _this = this;
        //异步获取数据
        var params = new URLSearchParams();
        if (row.shopcount != 0) {
          _this.$message({
            message: '该仓库还存在商品,不能删除该仓库',
            type: 'error'
          });
          return;
        }
        params.append("wareid", row.wareid);
        this.$axios.post("warehouse/delwarehouse.action", params).then(function (result) {
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
      pagechange(pageindex) {
        //console.log(pageindex)
        this.page = pageindex;
        this.getData();
      },
      headClass() { //表头居中显示
        return "text-align:center"
      },
      rowClass() { //表格数据居中显示
        return "text-align:center"
      },
    },
    components: { //子组件
      editwarehouse: Editwarehouse,
      addwarehouse: Addwarehouse
    },
    created: function () {
      this.getData();
    }
  }
</script>
