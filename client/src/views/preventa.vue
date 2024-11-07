<template>
  <div class="min-h-screen bg-white">
    <div class="relative bg-black">
      <!-- Botón de retroceso con la imagen de la flecha -->
      <button @click="goBack" class="absolute top-0 left-0 z-10">
        <div class="relative w-9 h-17">
          <img 
            src="../assets/img/Rectangle.svg" 
            alt="rectangle"
            class="w-full h-full object-cover" 
          />
          <!-- Imagen de la flecha posicionada encima del rectángulo -->
          <img 
            src="../assets/img/flecha.svg" 
            alt="back"
            class="absolute top-6 left-1 w-5 h-5" 
          />
        </div>
      </button>

      <img 
        src="https://via.placeholder.com/200x400"
        alt="Tapiz Chumpi Andino III"
        class="w-full h-[290px] object-cover"
      />

      <!-- Title overlay -->
      <div class="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2">
        <img 
            src="../assets/img/RectangleS.svg" 
            alt="rentangleS"
            class="absolute top-0 left-0 w-5 h-15" 
          />
          <h1 class="text-left text-white text-lg font-normal ml-3">Tapiz Chumpi Andino III</h1>
      </div>
    </div>

    <!-- Product details section -->
    <div class="p-4 space-y-4">
      <div class="flex justify-between items-center">
        <div class="text-2xl top-10 font-semibold ml-3">S/.600</div>
        <!-- Favorite button with image -->
        <button class="p-2" @click="toggleFavorite">
          <img 
            :src="isFavorite ? corazonLleno : corazonVacio"
            alt="corazon" 
            class="w-10 h-10"
          />
        </button>
      </div>

      <div class="space-y-3 ml-2"> 
        <h2 class="text-left text-base font-medium ml-1.5">Taller Awaq Ayllus</h2>
        
        <div class="flex items-center space-x-2"> 
          <h3 class="text-left text-base font-medium ml-1.5">Dimensiones:</h3>
          <p class="text-gray-600">60 x 80 cm</p>
        </div>
        
        <div class="text-gray-600 text-base text-justify leading-relaxed ml-2">
          <span class="font-medium">Descripción:</span>
          <p class="indent inline">
            Tapiz tridimensional con diseños de la tradición textil andina prehispánica. Elaborado con lana de ovino y tejido en telar a pedal.
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
        <!-- Reemplazar el ícono de ShoppingCart con una imagen personalizada -->
        <img 
          src="../assets/img/car.svg" 
          alt="carrito" 
          class="w-5 h-5" 
        />
        <span class="text-sm font-medium">Añadir a mi carrito de compras</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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

// Método para volver atrás en el historial del navegador
const goBack = () => {
  // Usamos window.history.back() para navegar hacia atrás
  window.history.back()
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
</style>
