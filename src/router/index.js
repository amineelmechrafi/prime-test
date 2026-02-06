import { createRouter, createWebHistory } from 'vue-router'

import Bins from '@/components/Bins.vue'
import CreateBin from '@/components/CreateBin.vue'


const routes = [
  {
    path: '/bins',
    name: 'bins',
    component: Bins
  },
  {
    path: '/bin/_create',
    name: 'binsCreate',
    component: CreateBin    
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
