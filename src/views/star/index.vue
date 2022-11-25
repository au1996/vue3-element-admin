<template>
  <div ref="starViewRef" v-loading="state.loading" class="star-view">
    <div :id="CHART_ID" class="chart"></div>
    <I class="icon" name="FullScreen" :size="24" @click="onScreenfull" />
    <el-breadcrumb separator="/" class="breadcrumb-box">
      <el-breadcrumb-item
        v-for="(item, index) in state.breadcrumbList"
        :key="item.name"
        @click="toggleBreadcrumb(index)"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
import CHINA_JSON from '@/assets/json/china.json'
import { get_map_json } from '@/api/aliyun'

let myChart = null
const CHART_ID = 'china-chart-id'
const TITLE_TEXT = '中国人口分布地图（Tip: 假数据）'
const mapCache = new Map()
mapCache.set(100000, CHINA_JSON)

function chartResize() {
  myChart.resize()
}

onMounted(() => {
  initFn(CHINA_JSON)
  window.addEventListener('resize', chartResize)
})

onUnmounted(() => {
  myChart?.dispose()
  window.removeEventListener('resize', chartResize)
})

const state = reactive({
  loading: false,
  list: [],
  breadcrumbList: [
    {
      name: '中国',
      adcode: 100000
    }
  ]
})

const initData = (res) => {
  echarts.registerMap('CHINA_JSON', res)
  state.list = res.features
  state.list.forEach((item) => {
    item.properties.value = Math.ceil(Math.random() * 5_000 - 1)
  })
}

const initFn = (res) => {
  const ele = document.getElementById(CHART_ID)
  myChart?.dispose()
  myChart = echarts.init(ele)
  initData(res)
  draw()
}

const draw = () => {
  const option = {
    title: {
      text: TITLE_TEXT,
      top: 10,
      left: 10
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      extraCssText: 'background: rgba(0,0,0,0.7)',
      transitionDuration: 0.2,
      textStyle: {
        color: '#fff'
      },
      formatter(params) {
        const res = `<span class="title">${params.name} : ${params.value}</span></br>`
        return res
      }
    },
    visualMap: {
      show: true, // 图注
      min: 0,
      max: 5_000,
      left: 5,
      top: 'bottom',
      text: ['高', '低'], // 取值范围的文字
      textStyle: {
        color: '#000'
      },
      inRange: {
        color: ['#e0ffff', 'rgba(0,60,153,0.8)'] // 取值范围的颜色
      }
    },
    series: [
      {
        name: TITLE_TEXT,
        type: 'map',
        map: 'CHINA_JSON',
        roam: true, // 是否开启缩放和平移
        zoom: 1, // 视角缩放比例
        label: {
          normal: {
            show: true,
            fontSize: '12',
            color: 'rgba(0,0,0,0.6)'
          }
        },
        itemStyle: {
          borderColor: '#02c0ff'
        },
        emphasis: {
          areaColor: '#F3B329', // 鼠标选择区域颜色
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        data: state.list.map((item) => item.properties)
      }
    ]
  }

  myChart.setOption(option)
  myChart.on('click', (params) => {
    // console.log(params)
    const { name, adcode, level } = params.data

    if (level === 'district') {
      ElMessage.warning(`暂无${name}地图数据`)
      return
    }

    // 有缓存拿缓存
    const res = mapCache.get(adcode)
    if (res) {
      state.breadcrumbList.push({ name, adcode })
      initFn(res)
      return
    }

    // 去阿里云提供的接口拿
    state.loading = true
    get_map_json({ code: adcode + '_full' })
      .then((res) => {
        state.breadcrumbList.push({ name, adcode })
        mapCache.set(adcode, res)
        initFn(res)
      })
      .finally(() => {
        state.loading = false
      })
  })
}

const toggleBreadcrumb = (index) => {
  const list = state.breadcrumbList
  if (index === list.length - 1) {
    return
  }
  const res = mapCache.get(list[index].adcode)
  state.breadcrumbList = list.slice(0, index + 1)
  initFn(res)
}

const starViewRef = ref()
const onScreenfull = () => {
  const element = starViewRef.value
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    element.requestFullscreen()
  }
}
</script>

<style lang="scss" scoped>
.star-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;

  .chart {
    width: 100%;
    height: 100%;
  }

  .icon {
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
  }

  .breadcrumb-box {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
