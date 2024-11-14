<template>
  <div class="min-h-screen bg-white">
    <!-- Header with diamond background -->
    <div class="relative py-4">
      <!-- Back button with diamond background -->
      <div class="triangle"></div>

      <div class="absolute top-5 left-[3px] mt-4"> <!-- Move left more with negative value -->
        <img 
          src="../assets/img/flechaB.svg" 
          alt="Volver"
          class="w-4 h-4" 
        />
      </div>

      <!-- Title with diamond background -->
      <div class="relative text-center">
        <img 
          src="../assets/img/RectangleA.svg" 
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
        <!-- Imagen de búsqueda en lugar de icono de Search -->
        <img 
          src="../assets/img/search.svg" 
          alt="Buscar"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
        />
        <input
          type="text"
          placeholder="Buscar taller, por categoría o artesanos"
          class="w-full pl-10 pr-4 py-2 bg-[#D9D9D9] rounded-md text-sm text-gray-600"
        />
      </div>
    </div>

    <!-- Workshop List with Scroll -->
    <div class="px-4 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      <!-- Workshop Card 1 -->
      <div class="bg-white rounded-lg overflow-hidden shadow flex h-[120px]">
        <img
          src="https://via.placeholder.com/150x150"
          alt="Bordado ayacuchano"
          class="w-[150px] h-[150px] object-cover"
        />
        <div class="p-2 flex-1 flex flex-col justify-between">
          <div>
            <h2 class="text-left text-sm font-semibold leading-tight">Taller de bordado ayacuchano</h2>
            <p class="text-left text-xs text-gray-600 mt-0.5">Para el público en general</p>
            <p class="text-left text-xs text-gray-600">Taller dado por los artesanos de Taller Awaq Ayllus</p>
          </div>
          <button class="mt-1 bg-gray-800 text-white text-xs px-2 py-0.5 rounded self-start">
            Entérate más sobre el taller aquí
          </button>
        </div>
      </div>

      <!-- Workshop Card 2 -->
      <div class="bg-white rounded-lg overflow-hidden shadow flex h-[120px]">
        <img
          src="https://via.placeholder.com/150x150"
          alt="Cerámica artesanal"
          class="w-[150px] h-[150px] object-cover"
        />
        <div class="p-2 flex-1 flex flex-col justify-between">
          <div>
            <h2 class="text-left text-sm font-semibold leading-tight">Taller de cerámica artesanal</h2>
            <p class="text-left text-xs text-gray-600 mt-0.5">Para el público en general</p>
            <p class="text-left text-xs text-gray-600">Taller dado por los artesanos de Cerámicas Tater Vera</p>
          </div>
          <button class="mt-1 bg-gray-800 text-white text-xs px-2 py-0.5 rounded self-start">
            Entérate más sobre el taller aquí
          </button>
        </div>
      </div>

      <!-- Workshop Card 3 -->
      <div class="bg-white rounded-lg overflow-hidden shadow flex h-[120px]">
        <img
          src="https://via.placeholder.com/150x150"
          alt="Alfarería infantil"
          class="w-[150px] h-[150px] object-cover"
        />
        <div class="p-2 flex-1 flex flex-col justify-between">
          <div>
            <h2 class="text-left text-sm font-semibold leading-tight">Taller de alfarería infantil</h2>
            <p class="text-left text-xs text-gray-600 mt-0.5">Para niños de 4 a 12 años</p>
            <p class="text-left text-xs text-gray-600">Taller dado por la artesana María Santos Minchán</p>
          </div>
          <button class="mt-1 bg-gray-800 text-white text-xs px-2 py-0.5 rounded self-start">
            Entérate más sobre el taller aquí
          </button>
        </div>
      </div>

      <!-- Workshop Card 4 -->
      <div class="bg-white rounded-lg overflow-hidden shadow flex h-[120px]">
        <img
          src="https://via.placeholder.com/150x150"
          alt="Pintura tradicional"
          class="w-[150px] h-[150px] object-cover"
        />
        <div class="p-2 flex-1 flex flex-col justify-between">
          <div>
            <h2 class="text-left text-sm font-semibold leading-tight">Taller de pintura tradicional</h2>
            <p class="text-left text-xs text-gray-600 mt-0.5">Para adultos mayores</p>
            <p class="text-left text-xs text-gray-600">Taller dado por los artesanos Roldán y Harry Pinedo</p>
          </div>
          <button class="mt-1 bg-gray-800 text-white text-xs px-2 py-0.5 rounded self-start">
            Entérate más sobre el taller aquí
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeft } from 'lucide-vue-next'

const goBack = () => {
  // Add your navigation logic here
  console.log('Go back clicked')
}
</script>

<style scoped>
.triangle {
  position: absolute;
  top: 1;
  left: 0;
  width: 0;
  height: 0;
  border-left: 32px solid #D9D9D9; /* Color gris más oscuro */
  border-bottom: 30px solid transparent;
  border-top: 28px solid transparent;
}
</style>
