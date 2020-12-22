<script>
  import ECharts from 'vue-echarts' // 主图表对象
  import 'echarts/lib/chart/line' // 曲线图表
  import 'echarts/lib/chart/bar' // 柱状图
  import 'echarts/lib/chart/pie' // 饼状图
  import 'echarts/lib/component/tooltip' // 提示信息


  export default {
    title: {
      text: '饼图程序调用高亮示例',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
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
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  </script>

<style scoped>
  .echarts { width: 100%; height: 400px;}

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
    margin-bottom: 20px;
  }
</style>
复制代码
