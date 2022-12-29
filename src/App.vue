<script>
  import "bootstrap/dist/css/bootstrap.min.css"
  import "bootstrap"
</script>

<template>
  <router-view v-slot="{Component}">
    <component :is="Component" :key="$route.path"></component>
  </router-view>

</template>

<style>
</style>