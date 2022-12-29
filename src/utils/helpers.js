import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_API

const apiHelper = axios.create({
  baseURL
})  

export default apiHelper