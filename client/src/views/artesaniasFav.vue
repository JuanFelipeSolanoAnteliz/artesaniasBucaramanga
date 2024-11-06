<template>
  <div class="min-h-screen bg-white">
    <!-- Back button and image section -->
    <div class="relative bg-black">
      <button class="absolute top-4 left-4 z-10" @click="goBack">
        <ChevronLeft class="w-6 h-6 text-white" />
      </button>
      <img 
        src="https://via.placeholder.com/600x400"
        alt="Tapiz Chumpi Andino III"
        class="w-full h-[400px] object-cover"
      />
      <!-- Title overlay -->
      <div class="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3">
        <h1 class="text-white text-lg font-normal">Tapiz Chumpi Andino III</h1>
      </div>
    </div>

    <!-- Product details section -->
    <div class="p-4 space-y-4">
      <div class="flex justify-between items-center">
        <div class="text-2xl font-semibold">S/.600</div>
        <!-- Favorite button with image -->
        <button class="p-2" @click="toggleFavorite">
          <img 
            :src="isFavorite ? corazonLleno : corazonVacio"
            alt="corazon" 
            class="w-10 h-10"
          />
        </button>
      </div>

      <div class="space-y-3">
        <h2 class="text-base font-medium">Taller Awaq Ayllus</h2>
        
        <div>
          <h3 class="font-medium mb-1">Dimensiones:</h3>
          <p class="text-gray-600">60 x 80 cm</p>
        </div>

        <div>
          <h3 class="font-medium mb-1">Descripción:</h3>
          <p class="text-gray-600">
            Tapiz tridimensional con diseños de la tradición textil andina prehispánica.
            Elaborado con lana de ovino y tejido en telar a pedal.
          </p>
        </div>

        <!-- Reemplaza el ícono Truck con la imagen de Check -->
        <div class="flex items-center gap-2 text-gray-600 pt-2">
          <img 
            src="../assets/img/check.svg"
            alt="check"
            class="w-5 h-5" />
          <span class="text-sm">Cuenta con envío hacia tu ubicación</span>
        </div>
      </div>

      <!-- Add to cart button -->
      <button 
        class="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg flex items-center justify-center gap-2 mt-6"
        @click="addToCart"
      >
        <ShoppingCart class="w-5 h-5" />
        <span class="text-sm font-medium">Añadir a mi carrito de compras</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ShoppingCart, ChevronLeft } from 'lucide-vue-next' // No es necesario importar Check si usas imagen

// Importa las imágenes desde src/assets/img
import corazonLleno from '../assets/img/corazonLleno.svg'
import corazonVacio from '../assets/img/corazonVacio.svg'

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const addToCart = () => {
  // Lógica para añadir al carrito
  console.log('Añadido al carrito')
}

const goBack = () => {
  window.history.back()
}
</script>

<style scoped>
/* Estilos específicos para la página */
</style>