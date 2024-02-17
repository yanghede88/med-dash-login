import { memo, useMemo } from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { formatDate} from '@/utils/core'

const Chart = memo(({ dateRange }) => {
  // change the data here to patient data
  const yOptions = [
    {
      name: 'data1',
      data: getRandomData(),
      color: '#5ec9db'
    },
    {
      name: 'data2',
      data: getRandomData(),
      color: '#f5b97a'
    },
    {
      name: 'data3',
      data: getRandomData(),
      color: '#f57a7a'
    },
    {
      name: 'data4',
      data: getRandomData(),
      color: '#d5d97a'
    }
  ].map(({ name, color, type = 'line', data }) => ({
    name,
    data,
    color,
    seriesOption: getSeriesOption({ name, from: color, data, type })
  }))

  // the settings of graph
  const option = {
    color: yOptions.map(({ color }) => color),
    title: {
      text: 'Health data vis'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        axis: 'auto',
        snap: 'true'
      }
    },
    legend: {
      x: 'center',
      y: 'bottom'
    },
    grid: {
      left: '0%',
      right: '4%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dateRange.map((v) => formatDate(v, 'MM-DD')),
      splitLine: {
        show: false,
        lineStyle: {
          type: 'solid'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        interval: 2
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} unit',
        align: 'center'
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      },
      //set the max height greater than y-value
      max: yOptions.map(({ data }) => Math.max(...data)).reduce((a, b) => Math.max(a, b)) + 150
    },
    series: [...yOptions.map(({ seriesOption }) => seriesOption)]
  }

  // generate the random data for testing purposes
  function getRandomData(len = dateRange.length || 11) {
    const data = []
    for (let i = 0; i < len; i++) {
      data.push(Math.round(Math.random() * 200))
    }
    return data
  }

  // get the info of Y-axis
  function getSeriesOption(options) {
    return {
      name: options.name,
      type: options.type,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: options.from },
          { offset: 1, color: options.to || '#fff' }
        ]),
        lineStyle: {
          width: 1
        }
      },
      label: {
        show: false,
        position: 'top'
      },
      emphasis: {
        focus: 'series'
      },
      data: options.data
    }
  }

  return <ReactECharts option={option} style={{ height: 500 }} />
})

export default Chart
