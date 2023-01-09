<template>
  <div class="text-center">
    <button @click='clockIn' type="button" class="btn btn-primary fs-3 w-50 mb-3 me-3 shadow">Clock in</button>
    <button @click="showQRmodal" type="button" class="btn btn-outline-info fs-3 mb-3 shadow">QR code</button>
    <button v-if="currentUser.isAdmin" @click="showReaderModal" type="button"
      class="btn btn-outline-info fs-3 mb-3 mx-2 shadow">Reader</button>
  </div>

  <!-- qrCode Modal -->
  <div class="modal fade" ref="QRcodeModalRef" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title fw-bold text-center" id="exampleModalLabel">您的 QRcode ( 限當日有效 )</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <qrcode-vue :value="value" size="150"></qrcode-vue>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- reader Modal -->
  <div class="modal fade" ref="readerModalRef" id="exampleModal" tabindex="-1" data-bs-backdrop="static"
    data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title fw-bold " id="exampleModalLabel">請掃 QRcode，按 Close 來關閉相機</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">

          <qrcode-stream v-if="offCamera" :key="_uid" @init="onInit" @decode="onDecode">
          </qrcode-stream>
        </div>
        <div class="modal-footer">
          <button @click="offCamera = false" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import attendanceAPI from './../apis/attendance'
  import { Modal } from "bootstrap"
  import { Toast, getPosition, onInit } from './../utils/helpers'
  import { day } from "../../day.js"
  import QrcodeVue from 'qrcode.vue'
  import { QrcodeStream } from "vue-qrcode-reader"
  import CryptoJS from 'crypto-js'
  import { storeToRefs } from 'pinia'
  import { userStore } from "../store/index.js"
  import bus from 'vue3-eventbus'

  const store = userStore()
  const { currentUser } = storeToRefs(store)
  const secret = import.meta.env.VITE_ENCRYPT_SECRET

  // QRcode modal
  let QRcodeModalRef = ref(null)
  let QRcodeModal = null
  onMounted(() => {
    QRcodeModal = new Modal(QRcodeModalRef.value, {})
    readerModal = new Modal(readerModalRef.value, {})
  })
  const showQRmodal = () => {
    QRcodeModal.show()
  }
  // QRcode value
  const value = ref('')
  const clockInInfo = { user: { id: currentUser.value.id }, timeStamp: day().valueOf() }
  const encryptText = CryptoJS.AES.encrypt(JSON.stringify(clockInInfo), secret).toString()
  value.value = encryptText

  //// QRcode reader
  let offCamera = ref(false)
  let readerModalRef = ref(null)
  let readerModal = null
  // 建立 modal show
  const showReaderModal = () => {
    offCamera.value = true
    readerModal.show()
  }
  //解碼
  async function onDecode(decodedString) {
    try {
      // 不是 admin 退出
      if (!currentUser.value.isAdmin) throw new Error('您沒有權限')
      //解碼
      let decryptString = await CryptoJS.AES.decrypt(decodedString, secret)
      let data = await JSON.parse(decryptString.toString(CryptoJS.enc.Utf8))
      // 關掉 modal 以及 camera
      readerModal.hide()
      offCamera.value = false

      // QRcode 日期不是今天退出
      if (!data.user || !data.timeStamp) throw new Error('您的 QRcode 錯誤')
      if (!day().isSame(data.timeStamp, 'date')) throw new Error('您的 QRcode 已過期')

      // 重抓時間並打卡
      data.timeStamp = day().valueOf()
      const clockIn = await attendanceAPI.postAttendance({ data })
      Toast.success(`${day(data.timeStamp).format('HH:mm')} ${clockIn.data.msg}`)

    } catch (error) {
      Toast.error(error?.response?.data?.message || error.message)
    }
  }

  //一鍵打卡
  let data = {}
  const clockIn = async () => {
    try {
      if (!currentUser.value.isRemote) {
        if (!navigator.geolocation) {
          return Toast.warning('抱歉！瀏覽器不支援存取您的位置')
        }
        const position = await getPosition()
        const crd = position.coords
        data = {
          lat: crd.latitude,
          lng: crd.longitude,
          timeStamp: position.timestamp
        }
      } else {
        data = {
          timeStamp: day().valueOf()
        }
      }
      //進行打卡
      const clockin = await attendanceAPI.postAttendance({ data })
      bus.emit('clockIn')
      Toast.success(`${day(data.timeStamp).format('HH:mm')} ${clockin.data.msg}`)
    } catch (error) {
      Toast.error(error?.response?.data?.message || error.message)
    }
  } 
</script>