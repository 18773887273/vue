<template>
  <div>

    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <div>
          <el-table border :data="tableData" :row-class-name="tableRowClassName">
            <el-table-column prop="userid" label="ID" width="180">
            </el-table-column>
            <el-table-column prop="zhucetime" label="注册时间" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="sex" label="性别">
              <template slot-scope="scope">
              <span v-if="scope.row.sex==0">女</span>
              <span v-if="scope.row.sex==1">男</span>
              </template>
            </el-table-column>
            <el-table-column prop="usernumber" label="电话">
            </el-table-column>
            <el-table-column prop="usercard" label="省份证号码">
            </el-table-column>
            <el-table-column prop="hyid.hyname" label="会员">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-popconfirm title="这是一段内容确定删除吗？" @confirm="deluser(scope.row)">
                  <el-button slot="reference" type="danger" icon="el-icon-delete" circle></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
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
  export default {
    methods: {
      tableRowClassName({ row, rowIndex }) {
        if(rowIndex === 1) {
          return 'warning-row';
        } else if(rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      deluser(row) {
        //alert(row)
        alert(row.userid);
        var _this = this;
        var params = new URLSearchParams();
        params.append("userid", row.userid);
        this.$axios.post("user/deluser.action", params,{
        emulateJSON:true
        }).
        then(function(result) {

          if(result.data.msg == "1") {
            //alert('删除成功');
            const h = _this.$createElement;
            _this.$notify({
              title: '消息',
              message: h('i', { style: 'color: teal' }, '删除成功'),
              type: 'success',
              position: 'bottom-right'
            });
            this.getdata();
          } else {
            alert('删除失败');
          }

        }.bind(this)).
        catch(function(error) {
          alert(error)
        });
      },
      getdata() {
        var _this = this;
        this.$axios
          .post('/user/querylike.action').
        then(function(result) {

          _this.tableData = result.data.rows;
        }).
        catch(function(error) {
          alert(error)
        });
      },
    },
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        editid: "",
        editname: "",
        editbirthday: "",
        editsalary: ""
      }
    },
    created() {
      this.getdata();
    },
    watch: {
      tableData: function() {
        this.getdata();
      }
    }
  }
</script>
