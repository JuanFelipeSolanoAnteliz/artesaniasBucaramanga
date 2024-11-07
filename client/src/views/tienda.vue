<template>
  <div id="main-container" class="min-h-screen text-white">
    <!-- Main Header -->
    <header v-if="!selectedCategory" class="fixed top-0 w-full bg-gray-900 z-50">
      <div class="flex items-center p-4 bg-black">
        <button @click="toggleDrawer" class="p-2">
          <MenuIcon class="h-6 w-6" />
        </button>
        <div class="flex-1 mx-4">
          <div class="relative">
            <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar productos o tienda..."
              class="w-full bg-[#3D3D3D] rounded-10 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
        </div>
      </div>
    </header>

    <!-- Side Drawer -->
    <div
      v-if="isDrawerOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50"
      @click="toggleDrawer"
    ></div>
    
    <div
      class="fixed top-0 left-0 h-full w-64 bg-black transform transition-transform duration-300 ease-in-out z-50"
      :class="isDrawerOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="p-4">
        <div class="flex items-center space-x-3 mb-6">
          <img
            src="../assets/img/perfile.png"
            alt="Profile"
            class="w-12 h-12 rounded-full"
          />
          <div>
            <h3 class="font-semibold">SaraMartin9</h3>
          </div>
        </div>

        <nav class="space-y-4">
          <a v-for="(item, index) in menuItems" :key="index" 
             class="flex items-center space-x-3 p-2 rounded-lg">
            <component :is="item.icon" class="bg-[#3D3D3D] h-7 w-7 rounded-full justify-center" />
            <span class="">{{ item.label }}</span>
          </a>
        </nav>

        <div class="absolute bottom-4 left-4 right-4">
          <p class="text-xs text-gray-500">Aplicación patrocinada por</p>
          <img
            src="../assets/img/campuslands.png"
            alt="Sponsor"
            class="h-8 mt-2"
          />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="pt-16 pb-20 px-4 min-h-screen">
      <div class="py-6">
        <p class="text-sm text-gray-500 mb-4">Tiendas de artesanías de todas partes de Bucaramanga</p>
        <div class="flex items-center space-x-2 mb-6">
          <h1 class="text-xl font-semibold text-black">Talleres y tiendas artesanales</h1>
          <button class="flex flex-col h-15 w-15 rounded-full justify-center">
            <Settings2 class="h-6 w-6 text-black" />
            <span class="text-xs mt-1"></span>
          </button>
        </div>

        <!-- Products Grid -->
        <div @click="goDetalleTaller" class="grid grid-cols-2 gap-4">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white rounded-lg overflow-hidden shadow"
          >
            <div class="p-3 mt-2 bg-black rounded-lg">
              <h3 class="text-sm font-medium text-white">{{ product.name }}</h3>
              <p class="text-xs text-gray-300">{{ product.artisan }}</p>
            </div>
            <img :src="product.image" :alt="product.name" class="w-full h-40 object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 w-full bg-black border-t border-gray-800">
      <div class="flex justify-around p-3">
        <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <Store class="h-6 w-6" />
          <span class="text-xs mt-1"></span>
        </button>
        <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <BadgePercent @click="goToDescuentos" class="h-6 w-6" />
          <span class="text-xs mt-1"></span>
        </button>
        <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <HomeIcon @click="goToHome" class="h-6 w-6" />
          <span class="text-xs mt-1"></span>
        </button>
        <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <ShoppingCart class="h-6 w-6" />
        </button>
        <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <UserIcon class="h-6 w-6" />
          <span class="text-xs mt-1"></span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goDetalleTaller = () => {
  router.push("/detalleTaller")
}

const goToHome = () => {
  router.push("/tallerMes")
}

const goToDescuentos = () => {
  router.push("/descuentos")
}

import {
  MenuIcon,
  SearchIcon,
  MapPinIcon,
  HomeIcon,
  UserIcon,
  HeartIcon,
  GiftIcon,
  BookOpenIcon,
  SettingsIcon,
  MessageSquareIcon,
  HelpCircleIcon,
  Store,
  BadgePercent,
  ShoppingCart,
  Briefcase,
  NotepadText,
  TicketPercent,
  Headset,
  Settings2Icon,
  Settings2
} from 'lucide-vue-next'

import joyeria from "../assets/img/jewelryCategory.svg"
import textileria from "../assets/img/textileria2.svg"
import orfebreria from "../assets/img/goldsmithCategory.svg"
import tallaPiedra from "../assets/img/stoneWorkshopCategory.svg"
import tallaMadera from "../assets/img/woodWorkshopCategory.svg"
import estampado from "../assets/img/stampedCategory.svg"
import Hojalateria from "../assets/img/sheetMetalCategory.svg"
import bordado from "../assets/img/embroideryCategory.svg"
import ceramica from "../assets/img/ceramicCategory.svg"
import pinturaTradicional from "../assets/img/paintingTraditionalCategory.svg"

const isDrawerOpen = ref(false)
const selectedCategory = ref(null)

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

const selectCategory = (categoryName) => {
  selectedCategory.value = selectedCategory.value === categoryName ? null : categoryName
}

const categories = [
  { nombre: 'Textileria', imagen: textileria },
  { nombre: 'Ceramica', imagen: ceramica },
  { nombre: 'Orfebreria', imagen: orfebreria },
  { nombre: 'Talla en piedra', imagen: tallaPiedra },
  { nombre: 'Talla en madera', imagen: tallaMadera },
  { nombre: 'Bordado', imagen: bordado },
  { nombre: 'Joyeria', imagen: joyeria },
  { nombre: 'Hojalateria', imagen: Hojalateria },
  { nombre: 'Estampado', imagen: estampado },
  { nombre: 'Pintura tradicional', imagen: pinturaTradicional }
]

const menuItems = [
  { label: 'Lista de Favoritos', icon: HeartIcon },
  { label: 'Canjear', icon: Briefcase },
  { label: 'Talleres', icon: NotepadText },
  { label: 'Canjear cupón', icon: TicketPercent },
  { label: 'Ajustes', icon: SettingsIcon },
  { label: 'Comentarios', icon: MessageSquareIcon },
  { label: 'Atención al cliente', icon: Headset }
]

// Sample products data
const products = [
  {
    id: 1,
    name: 'Tapiz Chumpi Andino III',
    price: '600',
    artisan: 'Taller Away Ayllus',
    image: '../assets/img/user.svg',
    category: 'Textileria'
  },
  {
    id: 2,
    name: 'Collar de plata',
    price: '450',
    artisan: 'Joyería Inca',
    image: '../assets/img/user.svg',
    category: 'Joyeria'
  },
  {
    id: 3,
    name: 'Bandeja de hojalata',
    price: '80',
    artisan: 'Taller Metálico',
    image: '../assets/img/user.svg',
    category: 'Hojalateria'
  },
  {
    id: 4,
    name: 'Camiseta estampada',
    price: '45',
    artisan: 'Diseños Andinos',
    image: '../assets/img/user.svg',
    category: 'Estampado'
  },
  {
    id: 5,
    name: 'Cuadro tradicional',
    price: '300',
    artisan: 'Galería Cusco',
    image: '../assets/img/user.svg',
    category: 'Pintura tradicional'
  },
  {
    id: 6,
    name: 'Escultura en piedra',
    price: '750',
    artisan: 'Talladores de los Andes',
    image: '../assets/img/user.svg',
    category: 'Talla en piedra'
  },
  {
    id: 7,
    name: 'Figura de madera',
    price: '120',
    artisan: 'Artesanías del Bosque',
    image: '../assets/img/user.svg',
    category: 'Talla en madera'
  },
  {
    id: 8,
    name: 'Chal bordado',
    price: '200',
    artisan: 'Bordadoras de Ayacucho',
    image: '../assets/img/user.svg',
    category: 'Bordado'
  },
  {
    id: 9,
    name: 'Vasija decorativa',
    price: '85',
    artisan: 'Alfareros del Valle',
    image: '../assets/img/user.svg',
    category: 'Ceramica'
  },
  {
    id: 10,
    name: 'Brazalete de oro',
    price: '1200',
    artisan: 'Orfebres del Sol',
    image: '../assets/img/user.svg',
    category: 'Orfebreria'
  }
]

// Computed property for filtered products
const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products
  return products.filter(product => product.category === selectedCategory.value)
})
</script>

<style scoped>
/* Estilos para el scroll horizontal en categorías cuando hay una seleccionada */
.grid-cols-10 {
  grid-auto-flow: column;
  gap: 70px;
  grid-auto-columns: min-content;
  overflow-x: auto;
  scrollbar-width: none; /* Para Firefox */
  -ms-overflow-style: none;  /* Para Internet Explorer y Edge */
}

.grid-cols-10::-webkit-scrollbar {
  display: none; /* Para Chrome, Safari y Opera */
}

.hr {
  color: black;
}

#main-container {
  min-height: 100vh;
  width: 100%;
  background-image: url('../assets/img/fondoPantalla.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

#main-container > * {

  z-index: 1;
}
</style>