<template>
  <div id="echatrMain">雪月测试</div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([BarChart, TitleComponent, TooltipComponent, GridComponent, CanvasRenderer])

const eData = {
  title: {
    text: '雪月的 Echart'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
}

onMounted(() => {
  const myChart = echarts.init(document.getElementById('echatrMain'))
  myChart.setOption(eData)
})
</script>

<style>
#echatrMain {
  width: 100%;
  height: 300px;
}
</style>
