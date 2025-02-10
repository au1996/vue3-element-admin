import { onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

export default function useChart(chartRef) {
  const myChart = {
    value: null
  }

  function chartResize() {
    myChart.value?.resize()
  }

  onMounted(() => {
    if (!myChart.value) {
      myChart.value = echarts.init(chartRef.value)
      window.addEventListener('resize', chartResize)
    }
  })

  onUnmounted(() => {
    myChart.value?.dispose()
    myChart.value = null
    window.removeEventListener('resize', chartResize)
  })

  return {
    myChart
  }
}
