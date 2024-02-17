import day from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
day.locale('en')
day.extend(relativeTime)
day.extend(utc)
day.extend(timezone)
export { day }
