import { createRouter, createWebHistory } from 'vue-router'

import explore from '../components/HelloWorld.vue'
import registro from '../views/registro.vue'
import loguin from '../views/login.vue'
import politicas from '../views/politicas.vue'
import inicioSesion from '../views/inicioSesion.vue'
import crearTelefono from '../views/crearTelefono.vue'
 import crearGmail from '../views/crearGmail.vue'


const routes = [
  { path: '/', component: explore },
  { path: '/registro', component: registro},
  { path: '/loguin', component: loguin},
  { path: '/politicas', component: politicas},
  { path: '/inicioSesion', component:inicioSesion},
  { path: '/crearTelefono', component: crearTelefono},
  { path: '/crearGmail', component: crearGmail}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router