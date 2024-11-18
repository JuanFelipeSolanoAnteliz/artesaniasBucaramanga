<template>
  <div class="bg-white h-screen flex flex-col">
    <!-- Loading State -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <p>Cargando detalles del taller...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex-1 flex items-center justify-center flex-col">
      <p class="text-red-600">{{ error }}</p>
      <button 
        @click="fetchWorkshopDetails" 
        class="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
      >
        Intentar nuevamente
      </button>
    </div>

    <!-- Content -->
    <template v-else-if="workshopDetails">
      <!-- Workshop Image and Title -->
      <div class="relative h-2/5">
        <div class="absolute top-0 left-[-1px] cursor-pointer h-32 w-32" @click="goBack">
          <img 
            src="../assets/img/back.png" 
            alt="Volver"
            class="w-14 h-14"
          />
        </div>
        
        <!-- Background Image -->
        <img 
          :src="workshopDetails.documental || 'https://via.placeholder.com/400x300'"
          alt="Taller"
          class="w-full h-full object-cover"
        />

        <!-- Title Bar -->
        <div class="absolute bottom-0 left-0 right-0 bg-[#3D3D3D] text-white p-2">
          <h1 class="text-left text-white text-lg ml-4 font-semibold">
            {{ workshopDetails.nombre }}
          </h1>
        </div>
      </div>

      <!-- Workshop Content -->
      <div class="flex-1 px-4 py-3 space-y-3 overflow-y-auto text-sm">
        <p class="text-left text-sm leading-snug">
          {{ workshopDetails.descripcion }} <strong @click="redirectToDetail(workshopDetails._id)">conoce mas... </strong>
        </p>

        <div class="space-y-2 text-sm">
          <div class="flex">
            <span class="font-medium mr-1">Modalidad:</span>
            <span>{{ workshopDetails.modalidad }}</span>
          </div>
          <div class="flex">
            <span class="font-medium mr-1">Fecha de inicio:</span>
            <span>{{ formatDate(workshopDetails.fechaInicio) }}</span>
          </div>
          <div class="flex">
            <span class="font-medium mr-1">Fecha de fin:</span>
            <span>{{ formatDate(workshopDetails.fechaFin) }}</span>
          </div>
          <div class="flex">
            <span class="font-medium mr-1">Duración:</span>
            <span>{{ workshopDetails.duracion }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-medium mb-1">Materiales proporcionados:</span>
            <ul class="list-disc pl-5">
              <li v-for="(material, index) in workshopDetails.materialesProporcionados" 
                  :key="index">
                {{ material }}
              </li>
            </ul>
          </div>
          <div class="flex flex-col">
            <span class="font-medium mb-1">Materiales requeridos:</span>
            <ul class="list-disc pl-5">
              <li v-for="(material, index) in workshopDetails.materialesRequeridos" 
                  :key="index">
                {{ material }}
              </li>
            </ul>
          </div>
          <div class="flex">
            <span class="font-medium mr-1">Lugar:</span>
            <span>{{ workshopDetails.ubicacion }}</span>
          </div>
        </div>
      </div>

      <!-- Registration Button -->
      <div class="p-4">
        <button @click="showModal = true" class="w-full bg-[#D9D9D9] rounded-lg py-3 px-4 flex items-center justify-between text-sm">
          <div class="flex items-center">
            <img src="../assets/img/page.svg" alt="" class="w-6 h-6 mr-2" />
            <span class="font-medium text-base">Inscribirse al taller</span>
          </div>
          <span class="text-gray-500 text-xs">*Cupos limitados</span>
        </button>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
          <h2 class="text-xl font-bold mb-4">Confirmación</h2>
          <p class="mb-6">¿Quieres inscribirte a este taller?</p>
          <div class="flex justify-end space-x-4">
            <button @click="confirmInscription" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
              Sí
            </button>
            <button @click="showModal = false" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
              No
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const workshopDetails = ref(null)
const loading = ref(true)
const error = ref(null)
const route = useRoute()
const router = useRouter()
const productId = computed(() => route.params.id)

const showModal = ref(false)

const confirmInscription = async() => {
  try {
    console.log(productId.value, 'id tallerrrrr')
    const response = await axios.put(`http://localhost:5001/workshops/${productId.value}`,
     {},{
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      }
    })
    console.log(response)
  } catch (err) {
    console.error('Error fetching workshop details:', err)
    error.value = 'Error al cargar los detalles del taller. Por favor, intenta nuevamente.'
  }
  console.log('Inscripción confirmada')
  showModal.value = false

}

const formatDate = (dateString) => {
  if (!dateString) return ''
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

const redirectToDetail = async (id) => {
  router.push(`/qr/${id}`)
}

const fetchWorkshopDetails = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get(`http://localhost:5001/workshops/${productId.value}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      }
    })
    
    if (response.data && response.data.data) {
      workshopDetails.value = response.data.data
    } else {
      throw new Error('No se encontraron datos del taller')
    }
  } catch (err) {
    console.error('Error fetching workshop details:', err)
    error.value = 'Error al cargar los detalles del taller. Por favor, intenta nuevamente.'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  fetchWorkshopDetails()
})
</script>

<style scoped>
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
}

.triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 28px solid #3D3D3D;
  border-bottom: 28px solid transparent;
  border-top: 28px solid transparent;
  z-index: 10;
}

h1 {
  font-family: 'Bellota-Bold', sans-serif;
}

@media (max-width: 640px) {
  .fixed.inset-0 {
    padding: 1rem;
  }
}
</style>