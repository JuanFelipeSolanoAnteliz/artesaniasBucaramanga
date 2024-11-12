<template>
  <div class="min-h-screen bg-white p-4 flex flex-col">
    <!-- Header con flecha -->
    <!-- Triángulo -->
    <div class="triangle"></div>

    <!-- Flecha (debe estar encima del triángulo) -->
    <div class="absolute top-1 left-[3px] mt-4 z-20">
      <img 
        src="../assets/img/flechaB.svg" 
        alt="Volver"
        class="w-4 h-4" 
      />
    </div>

    <!-- Título de la página -->
    <div class="relative mb-4">
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
    <div class="flex-1 p-2 mb-4">
      <!-- Item Card 1 -->
      <div class="bg-gray-100 rounded-lg p-3 flex mb-2 h-36 w-full"> 
        <img src="../assets/placeholder.svg?height=60&width=60" alt="Vasija" class="w-16 h-16 object-cover rounded-lg" />
        <div class="flex-1 ml-3 flex flex-col justify-between">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-left text-base font-medium ml-1.5 text-sm">Vasija pequeña con diseño de flor</p>
              <p class="text-left text-base font-medium ml-1.5 text-xs text-gray-500">S/.50</p>
              <p class="text-left text-base font-medium ml-1.5 text-xs text-gray-500">40x40 cm</p>
              <p class="text-left text-base font-medium ml-1.5 text-xs text-gray-500">Asoc. Pequeña Roma</p>
            </div>
            <img 
              src="../assets/img/comentario.svg" 
              alt="comentario"
              class="h-5 w-5 text-gray-500"
            />
          </div>
          <div class="flex flex-col items-start mt-1">
            <button class="text-left font-medium bg-black text-white text-xs py-1 px-3 rounded-full ml-0">
              Ver seguimiento del producto
            </button>
          </div>
        </div>
      </div>
   
      <!-- Item Card 2 -->
      <div class="bg-gray-100 rounded-lg p-3 flex mb-2 h-36 w-full"> 
        <img src="../assets/placeholder.svg?height=60&width=60" alt="Bolso" class="w-16 h-16 object-cover rounded-lg" />
        <div class="flex-1 ml-3 flex flex-col justify-between">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-left text-base font-medium ml-1.5 text-sm">Bolso negro con diseño de flores</p>
              <p class="text-left text-base font-medium ml-1.5 text-xs text-gray-500">S/.50</p>
              <p class="text-left text-base font-medium ml-1.5 text-xs text-gray-500">40x40 cm</p>
              <p class="text-left text-base font-medium ml-1.5 text-xs text-gray-500">Asoc. Pequeña Roma</p>
            </div>
            <img 
              src="../assets/img/comentario.svg" 
              alt="comentario"
              class="h-5 w-5 text-gray-500"
            />
          </div>
          <div class="flex flex-col items-start mt-1">
            <button class="text-left font-medium bg-black text-white text-xs py-1 px-3 rounded-full ml-0">
              Ver seguimiento del producto
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Título "Sigue viendo más artesanías" ajustado más arriba -->
    <h2 class="text-left text-base font-medium ml-1.5 mt-2 mb-1">Sigue viendo más artesanías</h2>

    <!-- More Products Section with Scroll -->
    <div class="p-4 overflow-y-auto max-h-80 flex-1">
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(item, index) in moreProducts" :key="index" class="relative">
          <img :src="`@/assets/${item.image}`" :alt="item.name" class="w-full h-40 object-cover rounded-lg" />
          <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 rounded-b-lg">
            <p class="text-white text-xs">{{ item.name }}</p>
            <p class="text-white text-xs opacity-75">{{ item.artist }}</p>
            <p class="text-white text-xs opacity-90">{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, MessageSquareIcon } from 'lucide-vue-next'

const moreProducts = [
  {
    name: 'Tapiz Chumpi Andino III',
    artist: 'Taller Amay Aqllas',
    image: 'placeholder.svg?height=160&width=160',
    price: 'S/. 45.00'
  },
  {
    name: 'Pechera de Chompe René',
    artist: 'Sharon Imako',
    image: 'placeholder.svg?height=160&width=160',
    price: 'S/. 30.00'
  },
  {
    name: 'Producto 3',
    artist: 'Artista 3',
    image: 'placeholder.svg?height=160&width=160',
    price: 'S/. 50.00'
  },
  {
    name: 'Producto 4',
    artist: 'Artista 4',
    image: 'placeholder.svg?height=160&width=160',
    price: 'S/. 60.00'
  },
  {
    name: 'Producto 5',
    artist: 'Artista 5',
    image: 'placeholder.svg?height=160&width=160',
    price: 'S/. 70.00'
  },
  {
    name: 'Producto 6',
    artist: 'Artista 6',
    image: 'placeholder.svg?height=160&width=160',
    price: 'S/. 80.00'
  }
]
</script>

<style scoped>
/* Definición única del triángulo */
.triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 32px solid #D9D9D9; /* Color gris más oscuro */
  border-bottom: 30px solid transparent;
  border-top: 28px solid transparent;
  z-index: 10; /* Aseguramos que el triángulo esté debajo de la flecha */
}

/* Ajustes en los cuadros de productos */
.bg-gray-100 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 9rem; /* Aumento la altura a 9rem (h-36) */
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

.max-h-80 {
  max-height: 20rem;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>
