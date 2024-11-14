<template>
    <div id="main-container" class="min-h-screen text-white">
      <!-- Main Header -->
      <header class="fixed top-0 w-full bg-gray-900 z-50">
        <div class="flex items-center p-4 bg-black">
          <button @click="toggleDrawer" class="p-2">
            <MenuIcon class="h-6 w-6" />
          </button>
          <div class="flex-1 mx-4">
            <div class="relative">
              <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Buscar producto o tienda..."
                class="w-full bg-[#3D3D3D] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
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
      <main class="pt-16 pb-20 min-h-screen">
        <!-- Hero Banner -->
        <div class="relative h-28 bg-transparent">
          <div class="absolute inset-0 flex flex-col justify-center px-4">
            <p class="text-sm text-gray-600 mb-2 absolute inset-x-0 bottom-0 ml-4">En cientos de artesanias</p>
            <h1 class="text-black text-xl">  Descuentos y promociones</h1>
          </div>
        </div>
  
        <div class="overflow-x-auto scrollbar-hide mb-4">
        <div class="flex">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
            :class="[
              'px-3 text-xs w-24',
              selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-800'
            ]"
          >
            {{ category }}
          </button>
        </div>
        <hr class="bg-black h-1">
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-red-500 text-center py-8">
        {{ error }}
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-2 gap-4 px-4">
        <div
          v-for="product in filteredProducts"
          :key="product._id"
          class="relative bg-white rounded-lg shadow"
        >
          <div class="relative h-40 w-full">
            <img
              :src="product.fotos"
              :alt="product.nombre"
              class="absolute inset-0 w-full h-full object-cover rounded-t-lg text-white"
            />
            <div class="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs rounded">
              {{ product.descuento }}
            </div>
          </div>
          <div class="p-3 bg-black rounded-b-lg">
            <h3 class="text-white text-xs font-medium truncate">{{ product.nombre }}</h3>
            <p class="text-gray-400 text-xs mt-1">{{ product.precio }}</p>
            <p class="text-gray-500 text-[10px] mt-1 truncate">{{ product.artesanoId }}</p>
          </div>
        </div>
      </div>
      </main>
  
      <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 w-full bg-black border-t border-gray-800">
      <div class="flex justify-around p-3">
        <button @click="goToTienda" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
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

const router = useRouter()
const products = ref([])
const isLoading = ref(false)
const error = ref(null)
const selectedCategory = ref(null)
const searchQuery = ref('')

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

const goToTienda= () => {
  router.push("/tallerYtiendas")
}

import {
  MenuIcon,
  SearchIcon,
  HomeIcon,
  UserIcon,
  HeartIcon,
  Store,
  BadgePercent,
  ShoppingCart,
  Briefcase,
  NotepadText,
  TicketPercent,
  Headset,
  Settings2,
  MessageSquare,
  SettingsIcon
} from 'lucide-vue-next'

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
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
    icon: MessageSquare, 
    onClick: goToComentarios 
  },
  { 
    label: 'Atención al cliente', 
    icon: Headset, 
    onClick: goToAtencion 
  }
]

const API_BASE_URL = 'http://localhost:5001'

const fetchProductsByCategory = async (category = '') => {
  isLoading.value = true
  error.value = null

  try {
    const url = category ? `${API_BASE_URL}/products/discounts/${category}` : `${API_BASE_URL}/products/discounts`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()
    products.value = data.data
  } catch (e) {
    console.error('Error fetching products:', e)
    error.value = 'No se pudo cargar los productos.'
  } finally {
    isLoading.value = false
  }
}

const selectCategory = async (categoryName) => {
  if (selectedCategory.value === categoryName) {
    selectedCategory.value = null
    await fetchProductsByCategory()
  } else {
    selectedCategory.value = categoryName
    await fetchProductsByCategory(categoryName)
  }
}

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(product => 
    product.nombre.toLowerCase().includes(query) ||
    product.descripcion.toLowerCase().includes(query) ||
    product.categoria.toLowerCase().includes(query)
  )
})

const categories = [
  'Hogar',
  'Cerámica',
  'Joyeria',
  'Talla en piedra',
  'Bordado',
  'Hojalateria',
  'Estampado',
  'Textileria',
  'Jardineria'
]

onMounted(async () => {
  await fetchProductsByCategory()
})
</script>
  
  <style scoped>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
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