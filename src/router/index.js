import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import Main from '@/views/main.vue'

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/logIn.vue")
  },
  {
    path: "/users/setting",
    name: "setting",
    component: () => import("@/views/setting.vue")
  },
  {
    path: "/main",
    name: "main",
    component: Main
  },
  {
    path: "/users/absence",
    name: "absence",
    component: () => import("@/views/absence.vue")
  },
  {
    path: "/:pathMatch(.*)",
    name: "not-found",
    component: NotFound
  }
]

const router = createRouter({
  linkExactActiveClass: 'active',
  history: createWebHistory('/attendance-chaser'),
  routes
})

export default router