<template>
  <div class="min-h-screen bg-white p-4 relative overflow-hidden">
    <div class="triangle"></div>

    <div @click="goBack" class="absolute top-5 left-[3px] mt-4">
      <img 
        src="../assets/img/flechaB.svg" 
        alt="Volver"
        class="w-4 h-4" 
      />
    </div>

    <div class="relative mb-8">
      <img 
        src="../assets/img/RectangleA.svg" 
        alt="back"
        class="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-30 z-0" 
      />
      <div class="relative z-10 text-center">
        <h3 class="text-2xl font-medium">Tus artesanías</h3>
        <h2 class="text-xl">favoritas</h2>
      </div>
    </div>

    <!-- Categorías -->
    <div class="relative mb-8 pb-4">
      <div class="relative overflow-hidden">
        <div 
          class="flex items-center space-x-8 overflow-x-auto"
          ref="categoriesWrapper"
          style="scroll-behavior: smooth;"
        >
          <button 
            v-for="(category, index) in categories" 
            :key="category.id"
            class="flex flex-col items-center gap-3 relative flex-shrink-0 category-button"
            @click="selectCategory(category.id, index)"
          >
            <div class="w-16 h-16 bg-[#D9D9D9] rounded-full flex items-center justify-center">
              <img :src="category.icon" alt="category icon" class="w-8 h-8" />
            </div>
            <span class="text-xs text-center">{{ category.name }}</span>
          </button>
        </div>

        <div 
          class="h-[3px] bg-black mt-1 absolute bottom-0 left-0 w-full"
          ref="scrollBar"
          @mousedown="startDrag"
          :style="{ left: `${scrollBarPosition}px` }"
        ></div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>

    <!-- Empty State Message -->
    <div 
      v-else-if="!loading && (!favorites || favorites.length === 0)" 
      class="flex flex-col items-center justify-center h-40 bg-gray-50 rounded-lg p-4"
    >
      <div class="text-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-12 w-12 mx-auto mb-2 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
        <p class="text-gray-600 font-medium">No hay productos favoritos</p>
        <p class="text-gray-400 text-sm mt-1">
          No se encontraron artesanías en la categoría {{ selectedCategoryName }}
        </p>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-else class="overflow-y-auto mt-8 max-h-[calc(100vh-250px)]">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        <div 
          v-for="product in favorites" 
          :key="product._id" 
          class="relative rounded-lg overflow-hidden bg-white shadow"
        >
          <button 
            @click="removeFromFavorites(product._id)"
            class="absolute top-2 right-2 z-10 p-1 rounded-full"
          >
            <img src="../assets/img/x.svg" alt="Eliminar" class="w-4 h-4 text-white" />
          </button>

          <img 
            :src="product.fotos[0]" 
            :alt="product.nombre"
            class="w-full h-48 object-cover bg-gray-100"
            @error="e => e.target.src = '/placeholder.svg?height=300&width=300'"
          />

          <div class="absolute bottom-0 left-0 right-0 bg-black text-white p-3 text-left">
            <h3 class="font-medium text-sm">{{ product.nombre }}</h3>
            <div class="flex justify-between items-center mt-1">
              <span class="text-sm">S/.{{ product.precio }}</span>
              <span v-if="product.descuento" class="text-xs text-red-400">-{{ product.descuento }}%</span>
            </div>
            <p class="text-xs text-gray-300 mt-1">{{ product.artesanoId }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

// Router
const router = useRouter();

// Estados
const favorites = ref([]);
const loading = ref(false);
const categoriesWrapper = ref(null);
const scrollBar = ref(null);
const scrollBarPosition = ref(0);
const selectedCategory = ref('');
const selectedCategoryName = ref('');

// Imports de imágenes
import joyeriaIcon from '../assets/img/joyeria.svg'
import textileria from "../assets/img/textileria2.svg";
import orfebreria from "../assets/img/goldsmithCategory.svg";
import tallaPiedra from "../assets/img/stoneWorkshopCategory.svg";
import tallaMadera from "../assets/img/woodWorkshopCategory.svg";
import estampado from "../assets/img/stampedCategory.svg";
import bordado from "../assets/img/embroideryCategory.svg";
import ceramica from "../assets/img/ceramicCategory.svg";
import Hojalateria from "../assets/img/sheetMetalCategory.svg";
import pinturaTradicional from "../assets/img/paintingTraditionalCategory.svg";

// Categorías
const categories = [
  { id: 'Textileria', name: 'Textilería', icon: textileria },
  { id: 'Bordado', name: 'Bordado', icon: bordado },
  { id: 'Ceramica', name: 'Cerámica', icon: ceramica },
  { id: 'Joyeria', name: 'Joyería', icon: joyeriaIcon },
  { id: 'Talla_piedra', name: 'Talla en piedra', icon: tallaPiedra },
  { id: 'Talla_madera', name: 'Talla en madera', icon: tallaMadera },
  { id: 'Orfebreria', name: 'Orfebrería', icon: orfebreria },
  { id: 'Estampado', name: 'Estampado', icon: estampado },
  { id: 'Hojalateria',name: 'Hojalateria', icon: Hojalateria },
  { id: 'Pintura tradicional', name: 'Pintura tradicional',icon: pinturaTradicional }
]

// Fetch de favoritos
const fetchFavorites = async (category) => {
  loading.value = true;
  // Limpiar favoritos anteriores antes de cargar nuevos
  favorites.value = [];
  
  try {
    const response = await fetch(`http://localhost:5001/products/getFavs/${category}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      }
    });

    if (response.ok) {
      const data = await response.json();
      favorites.value = data.data || []; // Asegurarse de que siempre sea un array
    }
  } catch (err) {
    console.error('Error fetching favorites:', err);
    favorites.value = []; // En caso de error, asegurarse de que favorites esté vacío
  } finally {
    loading.value = false;
  }
};

// Función para remover de favoritos
const removeFromFavorites = async (productId) => {
  try {
    const response = await fetch(`http://localhost:5001/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      }
    });

    if (response.ok) {
      favorites.value = favorites.value.filter(product => product._id !== productId);
      console.log('Producto eliminado de favoritos exitosamente');
      
      // Si después de eliminar no quedan productos, recargar la categoría
      if (favorites.value.length === 0) {
        await fetchFavorites(selectedCategory.value);
      }
    } else {
      console.error('Error al eliminar de favoritos');
    }
  } catch (err) {
    console.error('Error:', err);
  }
};

// Funciones de navegación
const goBack = () => {
  router.back();
};

const selectCategory = async (categoryId, index) => {
  selectedCategory.value = categoryId;
  const category = categories.find(cat => cat.id === categoryId);
  selectedCategoryName.value = category ? category.name : '';
  scrollToCategory(index);
  await fetchFavorites(categoryId);
};

const scrollToCategory = (index) => {
  const categoryButton = categoriesWrapper.value?.children[index];
  if (categoryButton) {
    categoryButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
};

// Drag scroll
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

const startDrag = (e) => {
  isDragging = true;
  startX = e.pageX - scrollBarPosition.value;
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
};

const drag = (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - startX;
  scrollBarPosition.value = Math.max(0, Math.min(x, categoriesWrapper.value.scrollWidth - scrollBar.value.offsetWidth));
};

const stopDrag = () => {
  isDragging = false;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
};

// Al montar el componente
onMounted(() => {
  if (categories.length > 0) {
    selectCategory(categories[0].id, 0);
  }
});
</script>

<style scoped>
.triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 32px solid #D9D9D9;
  border-bottom: 30px solid transparent;
  border-top: 28px solid transparent;
}

.category-button {
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
}

.category-button:hover {
  transform: scale(1.05);
}

.overflow-x-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>