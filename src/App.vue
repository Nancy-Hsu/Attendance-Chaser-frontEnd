<script setup>
  import "bootstrap/dist/css/bootstrap.min.css"
  import "bootstrap"
  import "@/assets/CSS/bootstrap.min.css"
  import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <Navbar />
  <router-view v-slot="{Component}">
    <component :is="Component" :key="$route.path"></component>
  </router-view>
</template>

<style>
</style>