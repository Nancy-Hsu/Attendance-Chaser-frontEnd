import axios from 'axios'
import 'sweetalert2/dist/sweetalert2.min.css'
import Swal from 'sweetalert2'

// axios
const baseURL = import.meta.env.VITE_BASE_API
const createAxios = axios.create({
  baseURL
})
createAxios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
export const apiHelper = createAxios

// Toast
const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

export const Toast = {
  success: message => {
    toast.fire({
      icon: 'success',
      title: message
    })
  },
  warning: message => {
    toast.fire({
      icon: 'warning',
      title: message
    })
  },
  error: message => {
    toast.fire({
      icon: 'error',
      title: message
    })
  }
}

//取得使用者位置
export const getPosition = () => {
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 5000
  }
  function success(position) {
  }
  function error(err) {
    Toast.error(`${err.code} : ${err.message}`)
  }
  return new Promise((success, error) => {
    navigator.geolocation.getCurrentPosition(success, error, options)
  })
}

