import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)
const TZ = dayjs.tz.guess()
dayjs.tz.setDefault(TZ)

export const day = dayjs
