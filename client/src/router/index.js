import { createRouter, createWebHistory } from 'vue-router'

import explore from '../components/HelloWorld.vue'


const routes = [
  { path: '/', component: explore },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router