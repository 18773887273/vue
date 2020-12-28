<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div>
        <el-form :inline="true" class="demo-form-inline" style="margin-right: -800px">
          <el-form-item label="年">
            <el-select style="width: 100px;" v-model="query.year" filterable placeholder="请选择" size="small">
              <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.id">
              </el-option>
            </el-select>
            <el-button type="primary" size="small" @click="querytongji">查看</el-button>
          </el-form-item>
          <el-form-item label="月">
            <el-select style="width: 100px;" v-model="query.month" filterable placeholder="请选择" size="small">
              <el-option v-for="item in months" :key="item.id" :label="item.month" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select style="width: 100px;" v-model="query.type" filterable placeholder="请选择" size="small">
              <el-option v-for="item in types" :key="item.id" :label="item.typename" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-row :gutter="24">
          <el-col :span="15">
            <div id="chu" :style="{width: '700px', height: '550px'}"></div>
          </el-col>
          <el-col :span="9">
            <div id="caiwu" :style="{width: '500px', height: '550px'}"></div>
          </el-col>
          <el-col :span="22" :offset="1">
            <el-table :data="tableData" stripe style="width: 100%" max-height="429" border
                      :header-cell-style="headClass"
                      :cell-style="rowClass" border>
              <el-table-column prop="cwname" label="转账商家" width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==2">{{scope.row.cwname}}</span>
                  <span v-if="scope.row.type==5">{{scope.row.cwname}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="cwname" label="收款商家" width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==1">{{scope.row.cwname}}</span>
                  <span v-if="scope.row.type==3">{{scope.row.cwname}}</span>
                  <span v-if="scope.row.type==4">{{scope.row.cwname}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="money" label="收款金额" width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==2">{{scope.row.money}}</span>
                  <span v-if="scope.row.type==5">{{scope.row.money}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="money" label="转账金额" width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==1">{{scope.row.money}}</span>
                  <span v-if="scope.row.type==3">{{scope.row.money}}</span>
                  <span v-if="scope.row.type==4">{{scope.row.money}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="单据类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==1" style="color:blue">采购支出</span>
                  <span v-if="scope.row.type==2" style="color: #dc3545">销售收入</span>
                  <span v-if="scope.row.type==3" style="color: wheat">商户提现</span>
                  <span v-if="scope.row.type==4" style="color: #39b6f0">用户退货支出</span>
                  <span v-if="scope.row.type==5" style="color: #58cdd1">库存退货收入</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="转账时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==1">{{scope.row.time}}</span>
                  <span v-if="scope.row.type==3">{{scope.row.time}}</span>
                  <span v-if="scope.row.type==4">{{scope.row.time}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="收款时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==2">{{scope.row.time}}</span>
                  <span v-if="scope.row.type==5">{{scope.row.time}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @current-change="pagechange"
                           :page-size="rows"
                           layout="total, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "caiwubaobiao",
    data() {
      return {
        msg: '财务明细',
        msg1: '财务类型明细',
        years: [
          {id: "2014", year: "2014年"},
          {id: "2015", year: "2015年"},
          {id: "2016", year: "2016年"},
          {id: "2017", year: "2017年"},
          {id: "2018", year: "2018年"},
          {id: "2019", year: "2019年"},
          {id: "2020", year: "2020年"}
        ],
        types: [
          {id: "0", typename: "全部"},
          {id: "1", typename: "采购支出"},
          {id: "2", typename: "销售收入"},
          {id: "3", typename: "商户提现"},
          {id: "4", typename: "用户退货支出"},
          {id: "5", typename: "库存退货收入"},
        ],
        months: [
          {id: "01", month: "1月"},
          {id: "02", month: "2月"},
          {id: "03", month: "3月"},
          {id: "04", month: "4月"},
          {id: "05", month: "5月"},
          {id: "06", month: "6月"},
          {id: "07", month: "7月"},
          {id: "08", month: "8月"},
          {id: "09", month: "9月"},
          {id: "10", month: "10月"},
          {id: "11", month: "11月"},
          {id: "12", month: "12月"}
        ],
        rows: 10,
        total: 1,
        tableData: [],
        page: 1,
        query: {
          year: "2020",
          type: "",
          month:"12"
        }
      }
    },
    methods: {
      getCaiwuBaobiao() { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        var year = this.query.year;
        params.append("year", year);
        this.$axios.post("cwbaobiao/querycwbaobiao1.action", params).then(function (result) {
          var zhichu = new Array();
          var shouru = new Array();
          var liruns = new Array();
          //----------------------------------------------支出
          for (var i = 0; i < result.data.shourus.length; i++)
            shouru[result.data.shourus[i].month - 1] = result.data.shourus[i].money;
          for (let i = 0; i < 12; i++)
            if (shouru[i] === undefined) shouru[i] = 0;
          //-------------------------------------支出
          for (var i = 0; i < result.data.zhichus.length; i++)
            zhichu[result.data.zhichus[i].month - 1] = -result.data.zhichus[i].money;
          for (let i = 0; i < 12; i++)
            if (zhichu[i] === undefined) zhichu[i] = 0;
          //----------------------------------------------利润
          for (var i = 0; i < 12; i++)
            liruns[i] = shouru[i] + zhichu[i]

          var echarts = require('echarts');
          var myChart = echarts.init(document.getElementById('chu'));
          myChart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            title: {
              text: _this.query.year + '年' + _this.msg,
              x: 'center',
              y: 'top'
            },
            legend: {
              data: ['利润', '支出', '收入'],
              x: 'left',
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'value'
              }
            ],
            yAxis: [
              {
                type: 'category',
                axisTick: {
                  show: false
                },
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
              }
            ],
            series: [
              {
                name: '利润',
                type: 'bar',
                label: {
                  show: true,
                  position: 'inside'
                },
                data: liruns
              },
              {
                name: '收入',
                type: 'bar',
                stack: '总量',
                label: {
                  show: true
                },
                data: shouru
              },
              {
                name: '支出',
                type: 'bar',
                stack: '总量',
                label: {
                  show: true,
                  position: 'left'
                },
                data: zhichu
              }
            ]
          });
        }).catch(function (error) {
          alert(error)
        });
      },
      getCaiwu() { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        var times = this.query.year
        params.append("name", times);
        this.$axios.post("cwbaobiao/querycwbaobiao2.action", params).then(function (result) {
          var echarts = require('echarts');
          var myChart = echarts.init(document.getElementById('caiwu'));
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            title: {
              text:  _this.query.year + '年' + _this.msg1,
              x: 'center',
              y: 'top'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['采购支出', '销售收入', '商户提现', '用户退货支出', '库存退货收入']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: result.data,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }]
          };
          myChart.setOption(option);
        }).catch(function (error) {
          alert(error)
        });
      },
      getData() { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        var times = this.query.year + "-" + this.query.month;
        params.append("page", this.page);
        params.append("rows", this.rows);
        params.append("cwname", times);
        var types = this.query.type;
        if (types == "") {
          types = 0;
        }
        params.append("type", types);
        this.$axios.post("cwbaobiao/querycwbaobiao3.action", params).then(function (result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
        }).catch(function (error) {
          alert(error)
        });
      },
      headClass() { //表头居中显示
        return "text-align:center"
      },
      rowClass() { //表格数据居中显示
        return "text-align:center"
      },
      pagechange(pageindex) {
        this.page = pageindex;
        this.getData();
      },
      querytongji() {
        this.getCaiwuBaobiao();
        this.getCaiwu();
        this.getData();
      },
    },
    created() {
      this.getCaiwuBaobiao();
      this.getCaiwu();
      this.getData();
    }
  }
</script>

<style scoped>

</style>
