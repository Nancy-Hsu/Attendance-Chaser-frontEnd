<template>
  <h2 class="fw-bold">
    更改密碼
  </h2>
  <small>請先輸入您的密碼在進行更改</small>

  <form @submit.prevent="onSubmit">
    <div class="form-group mt-3 mb-2">
      <label for="oldPassword">Origin Password</label>
      <input type="password" class="form-control" id="oldPassword" placeholder="your origin password"
        v-model="userEdit.oldPassword">
    </div>
    <div class="form-group mb-2">
      <label for="newPassword">New Password</label>
      <input type="password" class="form-control" id="newPassword" placeholder="your new password"
        v-model="userEdit.newPassword">
    </div>
    <div class="form-group mb-2">
      <label for="newPasswordCheck">New Password</label>
      <input type="password" class="form-control" id="newPasswordCheck" placeholder="confirm new password"
        v-model="userEdit.newPasswordCheck">
    </div>
    <div class="form-group mt-3">
        <button type="submit" class="btn btn-primary">確定更改</button>
    </div>
  </form>
</template>

<script setup>
  import { reactive, computed } from 'vue'
  const userEdit = reactive({
    oldPassword: '',
    newPassword: '',
    newPasswordCheck: ''
  })
  const confirmPassword = computed(() => {
    return (userEdit.newPassword === userEdit.newPasswordCheck ? true : false)
  })
  function onSubmit() {
      console.log(userEdit)
  }

</script>