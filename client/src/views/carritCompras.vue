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
    <main class="pt-11 pb-20 min-h-screen">
      <!-- Hero Banner -->
      <div class="relative h-28 bg-transparent">
        <div class="absolute inset-0 flex flex-col justify-center px-4">
          <p class="text-sm text-gray-600 mb-2 absolute inset-x-0 bottom-0 ml-4">Revisa aquí los productos que añadiste a tu carrito</p>
          <h1 class="text-black text-xl"> Tu carrito de compras</h1>
        </div>
      </div>

      <div class="space-y-4 px-4">
        <!-- Products List -->
        <div class="space-y-2 ">
          <div v-for="item in cartItems" :key="item.id" 
               class="bg-[#D9D9D9] rounded p-4 flex gap-2 h-32">
            <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded-lg"/>
            <div class="flex-1  ">
              <h3 class=" text-xs text-black">{{ item.name }}</h3>
              <span class="text-xs text-black">S/{{ item.price.toFixed(2) }}</span>
              <p class="text-xs text-black">{{ item.dimensions }}</p>
              <p class="text-xs text-black ">{{ item.artisan }}</p>
              
              <div class="flex justify-between space-y-2">
                
                <div class="flex gap-5">
                  <div class="flex items-center  rounded-lg">
                    <button @click="decreaseQuantity(item)" 
                            class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700 mr-1 bg-[#3D3D3D]">
                      -
                    </button>
                    <span class=" bg-[#3D3D3D] w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700">{{ item.quantity }}</span>
                    <button @click="increaseQuantity(item)"
                            class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700 ml-1 bg-[#3D3D3D]">
                      +
                    </button>
                  </div>
                </div>

                <button @click="removeItem(item.id)" 
                        class="text-[#3D3D3D] hover:text-red-400">
                  <Trash2Icon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Coupon Section -->
        <div class="bg-[#D9D9D9] rounded p-3">
          <h3 class="font-sm mb-2 text-black text-xs">Añadir cupón de descuento</h3>
          <div class="flex gap-2">
            <input v-model="couponCode" 
                   type="text"
                   placeholder="Ingresa el código"
                   class="flex-1 bg-[#3D3D3D] rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700" />
            <button @click="applyCoupon"
                    class="bg-[#3D3D3D] px-4 py-2 rounded hover:bg-gray-700 text-xs">
              Aplicar
            </button>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-[#D9D9D9] rounded p-4 space-y-">
          <div class="flex justify-between">
            <span class="text-black text-xs">Sub total</span>
            <span class="text-black text-xs" >S/{{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-black text-xs">Gastos de envío</span>
            <span class="text-black text-xs" >S/{{ shippingCost.toFixed(2) }}</span>
          </div>
          <div v-if="discount > 0" class="flex justify-between text-green-500 text-xs">
            <span>Descuento</span>
            <span>-S/{{ discount.toFixed(2) }}</span>
          </div>
        </div>

        <div class="bg-[#D9D9D9] rounded p-4 ">
          <div class="h-3 flex justify-between text-black text-xs">
            <span>Total</span>
            <span class="text-black">S/{{ total.toFixed(2) }}</span>
          </div>
        </div>
        
        <!-- Checkout Button -->
        <button @click="openConfirmModal"
                class="w-32 h-8 text-white rounded bg-[#3D3D3D] text-xs">
          Realizar compra
        </button>
      </div>
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 w-full bg-black border-t border-gray-800">
      <div class="flex justify-around p-3">
        <button @click="goTotienda" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <Store  class="h-6 w-6" />
        </button>
        <button @click="goToDescuentos" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <BadgePercent class="h-6 w-6" />
        </button>
        <button @click="goToHome" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <HomeIcon  class="h-6 w-6" />
        </button>
        <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <ShoppingCart class="h-6 w-6" />
        </button>
        <button @click="goToUser" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <UserIcon class="h-6 w-6" />
        </button>
      </div>
    </nav>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmModal" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-80 text-center">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          ¿Seguro de realizar la compra?
        </h2>
        <div class="flex justify-center gap-4">
          <button @click="confirmPurchase" 
                  class="bg-[#3D3D3D] text-white px-6 py-2 rounded-lg hover:bg-gray-700">
            Si
          </button>
          <button @click="showConfirmModal = false"
                  class="bg-[#3D3D3D] text-white px-6 py-2 rounded-lg hover:bg-gray-700">
            No
          </button>
        </div>
      </div>
    </div>

    <!-- Success Screen -->
    <div v-if="showSuccessScreen" 
         class="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6">
      <img src="../assets/img/check.png" alt="">
      
      <h1 class="text-xl text-center mb-4 text-black">
        ¡Compra realizada con exito!
      </h1>
      
      <div class="flex space-x-3 mb-4">
        <div v-for="n in 10" :key="n" class="w-2.5 h-2.5 bg-[#A3A3A3] transform rotate-45"></div>
      </div>
      
      <p class="text-sm text-center mb-2 text-black">
        Gracias por apoyar a los artesanos peruanos, puedes revisar tu compra en la opción de
      </p>
      
      <button class="bg-[#A3A3A3] text-white px-6 py-1 rounded mb-4">
        Compras
      </button>
      
      <div class="flex space-x-3 mb-4">
        <div v-for="n in 10" :key="n" class="w-2.5 h-2.5 bg-[#A3A3A3] transform rotate-45"></div>
      </div>
      
      <p class="text-sm text-center mb-4 text-black">
        Vincula tu correo para recibir más detalles sobre tus compras realizadas
      </p>
      
      <input 
        type="email"
        placeholder="Añadir correo electrónico"
        class="w-full max-w-sm px-4 py-2 bg-gray-200 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      
      <button @click="goToHome" 
              class="bg-[#3D3D3D] text-white px-6 py-1 rounded">
        Regresar al inicio
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Trash2Icon } from 'lucide-vue-next'

const router = useRouter()

const goToHome = () => {
  router.push("/tallerMes")
}

const goTotallres =() =>{
    router.push("/tallerMes")
  }

const goTotienda =() =>{
  router.push("/tallerYtiendas")
}

const goToDescuentos =() =>{
  router.push("/descuentos")
}


const goToUser =() =>{
  router.push("/user")
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

const cartItems = ref([
  {
    id: 1,
    name: 'Vasija pequeña con diseño de flor',
    price: 50,
    dimensions: '13x10 cm, 2 KG',
    artisan: 'Artesanos productores de Chazuta',
    image: '/placeholder.svg?height=150&width=150',
    quantity: 1
  },
  {
    id: 2,
    name: 'Bolso negro con diseño de flores',
    price: 40,
    dimensions: '40x20 cm',
    artisan: 'Asoc. Pequeña Roma',
    image: '/placeholder.svg?height=150&width=150',
    quantity: 1
  }
])

const couponCode = ref('')
const appliedCoupon = ref(null)
const shippingCost = ref(20)

const validCoupons = {
  'DESCUENTO20': 0.20,
  'ENVIOGRATIS': 1.0, // 100% discount on shipping
  'PRIMERA': 0.15
}

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const discount = computed(() => {
  if (!appliedCoupon.value) return 0
  if (appliedCoupon.value === 'ENVIOGRATIS') {
    return shippingCost.value
  }
  return subtotal.value * validCoupons[appliedCoupon.value]
})

const total = computed(() => {
  return subtotal.value + shippingCost.value - discount.value
})

const increaseQuantity = (item) => {
  if (item.quantity < 10) item.quantity++
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) item.quantity--
}

const removeItem = (itemId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId)
}

const applyCoupon = () => {
  const code = couponCode.value.toUpperCase()
  if (validCoupons[code]) {
    appliedCoupon.value = code
    alert('¡Cupón aplicado exitosamente!')
  } else {
    alert('Cupón inválido')
  }
  couponCode.value = ''
}

// New variables and methods for purchase confirmation and success screen
const showConfirmModal = ref(false)
const showSuccessScreen = ref(false)

const openConfirmModal = () => {
  showConfirmModal.value = true
}

const confirmPurchase = () => {
  showConfirmModal.value = false
  showSuccessScreen.value = true
}
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