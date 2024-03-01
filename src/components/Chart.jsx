import React, { useState, useEffect } from 'react';
import { memo } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { formatDate} from '/src/utils/core.js';
import useFetchAndDisplayCSV from './useFetchAndDisplayCSV';
import { day } from '@/utils/day';

const csvs = ['analysis_cal.csv','analysis_dist.csv','analysis_heart.csv','analysis_steps.csv']




const Chart = memo(({ dateRange }) => {
  let startDate = dateRange.slice(0)[0];
  let endDate = dateRange.slice(-1)[0];

  

  let [yOptions, setYOptions] = useState([
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
  })));


  useEffect(() => {
      async function fetchData() {
        try {
          const cal_data = await useFetchAndDisplayCSV(csvs[0]);
          const dist_data = await useFetchAndDisplayCSV(csvs[1]);
          const heart_data = await useFetchAndDisplayCSV(csvs[2]);
          const steps_data = await useFetchAndDisplayCSV(csvs[3]);
          
          function filterData(healthData) { let filteredData = healthData.labels.map((label, index) => ({
            date: day(label),
            data: healthData.data[index] // Assuming your data is in the same order as labels
          })).filter(item => (
            item.date >= startDate && item.date <= endDate
          ));
          const filteredLabels = filteredData.map(item => item.date);
          const filteredValues = filteredData.map(item => item.data);
          
          return{
            labels: filteredLabels,
            data: filteredValues
            };
          }
          let filteredCalData = filterData(cal_data);
          let filteredDistData = filterData(dist_data);
          let filteredHeartData = filterData(heart_data);
          let filteredStepsData = filterData(steps_data);

          setYOptions([
            {
              name: 'Calories Burned (kcal)',
              data: filteredCalData.data,
              color: '#5ec9db'
            },
            {
              name: 'Distance Traveled (meters)',
              data: filteredDistData.data,
              color: '#f5b97a'
            },
            {
              name: 'Heart Rate (bpm)',
              data: filteredHeartData.data,
              color: '#f57a7a'
              
            },
            {
              name: 'Steps Taken (count)',
              data: filteredStepsData.data, // Assuming useFetchAndDisplayCSV resolves to the structure { labels: [...], data: [...] }
              color: '#d5d97a'
            }
          ].map(({ name, color, type = 'line', data }) => ({
            name,
            data,
            color,
            seriesOption: getSeriesOption({ name, from: color, data, type }),
            visible: true

          })));
        } catch (error) {
          console.error('Error fetching and parsing the CSV:', error);
        }
      }

      fetchData();
    }, [startDate,endDate]);

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
      y: 'bottom',
      // selectedMode: false,
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
      min: formatDate(startDate, 'MM-DD'), // Set the minimum date to the start date
      max: formatDate(endDate, 'MM-DD'),
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
      // type:'time'
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} units',
        align: 'center'
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      },
      emphasis:{
        focus: 'series'
      },
      legend:{
        selectorLabel: {
          show: true
        },

      },
      //set the max height greater than y-value
      min: 0,
      max: 'dataMax' //dynamically set y-axis height
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
      data: options.data,
    }
  }

  return <ReactECharts option={option} style={{ height: 500}} />
})

export default Chart