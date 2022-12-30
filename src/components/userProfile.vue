<template>
  <div class="userDetails card mb-3 text-center">
    <div class="card-body">
      <h2 class="card-title">{{ user.name }}</h2>
      <h6 class="card-subtitle text-muted">工號: {{user.employeeId}}</h6>
    </div>
    <div>
      <img
        src="https://www.colliers.com/-/media/images/colliers/asia/philippines/colliers-review/collierreview_hero_image_01312022_v2/hero_image_tondominium/hero_image_021522/hero_image_colliersviewpoint_022222.ashx?bid=0f5b3ed2a8de41f89e1a8d557e48f9f8"
        alt="image" class="userDetails--avater m-2">
    </div>

    <div class="card-body">
      <p class="card-text">
        Email: {{ user.email }}</p>
      <p class="card-text">
        是否遠端: {{ user.isRemote }}, 入職日: {{ workStartDate }}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">打卡資料
      </li>
      <li class="list-group-item">打卡資料</li>
      <li class="list-group-item">打卡資料</li>
    </ul>

  </div>
</template>

<script setup>
  import dayjs from "dayjs"
  import { computed } from 'vue'

  const props = defineProps({
    user: {
      type: Object,
    }
  })
  const date = props.user.createdAt
  const workStartDate = computed(date => {
    return dayjs(date).format('YYYY/MM/DD')
  })
  console.log(props.user)


</script>

<style lang="scss" scoped>
  .userDetails {

    &--avater {
      width: 35vh;
      height: 35vh;
      border-radius: 50%;
      object-fit: cover;
    }
  }
</style>