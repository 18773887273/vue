<template>
  <div>
    <el-table :data="tableData" :row-class-name="tableRowClassName" border max-height="437px"
              :header-cell-style="headClass" :cell-style="rowClass" width="100%">
      <el-table-column prop="orderbianhao" label="编号" fixed="left" width="140px">
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
      <el-table-column prop="ordertime" label="创建时间" width="300px">
      </el-table-column>
      <el-table-column prop="ordercount" label="总数量" width="140px">
      </el-table-column>
      <el-table-column prop="ordermoney" label="总金额" width="140px">
      </el-table-column>
      <el-table-column prop="orderstate" label="订单状态" width="140px">
        <template slot-scope="scope">
          <span v-if="scope.row.orderstate==1">待付款</span>
          <span v-if="scope.row.orderstate==2">发货中</span>
          <span v-if="scope.row.orderstate==3">已取消</span>
          <span v-if="scope.row.orderstate==4">发货中</span>
          <span v-if="scope.row.orderstate==5">待提货</span>
          <span v-if="scope.row.orderstate==6">已完成</span>
        </template>
      </el-table-column>
      <!--<el-table-column
        prop="img"
        label="图片">
        <template slot-scope="scope">
          <img  :src="scope.row.img" style="width: 30px"/>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" fixed="right" width="140px">
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
      <el-table :data="orderxqs" :header-cell-style="headClass" :cell-style="rowClass" :row-class-name="tableRowClassName" max-height="600px">
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
        name: "alldingdan",
      data(){
          return{
            num: 1,
            tableData: [],
            total: 1,
            page: 1,
            rows: 5,
            selectDate: {},
            username:sessionStorage.getItem('yonghuname'),
            userid:"",
            addemploydialogFormVisible:false,
            orderxqs:[]
          }
      },
      methods: {
        userids(){
          var _this = this;
          //alert(12312312)
          var params = new URLSearchParams();
          params.append("username",this.username);
          this.$axios.post("/user/queryuser.action", params).then(function (result) {
            _this.userid=result.data.userid
            //alert( _this.userid)
            _this.getData();
          }).catch(function (error) {
            alert(error)
          });
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
        getData() { //获取数据方法
          var _this = this;
          //alert(12312312)
         // alert("id"+this.userid)
          var params = new URLSearchParams();
          params.append("page", this.page);
          params.append("rows", this.rows);
          params.append("userid.userid",this.userid);
          this.$axios.post("/orders/querylike.action", params).then(function (result) {
            _this.tableData = result.data.rows;

            _this.total = result.data.total;
          }).catch(function (error) {
            alert(error)
          });
        },
        /*查看详情*/
        xiangqing(row){
         // alert(row.orderxqs)
          this.orderxqs=row.orderxqs
          this.addemploydialogFormVisible = true;
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
        addemployhandleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              this.addemploydialogFormVisible = false;
              this.$refs.addemploychild.addemploy = {};
              done();
            })
            .catch(_ => {
            });
        },

      },
      created() {
          this.userids();

      }

    }
</script>

<style scoped>
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
</style>
