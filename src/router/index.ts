import { createRouter, createWebHistory } from 'vue-router'

//import layout components
const WebContainer = () => import('@/components/web/layout/WebContainer.vue')
const AdminContainer = () => import ('@/components/admin/layout/AdminContainer.vue')

// import views 
import HomeView from '@/views/HomeView/index.vue';
import AdminView from '@/views/AdminView/index.vue'
import AddBusinessView from '@/views/AdminView/BusinessForm/index.vue'
import EditBusinessView from '@/views/AdminView/EditBusinessForm/index.vue'
import { checkAccess } from './routerAccess';

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
    beforeEnter: checkAccess,
    children: [
      {
        path: '',
        name: 'admin',
        component: AdminView,
        meta: { requiresAdmin: true }
      },
      {
        path: 'addBusiness',
        name: 'addBusiness',
        component: AddBusinessView,
        meta: { requiresAdmin: true }
      },
      {
        path: 'edit/:id',
        name: 'editBusiness',
        component: EditBusinessView,
        meta: { requieresAdmin: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
