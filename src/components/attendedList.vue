<template>
  <h2 class="fw-bold ms-2">
    當月出勤表
  </h2>
  <table class="table table-hover table-primary m-2 text-center shadow">
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
      <td colspan="4" v-else class="text-center">
        目前沒有資料
      </td>
    </tbody>
  </table>
</template>

<script setup>
  import { ref, reactive, computed, onBeforeMount } from 'vue'
    import userAPI from './../apis/user'
    import { Toast } from './../utils/helpers'
    import { day } from './../../day.js'

  let attended = ref('')
  onBeforeMount(async () => {
    try {
      console.log('hi')
      const response = await userAPI.getCurrentUser()
      const currentUserId = response.data.currentUser.id
      const year = day().year()
      const month = day().month() + 1
      console.log('h2')
      let attendedDate = await userAPI.getUserAttended({ userId: currentUserId, year, month })
      attendedDate = attendedDate.data.attendedDate
      const filtered = computed(() => attendedDate.map(item => {
        console.log('h3')
        let { startTime, endTime } = item.Attendances
        startTime = startTime ? day(startTime).format('HH:mm') : ''
        endTime = endTime ? day(endTime).isAfter(item.date, 'day') ? day(endTime).format('HH:mm') + ' (+1)' : day(endTime).format('HH:mm') : ''
        return {
          ...item,
          startTime,
          endTime,
        }
      }))
      attended.value = filtered.value
      console.log(attended.value)
      return
    } catch (error) {
      Toast.error(error.response?.data?.message || error.message);
    }
  })


  // const props = defineProps({
  //   attended: {
  //     type: Array,
  //     default: () => []
  //   }
  // })
  // date.value = props.attended
  // watch(props.attended, (newVal, oldVal) => { // watch it
  //   console.log('Prop changed: ', newVal, ' | was: ', oldVal)
  // },
  //  { deep: true }
  // )


</script>