<template>
  <div class="h-screen bg-white p-4 flex flex-col">
    <!-- Header con flecha -->
    <div class="triangle"></div>

    <!-- Flecha -->
    <div @click="goBack" class="absolute top-1 left-[3px] mt-4 z-20">
      <img 
        src="../assets/img/flechaB.svg" 
        alt="Volver"
        class="w-4 h-4" 
      />
    </div>

    <!-- Título de la página -->
    <div @click="goBack" class="relative mb-4">
      <img 
        src="../assets/img/RectangleA.svg" 
        alt="back"
        class="absolute top-[-14px] left-1/2 transform -translate-x-1/2 w-20 h-30 z-0" 
      />
      <div class="relative z-10 text-center">
        <h3 class="text-2xl font-medium">Compras</h3>
        <h2 class="text-xl">realizadas</h2>
      </div>
    </div>
    
    <!-- Purchased Items -->
    <div class="flex-1 overflow-y-auto mb-4"> 
    <div v-if="error" class="text-red-500 text-center py-4">
      {{ error }}
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div v-for="item in purchasesHistory" :key="item.productoId._id" class="bg-white p-4 rounded-lg shadow-md"> 
        <div class="flex items-start">
          <img :src="item.productoId.fotos[0]" :alt="item.productoId.nombre" class="w-16 h-16 object-cover rounded-lg" />
          <div class="flex-1 ml-3 flex flex-col justify-between">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-left text-base font-medium">{{ item.productoId.nombre }}</p>
                <p class="text-left text-sm text-gray-500">S/.{{ item.productoId.precio }}</p>
                <p class="text-left text-xs text-gray-500">Cantidad: {{ item.cantidad }}</p>
                <p class="text-left text-xs text-gray-500">Categoría: {{ item.productoId.categoria }}</p>
              </div>
              <img 
                src="../assets/img/comentario.svg" 
                alt="comentario"
                class="h-5 w-5 text-gray-500 cursor-pointer"
              />
            </div>
            <div class="flex flex-col items-start mt-2">
              <button class="text-left font-medium bg-black text-white text-xs py-1 px-3 rounded-full hover:bg-gray-800 transition duration-300">
                Ver seguimiento del producto
              </button>
            </div>
          </div>
        </div>
        <p class="text-left text-sm text-gray-600 mt-2">{{ item.productoId.descripcion }}</p>
      </div>
    </div>
  </div>

    <!-- Título "Sigue viendo más artesanías" -->
    <h2 class="text-left text-base font-medium ml-1.5 mt-2 mb-1">Sigue viendo más artesanías</h2>

    <!-- More Products Section with Scroll -->
    <div class="flex-1 overflow-y-auto max-h-products">
      <div v-if="error" class="text-red-500 text-center py-4">
        {{ error }}
      </div>
      <div v-else class="grid grid-cols-2 gap-4">
        <div
        @click="goToPreventa(item._id)"  v-for="item in workshopDetails" :key="item.id" class="relative">
          <img 
            :src="item.fotos" 
            :alt="item.nombre"
            class="w-full h-40 object-cover rounded-lg"
            @error="handleImageError"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 rounded-b-lg">
            <p class="text-white text-xs">{{ item.nombre }}</p>
            <p class="text-white text-xs opacity-75">{{ item.nombre }}</p>
            <p class="text-white text-xs opacity-90">S/. {{ item.precio }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
import { data } from 'autoprefixer';

const router = useRouter();

const goToPreventa = (productId) => {
  router.push(`/preventa/${productId}`);
}

const goBack = () => {
  router.back();
}


const handleImageError = (e) => {
  e.target.src = '../assets/img/default-product.jpg' // Asegúrate de tener esta imagen por defecto
}

const workshopDetails = ref([]);
const purchasesHistory = ref([]);
const error = ref(null)


const fetchAllProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5001/products', {
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      }
    })
    
    if (response.data && response.data.data) {
      workshopDetails.value = response.data.data
      console.log(workshopDetails, 'tallerrrrrrrrr')
    } else {
      error.value = 'No se encontraron productos'
    }
  } catch (err) {
    console.error('Error fetching workshop details:', err)
    error.value = 'Error al cargar los productos'
  }
}

const fetchPurchases = async ( ) =>{
  try {
    const response = await axios.get(
      `http://localhost:5001/orders/history`,   
      {
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0'
        }
      }
    );

    console.log(response, 'response')
    if(response.status===404){
      error.value = 'Usuario sin productos comprados'
    }
     if (response.data && response.data.data) {
      response.data.data.forEach(element => {
        element.productos.forEach(element => {
          purchasesHistory.value.push(element)
        });
      });
      console.log(purchasesHistory.value)
    }
  } catch (err) {
    console.error('Error fetching data:', err)
  }
}

onMounted(() => {
  fetchAllProducts()
  fetchPurchases()
})
</script>

<style scoped>
.triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 32px solid #D9D9D9;
  border-bottom: 30px solid transparent;
  border-top: 28px solid transparent;
  z-index: 10;
}

.bg-gray-100 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 9rem;
}

.flex-1 {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 12px;
}

.flex {
  display: flex;
}

.object-cover {
  object-fit: cover;
}

.text-xs {
  font-size: 0.75rem;
}

.max-h-products {
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}

/* Añadido para mejor manejo de carga y errores */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

img {
  transition: opacity 0.3s ease;
}

img[src=''] {
  opacity: 0;
}
</style>