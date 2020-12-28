<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="年">
            <el-select style="width: 100px;" v-model="query.year" filterable placeholder="请选择" size="small">
              <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="月">
            <el-select style="width: 100px;" v-model="query.month" filterable placeholder="请选择" size="small">
              <el-option v-for="item in months" :key="item.id" :label="item.month" :value="item.id">
              </el-option>
            </el-select>
            <el-button type="primary" size="small" @click="querytongji">查看</el-button>
          </el-form-item>
          <el-form-item label="进出类型">
            <el-select style="width: 100px;" v-model="query.type" filterable placeholder="请选择" size="small">
              <el-option v-for="item in types" :key="item.id" :label="item.typename" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-row :gutter="24">
          <el-col :span="12">
            <div id="cai" :style="{width: '600px', height: '450px'}"></div>
          </el-col>
          <el-col :span="12">
            <div id="cai1" :style="{width: '600px', height: '450px'}"></div>
          </el-col>
          <el-col :span="22" :offset="1">
            <el-table :data="tableData" stripe style="width: 100%" border :header-cell-style="headClass"
                      :cell-style="rowClass" border>
              <el-table-column prop="wareid.warename" label="进出仓库">
              </el-table-column>
              <el-table-column label="商品名称">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p style="margin:auto">商品类型: {{ scope.row.shopid.shoptyid.shoptyname}}</p>
                    <p><img :src="scope.row.shopid.shopimg" min-width="100" height="100"/></p><br>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.shopid.shopname }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="employ.empname" label="操作人">
              </el-table-column>
              <el-table-column prop="count" label="进出数量">
              </el-table-column>
              <el-table-column prop="type" label="进出类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==1" style="color:blue">销售出库</span>
                  <span v-if="scope.row.type==2" style="color: #dc3545">采购入库</span>
                  <span v-if="scope.row.type==3" style="color: wheat">退货出库</span>
                  <span v-if="scope.row.type==4" style="color: #39b6f0">退货入库</span>
                  <span v-if="scope.row.type==5" style="color: #58cdd1">转移出库</span>
                  <span v-if="scope.row.type==6" style="color: green">转移入库</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="进出时间">
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
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: "caiwubaobiao",

    data() {
      return {
        rows: 5,
        total: 1,
        msg: '出库明细',
        years: [
          {id: "2014", year: "2014年"},
          {id: "2015", year: "2015年"},
          {id: "2016", year: "2016年"},
          {id: "2017", year: "2017年"},
          {id: "2018", year: "2018年"},
          {id: "2019", year: "2019年"},
          {id: "2020", year: "2020年"}
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
        types: [
          {id: "0", typename: "全部"},
          {id: "1", typename: "销售出库"},
          {id: "2", typename: "采购入库"},
          {id: "3", typename: "退货出库"},
          {id: "4", typename: "退货入库"},
          {id: "5", typename: "转移出库"},
          {id: "6", typename: "转移入库"},
        ],
        query: {
          year: "2020",
          month: "12",
          type: "",
        },
        tableData: [],
        page: 1
      }
    },
    methods: {
      getcangkuruku() { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        var times = this.query.year + "-" + this.query.month;
        params.append("name", times);
        params.append("value", 2);
        this.$axios.post("ckbaobiao/queryckbaobiao1.action", params).then(function (result) {
          var echarts = require('echarts');
          var myChart = echarts.init(document.getElementById('cai1'));
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            title: {
              text: '商品入库统计',
              x: 'center',
              y: 'top'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: result.data.names,
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
      getcangkuchuku() { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        var times = this.query.year + "-" + this.query.month;
        params.append("name", times);
        params.append("value", 1);
        this.$axios.post("ckbaobiao/queryckbaobiao1.action", params).then(function (result) {
          var echarts = require('echarts');
          var myChart = echarts.init(document.getElementById('cai'));
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            title: {
              text: '商品出库统计',
              x: 'center',
              y: 'top'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: result.data.names,
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
        params.append("times", times);
        var types=this.query.type;
        if(types==""){
          types=0;
        }
        params.append("type", types);
        this.$axios.post("ckbaobiao/queryckbaobiao2.action", params).then(function (result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
        }).catch(function (error) {
          alert(error)
        });
      },
      querytongji() {
        this.getData();
        this.getcangkuchuku();
        this.getcangkuruku();
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
      }
    },
    created() {
      this.getData();
      this.getcangkuchuku();
      this.getcangkuruku();
    }
  }
  /* export default {
    name: "market",
    data () {
      return {
        year:'',
        mothed:[],
        price:[],
        indexmid: sessionStorage.getItem('mid'),
      }
    },
    methods: {
      getDataqianwu() { //获取数据方法
        var length = 0;
        var _this = this;
        var params = new URLSearchParams();
        params.append("year", this.year);
        params.append("mid", this.indexmid);
        this.$axios.post("/querymonthlyincome.action",params).
        then(function(result) {
          _this.mothed.splice(0, _this.mothed.length)
          _this.price.splice(0, _this.price.length)
          length = result.data.length
          for(var i=0;i<length;i++){
            _this.mothed.push(result.data[i].mothen);
            _this.price.push(result.data[i].total);
          }
          console.log(_this.mothed)
          console.log(_this.price)
          var myChart = echarts.init(document.getElementById('main'));
          // 指定图表的配置项和数据
          let option = {
            title: {
              text: "一年的收入情况"
            },
            tooltip: {},
            legend: {
              data: ["销量"]
            },
            xAxis: {
              data: _this.mothed
            },
            yAxis: {},
            series: [
              {
                name: "营收额",
                type: "bar",
                data: _this.price
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }).
        catch(function(error) {
          alert(error)
        });
      },
      seleyear(){
        this.getDataqianwu();
      }
    },
    created(){
      this.getDataqianwu();
    }
  }*/
</script>

<style scoped>

</style>
