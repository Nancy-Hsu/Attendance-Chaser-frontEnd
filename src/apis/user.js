import { apiHelper } from '../utils/helpers'

export default {
  putUser({ userId, formData }) {
    return apiHelper.put(`/api/users/${userId}`, formData)
  },
  getUser({ userId }) {
    return apiHelper.get(`/api/users/${userId}`, formData)
  },
  getCurrentUser() {
    return apiHelper.get(`/api/currentUser`)
  },
  getUserAbsence({ userId }) {
    return apiHelper.get(`/api/users/${userId}/absence`)
  },
}