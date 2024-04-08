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
    component: WebContainer,
    children: [
      {
        path: '',
        name: 'home', 
        hero: 'login',
        component: HomeView
      }
    ]
  },
  {
    path: '/admin',
    component: AdminContainer,
    children: [
      {
        path: '',
        name: 'admin',
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
