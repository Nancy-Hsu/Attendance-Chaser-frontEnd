import { createRouter, createWebHashHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import Main from '@/views/main.vue'
import { Toast } from '../utils/helpers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { userStore } from '../store/index.js'

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/login"
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
  history: createWebHashHistory('/attendance-chaser'),
  routes
})

router.beforeEach(async (to, from, next) => {
  // 加上換頁進度條
  NProgress.start()
  const store = userStore()
  const tokenStore = store.currentUser.token
  const tokenLocalStorage = localStorage.getItem('token')
  let isAuthenticated = store.currentUser.isAuthenticated

  if (tokenLocalStorage && tokenLocalStorage !== tokenStore) {
    isAuthenticated = await store.getCurrentUser()
  }
  // 沒有登入不可以查看主頁
  if (!isAuthenticated && to.name !== 'login') {
    next('/login')
    Toast.warning('請先登入')
    return
  }
  // 登入後無法去登入頁
  if (isAuthenticated && to.name == 'login') {
    next('/main')
    Toast.warning('您已登入')
    return
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router