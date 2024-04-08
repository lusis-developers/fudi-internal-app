import { createRouter, createWebHistory } from 'vue-router'

//import layout components
const WebContainer = () => import('@/components/web/layout/WebContainer.vue')

// import views 
import HomeView from '@/views/HomeView/index.vue';

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
  ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
