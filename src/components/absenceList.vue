<template>
  <h2 class="fw-bold ms-2">
    出勤異常
  </h2>
  <small></small>
  <table class="table table-hover table-primary ms-2 text-center">
    <thead>
      <tr>
        <th scope="col">狀態</th>
        <th scope="col">日期</th>
        <th scope="col">上班時間</th>
        <th scope="col">下班時間</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="absence in absences" :key="absence.id" class="table-light">
        <th scope="row">異常</th>
        <td>{{absence.day}}</td>
        <td>{{absence.startTime}}</td>
        <td>{{absence.endTime}}</td>
      </tr>
    </tbody>
  </table>

</template>

<script setup>
  import { ref, reactive, computed, onBeforeMount } from 'vue'
  import userAPI from './../apis/user'
  import { Toast } from './../utils/helpers'
  import { day } from './../../day.js'
  
  const absences = ref([]);
  onBeforeMount(async () => {
    try {
      const response = await userAPI.getCurrentUser()
      const currentUserId = response.data.currentUser.id

      let absenceList = await userAPI.getUserAbsence({ userId: currentUserId })
      absenceList = absenceList.data.absenceData

      const filtered = computed(() => absenceList.map(item => ({
        ...item,
        startTime: item.startTime? day(item.startTime).format('HH:mm'): '未打卡' ,
        endTime: item.endTime? day(item.endTime).format('HH:mm') : '未打卡',
        day: day(item.startTime).format('YYYY/MM/DD') 
      })))
      absences.value = filtered.value

    } catch (error) {
      Toast.error(error.response.data.message);
    }
  })
</script>