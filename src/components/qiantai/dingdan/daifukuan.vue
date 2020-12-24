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
          <span v-if="scope.row.orderstate==1">代付款</span>
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
          <el-button type="success" @click="xiangqing(scope.row)" circle plain size="small">查看详情</el-button>
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



    <!--订单详情-->
    <el-dialog title="订单详情" :visible.sync="addemploydialogFormVisible" style="width: 1550px">
      <el-table :data="orderxqs" :header-cell-style="headClass" :cell-style="rowClass"  max-height="600px">
        <el-table-column property="shopid.shopname" label="商品名称" width="150"></el-table-column>
        <el-table-column prop="shopid.shopimg " label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.shopid.shopimg" min-width="70"  height="50"/>
          </template>
        </el-table-column>
        <el-table-column property="shopid.shopprice" label="商品单价" width="150"></el-table-column>
        <el-table-column property="orderxqcount" label="购买数量"  width="150"></el-table-column>
        <el-table-column property="orderxqmoney" label="商品总金额"  width="150"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "daifukuan",
      data() {
        return {
          num: 1,
          tableData: [],
          total: 1,
          page: 1,
          rows: 6,
          selectDate: {},
          username:sessionStorage.getItem('yonghuname'),
          addemploydialogFormVisible:false,
          userid:"",
          orderxqs:[]
        }
      },
      methods: {
        /*查看详情*/
        xiangqing(row){
          // alert(row.orderxqs)
          this.orderxqs=row.orderxqs
          this.addemploydialogFormVisible = true;
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
          return '';
        },
        getData(func) { //获取数据方法
          var _this = this;
          //alert(12312312)
          var params = new URLSearchParams();
          params.append("page", this.page);
          params.append("rows", this.rows);
          params.append("orderstate", 1)
          params.append("userid.userid",this.userid)
          this.$axios.post("/orders/querylike.action", params).then(function (result) {
            _this.tableData = result.data.rows;
            _this.total = result.data.total;
          }).catch(function (error) {
            alert(error)
          });
        },
        userids() {
          var _this = this;
          //alert(12312312)
          var params = new URLSearchParams();
          params.append("username", this.username);
          this.$axios.post("/user/queryuser.action", params).then(function (result) {
            _this.userid = result.data.userid
            //alert( _this.userid)
            _this.getData();
          }).catch(function (error) {
            alert(error)
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
        },



      },

      created() {
        this.userids();
      }



    }
</script>

<style scoped>

</style>
