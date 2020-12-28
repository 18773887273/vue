<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div id="app">
        <!-- 条件查询-->
        <el-form :inline="true" class="demo-form-inline" style="margin-top: 0px">
          <el-form-item label="商户名">
            <el-input v-model="queryshname" placeholder="" size="small"></el-input>
          </el-form-item>
          <el-form-item label="门店名">
            <el-input v-model="querystorename" placeholder="" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryuser()" plain size="small">查询</el-button>
          </el-form-item>
        </el-form>
        <!--表格显示  -->
        <el-table :data="tableData" :row-class-name="tableRowClassName" border max-height="437px"
                  :header-cell-style="headClass" :cell-style="rowClass">
          <el-table-column prop="userid" label="编号">
          </el-table-column>
          <el-table-column label="用户名">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>身份证号码: {{ scope.row.usercard }}</p>
                <p>电话: {{ scope.row.usernumber }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.username }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <span v-if="scope.row.sex==0">女</span>
              <span v-if="scope.row.sex==1">男</span>
            </template>
          </el-table-column>
          <el-table-column label="商户名">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <img :src="scope.row.userimg" min-width="70"  height="50"/>
                <p>门店: {{ scope.row.storename }}</p>
                <p>门店地址: {{ scope.row.shaddress }}</p>
                <p>商户联系方式: {{ scope.row.storenumber }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.shname }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="success" @click="edituser(scope.row)" circle plain size="small">编辑</el-button>
                <el-button v-if="scope.row.shstate!=5" type="danger" slot="reference" circle plain size="small" @click="open(scope.row)">冻结</el-button>
                <el-button v-if="scope.row.shstate==5" type="success" slot="reference" circle plain size="small" @click="open1(scope.row)">解冻</el-button>
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
        <el-dialog :visible.sync="edituserdialogFormVisible" :before-close="edituserhandleClose" style="">
          <div slot="title" class="dialog-title">
            <i class="el-icon-edit-outline"></i>
            <span class="title-text">商户编辑</span>
            <div class="button-right">
              <span class="title-close"></span>
            </div>
          </div>
          <edituser ref="edituserchild"></edituser>
          <div slot="footer" class="dialog-footer">
            <el-button @click="edituserdialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="usersave()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>
<style>

</style>

<script>
  import Edituser from "../../components/houtai/user/edituser.vue"
  export default {
    name: 'app',
    data() {
      return {
        num: 1,
        edituserdialogFormVisible: false,
        tableData: [],
        total: 1,
        page: 1,
        rows: 6,
        selectDate: {},
        queryshname: '',
        querystorename: ''
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
        params.append("shname", this.queryshname);
        params.append("storename", this.querystorename);
        params.append("page", this.page);
        params.append("rows", 6);
        this.$axios.post("user/querylike2.action", params).then(function (result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
          func && func();
        }).catch(function (error) {
          alert(error)
        });
      },
      edituserhandleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      queryuser() {
        this.getData();
      },
      //选中行进行修改
      edituser(row) {
        setTimeout(() => {
          this.selectDate = {
            ...row
          }
          this.$refs.edituserchild.edituser = this.selectDate;
        })
        //index 索引  row对象 修改该条记录对象
        this.edituserdialogFormVisible = true;
      },
      //修改保存操作
      usersave() {
        var edituser = this.$refs.edituserchild.edituser;
        var _this = this;
        var users = new URLSearchParams();
        users.append("userid", edituser.userid);
        users.append("shname", edituser.shname);
        users.append("storenumber", edituser.storenumber);
        users.append("sex", edituser.sex);
        users.append("shaddress", edituser.shaddress);
        users.append("storename", edituser.storename);
        this.$axios.post("user/editsh.action", users).then(function (result) {
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
        this.edituserdialogFormVisible = false;
      },
      dj(row) {
        var _this = this;
        //异步获取数据
        var params = new URLSearchParams();
        params.append("userid", row.userid);
        params.append("shstate", row.shstate);
        this.$axios.post("user/shdj.action", params).then(function (result) {
          _this.getData(() => {
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
          });
        })
          .catch(function (error) {
            _this.$message({
              message: '失败',
              type: 'success'
            });
          });
      },
      open(row) {
        var _this=this
        this.$confirm('此操作将冻结该商户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dj(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      open1(row) {
        var _this=this
        this.$confirm('此操作将解冻该商户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dj(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
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
      edituser: Edituser,
    },
    created: function () {
      this.getData();
    }
  }
</script>
