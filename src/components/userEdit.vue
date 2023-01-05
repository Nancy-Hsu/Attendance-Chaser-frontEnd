<template>
  <h2 class="fw-bold">
    更改密碼
  </h2>
  <small>請先輸入您的密碼在進行更改</small>

  <form @submit.prevent="onSubmit">
    <div class="form-group mt-3 mb-2">
      <label for="oldPassword">Origin Password</label>
      <input type="password" class="form-control" id="oldPassword" placeholder="your origin password"
        v-model="userEdit.oldPassword"  required>
    </div>
    <div class="form-group mb-2">
      <label for="newPassword">New Password</label>
      <input type="password" class="form-control" id="newPassword" placeholder="your new password"
        v-model="userEdit.newPassword" required>
    </div>
    <div class="form-group mb-2">
      <label for="newPasswordCheck">New Password</label>
      <input type="password" class="form-control" id="newPasswordCheck" placeholder="confirm new password"
        v-model="userEdit.newPasswordCheck" >
    </div>
    <div class="form-group mt-3">
      <button type="submit" class="btn btn-primary">確定更改</button>
    </div>
  </form>
</template>

<script setup>
  import { reactive, computed } from 'vue'
  import { useRouter } from "vue-router"
  import userAPI from './../apis/user'
  import { Toast } from './../utils/helpers'
  const userEdit = reactive({
    oldPassword: '',
    newPassword: '',
    newPasswordCheck: ''
  })
  const confirmPassword = computed(() => {
    return (userEdit.newPassword === userEdit.newPasswordCheck ? true : false)
  })

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
    const response = await userAPI.getCurrentUser()
    const { currentUser } = response.data
    const currentUserId = currentUser.id
    const putResponse = await userAPI.putUser({ userId: currentUserId, formData: userEdit })
    Toast.success(putResponse.data.message)

    } catch (error) {
      console.log(error)
      Toast.error(error.response.data.message)
      return
    }
  }

</script>