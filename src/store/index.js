import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Toast } from '../utils/helpers'
import userAPI from './../apis/user'

export const userStore = defineStore('user', () => {
   const currentUser = ref({
      isAuthenticated: false,
      token: ''
   })

   const setCurrentUser = (user) => {
      currentUser.value = { ...user }
      currentUser.value.isAuthenticated = true
      currentUser.value.token = localStorage.getItem('token')
   }

   const getCurrentUser = async () => {
      try {
         const response = await userAPI.getCurrentUser()
         setCurrentUser(response.data.currentUser)
         return true
      }
      catch (error) {
         Toast.error('can not fetch user information')
         logout()
         return false
      }
   }

   const logout = () => {
      currentUser.value = {}
      currentUser.value.isAuthenticated = false
      currentUser.value.token = ''
      localStorage.removeItem('token')
      Toast.success('已成功登出')
   }

   return {
      currentUser,
      setCurrentUser,
      getCurrentUser,
      logout
   }

})