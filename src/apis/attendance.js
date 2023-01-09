import { apiHelper } from '../utils/helpers'

export default {
  // 新增打卡
  postAttendance ({ data }) {
    return apiHelper.post('/api/attendances/', data )
  }
}