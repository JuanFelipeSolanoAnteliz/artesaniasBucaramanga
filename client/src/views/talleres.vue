<template>
  <div class="min-h-screen bg-white">
    <!-- Header with diamond background -->
    <div class="relative py-4">
      <!-- Back button with diamond background -->
      <div class="triangle"></div>

      <button @click="goBack" class="absolute top-5 left-[3px] mt-4" >
        <img 
          src="/src/assets/img/flechaB.svg" 
          alt="Volver"
          class="w-4 h-4 cursor-pointer" 
        />
      </button>

      <!-- Title with diamond background -->
      <div class="relative text-center">
        <img 
          src="/src/assets/img/RectangleA.svg" 
          alt="Background"
          class="absolute left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 w-20 h-20" 
        />
        <h1 class="text-xl top-1 font-medium relative z-10">
          Talleres
          <br />
          educativos
        </h1>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="p-4 bg-white">
      <div class="relative">
        <img 
          src="/src/assets/img/search.svg" 
          alt="Buscar"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
        />
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Buscar taller, por categoría o artesanos"
          class="w-full pl-10 pr-4 py-2 bg-[#D9D9D9] rounded-md text-sm text-gray-600"
        />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <p>Cargando talleres...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8 text-red-600">
      <p>{{ error }}</p>
      <button 
        @click="fetchWorkshops" 
        class="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
      >
        Intentar nuevamente
      </button>
    </div>

    <!-- Workshop List with Scroll -->
    <div v-else class="px-4 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      <!-- Workshop Card -->
      <div 
        v-for="workshop in filteredWorkshops" 
        :key="workshop._id"
        class="bg-white rounded-lg overflow-hidden shadow flex h-[120px]"
      >
        <img
          :src="workshop.documental || 'https://via.placeholder.com/150x150'"
          :alt="workshop.nombre"
          class="w-[150px] h-[150px] object-cover"
        />
        <div class="p-2 flex-1 flex flex-col justify-between">
          <div>
            <h2 class="text-left text-sm font-semibold leading-tight">{{ workshop.nombre }}</h2>
            <p class="text-left text-xs text-gray-600 mt-0.5">{{ workshop.modalidad }}</p>
            <p class="text-left text-xs text-gray-600 line-clamp-2">{{ workshop.descripcion }}</p>
            <p class="text-left text-xs text-gray-600 mt-1">
              {{ formatDate(workshop.fechaInicio) }} - {{ formatDate(workshop.fechaFin) }}
            </p>
          </div>
          <button 
          @click="goDetalleTaller(workshop._id)"
            class="mt-1 bg-gray-800 text-white text-xs px-2 py-0.5 rounded self-start hover:bg-gray-700 transition-colors"
          >
            Entérate más sobre el taller aquí
          </button>
        </div>
      </div>

      <!-- No Results Message -->
      <div v-if="filteredWorkshops.length === 0" class="col-span-full text-center py-8 text-gray-500">
        No se encontraron talleres que coincidan con tu búsqueda
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const workshops = ref([])
const loading = ref(true)
const error = ref(null)
const searchTerm = ref('')

// Computed property for filtered workshops
const filteredWorkshops = computed(() => {
  if (!searchTerm.value) return workshops.value
  
  const searchLower = searchTerm.value.toLowerCase()
  return workshops.value.filter(workshop => {
    return workshop.nombre?.toLowerCase().includes(searchLower) ||
           workshop.descripcion?.toLowerCase().includes(searchLower) ||
           workshop.modalidad?.toLowerCase().includes(searchLower)
  })
})

// Format date helper function
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  } catch (e) {
    return dateString
  }
}

// Fetch workshops from API
const fetchWorkshops = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('http://localhost:5001/workshops/all', {
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.status === 200 && Array.isArray(result.data)) {
      workshops.value = result.data
    } else {
      throw new Error('Formato de respuesta inválido')
    }
  } catch (e) {
    console.error('Error fetching workshops:', e)
    error.value = 'Error al cargar los talleres. Por favor, intenta nuevamente.'
  } finally {
    loading.value = false
  }
}

// Navigation functions
const goBack = () => {
  router.back()
}

const goDetalleTaller = (id) => {
  router.push(`/ceramica/${id}`)
}

const showWorkshopDetails = (workshop) => {
  router.push({
    name: 'workshop-details',
    params: { id: workshop._id }
  })
}

// Fetch workshops on component mount
onMounted(() => {
  fetchWorkshops()
})
</script>

<style scoped>
.triangle {
  position: absolute;
  top: 1;
  left: 0;
  width: 0;
  height: 0;
  border-left: 32px solid #D9D9D9;
  border-bottom: 30px solid transparent;
  border-top: 28px solid transparent;
}

/* Optional: Add smooth transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>