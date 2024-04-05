import { createRouter, createWebHistory } from 'vue-router'


import HomeView from '../views/HomeView.vue'
import AdminView from '@/views/AdminView.vue';

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'default' } 
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { layout: 'admin' }
    }
  ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
