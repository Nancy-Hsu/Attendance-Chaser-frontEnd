<template>
  <button @click='clockIn' type="button" class="btn btn-primary fs-3 w-50 mb-3 me-3">打卡</button>
  <button @click="showQRmodal" type="button" class="btn btn-outline-info fs-3 mb-3">QR code</button>
  <button @click="showReaderModal" type="button" class="btn btn-outline-info fs-3 mb-3 mx-2">Reader</button>
  <!-- <p>{{text}}</p> -->

  <!-- qrCode Modal -->
  <div class="modal fade" ref="QRcodeModalRef" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold text-center" id="exampleModalLabel">您的 QRcode</h5>
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
  <div class="modal fade" ref="readerModalRef" id="exampleModal" tabindex="-1" data-bs-backdrop="static"  data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold text-center" id="exampleModalLabel">請掃 QRcode，按 Close 來關閉相機</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <qrcode-stream  v-if="offCamera" :key="_uid" @init="onInit" @decode="onDecode" />
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
  import { useRouter } from "vue-router"
  import attendanceAPI from './../apis/attendance'
  import { Modal } from "bootstrap"
  import { Toast } from './../utils/helpers'
  // import day from "./../../day.js"
  import QrcodeVue from 'qrcode.vue'
  import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader"
  import { storeToRefs } from 'pinia'
  import { userStore } from "../store/index.js"
  const store = userStore()
  const { currentUser } = storeToRefs(store)
  //modal
  let QRcodeModalRef = ref(null)
  let QRcodeModal = null
  onMounted(() => {
    QRcodeModal = new Modal(QRcodeModalRef.value, {})
  })

  const showQRmodal = () => {
    QRcodeModal.show()
  }
  //QRcode
  const value = ref('https://www.chaserone.link')

  //QRcode reader
  let offCamera = ref(false)
  let readerModalRef = ref(null)
  let readerModal = null
  onMounted(() => {
    readerModal = new Modal(readerModalRef.value, {})
  })

  const showReaderModal = () => {
    readerModal.show()
    offCamera.value = true
  }
  let text = ref("");
  function onDecode(decodedString) {
    text.value = decodedString;
  }


  async function onInit(promise) {
    try {
      const { capabilities } = await promise;
      // successfully initialized
    } catch (error) {
      if (error.name === "NotAllowedError") {
        text.value = "Denied! No permission";
        // user denied camera access permisson
      } else if (error.name === "NotFoundError") {
        // no suitable camera device installed
      } else if (error.name === "NotSupportedError") {
        // page is not served over HTTPS (or localhost)
      } else if (error.name === "NotReadableError") {
        // maybe camera is already in use
      } else if (error.name === "OverconstrainedError") {
        // did you requested the front camera although there is none?
      } else if (error.name === "StreamApiNotSupportedError") {
        // browser seems to be lacking features
      }
    } finally {
      // hide loading indicator
    }
  }

  //一鍵打卡
  const data = {}
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 5000
  }
  function success(position) {
  }
  function error(err) {
    Toast.error(`${err.code} : ${err.message}`)
  }
  function getPosition() {
    return new Promise((success, error) => {
      navigator.geolocation.getCurrentPosition(success, error, options)
    })
  }
  const clockIn = async () => {
    try {
      if (!navigator.geolocation) {
        return Toast.warning('抱歉！瀏覽器不支援存取您的位置')
      }
      const position = await getPosition()
      const crd = position.coords
      const data = {
        lat: crd.latitude,
        lng: crd.longitude,
        timeStamp: position.timestamp
      }
      const clockin = await attendanceAPI.postAttendance({ data })
      Toast.success(clockin.data.msg)
    } catch (error) {
      console.log(error)
      Toast.error(error.response.data.message)
    }

  } 
</script>