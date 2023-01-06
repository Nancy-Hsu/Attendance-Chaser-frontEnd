import { apiHelper } from '../utils/helpers'

export default {
  postAttendance ({ data }) {
    return apiHelper.post('/api/attendances/', data )
  }
}