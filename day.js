import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)
const TZ = dayjs.tz.guess()
dayjs.tz.setDefault(TZ)


export const day = dayjs
// export default{
//   dayjs
// }

// export function formatUtcString(
//   utcString: string,
//   format: string = DATE_TIME_FORMAT
// ) {
//   return dayjs.utc(utcString).format(format)
// }

// export function formatTimestamp(
//   timestamp: number,
//   format: string = DATE_TIME_FORMAT
// ) {
//   return ''
// }
