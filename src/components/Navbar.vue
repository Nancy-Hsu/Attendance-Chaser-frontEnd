<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info px-4">
    <div class="container-fluid ">
      <router-link class="navbar-brand fs-4" to="/">
        Titaners' 出勤系統
      </router-link>
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbarColor01" style="">
        <ul class="navbar-nav me-auto">
          <li v-for="tab in tabs" :key="tab.id" class="nav-item">
            <router-link :to="tab.path" class="nav-link">
              {{ tab.title }}
            </router-link>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-sm btn-outline-light my-2 my-sm-0">
              登出
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { uuid } from 'vue3-uuid'
  const tabs = [
    {
      id: uuid.v4(),
      title: '個人資料',
      path: '/users/setting'
    },
    {
      id: uuid.v4(),
      title: '出勤異常',
      path: '/users/absence'
    },
  ]

</script>