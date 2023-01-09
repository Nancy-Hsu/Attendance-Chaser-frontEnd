import { apiHelper } from '../utils/helpers'

export default {
  putUser({ userId, formData }) {
    return apiHelper.put(`/api/users/${userId}/`, formData)
  },
  getUser({ userId }) {
    return apiHelper.get(`/api/users/${userId}`, formData)
  },
  getCurrentUser() {
    return apiHelper.get(`/api/currentUser/`)
  },
  // 取得使用者出勤異常
  getUserAbsence({ userId }) {
    return apiHelper.get(`/api/users/${userId}/absence/`)
  },
  // 取的當月出席及行事曆
  getUserAttended({ userId, year, month }) {
    return apiHelper.get(`/api/users/${userId}/attended?year=${year}&month=${month}`)
  },
}