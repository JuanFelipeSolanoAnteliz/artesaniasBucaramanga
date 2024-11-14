<template>
  <div class="min-h-screen bg-white">
    <div class="relative bg-black">
      <button class="absolute top-0 left-0 z-10" @click="goBack">
        <div class="relative w-9 h-17">
          <img 
            src="../assets/img/Rectangle.svg" 
            alt="rectangle"
            class="w-full h-full object-cover" 
          />
          <img 
            src="../assets/img/flecha.svg" 
            alt="back"
            class="absolute top-6 left-1 w-5 h-5" 
          />
        </div>
      </button>
    
      <!-- Imagen de producto -->
      <img 
        src="https://via.placeholder.com/200x400"
        alt="Tapiz Chumpi Andino III"
        class="w-full h-[290px] object-cover"
      />

      <!-- Crazy image with discount badge -->
      <div class="absolute bottom-14 left-3 z-20">
        <div class="relative">
          <img 
            src="../assets/img/crazy.svg" 
            alt="crazy"
            class="w-12 h-13" 
          />
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class=" text-white text-sm font-medium px-3 py-1 rounded-full">
              -35%
            </div>
          </div>
        </div>
      </div>

      <!-- Title overlay -->
      <div class="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2">
        <img 
          src="../assets/img/RectangleS.svg" 
          alt="rentangleS"
          class="absolute top-0 left-0 w-5 h-15" 
        />
        <h1 class="text-left text-white text-lg font-normal ml-3">Chalina beige con flecos</h1>
      </div>
    </div>

    <!-- Product details section -->
    <div class="p-4 space-y-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="text-gray-400 line-through text-sm ml-1.5">S/.100</span>
          <span class="text-2xl font-semibold">S/.65</span>
        </div>
        
        <button class="p-2" @click="toggleFavorite">
          <img 
            :src="isFavorite ? corazonLleno : corazonVacio"
            alt="corazon" 
            class="w-10 h-10"
          />
        </button>
      </div>

      <div class="space-y-3">
        <h2 class="text-left text-base font-medium ml-1.5">Asociación de artesanos Tinkuy</h2>
        
         <div class="flex items-center space-x-2"> 
          <h3 class="text-left text-base font-medium ml-1.5">Dimensiones:</h3>
          <p class="text-gray-600">18 x 200 cm</p>
        </div>

        <div class="text-gray-600 text-base text-justify leading-relaxed ml-1.5">
          <span class="font-medium">Descripción:</span>
          <p class="indent inline">
            Tapiz tridimensional con diseños de la tradición textil andina prehispánica. Elaborado con lana de ovino y tejido en telar a pedal.
          </p>
        </div>

        <div class="flex items-center gap-2 text-gray-600 pt-2">
          <img 
            src="../assets/img/check.svg"
            alt="check"
            class="ml-1.5 w-5 h-5" />
          <span class="text-sm">Cuenta con envío hacia tu ubicación</span>
        </div>
      </div>

      <!-- Add to cart button -->
      <button 
        class="bg-[#D9D9D9] text-gray-900 py-3 px-4 rounded-lg flex items-center justify-center gap-2 mt-6 ml-1"
        @click="addToCart"
      >
        <img 
          src="../assets/img/car.svg" 
          alt="carrito" 
          class="text-left text-base font-medium ml-[-12px] w-5 h-5" 
        />
        <span class="text-sm font-medium">Añadir a mi carrito de compras</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import corazonLleno from '../assets/img/corazonLleno.svg'
import corazonVacio from '../assets/img/corazonVacio.svg'

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const addToCart = () => {
  console.log('Añadido al carrito')
}

const goBack = () => {
  window.history.back()
}
</script>

<style scoped>
.indent {
  text-indent: 1em;
  margin-top: 0;
}
.inline {
  display: inline;
}
</style>