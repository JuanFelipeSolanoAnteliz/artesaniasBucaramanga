import { createRouter, createWebHistory } from "vue-router"

import he from '../components/HelloWorld.vue'
import preventa from '../views/preventa.vue'
import preventaD from '../views/preventaD.vue'


const routes = [
  { path: '/preventa', component: preventa },
  { path: '/preventaD', component: preventaD },
  { path: '/', component: he },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;