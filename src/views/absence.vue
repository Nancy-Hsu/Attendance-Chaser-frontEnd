<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-5">
        <!-- 個人資料 -->
        <userProfile ></userProfile>
      </div>
      <div class="col-md-6">
        <!-- 動態 -->
        <absenceList></absenceList>
      </div>
    </div>
  </div>
</template>

<script setup>
  import userProfile from "../components/userProfile.vue"
  import absenceList from "../components/absenceList.vue"
</script>