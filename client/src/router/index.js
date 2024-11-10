import { createRouter, createWebHistory } from "vue-router"

import he from '../components/HelloWorld.vue'
import preventa from '../views/preventa.vue'
import preventaD from '../views/preventaD.vue'
import artesanias from '../views/artesaniasFav.vue'
import comprasR from '../views/comprasR.vue'
import talleres from '../views/talleres.vue'
import canjear from '../views/canjear.vue'
import ajustes from '../views/ajustes.vue'
import comentarios from '../views/comentarios.vue'
import atencion from '../views/atencion.vue'
import chat from '../views/chat.vue'





const routes = [
  { path: '/', component: he },
  { path: '/preventa', component: preventa },
  { path: '/preventaD', component: preventaD },
  { path: '/artesanias', component: artesanias },
  { path: '/comprasR', component: comprasR },
  { path: '/talleres', component: talleres },
  { path: '/canjear', component: canjear },
  { path: '/ajustes', component: ajustes },
  { path: '/comentarios', component: comentarios },
  { path: '/atencion', component: atencion },
  { path: '/chat', component: chat }






];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;