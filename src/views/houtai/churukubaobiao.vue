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
            <el-button type="primary" size="small">查看</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="24">
          <el-col :span="12">
            <div id="cai" :style="{width: '600px', height: '450px'}"></div>
          </el-col>
          <el-col :span="12">
            <div id="cai1" :style="{width: '600px', height: '450px'}"></div>
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
          {id: "1", month: "1月"},
          {id: "2", month: "2月"},
          {id: "3", month: "3月"},
          {id: "4", month: "4月"},
          {id: "5", month: "5月"},
          {id: "6", month: "6月"},
          {id: "7", month: "7月"},
          {id: "8", month: "8月"},
          {id: "9", month: "9月"},
          {id: "10", month: "10月"},
          {id: "11", month: "11月"},
          {id: "12", month: "12月"}
        ],
        query: {
          year: "2020",
          month: "1"
        },
        tableData: []
      }
    },
    methods: {
      drawLine1() {
        var echarts = require('echarts');
        var myChart = echarts.init(document.getElementById('cai1'));
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          title:{
            text:'入库报表',
            x:'center',
            y:'top'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
        });
      },

      drawLine() {
        var echarts = require('echarts');
        var myChart = echarts.init(document.getElementById('cai'));
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          title:{
            text:'出库明细',
            x:'center',
            y:'top'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
        });
      }
    },
    mounted() {
      this.drawLine();
      this.drawLine1();
    },
  }
</script>

<style scoped>

</style>
