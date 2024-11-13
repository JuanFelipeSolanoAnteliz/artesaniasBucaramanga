import { createRouter, createWebHistory } from 'vue-router'

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
  { path: '/', component: explore },
  { path: '/registro', component: registro},
  { path: '/loguin', component: loguin},
  { path: '/politicas', component: politicas},
  { path: '/inicioSesion', component:inicioSesion},
  { path: '/crearTelefono', component: crearTelefono},
  { path: '/crearGmail', component: crearGmail},
  { path: '/tallerMes', component:tallerMes},
  { path: '/tallerYtiendas', component:tallresytiendas},
  { path: '/detalleTaller', component:detalleTaller},
  { path: '/descuentos', component:descuentos},
  { path: '/carritoCompras', component:carritoCompras},
  { path: '/user', component:user}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router