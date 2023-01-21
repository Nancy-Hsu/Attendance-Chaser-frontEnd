<template>
  <h2 class="fw-bold">
    更改密碼
  </h2>
  <h5 class="p-1">請先輸入您的密碼在進行更改</h5>

  <form @submit.prevent="onSubmit">
    <div class="form-group mt-3 mb-3">
      <label for="oldPassword" class="fs-4 mb-1">Original Password</label>
      <input type="password" class="form-control 
      shadow" id="oldPassword" placeholder="your origin password" v-model="userEdit.oldPassword" required>
    </div>
    <div class="form-group mb-3">
      <label for="newPassword" class="fs-4 mb-1">New Password</label>
      <input type="password" class="form-control shadow" id="newPassword" placeholder="your new password"
        v-model="userEdit.newPassword" required>
    </div>
    <div class="form-group mb-3">
      <label for="newPasswordCheck" class="fs-4 mb-1">New Password</label>
      <input type="password" class="form-control shadow" id="newPasswordCheck" placeholder="confirm new password"
        v-model="userEdit.newPasswordCheck">
    </div>
    <div class="form-group mt-3">
      <button type="submit" class="btn btn-outline-primary fs-5">確定更改</button>
    </div>
  </form>
</template>

<script setup>
  import { reactive, computed } from 'vue'
  import userAPI from './../apis/user'
  import { Toast } from './../utils/helpers'
  import { storeToRefs } from 'pinia'
  import { userStore } from "../store/index.js"
  const store = userStore()
  const { currentUser } = storeToRefs(store)

  const userEdit = reactive({
    oldPassword: '',
    newPassword: '',
    newPasswordCheck: ''
  })
  // 先驗證是否兩者密碼相同
  const confirmPassword = computed(() => {
    return (userEdit.newPassword === userEdit.newPasswordCheck ? true : false)
  })
  // 提交資料
  async function onSubmit() {
    try {
      for (let key in userEdit) {
        if (!userEdit[key]) {
          Toast.error('請填上所有欄位')
          return
        }
      }
      if (!confirmPassword.value) {
        Toast.error('請確認新密碼兩者相同')
        return
      }
      const currentUserId = currentUser.value.id
      const putResponse = await userAPI.putUser({ userId: currentUserId, formData: userEdit })
      Toast.success(putResponse.data.message)

    } catch (error) {
      Toast.error(error.response?.data?.message || error.message)
    }
  }

</script>