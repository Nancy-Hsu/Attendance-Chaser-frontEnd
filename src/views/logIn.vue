<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-6 text-center p-3 ">
        <!-- 圖片 -->
        <img :src="logo" alt="">
      </div>
      <div class="col-md-6">
        <!-- login -->
        <div>
          <h1 class="px-4 py-2 w-75 text-end">Login</h1>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <div class="form-group row mb-2 w-75 text-start">
                <label for="account" class="col-sm-3 col-form-label fs-4">Account</label>
                <div class="col-sm-9">
                  <input v-model="data.account" type="text" class="form-control fs-4" id="account"
                    aria-describedby="insertAccount" placeholder="Enter account" autocomplete="username" required
                    autofocus /><p class="form-text text-muted fs-5">預設為你的工號</p>
                </div>
              </div>
              <div class="form-group row mb-2 fs-4 w-75 text-start">
                <label for="password" class="col-sm-3 col-form-label">Password</label>
                <div class="col-sm-9">
                  <input v-model="data.password" type="password" class="form-control fs-4" id="password"
                    placeholder="Password" autocomplete="current-password" required />
                </div>
              </div>
              <div class="px-4 w-75 text-end">
                <button type="submit" class="btn btn-primary btn-block my-3 fs-5 w-25" @click="userLogin()">Submit</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from "vue-router"
  import authorizationAPI from './../apis/authorization'
  import { Toast } from './../utils/helpers'
  import logo from "../assets/images/logo.png"
  import { userStore } from '../store/index.js'
  const store = userStore()
  const router = useRouter()

  const data = reactive({
    account: "",
    password: ""
  })

  async function userLogin() {
    try {
      if (!data.account || !data.password) {
        Toast.warning(
          '請填入 account 和 password'
        )
        return
      }
      const response = await authorizationAPI.login({
        account: data.account,
        password: data.password
      })
      const returnData = response?.data

        if (returnData.status === 'warning') {
          Toast.warning(
            returnData.msg)
          return
        }
     
      localStorage.setItem('token', returnData.token)
      const { user } = returnData

      store.setCurrentUser(user)
      router.push({ path: "/main" })
      Toast.success('成功登入')

    }
    catch (error) {
      data.password = ''
      Toast.error(
        error.response?.data?.message || error.message)
    }
  }
</script>



<style>
</style>