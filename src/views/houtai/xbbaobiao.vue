<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form :inline="true" class="demo-form-inline" style="margin-left: 0px">
              <el-form-item label="年">
                <el-select style="width: 100px;" v-model="query.year1" filterable placeholder="请选择" size="small">
                  <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.id">
                  </el-option>
                </el-select>
                <el-form-item label="月">
                  <el-select v-model="query.number" style="width: 100px;" filterable placeholder="请选择" size="small">
                    <el-option
                      v-for="item in shops"
                      :key="item.shopid"
                      :label="item.shopname"
                      :value="item.shopid">
                    </el-option>
                  </el-select>
                  <el-button type="primary" size="small" @click="querytongji1">查看</el-button>
                </el-form-item>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form :inline="true" class="demo-form-inline" style="margin-left: 0px">
              <el-form-item label="年">
                <el-select style="width: 100px;" v-model="query.year2" filterable placeholder="请选择" size="small">
                  <el-option v-for="item in years" :key="item.id" :label="item.year" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="月">
                <el-select style="width: 100px;" v-model="query.month" filterable placeholder="请选择" size="small">
                  <el-option v-for="item in months" :key="item.id" :label="item.month" :value="item.id">
                  </el-option>
                </el-select>
                <el-button type="primary" size="small" @click="querytongji2">查看</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="14">
            <div id="xiaoshou1" :style="{width: '680px', height: '600px'}"></div>
          </el-col>
          <el-col :span="9">
            <div id="xiaoshou2" :style="{width: '600px', height: '600px'}"></div>
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

    data() {
      return {
        msg1: '商品销售明细',
        msg2: '销售类型明细',
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
          year1: "2020",
          year2: "2020",
          type: "",
          month: "12",
          number: ""
        },
        shops: [],
      }
    },
    methods: {
      getXiaoshou1() { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        var year = this.query.year1;
        var number = this.query.number;
        if (number == "") {
          number = 0
        }
        params.append("year", year);
        params.append("number", number)
        this.$axios.post("xsbaobiao/queryxsbaobiao1.action", params).then(function (result) {
          var xiaoshou = new Array();
          //----------------------------------------------数量
          for (var i = 0; i < result.data.xiaoshous.length; i++)
            xiaoshou[result.data.xiaoshous[i].month - 1] = result.data.xiaoshous[i].number;
          for (let i = 0; i < 12; i++)
            if (xiaoshou[i] === undefined) xiaoshou[i] = 0;

          var echarts = require('echarts');
          var myChart = echarts.init(document.getElementById('xiaoshou1'));
          myChart.setOption({
            title: {
              text: _this.query.year1 + '年' + "-----" + _this.msg1,
              x: 'center',
              y: 'top'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            legend: {
              data: ['销售量'],
              x: 'left',
              y: 'top'
            },
            yAxis: [
              {
                type: 'value'
              }
            ],
            xAxis: [
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
                name: '销售量',
                type: 'bar',
                data: xiaoshou
              }
            ]
          });
        }).catch(function (error) {
          alert(error)
        });
      },
      getshopname() { //获取数据方法
        var _this = this;
        this.$axios.post("shop/queryall.action").then(function (result) {
          _this.shops = result.data;
        }).catch(function (error) {
          alert(error)
        });
      },
      getXiaoshou2() { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        var times = this.query.year2 + "-" + this.query.month;
        params.append("name", times);
        this.$axios.post("xsbaobiao/queryxsbaobiao2.action", params).then(function (result) {
          var echarts = require('echarts');
          var myChart = echarts.init(document.getElementById('xiaoshou2'));
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            title: {
              text: _this.query.year2 + '年' + _this.query.month + '月' + "-----" + _this.msg2,
              x: 'center',
              y: 'top'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: result.data.names
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
      querytongji1() {
        this.getXiaoshou1();
      },
      querytongji2() {
        this.getXiaoshou2();
      }
    },
    created() {
      this.getXiaoshou1();
      this.getXiaoshou2();
      this.getshopname();
    }
  }
</script>

<style scoped>
</style>
