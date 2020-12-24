<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div id="app">
        <!-- 条件查询-->
        <el-form :inline="true" class="demo-form-inline" style="margin-top: 0px">
          <el-form-item label="姓名">
            <el-input v-model="queryempname" placeholder="" size="small"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="queryaddress" placeholder="" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryemploy()" plain size="small">查询</el-button>
            <el-button type="success" @click="addemploy()" plain size="small">添加</el-button>
          </el-form-item>
        </el-form>
        <!--表格显示  -->
        <el-table :data="tableData" :row-class-name="tableRowClassName" border
                  :header-cell-style="headClass" :cell-style="rowClass">
          <el-table-column prop="empid" label="编号">
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>身份证号码: {{ scope.row.empcard }}</p>
                <p>住址: {{ scope.row.empaddress }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.empname }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="empsex" label="性别">
            <template slot-scope="scope">
              <span v-if="scope.row.empsex==0">女</span>
              <span v-if="scope.row.empsex==1">男</span>
            </template>
          </el-table-column>
          <el-table-column prop="empnumber" label="手机号">
          </el-table-column>
          <el-table-column prop="username" label="用户名">
          </el-table-column>
          <el-table-column prop="empremark" label="备注">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="success" @click="editemploy(scope.row)" size="small" circle plain>编辑</el-button>
              <el-popconfirm title="确定删除这条记录吗？" @confirm="delemploy(scope.row)">
                <el-button type="danger" slot="reference" circle plain size="small">删除</el-button>
              </el-popconfirm>
              <el-button type="primary" circle plain size="small" @click="rolelist(scope.row)">角色</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <!--分页显示  -->
        <el-pagination @current-change="pagechange"
                       :page-size="rows"
                       layout="total, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
        <el-dialog :visible.sync="editemploydialogFormVisible" :before-close="editemployhandleClose" style="">
          <div slot="title" class="dialog-title">
            <i class="el-icon-edit-outline"></i>
            <span class="title-text">员工编辑</span>
            <div class="button-right">
              <span class="title-close"></span>
            </div>
          </div>
          <editemploy ref="editemploychild"></editemploy>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editemploydialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="employsave()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="addemploydialogFormVisible" :before-close="addemployhandleClose">
          <div slot="title" class="dialog-title">
            <i class="el-icon-circle-plus-outline"></i>
            <span class="title-text">员工添加</span>
            <div class="button-right">
              <span class="title-close"></span>
            </div>
          </div>
          <addemploy ref="addemploychild"></addemploy>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addemployquxiao()">取 消</el-button>
            <el-button type="primary" @click="employadd()">添加</el-button>
          </div>
        </el-dialog>
        <!-- 员工授权角色 -->
        <el-dialog :visible.sync="employroledialogTableVisible" style="width:1700px;margin-left: -100px">
          <div slot="title" class="dialog-title">
            <i class="el-icon-chat-line-square"></i>
            <span class="title-text">{{employxiangqing}}</span>
            <div class="button-right">
              <span class="title-close"></span>
            </div>
          </div>
          <el-row :gutter="22">
            <el-col :span="22" :offset="1">
              <el-table :data="rolelisttable" max-height="500" border :row-class-name="tableRowClassName"
                        border :header-cell-style="headClass" :cell-style="rowClass" ref="multipleTable"
                        @selection-change="changeFun">
                <el-table-column
                  type="selection" ref="multipleTable"
                  width="55"></el-table-column>
                <el-table-column prop="rid" label="编号" width="100">
                </el-table-column>
                <el-table-column prop="rname" label="角色名">
                </el-table-column>
                <el-table-column prop="rremart" label="角色备注">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button @click="employroledialogTableVisible=false">取 消</el-button>
            <el-button type="primary" @click="employshouquan">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>
<style>


</style>

<script>
  import Editemploy from "../../components/houtai/employ/editemploy.vue"
  import Addemploy from "../../components/houtai/employ/addemploy.vue"

  export default {
    name: 'app',
    data() {
      return {
        rolelisttable: [],
        employxiangqing: "",
        employroledialogTableVisible: false,
        num: 1,
        editemploydialogFormVisible: false,
        addemploydialogFormVisible: false,
        tableData: [],
        total: 1,
        page: 1,
        rows: 8,
        multipleSelection: [],
        selectDate: {},
        queryempname: "",
        queryaddress: "",
        employid: ""
      }
    },
    methods: {
      changeFun(val) {
        this.multipleSelection = val;
      },
      /*员工授权*/
      employshouquan() {
        var _this = this;
        if (this.multipleSelection[0] == undefined) {
          this.$message({
            message: '请选择角色授权',
            type: 'error'
          });
          return;
        }
        this.$confirm('此操作将会进行授权操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var rid = "";
          for (var i = 0; i < this.multipleSelection.length; i++) {
            rid += this.multipleSelection[i].rid + ",";
          }
          var params = new URLSearchParams();
          params.append("rids", rid);
          params.append("empid", _this.employid);
          this.$axios.post("employ/employshouquan.action", params).then(function (result) {
            _this.getData(() => {
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
              _this.employroledialogTableVisible = false;
            });
          })
            .catch(function (error) {
              _this.$message({
                message: '授权失败',
                type: 'error'
              });
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消授权'
          });
        });
      },
      /*员工自动选择角色*/
      rolelist(row) {
        var _this = this;
        _this.employxiangqing = row.empname + "----员工授权";
        _this.employid = row.empid;
        _this.multipleSelection=row.rolelist;
        this.$axios.post("role/queryall.action").then(function (result) {
          _this.rolelisttable = result.data;
          var iarr = [];
          for (var i = 0; i < _this.rolelisttable.length; i++) {
            for (var j = 0; j < _this.multipleSelection.length; j++) {
              if (_this.rolelisttable[i].rid == _this.multipleSelection[j].rid) {
                iarr.push(i)
              }
            }
          }
          _this.$nextTick(() => {
            iarr.forEach((item) => {
              _this.$refs.multipleTable.toggleRowSelection(_this.rolelisttable[item], true);
            })
          })
          _this.employroledialogTableVisible = true;
        }).catch(function (error) {
          alert(error)
        });
      },
      tableRowClassName({row, rowIndex}) {
        row.height = 20;
        if (rowIndex % 2 == 1) {
          return 'info-row';
        } else {
          return 'success-row';
        }
        return '';
      },
      /*页面展示角色数据*/
      getData(func) { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        params.append("empname", this.queryempname);
        params.append("empaddress", this.queryaddress);
        params.append("page", this.page);
        params.append("rows", this.rows);
        this.$axios.post("employ/querylike.action", params).then(function (result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
          func && func();
        }).catch(function (error) {
          alert(error)
        });
      },
      //关闭添加员工模态框触发方法
      addemployhandleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$refs.addemploychild.addemploy = {};
            done();
          })
          .catch(_ => {
          });
      },
      //关闭编辑员工模态框触发方法
      editemployhandleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      //查找员工方法
      queryemploy() {
        this.getData();
      },
      //选中行进行修改
      editemploy(row) {
        setTimeout(() => {
          this.selectDate = {
            ...row
          }
          this.$refs.editemploychild.editemploy = this.selectDate;
        })
        //index 索引  row对象 修改该条记录对象
        this.editemploydialogFormVisible = true;
      },
      //弹出添加员工模态框
      addemploy() {
        //index 索引  row对象 修改该条记录对象
        this.addemploydialogFormVisible = true;
      },
      //添加员工取消
      addemployquxiao() {
        this.addemploydialogFormVisible = false;
        this.$refs.addemploychild.addemploy = {};
      },
      //添加员工去后台
      employadd() {
        var addemploy = this.$refs.addemploychild.addemploy;
        var _this = this;
        var employs = new URLSearchParams();
        employs.append("empaddress", addemploy.empaddress);
        employs.append("empname", addemploy.empname);
        employs.append("empsex", addemploy.empsex);
        employs.append("empnumber", addemploy.empnumber);
        employs.append("empcard", addemploy.empcard);
        employs.append("empremark", addemploy.empremark);
        employs.append("username", addemploy.username);
        employs.append("password", addemploy.password);
        this.$axios.post("employ/editemploy.action", employs).then(function (result) {
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
        this.$refs.addemploychild.addemploy = {};
        this.addemploydialogFormVisible = false;
      },
      //修改保存操作
      employsave() {
        var editemploy = this.$refs.editemploychild.editemploy;
        var _this = this;
        var employs = new URLSearchParams();
        employs.append("empid", editemploy.empid);
        employs.append("empaddress", editemploy.empaddress);
        employs.append("empname", editemploy.empname);
        employs.append("empsex", editemploy.empsex);
        employs.append("username", editemploy.username);
        employs.append("empnumber", editemploy.empnumber);
        employs.append("empremark", editemploy.empremark);
        employs.append("password", editemploy.password);
        this.$axios.post("employ/editemploy.action", employs).then(function (result) {
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
              type: 'success'
            });
          });
        this.editemploydialogFormVisible = false;
      },
      //删除选中行
      delemploy(row) {
        var _this = this;
        //异步获取数据
        var params = new URLSearchParams();
        params.append("empid", row.empid);
        this.$axios.post("employ/delemploy.action", params).then(function (result) {
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
              type: 'success'
            });
          });
      },
      pagechange(pageindex) {
        //页码变更时
        //console.log(pageindex)
        this.page = pageindex;
        //根据pageindex  获取数据
        this.getData();
      },
      headClass() {
        //表头居中显示
        return "text-align:center"
      },
      rowClass() { //表格数据居中显示
        return "text-align:center"
      }
    },
    components: { //子组件
      editemploy: Editemploy,
      addemploy: Addemploy
    },
    created: function () {
      this.getData();
    }
  }
</script>
