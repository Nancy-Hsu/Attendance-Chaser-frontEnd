<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-5">
        <clockIn></clockIn>
        <!-- 個人資料 -->
        <userProfile :user="user"></userProfile>
      </div>
      <div class="col-md-6">
        <!-- 行事曆 -->
        <attendedList :attended="attended"></attendedList>
      </div>
    </div>
  </div>
</template>

<script setup>
  import userProfile from "../components/userProfile.vue"
  import clockIn from "../components/clockIn.vue"
  import attendedList from "../components/attendedList.vue"
</script>