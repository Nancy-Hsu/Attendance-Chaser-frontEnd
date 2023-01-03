import { createApp } from "vue"
import UUID from "vue3-uuid"
import "./style.scss"
import App from "./App.vue"
import router from "@/router/index.js"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)
const TZ = dayjs.tz.guess()
dayjs.tz.setDefault(TZ)



const app = createApp(App)
app.config.globalProperties.dayjs = dayjs
app.use(dayjs)
app.use(UUID)
app.use(router)
app.mount("#app")
