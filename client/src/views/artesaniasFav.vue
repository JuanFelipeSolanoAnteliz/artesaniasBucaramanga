<template>
  <div class="min-h-screen bg-white p-4">
    
    <div class="relative w-9 h-17">
      <img 
        src="../assets/img/Rectangle.svg" 
        alt="rectangle"
        class="absolute top-0 left-0 w-10 h-15" 
      />
      <!-- Imagen de la flecha posicionada encima del rectángulo -->
      <img 
        src="../assets/img/flecha.svg" 
        alt="back"
        class="absolute top-6 left-1 w-5 h-5" 
      />
    </div>
    
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-center text-2xl font-medium">Tus artesanías</h1>
      <h2 class="text-center text-xl">favoritas</h2>
    </div>

    <!-- Categories -->
    <div class="flex justify-between mb-8 border-b pb-4">
      <button 
        v-for="category in categories" 
        :key="category.id"
        class="flex flex-col items-center gap-2"
        :class="{ 'text-primary': selectedCategory === category.id }"
        @click="selectedCategory = category.id"
      >
        <!-- Fondo gris clarito para las categorías -->
        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <component :is="category.icon" class="w-6 h-6" />
        </div>
        <span class="text-xs text-center">{{ category.name }}</span>
      </button>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div 
        v-for="product in favorites" 
        :key="product.id" 
        class="relative rounded-lg overflow-hidden bg-white shadow"
      >
        <button 
          @click="removeFromFavorites(product.id)"
          class="absolute top-2 right-2 z-10 p-1 bg-black/50 rounded-full"
        >
          <X class="w-4 h-4 text-white" />
        </button>
        
        <!-- Imagen del producto, mantiene el fondo gris clarito -->
        <img 
          :src="product.image" 
          :alt="product.name"
          class="w-full h-48 object-cover bg-gray-100"
        />
        
        <!-- Sección con el texto alineado a la izquierda y fondo negro -->
        <div class="absolute bottom-0 left-0 right-0 bg-black text-white p-3 text-left">
          <h3 class="font-medium text-sm">{{ product.name }}</h3>
          <div class="flex justify-between items-center mt-1">
            <span class="text-sm">S/.{{ product.price }}</span>
          </div>
          <p class="text-xs text-gray-300 mt-1">{{ product.artisan }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  ChevronLeft, 
  X,
  Scissors,
  Square,
  Container,
  Diamond,
  Eye
} from 'lucide-vue-next'

const selectedCategory = ref('textileria')

const categories = [
  { id: 'textileria', name: 'Textilería', icon: Square },
  { id: 'bordado', name: 'Bordado', icon: Scissors },
  { id: 'ceramica', name: 'Cerámica', icon: Container },
  { id: 'joyeria', name: 'Joyería', icon: Diamond },
  { id: 'orfebreria', name: 'Orfebrería', icon: Eye },
]

const favorites = ref([
  {
    id: 1,
    name: 'Chullo II',
    price: 250,
    artisan: 'Nación Q\'ero',
    image: '/placeholder.svg?height=300&width=300'
  },
  {
    id: 2,
    name: 'Pechera de Chompe Kené',
    price: 350,
    artisan: 'Shinan Imabo',
    image: '/placeholder.svg?height=300&width=300'
  },
  {
    id: 3,
    name: 'Cartuchera Flores I',
    price: 30,
    artisan: 'Taller Awaq Ayllus',
    image: '/placeholder.svg?height=300&width=300'
  },
  {
    id: 4,
    name: 'Tapiz Tocapu Inka I',
    price: 8500,
    artisan: 'Taller Awaq Ayllus',
    image: '/placeholder.svg?height=300&width=300'
  },
  {
    id: 5,
    name: 'Mitón de alpaca beige',
    price: 35,
    artisan: 'Asoc. Away Wanka',
    image: '/placeholder.svg?height=300&width=300'
  },
  {
    id: 6,
    name: 'Chal rectangular gris',
    price: 220,
    artisan: 'Asoc. de artesanos Pint...',
    image: '/placeholder.svg?height=300&width=300'
  }
])

const removeFromFavorites = (id) => {
  favorites.value = favorites.value.filter(product => product.id !== id)
}

const goBack = () => {
  window.history.back()
}
</script>

<style scoped>
/* Responsiveness for grid */
.grid {
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}

.text-primary {
  color: #007BFF; /* Color for selected category */
}
</style>
