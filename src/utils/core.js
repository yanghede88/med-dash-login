import { day } from './day'

//get a period of the selected time
export const getDays = (start, end) => {
  if (!start || !end) return []
  let startTime = new Date(start).getTime()
  let endTime = new Date(end).getTime()
  let days = []

  while (startTime <= endTime) {
    days.push(startTime)
    startTime += 24 * 60 * 60 * 1000
  }
  return days
}

//format the date
export const formatDate = (date, fmt = 'YYYY-MM-DD') => {
  const timeStamp = new Date(date).getTime()
  if (!timeStamp) return ''
  return day(timeStamp).format(fmt)
}

