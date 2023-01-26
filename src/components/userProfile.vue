<template>
  <div class="userDetails card mb-3 text-center shadow">
    <div class="card-body">
      <h2 class="card-title">{{ user.name }}</h2>
      <h5 class="card-subtitle text-muted">工號：{{user.employeeId}}</h5>
    </div>
    <div>
      <img
        :src="user.avatar ? user.avatar : 'https://www.colliers.com/-/media/images/colliers/asia/philippines/colliers-review/collierreview_hero_image_01312022_v2/hero_image_tondominium/hero_image_021522/hero_image_colliersviewpoint_022222.ashx?bid=0f5b3ed2a8de41f89e1a8d557e48f9f8'"
        alt="image" class="userDetails--avater m-2">
    </div>

    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item fs-5">Email： {{ user.email }}
        </li>
        <li class="list-group-item fs-5">是否遠端：
          {{ user.isRemote }}</li>
        <li class="list-group-item fs-5">入職日： {{ user.createdAt }}</li>
      </ul>
    </div>



  </div>
</template>

<script setup>
  import { ref, onBeforeMount } from 'vue'
  import userAPI from './../apis/user'
  import { Toast } from './../utils/helpers'
  import dayjs from "dayjs"
  import { computed } from 'vue'

  const user = ref('')
  onBeforeMount(async () => {
    try {
      // 取得使用者資料
      const response = await userAPI.getCurrentUser()
      user.value = response.data.currentUser
      const date = user.createdAt
      // 處理入職日期
      const workStartDate = computed(date => {
        return dayjs(date).format('YYYY/MM/DD')
      })
      user.value.createdAt = workStartDate

    } catch (error) {
      Toast.error(error.response.data.message)
    }

  })

</script>

<style lang="scss" scoped>
  .userDetails {

    &--avater {
      width: 20vw;
      height: 20vw;
      border-radius: 50%;
      object-fit: cover;
    }
  }
</style>