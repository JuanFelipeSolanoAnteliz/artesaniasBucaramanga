<template>
    <div id="main-container" class="min-h-screen text-white">
      <!-- Main Header -->
      <header class="fixed top-0 w-full bg-gray-900 z-50">
        <div class="flex items-center p-4 bg-black">
          <button @click="toggleDrawer" class="p-2">
            <MenuIcon class="h-6 w-6" />
          </button>
          <div class="flex-1 mx-4">
            <div class="relative">
              <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Buscar producto o tienda..."
                class="w-full bg-[#3D3D3D] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
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
            <a v-for="(item, index) in menuItems" :key="index" 
               class="flex items-center space-x-3 p-2 rounded-lg">
              <component :is="item.icon" class="bg-[#3D3D3D] h-7 w-7 rounded-full p-1.5" />
              <span class="text-sm">{{ item.label }}</span>
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
      <main class="pt-16 pb-20 min-h-screen">
        <!-- Hero Banner -->
        <div class="relative h-28 bg-transparent">
          <div class="absolute inset-0 flex flex-col justify-center px-4">
            <p class="text-sm text-gray-600 mb-2 absolute inset-x-0 bottom-0 ml-4">En cientos de artesanias</p>
            <h1 class="text-black text-xl">  Descuentos y promociones</h1>
          </div>
        </div>
  
        <!-- Categories -->
        <div class="overflow-x-auto scrollbar-hide mb-4">
          <div class="flex">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectCategory(category)"
              :class="[
                'px-3 text-xs w-24',
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-800'
              ]"
            >
              {{ category }}
            </button>
          </div>
          <hr class="bg-black h-1">
        </div>
  
        <!-- Products Grid -->
        <div class="grid grid-cols-2 gap-4 px-4">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="relative bg-white rounded-lg shadow"
          >
            <div class="relative h-40 w-full">
              <img
                :src="product.image"
                :alt="product.title"
                class="absolute inset-0 w-full h-full object-cover rounded-t-lg"
              />
              <div class="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs rounded">
                {{ product.discount }}
              </div>
            </div>
            <div class="p-3 bg-black rounded-b-lg">
              <h3 class="text-white text-xs font-medium truncate">{{ product.title }}</h3>
              <p class="text-gray-400 text-xs mt-1">{{ product.price }}</p>
              <p class="text-gray-500 text-[10px] mt-1 truncate">{{ product.artisan }}</p>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Bottom Navigation -->
      <nav class="fixed bottom-0 w-full bg-black border-t border-gray-800">
        <div class="flex justify-around p-3">
          <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
            <Store @click="goToTienda" class="h-6 w-6" />
          </button>
          <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
            <BadgePercent class="h-6 w-6" />
          </button>
          <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
            <HomeIcon @click="goToHome" class="h-6 w-6" />
          </button>
          <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
            <ShoppingCart class="h-6 w-6" />
          </button>
          <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
            <UserIcon class="h-6 w-6" />
          </button>
        </div>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const goToHome = () => {
    router.push("/tallerMes")
  }
  
  const goToTienda = () => {
    router.push("/tallerYtiendas")
  }
  
  import {
    MenuIcon,
    SearchIcon,
    HomeIcon,
    UserIcon,
    HeartIcon,
    Store,
    BadgePercent,
    ShoppingCart,
    Briefcase,
    NotepadText,
    TicketPercent,
    Headset,
    Settings2,
    MessageSquare
  } from 'lucide-vue-next'
  
  const isDrawerOpen = ref(false)
  const selectedCategory = ref(null)
  
  const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
  }
  
  const selectCategory = (categoryName) => {
    selectedCategory.value = selectedCategory.value === categoryName ? null : categoryName
  }
  
  const categories = [
    'Textileria',
    'Cerámica',
    'Joyeria',
    'Talla en piedra',
    'Talla en madera',
    'Bordado',
    'Hojalateria',
    'Estampado',
    'Pintura tradicional'
  ]
  
  const menuItems = [
    { label: 'Lista de Favoritos', icon: HeartIcon },
    { label: 'Canjear', icon: Briefcase },
    { label: 'Talleres', icon: NotepadText },
    { label: 'Canjear cupón', icon: TicketPercent },
    { label: 'Ajustes', icon: Settings2 },
    { label: 'Comentarios', icon: MessageSquare },
    { label: 'Atención al cliente', icon: Headset }
  ]
  
  const products = [
    {
      id: 1,
      title: 'Chalina Beige con flecos',
      price: 'S/. 37.00',
      artisan: 'Asoc. de artesanos Tinkuy',
      discount: '-35%',
      image: '/placeholder.svg?height=150&width=150',
      category: 'Textileria'
    },
    {
      id: 2,
      title: 'Caminos de mesa',
      price: 'S/. 55.00',
      artisan: 'Cooperativa originarias OII',
      discount: '2x1',
      image: '/placeholder.svg?height=150&width=150',
      category: 'Textileria'
    },
    {
      id: 3,
      title: 'Dueño de la malva',
      price: 'S/. 205.00',
      artisan: 'Ludwina Camayu',
      discount: '-15%',
      image: '/placeholder.svg?height=150&width=150',
      category: 'Pintura tradicional'
    },
    {
      id: 4,
      title: 'Chullo II',
      price: 'S/. 250.00',
      artisan: 'Natalia Q\'ero',
      discount: '2x1',
      image: '/placeholder.svg?height=150&width=150',
      category: 'Textileria'
    }
  ]
  
  const filteredProducts = computed(() => {
    if (!selectedCategory.value) return products
    return products.filter(product => product.category === selectedCategory.value)
  })
  </script>
  
  <style scoped>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .hr {
    color: black;
  }
  
  #main-container {
    min-height: 100vh;
    width: 100%;
    background-image: url('../assets/img/fondoPantalla.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }
  
  #main-container > * {
    z-index: 1;
  }
  </style>