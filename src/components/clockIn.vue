<template>
  <form action="POST" class="text-center ">
    <button @click='clockIn' type="button" class="btn btn-primary fs-3 w-50 mb-3 me-3">打卡</button>
    <button type="button" class="btn btn-outline-primary fs-3 mb-3">QR code</button>
  </form>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from "vue-router"
  import attendanceAPI from './../apis/attendance'
  import { Toast } from './../utils/helpers'
  // import day from "./../../day.js"


  const data = {}
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 5000
  }
  function success(position) {
  }
  function error(err) {
    Toast.error(`${err.code} : ${err.message}`)
  }
  function getPosition() {
    return new Promise((success, error) => {
      navigator.geolocation.getCurrentPosition(success, error, options)
    })
  }
  const clockIn = async () => {
    try {
      if (!navigator.geolocation) {
        return Toast.warning('抱歉！瀏覽器不支援存取您的位置')
      }
      const position = await getPosition()
      const crd = position.coords
      const data = {
        lat: crd.latitude,
        lng: crd.longitude,
        timeStamp: 1672812000000
      }
      const clockin = await attendanceAPI.postAttendance({ data })
      Toast.success(clockin.data.msg)
    } catch (error) {
      console.log(error)
      Toast.error(error.response.data.message)
    }

  } 
</script>