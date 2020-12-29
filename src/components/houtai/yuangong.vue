<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <div>
          <!--用户查询-->
          <el-form :inline="true" class="demo-form-inline" style="margin-top: 0px">
            <el-form-item label="用户名">
              <el-input v-model="queryusername" placeholder="" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryuser()" plain size="small">查询</el-button>
            </el-form-item>
          </el-form>

          <el-table border :data="tableData" :row-class-name="tableRowClassName"   :header-cell-style="headClass" :cell-style="rowClass">
            <el-table-column prop="userid" label="ID" width="180">
            </el-table-column>
            <el-table-column prop="zhucetime" label="注册时间" width="180">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <span v-if="scope.row.sex==0"> <p>性别:女</p></span>
                  <span v-if="scope.row.sex==1"> <p>性别:男</p></span><br>
                  <p>会员: {{scope.row.hyid.hyname}}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.username }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="usernumber" label="电话" width="180">
            </el-table-column>
            <el-table-column prop="usercard" label="身份证" width="200">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.isdelete==1" type="danger" slot="reference" circle plain size="small" @click="open(scope.row)">冻结</el-button>
                <el-button v-if="scope.row.isdelete==0" type="success" slot="reference" circle plain size="small" @click="open1(scope.row)">解冻</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页显示  -->
          <el-pagination @current-change="pagechange"
                         :page-size="rows"
                         layout="total, prev, pager, next, jumper"
                         :total="total">
          </el-pagination>
        </div>
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
</style>

<script>
  export default {data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        editid: "",
        editname: "",
        editbirthday: "",
        editsalary: "",
        queryusername:"",
        querynumber:"",
        total: 1,
        page: 1,
        rows: 8
      }
    },
    methods: {
      tableRowClassName({ row, rowIndex }) {
        if(rowIndex === 1) {
          return 'warning-row';
        } else if(rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      pagechange(pageindex) {
        //页码变更时
        //console.log(pageindex)
        this.page = pageindex;
        //根据pageindex  获取数据
        this.getdata();
      },
      open(row) {
        var _this=this
        this.$confirm('此操作将冻结该用户, 是否继续?', '提示', {
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
      dj(row) {
        var _this = this;
        //异步获取数据
        var params = new URLSearchParams();
        params.append("userid", row.userid);
        params.append("isdelete", row.isdelete);
        this.$axios.post("user/deluser1.action", params).then(function (result) {
          _this.getdata(() => {
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
          });
        })
          .catch(function (error) {
            alert(error)
          });
      },
      open1(row) {
        var _this=this
        this.$confirm('此操作将解冻该用户, 是否继续?', '提示', {
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
      queryuser(){this.getdata()},
      getdata(func) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("username", _this.queryusername);
        params.append("usernumber", _this.querynumber);
        params.append("page", this.page);
        params.append("rows", this.rows);
        this.$axios
          .post('/user/querylike.action',params).
        then(function(result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
          func && func();
        }).
        catch(function(error) {
          alert(error)
        });
      },
      headClass() {
        //表头居中显示
        return "text-align:center"
      },
      rowClass() { //表格数据居中显示
        return "text-align:center"
      }
    },
    created() {
      this.getdata();
    }
  }
</script>
