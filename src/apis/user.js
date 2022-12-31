import { apiHelper } from '../utils/helpers'

export default {
  putUser({ userId, formData }) {
    return apiHelper.put(`/user/${userId}`, formData)
  },
  getUser({ userId }) {
    return apiHelper.get(`/user/${userId}`, formData)
  },
}