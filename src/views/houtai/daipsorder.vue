<template>
  <el-row :gutter="20">
    <el-col :span="24" :offset="0.5">
      <div id="app">
        <el-form :inline="true" class="demo-form-inline" :model="query">
          <el-form-item label="订单编号:">
            <el-input v-model="query.orderbianhao" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="订单时间:">
            <div class="block">
              <el-date-picker
                v-model="query.time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-button type="primary" plain @click="getData()">查询</el-button>
        </el-form>
        <!-- 数据展示 -->
        <!--订单编号 orderbianhao  订单时间 ordertime  订单总金额 ordermoney 商户名 shid.shname 商户地址 shid.shaddress 客户姓名 consigneename
        客户联系方式 consigneenumber  客户地址consigneeaddress 订单状态orderstate-->
        <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="headClass" class="tabbox"
                  :row-style="{height: '0'}"
                  :cell-style="rowClass" :row-class-name="tableRowClassName" max-height="600">
          <el-table-column prop="orderbianhao" label="订单编号" width="150" fixed="left">
          </el-table-column>
          <el-table-column prop="ordertime" label="订单创建时间" width="200">
          </el-table-column>
          <el-table-column prop="ordermoney" label="订单总金额(元)" width="120">
          </el-table-column>
          <el-table-column prop="youhuiprice" label="优惠价格(元)" width="120">
          </el-table-column>
          <el-table-column prop="ordercount" label="商品总数量(件)" width="150">
          </el-table-column>
          <el-table-column prop="orderstate" label="订单状态" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.orderstate==1" style="color:blue">待付款</span>
              <span v-if="scope.row.orderstate==2" style="color: #dc3545">待出货</span>
              <span v-if="scope.row.orderstate==3" style="color: wheat">已取消</span>
              <span v-if="scope.row.orderstate==4" style="color: #39b6f0">配送中</span>
              <span v-if="scope.row.orderstate==5" style="color: #58cdd1">已配送，待提货</span>
              <span v-if="scope.row.orderstate==6" style="color: green">已提货</span>
              <span v-if="scope.row.orderstate==7" style="color: green">已提货</span>
            </template>
          </el-table-column>
          <el-table-column prop="shid.shname" label="商户姓名" width="150">
          </el-table-column>
          <el-table-column prop="shid.shaddress" label="商户地址" width="350">
          </el-table-column>
          <el-table-column prop="shid.storenumber" label="商户手机号" width="150">
          </el-table-column>
          <el-table-column prop="consigneename" label="客户姓名" width="150">
          </el-table-column>
          <el-table-column prop="consigneenumber" label="客户手机号" width="150">
          </el-table-column>
          <el-table-column prop="consigneeaddress" label="客户收货地址" width="350">
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="250">
            <template slot-scope="scope">
              <el-button type="primary" @click="chuhuo(scope.row)" plain size="small">出货</el-button>
              <el-button type="success" @click="xiangqing(scope.row)" plain size="small">订单详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页显示 -->
        <el-pagination @current-change="pagechange"
                       :page-size="rows"
                       layout="total, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
        <!--订单详情-->
        <el-dialog title="订单详情" :visible.sync="orderxiangqingdialogTableVisible" style="width: 1550px">
          <el-table :data="orderxqs" :header-cell-style="headClass" :cell-style="rowClass"
                    :row-class-name="tableRowClassName" max-height="600px">
            <el-table-column property="shopid.shopname" label="商品名称" width="150"></el-table-column>
            <el-table-column prop="shopid.shopimg " label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.shopid.shopimg" min-width="70" height="50"/>
              </template>
            </el-table-column>
            <el-table-column property="shopid.shopprice" label="商品单价" width="150"></el-table-column>
            <el-table-column property="orderxqcount" label="购买数量" width="150"></el-table-column>
            <el-table-column property="orderxqmoney" label="商品总金额" width="150"></el-table-column>
          </el-table>
        </el-dialog>
        <!--选择仓库出货-->
        <el-dialog title="商品出货" :visible.sync="chuhuodialogTableVisible" style="width: 1550px">
          <el-table :data="orderxqs1" :header-cell-style="headClass" :cell-style="rowClass"
                    :row-class-name="tableRowClassName" max-height="600px">
            <el-table-column property="shopid.shopname" label="商品名称" width="150"></el-table-column>
            <el-table-column prop="shopid.shopimg " label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.shopid.shopimg" min-width="70" height="50"/>
              </template>
            </el-table-column>
            <el-table-column property="shopid.shopprice" label="商品单价" width="150"></el-table-column>
            <el-table-column property="orderxqcount" label="购买数量" width="150"></el-table-column>
            <el-table-column prop="shopid.wareid" label="出货仓库" width="180">
              <template slot-scope="scope">
                <el-select v-model="scope.row.shopid.wareid" size="small">
                  <el-option :key="0" :label="xuanze"
                             :value="0">
                  </el-option>
                  <el-option v-for="item in scope.row.warehouses" :key="item.wareid" :label="item.warename"
                             :value="item.wareid" size="small">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="chuhuodialogTableVisible=false">取 消</el-button>
            <el-button type="primary" @click="ware()">出货</el-button>
          </div>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>

<script>

  export default {
    name: 'app',
    data() {
      return {
        query: {
          time: "",
          orderbianhao: ""
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        orderxqs: [],
        orderxqs1: [],
        tableData: [],
        orderid:"",
        xuanze: "请选择",
        total: 1,
        page: 1,
        rows: 6,
        chuhuodialogTableVisible: false,
        orderxiangqingdialogTableVisible: false,
        username: sessionStorage.getItem('username')
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
      ware(row) {
        var data = this.orderxqs1;
        for (var i = 0; i < data.length; i++) {
          if (data[i].shopid.wareid == 0) {
            this.$message({
              message: '请选择商品需要出货的仓库',
              type: 'error'
            });
            return;
          }
        }
        var shopids = "";
        var shopcounts = "";
        var wareids = "";
        for (var i = 0; i < data.length; i++) {
          shopids += data[i].shopid.shopid+",";
          shopcounts += data[i].orderxqcount+",";
          wareids += data[i].shopid.wareid+",";
        }
        var params = new URLSearchParams();
        params.append("shopids", shopids);
        params.append("shopcounts", shopcounts);
        params.append("wareids", wareids);
        params.append("username",this.username);
        params.append("orderid",this.orderid)
        var _this=this;
        this.$axios.post("warehouse/shopchuhuo.action", params).then(function (result) {
          _this.getData(() => {
            _this.$message({
              message:result.data.msg,
              type: 'success'
            });
            _this.chuhuodialogTableVisible = false;
          });
        }).catch(function (error) {
          alert(error)
        });
      },
      xiangqing(row) {
        this.orderxqs = row.orderxqs;
        this.orderxiangqingdialogTableVisible = true;
      },
      chuhuo(row) {
        this.orderid=row.orderid;
        this.orderxqs1 = row.orderxqs;
        this.chuhuodialogTableVisible = true;
      },
      getData(func) { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", this.page);
        params.append("orderbianhao", this.query.orderbianhao)
        params.append("orderstate", 2)
        params.append("rows", this.rows);
        params.append("time", this.query.time);

        this.$axios.post("orders/querylikept.action", params).then(function (result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
          func && func();
        }).catch(function (error) {
          alert(error)
        });
      },
      pagechange(pageindex) {
        this.page = pageindex;
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
