import { useState } from 'react'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker

/**
 * @param {number[]} defaultDates 
 * @param {number} disabledRange //change the range of date
 * @param {(e: number[]) => void} onChange //when the date is changed
 */
const DateRangePicker = ({ defaultDates, disabledRange = 15, onChange }) => {
  const [dates, setDates] = useState(defaultDates)

  const disabledDate = (current) => {
    if (!dates) {
      return false
    }

    const tooLate = dates[0] && current.diff(dates[0], 'days') >= disabledRange
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= disabledRange
    return !!tooEarly || !!tooLate
  }

  function getTimestamp(data) {
    return new Date(data).getTime()
  }

  function handleChange(e) {
    if (!e) return
    setDates(e)
    onChange(e.map((v) => getTimestamp(v)))
  }

  return (
    <RangePicker
      onChange={handleChange}
      disabledDate={disabledDate}
      onCalendarChange={(val) => {
        setDates(val)
      }}
      defaultValue={dates}
      changeOnBlur
    />
  )
}

export default DateRangePicker
