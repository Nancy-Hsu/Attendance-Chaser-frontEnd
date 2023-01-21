<template>
  <h2 class="fw-bold ms-2">
    當月出勤表
  </h2>
  <div id="attended-list" class="shadow">
  <table class="table table-hover table-primary text-center " >
    <thead>
      <tr>
        <th scope="col">日期</th>
        <th scope="col">星期</th>
        <th scope="col">上班時間</th>
        <th scope="col">下班時間</th>
        <th scope="col">備註</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="attended" v-for="date in attended" :key="date.id"
        :class="date.isHoliday ? 'table-secondary':'table-light'">
        <th scope="row">{{date.date}}</th>
        <td>{{date.week}}</td>
        <td>{{date.startTime}}</td>
        <td>{{date.endTime}}</td>
        <td>{{date.description}}</td>
      </tr>
      <!-- 沒有行事曆的話 -->
      <td colspan="4" v-else class="text-center">
        目前沒有資料
      </td>
    </tbody>
  </table>
  </div>
</template>

<script setup>
  import { ref, reactive, computed, onBeforeMount } from 'vue'
  import userAPI from './../apis/user'
  import { Toast } from './../utils/helpers'
  import { day } from './../../day.js'
  import { storeToRefs } from 'pinia'
  import { userStore } from "../store/index.js"
  const store = userStore()
  const { currentUser } = storeToRefs(store)
  import bus from 'vue3-eventbus'

  bus.on('clockIn', () => {
    getAttended()
  })

  let attended = ref('')
  onBeforeMount(() => {
    getAttended()
  })

  const getAttended = async () => {
    try {
      const currentUserId = currentUser.value.id
      const year = day().year()
      const month = day().month() + 1
      // 取得行事曆，帶入當年當月資料
      let attendedDate = await userAPI.getUserAttended({ userId: currentUserId, year, month })
      attendedDate = attendedDate.data.attendedDate
      // 整理時間格式
      const filteredTime = computed(() => attendedDate.map(item => {
        let { startTime, endTime } = item.Attendances
        startTime = startTime ? day(startTime).format('HH:mm') : ''
        endTime = endTime ? day(endTime).isAfter(item.date, 'day') ? day(endTime).format('HH:mm') + ' (+1)' : day(endTime).format('HH:mm') : ''
        return {
          ...item,
          startTime,
          endTime,
        }
      }))
      attended.value = filteredTime.value
      return
    } catch (error) {
      Toast.error(error.response?.data?.message || error.message)
    }
  }
</script>

<style>
  #attended-list {
    height: calc(100vh - 150px);
    min-height: 210px;
    width: 100%;
    overflow-y: scroll
  }
</style>