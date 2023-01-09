import { createApp } from "vue"
import { createPinia } from 'pinia'
import UUID from "vue3-uuid"
import "./style.scss"
import App from "./App.vue"
import router from "@/router/index.js"
import eventBus from 'vue3-eventbus'


const app = createApp(App)
app.use(eventBus)
app.use(UUID)
app.use(router).use(createPinia())
app.mount("#app")
