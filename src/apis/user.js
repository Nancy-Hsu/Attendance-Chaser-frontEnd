import { apiHelper } from '../utils/helpers'

export default {
  putUser({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`, formData)
  },
  getCurrentUser() {
    return apiHelper.get(`/currentUser`)
  },
}