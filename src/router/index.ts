import { createRouter, createWebHistory } from 'vue-router'

//import layout components
const WebContainer = () => import('@/components/web/layout/WebContainer.vue')
const AdminContainer = () => import ('@/components/admin/layout/AdminContainer.vue')

// import views 
import HomeView from '@/views/HomeView/index.vue';
import AdminView from '@/views/AdminView/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: WebContainer,
    children: [
      {
        path: '',
        hero: 'login',
        component: HomeView
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminContainer,
    children: [
      {
        path: '',
        component: AdminView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
