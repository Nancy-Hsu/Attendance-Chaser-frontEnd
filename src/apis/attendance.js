import { apiHelper } from '../utils/helpers'

export default {
  postAttendance ({ data }) {
    return apiHelper.post('/attendances', data )
  }
}