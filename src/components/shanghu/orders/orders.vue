<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div id="app4">
        <el-form  :inline="true" class="demo-form-inline"  style="margin-top: 20px;margin-left: 300px">
          <el-form-item>
            <el-input v-model="queryorder" style="width: 400px;"></el-input>
            <el-button type="primary" plain @click="getData()">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%" border
                  :header-cell-style="headClass" :cell-style="rowClass" :row-class-name="tableRowClassName"
                  max-height="500"  border ref="multipleTable"
                  @selection-change="changeFun"
        >
          <el-table-column
            type="selection" ref="multipleTable"
            width="55"></el-table-column>
          <el-table-column prop="orderid" label="ID">
          </el-table-column>
          <el-table-column prop="userid.username" label="用户名">
           <!-- <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p><img :src="scope.row.orderimg" min-width="100"  height="100"/></p><br>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.ordername }}</el-tag>
                </div>
              </el-popover>
            </template>-->
          </el-table-column>
          <el-table-column prop="ordercount" label="总数量">
          </el-table-column>
          <el-table-column prop="ordermoney" label="订单总金额">
          </el-table-column>
          <el-table-column prop="orderbianhao" label="订单编号">
          </el-table-column>
          <el-table-column prop="ordertime" label="订单创建时间">
          </el-table-column>
          <el-table-column prop="consigneename" label="收货人">
          </el-table-column>
          <el-table-column prop="consigneenumber" label="收货人电话">
          </el-table-column>
          <el-table-column prop="consigneeaddress" label="收货人地址">
          </el-table-column>
          <el-table-column prop="orderstate" label="状态">
          </el-table-column>
          <el-table-column prop="shshouru" label="商户收入">
          </el-table-column>
        </el-table>
        <el-pagination @current-change="pagechange"
                       :page-size="rows"
                       layout="total, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>

    export default {
        name: "orders",
      data() {
        return {
          queryorder: "",
          tableData: [],
          total: 1,
          page: 1,
          rows:6,
          multipleSelection:"",
          xuanze:'请选择',
          shid:sessionStorage.getItem("shid")
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
        changeFun(val) {
          this.multipleSelection = val;
        },
        getData() { //获取数据方法
          var _this = this;
          var params = new URLSearchParams();
          params.append("page", this.page);
          params.append("orderbianhao", this.queryorder)
          params.append("rows", this.rows);
          params.append("userid.userid", this.shid);
          _this.$axios.post("/orders/querylike1.action", params).then(function (result) {
            _this.tableData = result.data.rows;
            _this.total = result.data.total;
          }).catch(function (error) {
            alert(error)
          });

        },
        pagechange(pageindex) {
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
      created() { //钩子函数  vue对象初始化完成后  执行
        this.getData();
      },
      components: { //子组件
      }

    }
</script>

<style scoped>

</style>
