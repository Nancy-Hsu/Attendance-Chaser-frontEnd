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

      </div>
    </div>
  </div>
</template>

<script setup>
  import userProfile from "../components/userProfile.vue"
  import userEdit from "../components/userEdit.vue"
  import clockIn from "../components/clockIn.vue"
  const user = {
    "id": 2,
    "account": "000002",
    "email": "RogahnAusten@example.com",
    "employeeId": "000002",
    "name": "Rogahn Austen",
    "isRemote": true,
    "createdAt": "2022-12-28T14:13:57.000Z",
    "updatedAt": "2022-12-28T14:13:57.000Z"
  }

</script>