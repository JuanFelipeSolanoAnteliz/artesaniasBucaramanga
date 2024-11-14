<template>
  <div id="main-container" class="min-h-screen text-white bellota-font">
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
              v-model="searchQuery"
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
          <a 
            v-for="(item, index) in menuItems" 
            :key="index" 
            @click="item.onClick" 
            class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
            <!-- Render icon dynamically -->
            <component :is="item.icon" class="bg-[#3D3D3D] h-7 w-7 rounded-full p-1" />
            <span>{{ item.label }}</span>
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
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="text-black">Cargando talleres...</div>
      </div>

      <div v-else-if="error" class="flex justify-center items-center h-64">
        <div class="text-red-500">{{ error }}</div>
      </div>

      <div v-else class="py-6">
        <p class="text-sm text-gray-500 mb-4">Tiendas de artesanías de todas partes de Bucaramanga</p>
        <div class="flex items-center space-x-2 mb-6">
          <h1 class="text-xl font-semibold text-black">Talleres y tiendas artesanales</h1>
          <button class="flex flex-col h-15 w-15 rounded-full justify-center">
            <Settings2 class="h-6 w-6 text-black" />
          </button>
        </div>


        <!-- Products Grid -->
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="workshop in filteredProducts"
            :key="workshop.id"
            @click="goDetalleTaller(workshop.id)"
            class="bg-white rounded-lg overflow-hidden shadow cursor-pointer"
          >
            <div class="p-3 mt-2 bg-black rounded-lg">
              <h3 class="text-sm font-medium text-white">{{ workshop.name }}</h3>
              <p class="text-xs text-gray-300">{{ workshop.category }}</p>
            </div>
            <img 
              :src="workshop.image" 
              :alt="workshop.name" 
              class="w-full h-40 object-cover rounded-lg"
              @error="handleImageError"
            />
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 w-full bg-black border-t border-gray-800">
      <div class="flex justify-around p-3">
        <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <Store class="h-6 w-6" />
        </button>
        <button @click="goToDescuentos" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <BadgePercent class="h-6 w-6" />
        </button>
        <button @click="goToHome" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <HomeIcon class="h-6 w-6" />
        </button>
        <button @click="goToCarritoCompras" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <ShoppingCart class="h-6 w-6" />
        </button>
        <button @click="goToUser" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <UserIcon class="h-6 w-6" />
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// Icon imports
import {
  MenuIcon,
  SearchIcon,
  HomeIcon,
  UserIcon,
  HeartIcon,
  SettingsIcon,
  MessageSquareIcon,
  Store,
  BadgePercent,
  ShoppingCart,
  Briefcase,
  NotepadText,
  TicketPercent,
  Headset,
  Settings2
} from 'lucide-vue-next'

// Image imports
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

// Router setup
const router = useRouter()

// State management
const isDrawerOpen = ref(false)
const selectedCategory = ref(null)
const workshops = ref([])
const searchQuery = ref('')
const isLoading = ref(false)
const error = ref(null)

// Navigation functions
const goDetalleTaller = (id) => {
  router.push(`/detalleTaller/${id}`)
}

const goToHome = () => {
  router.push("/tallerMes")
}

const goToDescuentos = () => {
  router.push("/descuentos")
}

const goToCarritoCompras = () => {
  router.push("/carritoCompras")
}

const goToUser = () => {
  router.push("/user")
}

const goToFavoritos = () => {
  router.push("/artesanias")
}

const goToCompras = () => {
  router.push("/comprasR")
}

const goToTalleres = () => {
  router.push("/talleres")
}

const goToCupon= () => {
  router.push("/canjear")
}

const goToAjustes= () => {
  router.push("/ajustes")
}

const goToComentarios= () => {
  router.push("/comentarios")
}

const goToAtencion= () => {
  router.push("/atencion")
}




const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

const selectCategory = (categoryName) => {
  selectedCategory.value = selectedCategory.value === categoryName ? null : categoryName
}



// Menu items data
const menuItems = [
  { 
    label: 'Lista de Favoritos', 
    icon: HeartIcon, 
    onClick: goToFavoritos 
  },
  { 
    label: 'Compras', 
    icon: Briefcase, 
    onClick: goToCompras 
  },
  { 
    label: 'Talleres', 
    icon: NotepadText, 
    onClick: goToTalleres 
  },
  { 
    label: 'Canjear cupón', 
    icon: TicketPercent, 
    onClick: goToCupon 
  },
  { 
    label: 'Ajustes', 
    icon: SettingsIcon, 
    onClick: goToAjustes 
  },
  { 
    label: 'Comentarios', 
    icon: MessageSquareIcon, 
    onClick: goToComentarios 
  },
  { 
    label: 'Atención al cliente', 
    icon: Headset, 
    onClick: goToAtencion 
  }
]


// API functions
const fetchWorkshops = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await axios.get('http://localhost:5001/workshops/all', {
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      }
    })
    
    // Access the data array from the response structure
    const workshopsData = response.data.data

    workshops.value = workshopsData.map(workshop => ({
      id: workshop._id,
      name: workshop.nombre,
      artisan: workshop.artesanoId, // You might want to fetch artisan name separately
      image: workshop.documental ,
      category: workshop.modalidad,
      description: workshop.descripcion,
      startDate: new Date(workshop.fechaInicio).toLocaleDateString(),
      endDate: new Date(workshop.fechaFin).toLocaleDateString(),
      duration: workshop.duracion,
      location: workshop.ubicacion,
      materialsProvided: workshop.materialesProporcionados,
      materialsRequired: workshop.materialesRequeridos
    }))
  } catch (err) {
    error.value = 'Error al cargar los talleres: ' + err.message
    console.error('Error fetching workshops:', err)
  } finally {
    isLoading.value = false
  }
}

// Update the filtered products computed property to match new data structure
const filteredProducts = computed(() => {
  let filtered = workshops.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(workshop => 
      workshop.name.toLowerCase().includes(query) ||
      workshop.location.toLowerCase().includes(query) ||
      workshop.description.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(workshop => 
      workshop.category === selectedCategory.value
    )
  }

  return filtered
})

// Image error handling
const handleImageError = (event) => {
  event.target.src = '../assets/img/user.svg'
}

// Lifecycle hooks
onMounted(() => {
  fetchWorkshops()
})
</script>

<style>
@font-face {
  font-family: 'Bellota';
  src: url('@/assets/font/bellota/Bellota-BoldItalic.ttf') format('truetype');
  font-weight: bold;
  font-style: italic;
  font-display: swap;
}

.bellota-font {
  font-family: 'Bellota', sans-serif;
  font-weight: bold;
  font-style: italic;
}

.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
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