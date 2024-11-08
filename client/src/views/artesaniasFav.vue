<template>
  <div class="min-h-screen bg-white p-4">
    
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

    <div class="relative mb-8">
      <img 
        src="../assets/img/RectangleA.svg" 
        alt="back"
        class="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-30 z-0" 
      />
      <div class="relative z-10 text-center">
        <h3 class="text-2xl font-medium">Tus artesanías</h3>
        <h2 class="text-xl">favoritas</h2>
      </div>
    </div>

    <!-- Scrollable Categories with Independent Line -->
    <div class="relative mb-8 pb-4">
      <div class="relative overflow-hidden">
        <!-- Contenedor de categorías que se desplaza -->
        <div 
          class="flex items-center space-x-8 overflow-x-auto"
          ref="categoriesWrapper"
          style="scroll-behavior: smooth;"
        >
          <button 
            v-for="(category, index) in categories" 
            :key="category.id"
            class="flex flex-col items-center gap-3 relative flex-shrink-0 category-button"
            @click="scrollToCategory(index)"
          >
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <img :src="category.icon" alt="category icon" class="w-8 h-8" />
            </div>
            <span class="text-xs text-center">{{ category.name }}</span>
          </button>
        </div>
        
        <!-- Barra negra de desplazamiento -->
        <div 
          class="h-[3px] bg-black mt-1 absolute bottom-0 left-0 w-full"
          ref="scrollBar"
          @mousedown="startDrag"
          :style="{ left: `${scrollBarPosition}px` }"
        ></div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
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
        
        <img 
          :src="product.image" 
          :alt="product.name"
          class="w-full h-48 object-cover bg-gray-100"
        />
        
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { X } from 'lucide-vue-next'

// Importación de imágenes
import textIcon from '../assets/img/text.svg'
import bordadoIcon from '../assets/img/bordado.svg'
import ceramicaIcon from '../assets/img/ceramica.svg'
import joyeriaIcon from '../assets/img/joyeria.svg'
import orfebreriaIcon from '../assets/img/orfebreria.svg'

const categories = [
  { id: 'textileria', name: 'Textilería', icon: textIcon },
  { id: 'bordado', name: 'Bordado', icon: bordadoIcon },
  { id: 'ceramica', name: 'Cerámica', icon: ceramicaIcon },
  { id: 'joyeria', name: 'Joyería', icon: joyeriaIcon },
  { id: 'orfebreria', name: 'Orfebrería', icon: orfebreriaIcon },
]

const favorites = ref([
  { id: 1, name: 'Chullo II', price: 250, artisan: 'Nación Q\'ero', image: '/placeholder.svg?height=300&width=300' },
  { id: 2, name: 'Pechera de Chompe Kené', price: 350, artisan: 'Shinan Imabo', image: '/placeholder.svg?height=300&width=300' },
  { id: 3, name: 'Cartuchera Flores I', price: 30, artisan: 'Taller Awaq Ayllus', image: '/placeholder.svg?height=300&width=300' },
  { id: 4, name: 'Tapiz Tocapu Inka I', price: 8500, artisan: 'Taller Awaq Ayllus', image: '/placeholder.svg?height=300&width=300' },
  { id: 5, name: 'Mitón de alpaca beige', price: 35, artisan: 'Asoc. Away Wanka', image: '/placeholder.svg?height=300&width=300' },
  { id: 6, name: 'Chal rectangular gris', price: 220, artisan: 'Asoc. de artesanos Pint...', image: '/placeholder.svg?height=300&width=300' }
])

const removeFromFavorites = (id) => {
  favorites.value = favorites.value.filter(product => product.id !== id)
}

// Variables para manejar el drag
let isDragging = false
let initialX = 0
let scrollLeft = 0
let scrollBarPosition = 0 // Posición de la barra de desplazamiento

const categoriesWrapper = ref(null)
const scrollBar = ref(null)

const startDrag = (e) => {
  e.preventDefault() // Prevenir que el clic realice el comportamiento por defecto

  isDragging = true
  initialX = e.clientX
  scrollLeft = categoriesWrapper.value.scrollLeft

  // Escuchar el movimiento y la liberación del mouse
  document.addEventListener('mousemove', drag)
  document.addEventListener('mouseup', stopDrag)
}

const drag = (e) => {
  if (!isDragging) return

  // Movimiento horizontal del mouse
  const x = e.clientX
  const walk = (x - initialX) // Calcular el desplazamiento horizontal

  // Sincronizar el movimiento de la barra
  scrollBarPosition = Math.max(0, Math.min(categoriesWrapper.value.scrollWidth - scrollBar.value.offsetWidth, scrollBarPosition + walk))

  // Mover el contenedor de las categorías
  categoriesWrapper.value.scrollLeft = scrollLeft + walk
}

const stopDrag = () => {
  isDragging = false
  // Eliminar los event listeners para el mouse
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDrag)
}

// Función para mover el contenedor a la categoría seleccionada
const scrollToCategory = (index) => {
  const categoriesWrapper = document.querySelector('[ref="categoriesWrapper"]')
  const categoryButton = categoriesWrapper.children[index]
  const categoryOffsetLeft = categoryButton.offsetLeft

  categoriesWrapper.scrollTo({
    left: categoryOffsetLeft, // Desplazarse a la categoría seleccionada
    behavior: 'smooth' // Desplazamiento suave
  })
}

onMounted(() => {
  // Inicializar la posición de la barra de desplazamiento
  scrollBarPosition = 0
})

onBeforeUnmount(() => {
  // Limpiar listeners al desmontar el componente
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDrag)
})

</script>

<style scoped>
/* Responsiveness for grid */
.grid {
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}

/* Estilo para el contenedor scrollable */
.overflow-x-auto {
  white-space: nowrap;
  position: relative;
}

.category-button {
  cursor: pointer;
  user-select: none;
}
</style>
