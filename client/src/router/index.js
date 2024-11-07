import { createRouter, createWebHistory } from "vue-router"

import he from '../components/HelloWorld.vue'
import preventa from '../views/preventa.vue'
import preventaD from '../views/preventaD.vue'
import artesanias from '../views/artesaniasFav.vue'
import comprasR from '../views/comprasR.vue'




const routes = [
  { path: '/', component: he },
  { path: '/preventa', component: preventa },
  { path: '/preventaD', component: preventaD },
  { path: '/artesanias', component: artesanias },
  { path: '/comprasR', component: comprasR },



];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;