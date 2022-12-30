<template>
  <div class="container py-5">
    <h1 class="mt-1">
      首頁 - 個人資料
    </h1>
    <div class="row">
      <div class="col-md-5">

        <!-- 個人資料 -->
        <userProfile :user="user"></userProfile>>
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