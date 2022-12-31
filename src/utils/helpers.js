import axios from 'axios'
import 'sweetalert2/dist/sweetalert2.min.css'
import Swal from 'sweetalert2'

const baseURL = import.meta.env.VITE_BASE_API

export const apiHelper = axios.create({
  baseURL
})  

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
