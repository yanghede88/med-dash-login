import { useState, useCallback, useEffect } from 'react'
import { formatDate, getDays } from '@/utils/core'
import { day } from '@/utils/day'
import { Button, DatePicker } from 'antd'
import DateRangePicker from '@/components/DatePicker'
import Chart from '@/components/Chart'
import ShowData from '@/components/ShowData'
import SvgIcon from '@/components/SvgIcon'
import useFetchAndDisplayCSV from './useFetchAndDisplayCSV'
import { current } from '@reduxjs/toolkit'


const csvs = ['analysis_cal.csv','analysis_dist.csv','analysis_heart.csv','analysis_steps.csv']

const { RangePicker } = DatePicker;

function Visualization() {
  const DISABLED_RANGE = 31
  const defaultDateRange = [day().subtract(DISABLED_RANGE, 'days'), day()]

  const [currentDate, setCurrentDate] = useState(defaultDateRange)
  // const handleDateChange = useCallback((dateRange) => {
  //   setCurrentDate(dateRange)
  // })

  let [firstDateArray,setFirstDateArray] = useState([])
  let [lastDateArray,setLastDateArray] = useState([])
  let [startDate,setStartDate] = useState(null)
  let [endDate,setEndDate] = useState(null)

  function handleDateChange(dates){
    if (dates && dates.length === 2) {
      console.log(dates)
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };
  
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching Data")
        const cal_data = await useFetchAndDisplayCSV(csvs[0]);
        const dist_data = await useFetchAndDisplayCSV(csvs[1]);
        const heart_data = await useFetchAndDisplayCSV(csvs[2]);
        const steps_data = await useFetchAndDisplayCSV(csvs[3]);
               
        const calTimeData = cal_data.labels
        const distTimeData = dist_data.labels
        const heartTimeData = heart_data.labels
        const stepTimeData = steps_data.labels

        // setFirstDateArray([calTimeData.slice(0)[0].split(" ")[0],distTimeData.slice(0)[0].split(" ")[0],heartTimeData.slice(0)[0].split(" ")[0],stepTimeData.slice(0)[0].split(" ")[0]])
        // setLastDateArray([calTimeData.slice(-1)[0].split(" ")[0],distTimeData.slice(-1)[0].split(" ")[0],heartTimeData.slice(-1)[0].split(" ")[0],stepTimeData.slice(-1)[0].split(" ")[0]])

        // Slices a piece of data like "2023-06-20 07:00:00" and returns the dates (e.g."2023-06-20 07:00:00" -> "2023-06-20)
        setFirstDateArray([calTimeData.slice(0)[0],distTimeData.slice(0)[0],heartTimeData.slice(0)[0],stepTimeData.slice(0)[0]])
        setLastDateArray([calTimeData.slice(-1)[0],distTimeData.slice(-1)[0],heartTimeData.slice(-1)[0],stepTimeData.slice(-1)[0]])

        
        if (firstDateArray.length > 0){
          handleDateChange([day(firstDateArray[0]),day(firstDateArray[0]).add(DISABLED_RANGE, 'days')])
        }
        
      } catch (error) {
        console.error('Error fetching and parsing the CSV:', error);
      }
    }

    
    fetchData();
  }, [firstDateArray[0]]);
  
  




  return (
    <div className="mt-20 py-4 px-8">
      <section className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button>
            <div className="flex gap-2">
              <span>Download</span>
              <SvgIcon iconName="download" size={14} />
            </div>
          </Button>
          <Button>
            <div className="flex gap-2">
              <span>Save</span>
              <SvgIcon iconName="save" size={14} />
            </div>
          </Button>
        </div>
      </section>

      <section className="mt-8 flex justify-end items-center">
        <DateRangePicker
          value={[startDate,endDate]}
          defaultDateRange={[defaultDateRange]}
          disabledRange={DISABLED_RANGE}
          onChange={handleDateChange}
          onReload
        />
        
      </section>

      <section className="mt-4 p-4 bg-white rounded-lg max-w-screen-lg">
        <Chart dateRange={getDays(startDate, endDate)} />
      </section>

      <section className="mt-4">
        <ShowData />
      </section>
    </div>
  )
}

export default Visualization;
