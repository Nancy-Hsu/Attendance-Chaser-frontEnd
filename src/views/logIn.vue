<script setup>
  import { useRouter } from "vue-router"
  import authorizationAPI from './../apis/authorization'
  import { ref, reactive } from 'vue'
  const router = useRouter();
  const data = reactive({
    account: "",
    password: ""
  })

  async function userLogin() {
    const response = await authorizationAPI.login({
      account: data.account,
      password: data.password
    })
    const returnData = response.data
    localStorage.setItem('token', returnData.token)
    router.push({ path: "/" })
    console.log('response', returnData)


    console.log(data.account)
    console.log('hi')
    const API_URL = import.meta.env.API_URL
  }
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <fieldset>
        <div class="form-group row mb-3">
          <label for="account" class="col-sm-2 col-form-label">Account</label>
          <div class="col-sm-10">
            <input 
            v-model="data.account" 
            type="text" 
            class="form-control" 
            id="account" aria-describedby="insertAccount"
            placeholder="Enter account" autocomplete="username" required autofocus /><small
              class="form-text text-muted">預設為你的工號</small>
          </div>
        </div>
        <div class="form-group row mb-3">
          <label for="password" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <input 
            v-model="data.password" type="password" class="form-control" 
            id="password" placeholder="Password"
            autocomplete="current-password" required />
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block mb-3" @click="userLogin()">Submit</button>
      </fieldset>
    </form>
    <!-- <router-link to="/web_build">Go to web_build(使用 router-link)</router-link> -->
  </div>
</template>

<style>
</style>