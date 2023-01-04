<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info px-4 ">
    <div class="container-fluid">
      <router-link class="navbar-brand fs-2" to="/main">
        Titaners' 出勤系統
      </router-link>
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse flex-row-reverse" id="navbarColor01" >
        <ul class="navbar-nav ">
          <li v-if="currentUser.isAuthenticated" v-for="tab in tabs" :key="tab.id" class="nav-item">
            <router-link :to="tab.path" class="nav-link fs-4">
              {{ tab.title }}
            </router-link>
          </li>
          <li v-if="currentUser.isAuthenticated" class="nav-item">
            <button type="button" class="btn btn-sm btn-outline-light mx-3 my-sm-0 fs-5 pt-2"  @click="userLogout">
              登出
            </button>
          
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { onBeforeMount, ref, computed, toRefs, onMounted } from 'vue'
  import { uuid } from 'vue3-uuid'
  import { storeToRefs } from 'pinia'
  import { userStore } from "../store/index.js"
  import { useRouter } from "vue-router"
  const router = useRouter()
  const store = userStore()
  const { logout } = store
  const { currentUser } = storeToRefs(store)

  const tabs = [
    {
      id: uuid.v4(),
      title: '密碼設定',
      path: '/users/setting'
    },
    {
      id: uuid.v4(),
      title: '出勤異常',
      path: '/users/absence'
    },
  ]

  const userLogout = () => {
    logout()
    router.push({ path: "/login" })
  }

</script>