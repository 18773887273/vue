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
                <el-button type="primary" size="small" @click="querytongji1">查看</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="14">
            <div id="xiaoshou1" :style="{width: '680px', height: '400px'}"></div>
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
        shid:sessionStorage.getItem('shid'),
        msg1: '年营收明细',
        years: [
          {id: "2014", year: "2014年"},
          {id: "2015", year: "2015年"},
          {id: "2016", year: "2016年"},
          {id: "2017", year: "2017年"},
          {id: "2018", year: "2018年"},
          {id: "2019", year: "2019年"},
          {id: "2020", year: "2020年"}
        ],
        rows: 10,
        total: 1,
        tableData: [],
        page: 1,
        query: {
          year1: "2020",
          type: "",
          number: ""
        },
        shops: [],
      }
    },
    methods: {
      getShouru() { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        var year = this.query.year1;
        params.append("year", year);
        params.append("shid", _this.shid);
        this.$axios.post("shbaobiao/queryshbaobiao.action", params).then(function (result) {
          var xiaoshou = new Array();
          //----------------------------------------------数量
          for (var i = 0; i < result.data.shshrs.length; i++)
            xiaoshou[result.data.shshrs[i].month - 1] = result.data.shshrs[i].number;
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
              data: ['收入'],
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
        this.getShouru();
      },
    },
    created() {
      this.getShouru();
    }
  }
</script>

<style scoped>
</style>
