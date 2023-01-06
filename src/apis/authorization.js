import  { apiHelper } from '../utils/helpers'

export default {
  login({ account, password }) {
    return apiHelper.post('/api/users/login/', {
      account,
      password
    })
  }
}