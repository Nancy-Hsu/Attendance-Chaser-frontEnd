import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: "/login", name: "logIn", component: () => import("@/views/logIn.vue") },
  { path: "/", name: "Home", component: () => import("@/views/auth/Home.vue") }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router