import { createRouter, createWebHistory } from "vue-router"

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
import qr from '../views/qr.vue'
import ceramica from '../views/ceramica.vue'

import explore from '../components/HelloWorld.vue'
import registro from '../views/registro.vue'
import loguin from '../views/login.vue'
import politicas from '../views/politicas.vue'
import inicioSesion from '../views/inicioSesion.vue'
import crearTelefono from '../views/crearTelefono.vue'
import crearGmail from '../views/crearGmail.vue'
import tallerMes from '../views/TalleresMes9.vue'
import tallresytiendas from '../views/tienda.vue'
import detalleTaller from '../views/detalleTaller.vue'
import descuentos from '../views/descuentos.vue'
import carritoCompras from '../views/carritCompras.vue'
import user from '../views/user.vue'



const routes = [
  { path: '/preventa/:id', component: preventa },
  { path: '/preventaD', component: preventaD },
  { path: '/artesanias', component: artesanias },
  { path: '/comprasR', component: comprasR },
  { path: '/talleres', component: talleres },
  { path: '/canjear', component: canjear },
  { path: '/ajustes', component: ajustes },
  { path: '/comentarios', component: comentarios },
  { path: '/atencion', component: atencion },
  { path: '/chat', component: chat },
  { path: '/qr', component: qr },
  { path: '/ceramica', component: ceramica},
  
  { path: '/', component: explore },
  { path: '/registro', component: registro},
  { path: '/loguin', component: loguin},
  { path: '/politicas', component: politicas},
  { path: '/inicioSesion', component:inicioSesion},
  { path: '/crearTelefono', component: crearTelefono},
  { path: '/crearGmail', component: crearGmail},
  { path: '/tallerMes', component:tallerMes},
  { path: '/tallerYtiendas', component:tallresytiendas},
  { path: '/detalleTaller/:id', component:detalleTaller},
  { path: '/descuentos', component:descuentos},
  { path: '/carritoCompras', component:carritoCompras},
  { path: '/user', component:user}

];





const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
