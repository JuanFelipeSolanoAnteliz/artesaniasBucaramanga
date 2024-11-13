<template>
  <div class="min-h-screen bg-white text-white bellota-font">
    <!-- Main Header -->
    <header v-if="!selectedCategory" class="fixed top-0 w-full bg-gray-900 z-50">
      <div class="flex items-center p-4 bg-black">
        <button @click="toggleDrawer" class="p-2">
          <MenuIcon class="h-6 w-6" />
        </button>
        <div class="flex-1 mx-4">
          <div class="relative">
            <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar productos o tienda..."
              class="w-full bg-[#3D3D3D] rounded-10 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
        </div>
      </div>
    </header>

    <!-- Side Drawer -->
    <div
      v-if="isDrawerOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50"
      @click="toggleDrawer"
    ></div>
    
    <div
      class="fixed top-0 left-0 h-full w-64 bg-black transform transition-transform duration-300 ease-in-out z-50"
      :class="isDrawerOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="p-4">
        <div class="flex items-center space-x-3 mb-6">
          <img
            src="../assets/img/perfile.png"
            alt="Profile"
            class="w-12 h-12 rounded-full"
          />
          <div>
            <h3 class="font-semibold">SaraMartin9</h3>
          </div>
        </div>

        <nav class="space-y-4">
          <a 
            v-for="(item, index) in menuItems" 
            :key="index" 
            @click="item.onClick" 
            class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
            <!-- Render icon dynamically -->
            <component :is="item.icon" class="bg-[#3D3D3D] h-7 w-7 rounded-full p-1" />
            <span>{{ item.label }}</span>
          </a>
        </nav>

        <div class="absolute bottom-4 left-4 right-4">
          <p class="text-xs text-gray-500">Aplicación patrocinada por</p>
          <img
            src="../assets/img/campuslands.png"
            alt="Sponsor"
            class="h-8 mt-2"
          />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main :class="{'pt-20': !selectedCategory, 'pt-4': selectedCategory}" class="pb-16">
      <div class="">
        <div v-if="!selectedCategory" class="flex items-center space-x-2 mb-4 bg-[#D9D9D9] p-4">
          <MapPinIcon class="h-5 w-5 text-gray-600" />
          <span class="text-sm text-gray-400 text-gray">Ubicación de entrega actual</span>
        </div>

        <!-- Conditional rendering for the image or back button -->
        <div v-if="!selectedCategory" class="mb-4">
          <img src="../assets/img/categorias1.png" alt="Categorías" class="">
        </div>
        <div v-else class="flex justify-between justify-center relative">
          <img @click="goTotallres" class="relative top-[-10px]" src="../assets/img/back.png" alt="Back">
          <img src="../assets/img/titleCategorias.png" class="mr-36" alt="Categorías">
        </div>

        <!-- Categories and HR -->
        <div>
          <div 
            :class="{
              'grid grid-cols-5 gap-1': !selectedCategory,
              'grid grid-cols-10 gap-4 overflow-x-auto': selectedCategory
            }"
            class="text-black px-4"
          >
            <div v-for="(category, index) in categories" :key="index"
                 @click="selectCategory(category.nombre)"
                 class="flex flex-col items-center text-center cursor-pointer gap-5"
                 :class="{'opacity-100': selectedCategory === category.nombre, 'opacity-60': selectedCategory && selectedCategory !== category.nombre}">
              <div class="w-10 h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <img
                  :src="category.imagen"
                  :alt="category.nombre"
                  class="w-6 h-6"
                />
              </div>
              <span class="text-xs mt-1">{{ category.nombre }}</span>
            </div>
          </div>
          
          <!-- Horizontal line when a category is selected -->
          <hr v-if="selectedCategory" class="bg-black h-1 ">
        </div>

        <!-- Products Section -->
        <div v-if="selectedCategory" class="space-y-4 mt-2 px-4">
          <div class="relative">
            <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-black" />
            <input
              type="search"
              placeholder="Buscar producto o palabra clave..."
              class="w-full bg-[#D9D9D9] rounded py-2 pl-10 text-sm text-black p-4"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div v-for="product in filteredProducts" :key="product._id" class="relative">
              <img :src="product.fotos[0]" :alt="product.nombre" class="w-full h-48 object-cover rounded-lg"/>
              <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 rounded-b-lg">
                <h3 class="text-white text-sm font-medium">{{ product.nombre }}</h3>
                <p class="text-white text-xs">S/.{{ product.precio }}</p>
                <p class="text-white text-xs opacity-75">{{ product.artesanoId }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Default content when no category is selected -->
        <div v-else class="p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex space-x-3">
              <div v-for="n in 5" :key="n" class="w-2.5 h-2.5 bg-[#D9D9D9] transform rotate-45"></div>
            </div> 
            <h2 class="text-lg text-black">Talleres del mes</h2>
            <div class="flex space-x-3">
              <div v-for="n in 5" :key="n" class="w-2.5 h-2.5 bg-[#D9D9D9] transform rotate-45"></div>
            </div> 
          </div>
          <div class="text-[#D9D9D9] text-center text-sm">Aprende como hacerlos en estos talleres educativos!</div>
          <div class="flex justify-center">
            <img src="../assets/img/Vector (2).png" alt="" class="filter grayscale w-52">
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 w-full bg-black border-t border-gray-800">
      <div class="flex justify-around p-3">
        <button @click="goTotienda" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <Store  class="h-6 w-6" />
          <span class="text-xs mt-1"></span>
        </button>
        <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <BadgePercent  @click="goToDescuentos" class="h-6 w-6" />
        </button>
        <button @click="goTotallres" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <HomeIcon class="h-6 w-6" />
        </button>
        <button @click="goToCarritoCompras"  class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <ShoppingCart class="h-6 w-6" />
        </button>
        <button  class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <UserIcon @click="goToUser" class="h-6 w-6" />
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();


const goTotallres = () => {
  router.push("/tallerMes");
};

const goTotienda = () => {
  router.push("/tallerYtiendas");
};

const goToDescuentos = () => {
  router.push("/descuentos");
};

const goToCarritoCompras = () => {
  router.push("/carritoCompras");
};

const goToUser = () => {
  router.push("/user");
};







const goToFavoritos = () => {
  router.push("/artesanias")
}

const goToCompras = () => {
  router.push("/comprasR")
}

const goToTalleres = () => {
  router.push("/talleres")
}

const goToCupon= () => {
  router.push("/canjear")
}

const goToAjustes= () => {
  router.push("/ajustes")
}

const goToComentarios= () => {
  router.push("/comentarios")
}

const goToAtencion= () => {
  router.push("/atencion")
}



import {
  MenuIcon,
  SearchIcon,
  MapPinIcon,
  HomeIcon,
  UserIcon,
  HeartIcon,
  GiftIcon,
  BookOpenIcon,
  SettingsIcon,
  MessageSquare,
  HelpCircleIcon,
  Store,
  BadgePercent,
  ShoppingCart,
  Briefcase,
  NotepadText,
  TicketPercent,
  Headset,
  Settings2Icon
} from 'lucide-vue-next';

import joyeria from "../assets/img/jewelryCategory.svg";
import textileria from "../assets/img/textileria2.svg";
import orfebreria from "../assets/img/goldsmithCategory.svg";
import tallaPiedra from "../assets/img/stoneWorkshopCategory.svg";
import tallaMadera from "../assets/img/woodWorkshopCategory.svg";
import estampado from "../assets/img/stampedCategory.svg";
import Hojalateria from "../assets/img/sheetMetalCategory.svg";
import bordado from "../assets/img/embroideryCategory.svg";
import ceramica from "../assets/img/ceramicCategory.svg";
import pinturaTradicional from "../assets/img/paintingTraditionalCategory.svg";

const isDrawerOpen = ref(false);
const selectedCategory = ref(null);
const products = ref([]);

const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`http://localhost:5001/products/${category}`, {
      headers: {
        "Content-Type": "application/json",
        "x-version": "1.0.0"
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const selectCategory = async (categoryName) => {
  selectedCategory.value = categoryName;
  products.value = await fetchProductsByCategory(categoryName);
};

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return [];
  return products.value.filter(product => product.categoria === selectedCategory.value);
});

const categories = [
  { nombre: 'Textileria', imagen: textileria },
  { nombre: 'Ceramica', imagen: ceramica },
  { nombre: 'Orfebreria', imagen: orfebreria },
  { nombre: 'Talla en piedra', imagen: tallaPiedra },
  { nombre: 'Jardineria', imagen: tallaMadera },
  { nombre: 'Bordado', imagen: bordado },
  { nombre: 'Joyeria', imagen: joyeria },
  { nombre: 'Hojalateria', imagen: Hojalateria },
  { nombre: 'Estampado', imagen: estampado },
  { nombre: 'Pintura tradicional', imagen: pinturaTradicional }
];

// Menu items data
const menuItems = [
  { 
    label: 'Lista de Favoritos', 
    icon: HeartIcon, 
    onClick: goToFavoritos 
  },
  { 
    label: 'Compras', 
    icon: Briefcase, 
    onClick: goToCompras 
  },
  { 
    label: 'Talleres', 
    icon: NotepadText, 
    onClick: goToTalleres 
  },
  { 
    label: 'Canjear cupón', 
    icon: TicketPercent, 
    onClick: goToCupon 
  },
  { 
    label: 'Ajustes', 
    icon: SettingsIcon, 
    onClick: goToAjustes 
  },
  { 
    label: 'Comentarios', 
    icon: MessageSquare, 
    onClick: goToComentarios 
  },
  { 
    label: 'Atención al cliente', 
    icon: Headset, 
    onClick: goToAtencion 
  }
];

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
</script>

<style>
@font-face {
  font-family: 'Bellota';
  src: url('@/assets/font/bellota/Bellota-BoldItalic.ttf') format('truetype');
  font-weight: bold;
  font-style: italic;
  font-display: swap;
}

.bellota-font {
  font-family: 'Bellota', sans-serif;
  font-weight: bold;
  font-style: italic;
}

/* Estilos para el scroll horizontal en categorías cuando hay una seleccionada */
.grid-cols-10 {
  grid-auto-flow: column;
  gap: 70px;
  grid-auto-columns: min-content;
  overflow-x: auto;
  scrollbar-width: none; /* Para Firefox */
  -ms-overflow-style: none;  /* Para Internet Explorer y Edge */
}

.grid-cols-10::-webkit-scrollbar {
  display: none; /* Para Chrome, Safari y Opera */
}

.hr{
  color: black;
}
</style>