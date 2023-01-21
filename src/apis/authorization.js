import  { apiHelper } from '../utils/helpers'

export default {
  // 登入
  login({ account, password }) {
    return apiHelper.post('/api/users/login/', {
      account,
      password
    })
  }
}