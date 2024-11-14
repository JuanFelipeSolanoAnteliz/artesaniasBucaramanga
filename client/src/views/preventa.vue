<template>
  <div class="min-h-screen bg-white">
    <div class="relative bg-black">
      <!-- Back button with arrow image -->
      <button @click="goBack" class="absolute top-0 left-0 z-10">
        <div class="relative w-9 h-17">
          <img src="../assets/img/Rectangle.svg" alt="rectangle" class="w-full h-full object-cover" />
          <!-- Arrow image positioned on top of the rectangle -->
          <img src="../assets/img/flecha.svg" alt="back" class="absolute top-6 left-1 w-5 h-5" />
        </div>
      </button>


<!-- Rest of the template -->
      <img :src="workshopDetails.fotos && workshopDetails.fotos.length > 0 ? workshopDetails.fotos[0] : '../assets/img/crazy.svg'" class="w-full h-[290px] object-cover" />

      <!-- Title overlay -->
      <div class="absolute bottom-0 left-0 right-0 bg-[#3D3D3D] px-4 py-2">
        <img src="../assets/img/RectangleS.svg" alt="rentangleS" class="absolute top-0 left-0 w-5 h-15" />
        <h1 class="text-left text-white text-lg font-normal ml-3">{{ workshopDetails.nombre || 'Cargando...' }}</h1>
      </div>
    </div>

    <!-- Product details section -->
    <div class="p-4 space-y-3">
      <div class="flex justify-between items-center">
        <div class="text-2xl font-semibold ml-3">S/.{{ workshopDetails.precio || 'Cargando precio...' }}</div>
        <!-- Favorite button with image -->
        <button class="p-2" @click="toggleFavorite">
          <img :src="isFavorite ? corazonLleno : corazonVacio" alt="heart" class="w-12 h-10" />
        </button>
      </div>

      <div class="space-y-2">
        <h2 class="text-left text-base font-medium ml-2.5">{{ workshopDetails.nombre || 'Cargando...' }}</h2>
        <div class="flex items-center gap-2">
          <h3 class="text-left text-base font-medium ml-2.5">Stock:</h3>
          <p class="text-gray-600">{{ workshopDetails.stock || 'Cargando...' }}</p>
        </div>
        <div class="text-left text-gray-600 text-base text-justify leading-relaxed ml-2.5">
          <span class="font-medium">Descripción: </span>
          <p class="indent inline"> {{ workshopDetails.descripcion || 'Cargando...' }}</p>
        </div>
        <br>
        <div class="text-left ml-2.5 flex items-center gap-2 text-gray-600 pt-2">
          <img src="../assets/img/check.svg" alt="check" class="w-5 h-5" />
          <span class="text-sm">Cuenta con envío hacia tu ubicación</span>
        </div>
      </div>

      <!-- Add to cart button -->
      <button @click="fetchAddToCart" class="text-left ml-2.5 bg-[#D9D9D9] text-gray-900 py-3 px-4 rounded-lg flex items-center justify-center gap-2 mt-6">
        <img src="../assets/img/car.svg" alt="cart" class="text-left text-base font-medium ml-[-12px] w-5 h-5" />
        <span class="text-sm text-left font-medium">Añadir a mi carrito de compras</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

// Importa las imágenes desde src/assets/img
import corazonLleno from '../assets/img/corazonLleno.svg'
import corazonVacio from '../assets/img/corazonVacio.svg'

const isFavorite = ref(false)
const workshopDetails = ref(null)
const workshopDetailsCart = ref(null)
const route = useRoute()
const router = useRouter()
const productId = computed(() => route.params.id)
const IDproducto = computed(() => route.params.id)

const fetchWorkshopDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:5001/products/getOne/${productId.value}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      }
    })
    workshopDetails.value = response.data.data
  } catch (err) {
    console.error('Error fetching workshop details:', err)
    err.value = 'Error al cargar los detalles del taller'
  }
}

const fetchAddToCart = async () => {
  try {
    const response = await axios.put(
      `http://localhost:5001/orders/addToCart/${IDproducto.value}`, 
      {},  
      {
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0'
        }
      }
    )
    workshopDetailsCart.value = response.data.data
  } catch (err) {
    console.error('Error fetching workshop details:', err)
    err.value = 'Error al sibir producto al carrito'
  }
  console.log(`${productId.value}`)
}


onMounted(() => {
  fetchWorkshopDetails(),
  fetchAddToCart()
})

const toggleFavorite = async () => {
  isFavorite.value = !isFavorite.value
}

const addToCart = () => {
  // Lógica para añadir al carrito
  console.log('Añadido al carrito')
}

const goBack = () => {
  router.back()
}
</script>


<style scoped>
.indent {
  text-indent: 1em; /* Ajusta el valor para alinear el texto con "Descripción:" */
  margin-top: 0; /* Elimina el margen superior de <p> si es necesario */
}

.inline {
  display: inline; /* Hace que el párrafo continúe en la misma línea después de "Descripción:" */
}

/* Para reducir el espacio entre los elementos en los detalles del producto */
.space-y-3 > * {
  margin-bottom: 0.5rem; /* Reduce el margen entre los elementos */
}

/* Reducir el espacio entre las cabeceras y los textos de las dimensiones y descripción */
.ml-2 {
  margin-left: 0.5rem; /* Reduce el margen izquierdo */
}

.ml-1 {
  margin-left: 0.25rem; /* Reduce aún más el margen izquierdo */
}
</style>
