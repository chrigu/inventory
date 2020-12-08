import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import Login from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/tabs/test'
  },
  { 
    path: '/tabs',
    name: 'home',
    component: () => import ('../views/Tabs.vue'),
    children: [
      {
        path: '/folder/:id',
        component: () => import ('../views/Folder.vue')
      },
      {
        path: 'test',
        component: () => import ('../views/Test.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
