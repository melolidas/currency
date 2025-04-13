import { createRouter, createWebHistory } from 'vue-router'
import ConvertView from '@/views/ConvertView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/convert',
    name: 'Convert',
    component: ConvertView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
