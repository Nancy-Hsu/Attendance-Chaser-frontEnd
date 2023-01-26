<template>
  <div class="w-100 mb-3 shadow">
    <Qalendar :selected-date="new Date()" :config="config" :events="events" :is-loading="loading"/>
  </div>
</template>

<script setup>
  import { ref, reactive, inject } from 'vue'
  import { Qalendar } from "qalendar"

  // 設定行事曆環境
  const loading = ref(true)
  const config = reactive({
    locale: "zh-CN",
    defaultMode: "month",
  },)
  // 取得 events data
  const events = inject('events')
  loading.value = false
</script>

<style>
  @import '../../node_modules/qalendar/dist/style.css';

  /* #attended-list {
    height: calc(100vh - 150px);
    min-height: 210px;
    width: 100%;
    overflow-y: scroll
  } */
</style>