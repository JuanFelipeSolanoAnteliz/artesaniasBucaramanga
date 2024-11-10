<template>
  <div class="min-h-screen bg-white p-4 flex flex-col overflow-hidden">
    
    <!-- Header con imagen y flecha -->
    <div class="relative w-9 h-17 mb-4">
      <img 
        src="../assets/img/Rectangle.svg" 
        alt="rectangle"
        class="absolute top-0 left-0 w-10 h-15" 
      />
      <img 
        src="../assets/img/flecha.svg" 
        alt="back"
        class="absolute top-6 left-1 w-5 h-5" 
      />
    </div>

    <!-- Título de la página -->
    <div class="relative mb-8">
      <img 
        src="../assets/img/RectangleA.svg" 
        alt="back"
        class="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-30 z-0" 
      />
      <div class="relative z-10 text-center">
        <h3 class="text-2xl font-medium">Talleres</h3>
        <h2 class="text-xl">educativos</h2>
      </div>
    </div>
    

    <!-- Search Bar -->
    <div class="p-4 bg-white">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar taller, por categoría o artesanos"
          class="w-full pl-10 pr-4 py-2 bg-gray-200 rounded-md text-sm text-gray-600"
        />
      </div>
    </div>

    <!-- Workshop List -->
    <div class="px-4 py-2 space-y-4">
      <!-- Workshop Card 1 -->
      <div class="bg-white rounded-lg overflow-hidden shadow flex items-stretch mb-2 w-[calc(25% - 2px)]">
        <img
          src="https://via.placeholder.com/150x150"
          alt="Bordado ayacuchano"
          class="w-[120px] h-auto object-cover"
        />
        <div class="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h2 class="font-semibold text-base">Taller de bordado ayacuchano</h2>
            <p class="text-sm text-gray-600 mt-1">Para el público en general</p>
            <p class="text-sm text-gray-600">Taller dado por los artesanos de Taller Awaq Ayllus</p>
          </div>
          <button class="mt-2 bg-gray-800 text-white text-xs px-3 py-1 rounded self-start">
            Entérate más sobre el taller aquí
          </button>
        </div>
      </div>

      <!-- Workshop Card 2 -->
      <div class="bg-white rounded-lg overflow-hidden shadow flex items-stretch mb-2 w-[calc(25% - 2px)]">
        <img
          src="https://via.placeholder.com/150x150"
          alt="Cerámica artesanal"
          class="w-[120px] h-auto object-cover"
        />
        <div class="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h2 class="font-semibold text-base">Taller de cerámica artesanal</h2>
            <p class="text-sm text-gray-600 mt-1">Para el público en general</p>
            <p class="text-sm text-gray-600">Taller dado por los artesanos de Cerámicas Tater Vera</p>
          </div>
          <button class="mt-2 bg-gray-800 text-white text-xs px-3 py-1 rounded self-start">
            Entérate más sobre el taller aquí
          </button>
        </div>
      </div>

      <!-- Workshop Card 3 -->
      <div class="bg-white rounded-lg overflow-hidden shadow flex items-stretch mb-2 w-[calc(25% - 2px)]">
        <img
          src="https://via.placeholder.com/150x150"
          alt="Alfarería infantil"
          class="w-[120px] h-auto object-cover"
        />
        <div class="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h2 class="font-semibold text-base">Taller de alfarería infantil</h2>
            <p class="text-sm text-gray-600 mt-1">Para niños de 4 a 12 años</p>
            <p class="text-sm text-gray-600">Taller dado por la artesana María Santos Minchán</p>
          </div>
          <button class="mt-2 bg-gray-800 text-white text-xs px-3 py-1 rounded self-start">
            Entérate más sobre el taller aquí
          </button>
        </div>
      </div>

      <!-- Workshop Card 4 -->
      <div class="bg-white rounded-lg overflow-hidden shadow flex items-stretch mb-2 w-[calc(25% - 2px)]">
        <img
          src="https://via.placeholder.com/150x150"
          alt="Pintura tradicional"
          class="w-[120px] h-auto object-cover"
        />
        <div class="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h2 class="font-semibold text-base">Taller de pintura tradicional</h2>
            <p class="text-sm text-gray-600 mt-1">Para adultos mayores</p>
            <p class="text-sm text-gray-600">Taller dado por los artesanos Roldán y Harry Pinedo</p>
          </div>
          <button class="mt-2 bg-gray-800 text-white text-xs px-3 py-1 rounded self-start">
            Entérate más sobre el taller aquí
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeft, Search } from 'lucide-vue-next'

const goBack = () => {
  // Add your navigation logic here
  console.log('Go back clicked')
}
</script>
