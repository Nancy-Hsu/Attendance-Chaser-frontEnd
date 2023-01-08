<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-5">
        <clockIn></clockIn>
        
        <!-- 個人資料 -->
        <userProfile :user="user"></userProfile>
      </div>
      <div class="col-md-6">
        <!-- 動態 -->
        <attendedList :attended="attended"></attendedList>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onBeforeMount, computed, provide, defineProps, onMounted } from 'vue'
  import userProfile from "../components/userProfile.vue"
  import userEdit from "../components/userEdit.vue"
  import clockIn from "../components/clockIn.vue"
  import attendedList from "../components/attendedList.vue"
  import userAPI from './../apis/user'
  import { Toast } from './../utils/helpers'
  import { day } from './../../day.js'
  import QRcodeModal from "../components/QRcodeModal.vue"

  // const user = ref('')
  // onBeforeMount(async () => {
  //   const response = await userAPI.getCurrentUser()
  //   user.value = response.data.currentUser
  // })





</script>