<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div id="app">
        <!-- 条件查询-->
        <el-form :inline="true" class="demo-form-inline" style="margin-top: 0px">
          <el-form-item label="姓名">
            <el-input v-model="queryempname" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="queryaddress" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryemploy()" plain>查询</el-button>
            <el-button type="success" @click="addemploy()" plain>添加</el-button>
          </el-form-item>
        </el-form>
        <!--表格显示  -->
        <el-table :data="tableData" :row-class-name="tableRowClassName" border max-height="437px"
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
          <!--<el-table-column
            prop="img"
            label="图片">
            <template slot-scope="scope">
              <img  :src="scope.row.img" style="width: 30px"/>
            </template>
          </el-table-column>-->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="success" @click="editemploy(scope.row)" circle plain>编辑</el-button>
              <el-popconfirm title="确定删除这条记录吗？" @confirm="delemploy(scope.row)">
                <el-button type="danger" slot="reference" circle plain>删除</el-button>
              </el-popconfirm>
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
        num: 1,
        editemploydialogFormVisible: false,
        addemploydialogFormVisible: false,
        tableData: [],
        total: 1,
        page: 1,
        rows: 6,
        selectDate: {},
        queryempname: "",
        queryaddress: ""
      }
    },
    methods: {
      tableRowClassName({
                          row,
                          rowIndex
                        }) {
        row.height=20;
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
        params.append("empname", this.queryempname);
        params.append("empaddress", this.queryaddress);
        params.append("page", this.page);
        params.append("rows", 6);
        this.$axios.post("employ/querylike.action", params).then(function (result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
          func && func();
        }).catch(function (error) {
          alert(error)
        });
      },
      addemployhandleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$refs.addemploychild.addemploy = {};
            done();
          })
          .catch(_ => {
          });
      },
      editemployhandleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
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
      addemploy() {
        //index 索引  row对象 修改该条记录对象
        this.addemploydialogFormVisible = true;
      },
      addemployquxiao() {
        this.addemploydialogFormVisible = false;
        this.$refs.addemploychild.addemploy = {};
      },
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
      editemploy: Editemploy,
      addemploy: Addemploy
    },
    created: function () {
      this.getData();
    }
  }
</script>
