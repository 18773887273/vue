<template>
  <el-row :gutter="20">
    <el-col :span="24" :offset="0.5">
      <div id="app">
        <el-form :inline="true" class="demo-form-inline" :model="query">
          <el-form-item label="订单编号:">
            <el-input v-model="query.orderbianhao" style="width: 200px;" size="small"></el-input>
          </el-form-item>
          <el-form-item label="订单状态:">
            <el-select v-model="query.orderstate" autocomplete="off" style="width:200px;" filterable size="small">
              <el-option v-for="item in orderstates" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单时间:">
            <div class="block">
              <el-date-picker size="small"
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
          <el-form-item>
            <el-button type="primary" plain @click="getData()" size="small">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 数据展示 -->
        <!--订单编号 orderbianhao  订单时间 ordertime  订单总金额 ordermoney 商户名 shid.shname 商户地址 shid.shaddress 客户姓名 consigneename
        客户联系方式 consigneenumber  客户地址consigneeaddress 订单状态orderstate-->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="headClass" :row-style="{height: '0'}"
                  :cell-style="rowClass" :row-class-name="tableRowClassName" max-height="600">
          <el-table-column prop="orderbianhao" label="订单编号" width="180" fixed="left">
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
              <span v-if="scope.row.orderstate==2" style="color: #dc3545">待收货</span>
              <span v-if="scope.row.orderstate==4" style="color: #dc3545">待收货</span>
              <span v-if="scope.row.orderstate==5" style="color: #58cdd1">待提货</span>
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
          <el-table-column label="操作" fixed="right" width="200px">
            <template slot-scope="scope">
              <el-button type="primary" @click="xiangqing(scope.row)" plain size="small">详情</el-button>
              <el-button v-if="scope.row.orderstate==2 || scope.row.orderstate==4" type="success" slot="reference" circle plain size="small" @click="shouhuo(scope.row)">确定收货</el-button>
              <el-button v-if="scope.row.orderstate==5" type="success" slot="reference" circle plain size="small" @click="tihuo(scope.row)">确定提货</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页显示 -->
        <el-pagination @current-change="pagechange"
                       :page-size="rows"
                       layout="total, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
        <el-dialog title="订单详情" :visible.sync="orderxiangqingdialogTableVisible" style="width: 1550px">
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
    </el-col>
  </el-row>
</template>

<script>

  export default {
    name: 'app',
    data() {
      return {
        shid:sessionStorage.getItem('shid'),
        query: {
          time: "",
          orderbianhao: "",
          orderstate: ""
        },
        orderxiangqingdialogTableVisible: false,
        orderstates: [
          {id: '0', name: "全部订单"},
          {id: '2', name: "待收货"},
          {id: '5', name: "待提货"},
          {id: '6', name: "已提货"},
        ],
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
        orderxqs:[],
        tableData: [],
        total: 1,
        page: 1,
        rows: 8,
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
      xiangqing(row) {
        this.orderxqs =row.orderxqs;
        this.orderxiangqingdialogTableVisible = true;
      },
      getData(func) { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", this.page);
        params.append("shid.userid",this.shid);
        params.append("orderbianhao", this.query.orderbianhao);
        var time=this.query.time;
        if(time==null){
          time=""
        }
        params.append("time", time)
        params.append("orderstate", this.query.orderstate);
        params.append("rows", this.rows);
        this.$axios.post("orders/querylikept1.action", params).then(function (result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
          func && func();
        }).catch(function (error) {
          alert(error)
        });

      },
      shouhuo(row){
        var _this =  this;
        var params = new URLSearchParams();
        params.append("orderid",row.orderid);
        params.append("orderstate", row.orderstate);
        this.$axios.post("orders/shouhuo.action", params).then(function (result) {
          _this.$message({
            message: result.data,
            type: 'success'
          });
        }).catch(function (error) {
          alert(error)
        });
        _this.getData();
      },
      tihuo(row){
        var _this =  this;
        var params = new URLSearchParams();
        params.append("orderid",row.orderid);
        params.append("orderstate", row.orderstate);
        params.append("shid.userid",this.shid);
        params.append("ordermoney",row.ordermoney);
        this.$axios.post("orders/tihuo.action", params).then(function (result) {
          _this.getData(() => {
            _this.$message({
              message: result.data,
              type: 'success'
            });
          });
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
    }
  }
</script>
