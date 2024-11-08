<template>
  <div class="min-h-screen bg-white p-4 flex flex-col overflow-hidden">
    
    <!-- Header con imagen y flecha -->
    <div class="relative w-9 h-17">
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
        <h3 class="text-2xl font-medium">Compras</h3>
        <h2 class="text-xl">realizadas</h2>
      </div>
    </div>
    
    <!-- Purchased Items -->
    <div class="flex-1 p-4 mb-4"> <!-- Añadido margen para separar de la sección de productos -->
      <!-- Item Card 1 -->
      <div class="bg-gray-100 rounded-lg p-3 flex mb-4 h-28"> <!-- Reducido tamaño con h-28 -->
        <img src="../assets/placeholder.svg?height=60&width=60" alt="Vasija" class="w-16 h-16 object-cover rounded-lg" /> <!-- Reducción de tamaño de imagen -->
        <div class="flex-1 ml-3 flex flex-col">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-left text-base font-medium text-sm">Vasija pequeña con diseño de flor</p>
              <p class="text-left text-base font-medium text-xs text-gray-500">13x10 cm, 2 KG</p>
              <p class="text-left text-base font-medium text-xs text-gray-500">Asoc. de artesanos productores de Chazuta</p>
            </div>
            <img 
              src="../assets/img/comentario.svg" 
              alt="comentario"
              class="h-5 w-5 text-gray-500"
            />
          </div>
          <div class="flex flex-col items-start mt-2 flex-grow">
            <button class="text-left font-medium bg-black text-white text-xs py-1.5 px-3 rounded-full ml-0 mt-auto">
              Ver seguimiento del producto
            </button>
          </div>
        </div>
      </div>

      <!-- Item Card 2 -->
      <div class="bg-gray-100 rounded-lg p-3 flex h-28"> <!-- Reducido tamaño con h-28 -->
        <img src="../assets/placeholder.svg?height=60&width=60" alt="Bolso" class="w-16 h-16 object-cover rounded-lg" /> <!-- Reducción de tamaño de imagen -->
        <div class="flex-1 ml-3 flex flex-col">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-left text-base font-medium ml-1.5 text-sm">Bolso negro con diseño de flores</p>
              <p class="text-left text-base font-medium ml-1.5 text-xs text-gray-500">40x40 cm</p>
              <p class="text-left text-base font-medium ml-1.5 text-xs text-gray-500">Asoc. Pequeña Roma</p>
            </div>
            <img 
              src="../assets/img/comentario.svg" 
              alt="comentario"
              class="h-5 w-5 text-gray-500"
            />
          </div>
          <div class="flex flex-col items-start mt-2 flex-grow">
            <button class="text-left font-medium bg-black text-white text-xs py-1.5 px-3 rounded-full ml-0 mt-auto">
              Ver seguimiento del producto
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- More Products Section with Scroll -->
    <div class="p-4 overflow-y-auto max-h-80">
      <h2 class="text-left text-base font-medium ml-1.5 mb-3">Sigue viendo más artesanías</h2>
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
/* Contenedor principal sin desbordes */
.min-h-screen {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Hace que el contenedor principal ocupe el 100% de la altura de la pantalla */
  overflow: hidden; /* Evita el scroll global */
}

/* Flex para que los elementos crezcan y ocupen espacio disponible */
.flex-1 {
  flex: 1;
  margin-bottom: 16px; /* Espacio para evitar que se desborden y se vean demasiado juntos */
}

/* Estilo para la sección de productos */
.grid {
  grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  grid-template-rows: repeat(4, auto); /* 4 filas de productos */
}

.relative {
  position: relative;
}

/* Estilo para la imagen */
img {
  object-fit: cover;
}

/* Estilo para el contenedor del botón y la descripción del producto */
.bg-black {
  background-color: rgba(0, 0, 0, 0.6); /* Si Tailwind no lo resuelve, usa la propiedad directamente */
}

.bg-opacity-60 {
  opacity: 0.6;
}

.text-white {
  color: white;
}

.text-xs {
  font-size: 0.75rem;
}

.ml-0 {
  margin-left: 0 !important;
}

.mt-2 {
  margin-top: 0.5rem !important;
}

/* Scroll solo en la sección de más productos */
.max-h-80 {
  max-height: 20rem; /* Limita la altura de la sección de artesanías a 20rem (puedes ajustar este valor) */
}

.overflow-y-auto {
  overflow-y: auto; /* Agrega scroll solo en el eje Y */
}
</style>
