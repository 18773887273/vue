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
                <p>地址: {{ scope.row.wareaddress }}</p><br>
                <p>备注: {{ scope.row.wareremark }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.warename }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="empid.empname" label="仓库负责人">
          </el-table-column>
          <el-table-column prop="warecount" label="最大容量">
          </el-table-column>
          <el-table-column prop="shopcount" label="目前容量">
          </el-table-column>
          <el-table-column prop="typecount" label="商品种类">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="success" @click="editwarehouse(scope.row)" plain circle>编辑</el-button>
              <el-popconfirm title="确定删除这条记录吗？" @confirm="delwarehouse(scope.row)">
                <el-button type="danger" slot="reference" plain circle>删除</el-button>
              </el-popconfirm>
              <!--<el-button type="info" plain circle @click="roleemploy(scope.row)">员工</el-button>-->
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
        <!--
        <el-dialog title="角色员工" :visible.sync="roledialogTableVisible">
          <div slot="title" class="dialog-title">
            <i class="el-icon-chat-line-square"></i>
            <span class="title-text">{{rolexiangqing}}</span>
            <div class="button-right">
              <span class="title-close"></span>
            </div>
          </div>
          <el-table :data="employroleDate" max-height="300">
            <el-table-column property="empname" label="姓名" width="150"></el-table-column>
            <el-table-column property="empnumber" label="手机号" width="200"></el-table-column>
            <el-table-column property="username" label="用户名"></el-table-column>
          </el-table>
        </el-dialog>-->
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }


  a {
    color: #42b983;
  }
</style>

<script>
  import Editwarehouse from "../../components/houtai/warehouse/editwarehouse.vue"
  import Addwarehouse from "../../components/houtai/warehouse/addwarehouse.vue"

  export default {
    name: 'app',
    data() {
      return {
        //num: 1,
        editwarehousedialogFormVisible: false,
        addwarehousedialogFormVisible: false,
        //roledialogTableVisible: false,
        warehousetableData: [],
        //employroleDate: [],
        total: 1,
        page: 1,
        rows: 6,
        selectDate: {},
        querywarehousename: "",
        querywarehouseaddress: "",
        editwarecount: 0
        //rolexiangqing:""
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
      /*	roleemploy(row) {
          this.employroleDate = row.employList;
          this.rolexiangqing=row.rname+"----员工列表";
          this.roledialogTableVisible = true;
        },*/
      addwarehousehandleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$refs.addwarehousechild.addrole = {};
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
        warehouses.append("empid.empid", addwarehouse.empid.empid);
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
      pagechange(pageindex) { //页码变更时
        //console.log(pageindex)
        this.page = pageindex;
        //根据pageindex  获取数据
        this.getData();
      },
      headClass() { //表头居中显示
        return "text-align:center"
      },
      rowClass() { //表格数据居中显示
        return "text-align:center"
      }
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
