<template>
    <div class="min-h-screen bg-white">
      <!-- Back button and image section -->
      <div class="relative bg-black">
        <button class="absolute top-4 left-4 z-10 p-2 bg-black/50 rounded-lg" @click="goBack">
          <ChevronLeft class="w-6 h-6 text-white" />
        </button>
        <img 
+          alt="Tapiz Chumpi Andino III"
          class="w-full h-[400px] object-cover"
        />
        <!-- Title overlay -->
        <div class="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
          <h1 class="text-white text-xl font-medium">Tapiz Chumpi Andino III</h1>
        </div>
      </div>
  
      <!-- Product details section -->
      <div class="p-6 space-y-6">
        <div class="flex justify-between items-start">
          <div class="text-3xl font-bold">S/.600</div>
          <button class="p-2" @click="toggleFavorite">
            <Heart :class="['w-8 h-8', isFavorite ? 'fill-current text-red-500' : 'text-black']" />
          </button>
        </div>
  
        <div class="space-y-4">
          <h2 class="text-xl font-medium">Taller Awaq Ayllus</h2>
          
          <div>
            <h3 class="text-lg font-medium">Dimensiones:</h3>
            <p>60 x 80 cm</p>
          </div>
  
          <div>
            <h3 class="text-lg font-medium">Descripción:</h3>
            <p class="text-gray-600">
              Tapiz tridimensional con diseños de la tradición textil andina prehispánica.
              Elaborado con lana de ovino y tejido en telar a pedal.
            </p>
          </div>
  
          <div class="flex items-center gap-2 text-gray-600">
            <Truck class="w-5 h-5" />
            <span>Cuenta con envío hacia tu ubicación</span>
          </div>
        </div>
  
        <!-- Add to cart button -->
        <button 
          class="w-full bg-gray-200 hover:bg-gray-300 text-black py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
          @click="addToCart"
        >
          <ShoppingCart class="w-5 h-5" />
          <span>Añadir a mi carrito de compras</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Heart, Truck, ShoppingCart, ChevronLeft } from 'lucide-vue-next'
  
  const isFavorite = ref(false)
  
  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value
  }
  
  const addToCart = () => {
    // Add to cart logic here
    console.log('Added to cart')
  }
  
  const goBack = () => {
    window.history.back()
  }
  </script>