<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-5">
        <!-- 個人資料 -->
        <userProfile></userProfile>
      </div>
      <div class="col-md-6 p-4">
        <!-- 使用者修改頁 -->
        <userEdit></userEdit>
      </div>
    </div>
  </div>
</template>

<script setup>
  import userProfile from "../components/userProfile.vue"
  import userEdit from "../components/userEdit.vue"
</script>