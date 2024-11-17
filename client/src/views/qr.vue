<template>
  <div class="bg-white min-h-screen">
    <div class="triangle"></div>

    <div class="absolute top-1 left-[3px] mt-4">
      <img 
        src="../assets/img/flechaB.svg" 
        alt="Volver"
        class="w-4 h-4" 
      />
    </div>

    <!-- Diamond Pattern Header -->
    <div class="py-6 flex justify-center">
      <div class="flex gap-2">
        <div v-for="n in 12" :key="n" class="w-2 h-2 bg-gray-300 transform rotate-45"></div>
      </div>
    </div>

    <!-- Workshop Description -->
    <div class="px-4 sm:px-6 text-center mb-6">
      <p class="text-sm sm:text-base px-4 sm:px-6">
        El Taller de Arte Awaq Ayllus reúne a más de 60 tejedores y tejedoras ayacuchanos que producen tapices murales y delicadas piezas bordadas para diversos usos decorativos y utilitarios.
      </p>
    </div>

    <!-- Diamond Pattern Footer -->
    <div class="pb-6 flex justify-center">
      <div class="flex gap-2">
        <div v-for="n in 12" :key="n" class="w-2 h-2 bg-gray-300 transform rotate-45"></div>
      </div>
    </div>

    <!-- Video Section -->
    <div class="relative aspect-video bg-gray-100 overflow-hidden rounded-md mx-4 sm:mx-6">
      <div class="p-4 bg-[#D9D9D9]"> 
        <img 
          src="https://via.placeholder.com/150x150" 
          alt="Workshop Video"
          class="w-full h-full object-cover"
        />
      </div>
      <button class="absolute inset-0 m-auto w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
        <img src="https://via.placeholder.com/150x150" alt="Play" class="w-8 h-8" />
      </button>
    </div>

    <!-- Interactive Section -->
    <div class="px-4 sm:px-6 p-4">
      <h3 class="text-left text-base font-medium ml-4 text-xl sm:text-2xl font-medium mb-2">
        Conoce más del taller de forma interactiva
      </h3>
      <p class="text-gray-500 mb-6 text-xs sm:text-sm text-center">
        Escanea el código QR con tu celular y disfruta de la experiencia
      </p>

      <div class="flex justify-center">
        <!-- QR code section with dynamic data -->
        <div v-if="qrValue && !error">
          <QRCode :value="qrValue" :size="200" level="M" />
        </div>
        <div v-else-if="error" class="text-red-500">
          {{ error }}
        </div>
        <div v-else>
          <p>Cargando datos para generar el QR...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import QRCode from 'qrcode.vue'

const qrValue = ref('')
const error = ref(null)
const idTofetch = computed(() => Route.params.id);

console.log(idTofetch, 'id to fetch');

const fetchDataForQR = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5001/workshops/${idTofetch.value}`,   
      {
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0'
        }
      }
    )
    console.log(response, 'response')
    qrValue.value = response.data.data._id 
    error.value = null
  } catch (err) {
    console.error('Error fetching data:', err)
    error.value = 'Error al cargar los datos para el QR'
    qrValue.value = ''
  }
}

onMounted(() => {
  fetchDataForQR()
})
</script>
<style scoped>
.triangle {
  position: absolute;
  top: 3;
  left: 0;
  width: 0;
  height: 0;
  border-left: 32px solid #D9D9D9; /* Color gris más oscuro */
  border-bottom: 30px solid transparent;
  border-top: 28px solid transparent;
}

/* Prevent content overflow on smaller screens */
@media (max-width: 390px) {
  .bg-gray-100 {
    height: 200px; /* Reduced height of the video section */
  }

  /* Ensure padding does not cause overflow */
  .px-4, .sm\:px-6 {
    padding-left: 16px;
    padding-right: 16px;
  }

  /* Adjust size of video and play button */
  .w-16, .h-16 {
    width: 50px;
    height: 50px;
  }

  /* Make sure header text is not too large */
  h2 {
    font-size: 14px; 
  }

  /* Adjust QR code image size */
  .w-48, .h-48 {
    width: 120px; /* Increased width */
    height: 120px; /* Increased height */
  }

  /* Adjust margin to avoid overflow */
  .px-4 {
    padding-left: 8px;
    padding-right: 8px;
  }

  /* Ensure content is within bounds */
  .min-h-screen {
    min-height: 100vh; /* Ensure content is vertically contained */
  }
}
</style>
