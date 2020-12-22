<template>
  <div>
    <el-table :data="tableData" :row-class-name="tableRowClassName" border max-height="437px"
              :header-cell-style="headClass" :cell-style="rowClass">
      <el-table-column prop="orderbianhao" label="编号">
      </el-table-column>
      <!--<el-table-column label="姓名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>身份证号码: {{ scope.row.empcard }}</p>
            <p>住址: {{ scope.row.empaddress }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.empname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>-->
      <el-table-column prop="ordertime" label="创建时间">
      </el-table-column>
      <el-table-column prop="ordercount" label="总数量">
      </el-table-column>
      <el-table-column prop="ordermoney" label="总金额">
      </el-table-column>
      <el-table-column prop="orderstate" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.orderstate==1">已提货</span>
          <span v-if="scope.row.orderstate==2">代取货</span>
        </template>
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
          <el-button type="success" @click="editemploy(scope.row)" circle plain>查看详情</el-button>
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
</template>

<script>
    export default {
        name: "yiwancheng",
      data(){
        return{
          num: 1,
          tableData: [],
          total: 1,
          page: 1,
          rows: 6,
          selectDate: {},
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
          //alert(12312312)
          var params = new URLSearchParams();
          params.append("page", this.page);
          params.append("rows", 6);
          this.$axios.post("/orders/querylike.action", params).then(function (result) {
            _this.tableData = result.data.rows;
            _this.total = result.data.total;
          }).catch(function (error) {
            alert(error)
          });
        }


      },
      created() {
        this.getData();
      }
    }
</script>

<style scoped>

</style>
