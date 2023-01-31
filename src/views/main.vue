<template>
  <div class="container py-3">
    <div class="row">
      <div class="col-md-4">
        <!-- 監聽子元件是否打卡成功 -->
        <clockIn @getCalenderData="getCalenderData"></clockIn>
        <!-- 個人資料 -->
        <userProfile></userProfile>
      </div>
      <div class="col-md-8">
        <!-- 行事曆 -->
        <attendedList></attendedList>
      </div>
    </div>
  </div>
</template>

<script setup>
  import userProfile from "../components/userProfile.vue"
  import clockIn from "../components/clockIn.vue"
  import attendedList from "../components/attendedList.vue"
  import axios from 'axios'
  import { ref, reactive, provide } from 'vue'
  import userAPI from './../apis/user'
  import { Toast } from './../utils/helpers'
  import { day } from './../../day.js'
  import { storeToRefs } from 'pinia'
  import { userStore } from "../store/index.js"
  import { v4 as uuidv4 } from 'uuid'
  const store = userStore()
  const { currentUser } = storeToRefs(store)
  

  // 取得行事曆項目以及打卡時間
  let events = ref([])
  const getCalenderData = async () => {
    const eventsArray = []
    const currentUserId = currentUser.value.id
    const year = day().year()
    const month = day().month() + 1
    const nationalHoliday = `https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/${year}.json`
    try {   
      // 得到行事曆的休假日提示
      let { data } = await axios.get(nationalHoliday)
      data.forEach(holiday => {
        if (holiday.isHoliday) {
          const formattedDate = day(holiday.date).format('YYYY-MM-DD')
          eventsArray.push({
            id: uuidv4(),
            title: holiday.description || '休假',
            time: { start: formattedDate, end: formattedDate },
            color: "red",
            isEditable: false
          })
        }
      })
      // 打API，帶入當年當月資料
      let attendedDate = await userAPI.getUserAttended({ userId: currentUserId, year, month })
      attendedDate = attendedDate.data.attendedDate
      // 整理成行事曆用的event object
      attendedDate.forEach(item => {
        // 顯示上班時間
        if (item.Attendances.startTime) {
          const formattedDate = day(item.Attendances.startTime).format("YYYY-MM-DD HH:mm")
          eventsArray.push({
            id: uuidv4(),
            title: "上班",
            time: { start: formattedDate, end: formattedDate },
            color: "green",
            isEditable: false
          })
        }
        // 顯示下班時間
        if (item.Attendances.endTime) {
          eventsArray.push({
            id: uuidv4(),
            title: "下班",
            time: { start: `${item.date} ${day(item.Attendances.endTime).format("HH:mm")}`, end: `${item.date} ${day(item.Attendances.endTime).format("HH:mm")}` },
            color: "green",
            isEditable: false
          })
        }
      })
      events.value = eventsArray
    } catch (error) {
      Toast.error(error.response?.data?.message || error.message)
    }
  }
  // 渲染行事曆 + 傳遞
  getCalenderData()
  provide('events', events)

</script>