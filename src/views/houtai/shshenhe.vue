<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div id="app">
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
              <el-button type="success" @click="ty(scope.row)" circle plain size="small">同意</el-button>
              <el-button type="danger" slot="reference" circle plain size="small" @click="open(scope.row)">拒绝</el-button>
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
      </div>
    </el-col>
  </el-row>
</template>
<style>

</style>

<script>
  export default {
    name: 'app',
    data() {
      return {
        num: 1,
        tableData: [],
        total: 1,
        page: 1,
        rows: 6,
        selectDate: {}
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
        params.append("page", this.page);
        params.append("rows", 6);
        this.$axios.post("user/queryshshenhe.action", params).then(function (result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
          func && func();
        }).catch(function (error) {
          alert(error)
        });
      },
      open(row) {
        this.$prompt('请输入原因', '回复', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          var _this=this;
          var params = new URLSearchParams();
          params.append("shstatehuifu",value);
          params.append("userid",row.userid);
          this.$axios.post("user/shjujue.action", params).then(function (result) {
            _this.getData(() => {
              _this.$message({
                message: result.data,
                type: 'success'
              });
            });
          }).catch(function (error) {
            alert(error)
          });;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      ty(row){
        var _this=this;
        var params = new URLSearchParams();
        params.append("userid",row.userid);
        this.$axios.post("user/shshty.action", params).then(function (result) {
          _this.getData(() => {
            _this.$message({
              message: result.data,
              type: 'success'
            });
          });
        }).catch(function (error) {
          alert(error)
        });;
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
    created: function () {
      this.getData();
    }
  }
</script>
