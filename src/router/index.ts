import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import Login from '../views/Login.vue'
import useFirebaseAuth from "../hooks/firebase-auth";
const state = useFirebaseAuth();

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/tabs'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/print/:id',
    name: 'print',
    component: () => import ('../views/Print.vue'),
  },
  { 
    path: '/tabs',
    name: 'home',
    component: () => import ('../views/Tabs.vue'),
    children: [
      {
        path: 'inventory',
        component: () => import ('../views/Inventory.vue')
      },
      {
        path: 'items',
        component: () => import ('../views/Items.vue')
      },
      {
        path: 'logs',
        component: () => import ('../views/Logs.vue')
      },
      {
        path: '/folder/:id',
        component: () => import ('../views/Folder.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log("user2", state.user.value) // 🤷‍♂️

  if (state.user.value && (to.name === 'login')) {
    next({ name: "home", replace: true })
  } else if (!state.user.value && ( to.name !== 'login' && to.name !== 'signup')) {
    console.log('goto login')
    next({ name: "login", replace: true })
  } else {
    next();
  }
})

export default router
