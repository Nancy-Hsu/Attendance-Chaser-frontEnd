<template>
  <div class="text-center">
    <!-- 一鍵打卡 with tooltip -->
    <button @click='clockIn' type="button" class="btn btn-primary fs-3 w-50 mb-3 me-3 shadow" v-tooltip
      title="遠端工作者可一鍵打卡，一般使用者需離公司 400 公尺內才可打卡！" data-bs-toggle="tooltip" data-bs-placement="top"
      data-bs-custom-class="custom-tooltip">
      Clock in</button>
    <!-- 產生 QRcode with tooltip -->
    <button @click="showQRmodal" type="button" class="btn btn-outline-info fs-3 mb-3 shadow"
      title="產生當日打卡 QRcode，注意！以一般相機掃描無效。" data-bs-toggle="tooltip" data-bs-placement="top"
      data-bs-custom-class="custom-tooltip"><font-awesome-icon icon="qrcode" /> </button>
    <button v-if="currentUser.isAdmin" @click="showReaderModal" type="button"
      class="btn btn-outline-info fs-3 mb-3 mx-2 shadow"> <font-awesome-icon icon="camera" /> </button>
  </div>

  <!-- qrCode Modal -->
  <div class="modal fade" ref="QRcodeModalRef" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title fw-bold text-center" id="exampleModalLabel">您的 QRcode ( 限當日有效 )</h3>
        </div>
        <div class="modal-body text-center">
          <qrcode-vue :value="QRvalue" size="150"></qrcode-vue>
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
        </div>
        <div class="modal-body text-center">
          <qrcode-stream v-if="offCamera" :key="_uid" @init="onInit" @decode="onDecode">
            <div class="loading-indicator" v-if="loading">
              Loading...
            </div>
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
  import { ref, reactive, onMounted, defineEmits } from 'vue'
  import attendanceAPI from './../apis/attendance'
  import { Modal, Tooltip } from "bootstrap"
  import { Toast, getPosition } from './../utils/helpers'
  import { day } from "../../day.js"
  import QrcodeVue from 'qrcode.vue'
  import { QrcodeStream } from "vue-qrcode-reader"
  import CryptoJS from 'crypto-js'
  import { storeToRefs } from 'pinia'
  import { userStore } from "../store/index.js"

  const store = userStore()
  const { currentUser } = storeToRefs(store)
  const secret = import.meta.env.VITE_ENCRYPT_SECRET

  // QRcode modal
  let QRcodeModalRef = ref(null)
  let QRcodeModal = null
  // 建立 Modal
  onMounted(() => {
    QRcodeModal = new Modal(QRcodeModalRef.value, {})
    readerModal = new Modal(readerModalRef.value, {})
  })
  const showQRmodal = () => {
    QRcodeModal.show()
  }
  // set QRcode value
  const QRvalue = ref('')
  const clockInInfo = { user: { id: currentUser.value.id }, timeStamp: day().valueOf() }
  const encryptText = CryptoJS.AES.encrypt(JSON.stringify(clockInInfo), secret).toString()
  QRvalue.value = encryptText

  //// QRcode reader
  let offCamera = ref(false)
  let readerModalRef = ref(null)
  let readerModal = null
  let loading = ref(true)

  // show reader modal & turn on camer
  const showReaderModal = () => {
    offCamera.value = true
    readerModal.show()
  }

  // QRcode camera
  const onInit = async (promise) => {
    try {
      loading.value = true
      const { capabilities } = await promise;
      // successfully initialized
    } catch (error) {
      if (error.name === "NotAllowedError") {
        Toast.error('請同意開啟您的相機')
      } else if (error.name === "NotFoundError") {
        Toast.error('找不到可用相機')
      } else if (error.name === "NotSupportedError") {
        Toast.error('page is not served over HTTPS')
      } else if (error.name === "NotReadableError") {
        Toast.error('您的相機正在使用')
      } else if (error.name === "StreamApiNotSupportedError") {
        Toast.error('瀏覽器似乎不支援')
      }
    } finally {
      // hide loading indicator
      loading.value = false
    }
  }
  // QRcode reader 解碼
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
  const emit = defineEmits(['clockInSuccess'])
  let data = {}
  const clockIn = async () => {
    try {
      // 不是遠端者要進行 GPS 驗證
      if (!currentUser.value.isRemote) {
        if (!navigator.geolocation) {
          return Toast.warning('抱歉！瀏覽器不支援存取您的位置')
        }
        // 取得經緯度
        const position = await getPosition()
        const crd = position.coords
        data = {
          lat: crd.latitude,
          lng: crd.longitude,
          timeStamp: position.timestamp
        }
      } else {
        // 遠端者直接取得時間戳打卡
        data = {
          timeStamp: day().valueOf()
        }
      }
      //進行打卡
      const clockin = await attendanceAPI.postAttendance({ data })
      // 向 mian.vue 傳遞打卡成功，並渲染行事曆
      emit('getCalenderData')

      Toast.success(`${day(data.timeStamp).format('HH:mm')} ${clockin.data.msg}`)
    } catch (error) {
      Toast.error(error?.response?.data?.message || error.message)
    }
  } 
</script>