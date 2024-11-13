<template>
  <div class="min-h-screen bg-white">
    <!-- Header with back button -->
    <div class="relative h-64 inset-x-0 top-0">
      <img 
        :src="workshopDetails?.documental || '../assets/img/backNofondo.png'" 
        alt="Banner"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20">
        <div class="flex">
          <img @click="goBack" src="../assets/img/backNofondo.png" alt="Back">
          <h1 class="text-white text-center bg-[#3D3D3D] h-8 w-52 justify-between ml-14 rounded-lg">
            {{ workshopDetails?.nombre || 'Cargando...' }}
          </h1>
        </div>
        
        <div class="absolute bottom-0 text-white">
          <p class="text-sm bg-[#3D3D3D] w-full p-4 underline decoration-solid inset-x-0 bottom-0">
            {{ workshopDetails?.descripcion || 'Conoce la historia detrás de este taller artesanal y conoce como producen sus textiles' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Artesanías Title -->
    <div class="flex justify-center relative z-10">
      <div class="px-8 py-2 bg-[#D9D9D9] top-4">
        <h2 class="text-lg text-black">Artesanías</h2>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="px-4 py-6">
      <div class="relative">
        <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-black" />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Buscar producto o palabra clave..."
          class="w-full bg-[#D9D9D9] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none"
        />
        <button class="absolute right-3 top-2">
          <SlidersHorizontal class="h-5 w-5 text-black" />
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <p class="text-gray-500">Cargando productos...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center items-center h-48">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- Products Grid -->
    <div v-else class="px-4 grid grid-cols-2 gap-4 mb-20">
      <div
        v-for="product in filteredProducts"
        :key="product._id"
        class="bg-white rounded-lg overflow-hidden shadow-md"
      >
        <div class="p-2 bg-black rounded-t-lg">
          <h3 class="text-sm font-medium text-white">{{ product.nombre }}</h3>
          <p class="text-xs text-gray-300">S/{{ product.precio }}</p>
          <p class="text-xs text-gray-300">Stock: {{ product.stock }}</p>
        </div>
        <img 
          :src="product.fotos?.[0] || '../assets/img/perfile.png'" 
          :alt="product.nombre"
          class="w-full h-40 object-cover"
          @error="handleImageError"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { SearchIcon, SlidersHorizontal } from 'lucide-vue-next'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const workshopDetails = ref(null)
const products = ref([])
const isLoading = ref(false)
const error = ref(null)
const searchQuery = ref('')

// Navegación
const goBack = () => {
  router.back()
}

// Manejo de errores de imagen
const handleImageError = (event) => {
  event.target.src = '../assets/img/perfile.png'
}

// Productos filtrados
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(product => 
    product.nombre.toLowerCase().includes(query) ||
    product.descripcion.toLowerCase().includes(query) ||
    product.categoria.toLowerCase().includes(query)
  )
})

// Obtener detalles del taller
const fetchWorkshopDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:5001/workshops/${route.params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      }
    })
    workshopDetails.value = response.data.data
  } catch (err) {
    console.error('Error fetching workshop details:', err)
    error.value = 'Error al cargar los detalles del taller'
  }
}

// Obtener productos
const fetchProducts = async () => {
  isLoading.value = true
  try {
    const response = await axios.get('http://localhost:5001/products', {
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      }
    })
    products.value = response.data.data
  } catch (err) {
    console.error('Error fetching products:', err)
    error.value = 'Error al cargar los productos'
  } finally {
    isLoading.value = false
  }
}

// Cargar datos al montar el componente
onMounted(() => {
  fetchWorkshopDetails()
  fetchProducts()
})
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos si los necesitas */
</style>