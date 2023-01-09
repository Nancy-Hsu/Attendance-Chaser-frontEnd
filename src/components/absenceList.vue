<template>
  <h2 class="fw-bold ms-2">
    出勤異常
  </h2>
  <small class="p-3">將顯示近兩個月的打卡異常</small>
  <table class="table table-hover table-primary m-2 text-center shadow">
    <thead>
      <tr>
        <th scope="col">狀態</th>
        <th scope="col">日期</th>
        <th scope="col">上班時間</th>
        <th scope="col">下班時間</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="absences" v-for="absence in absences" :key="absence.id" class="table-light">
        <th scope="row">異常</th>
        <td>{{absence.date}}</td>
        <td>{{absence.startTime}}</td>
        <td>{{absence.endTime}}</td>
      </tr>
      <td colspan="4" v-else class="text-center">
        目前沒有異常資料
      </td>
    </tbody>
  </table>
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

  const absences = ref([]);
  onBeforeMount(async () => {
    try {
      const currentUserId = currentUser.value.id

      let absenceList = await userAPI.getUserAbsence({ userId: currentUserId })
      absenceList = absenceList.data.absenceData
      // 沒有異常則返回
      if (!absenceList.length) {
        absences.value = false
        return
      }
      const formattedTime = computed(() => absenceList.map(item => {
        let { startTime, endTime } = item.Attendances
        startTime = day(startTime).format('HH:mm') || '未打卡'
        endTime = endTime ? day(endTime).isAfter(item.date, 'day') ? day(endTime).format('HH:mm') + ' (+1)' : day(endTime).format('HH:mm') : '未打卡'
        return {
          ...item,
          startTime,
          endTime,
        }
      }))
      absences.value = formattedTime.value
    } catch (error) {
      Toast.error(error.response?.data?.message || error.message)
    }
  })
</script>