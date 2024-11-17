<template>
  <div id="main-container" class="min-h-screen text-white bellota-font">
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
    <main class="pt-11 pb-20 min-h-screen">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
        <div class="text-black">Cargando...</div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex justify-center items-center min-h-screen">
        <div class="text-red-500">{{ error }}</div>
      </div>

      <!-- Content When Loaded -->
      <div v-else>
        <!-- Hero Banner -->
        <div class="relative h-28 bg-transparent">
          <div class="absolute inset-0 flex flex-col justify-center px-4">
            <p class="text-sm text-gray-600 mb-2 absolute inset-x-0 bottom-0 ml-4">
              Revisa aquí los productos que añadiste a tu carrito
            </p>
            <h1 class="text-black text-xl">Tu carrito de compras</h1>
          </div>
        </div>

        <div  class="space-y-4 px-4">
          <!-- Products List -->
          <div id="productList" class="space-y-2">
            <div v-if="cartItems.length === 0" class="text-black text-center py-4">
              No hay productos en el carrito
            </div>
            <div v-for="item in cartItems" :key="item.id" 
              :id="item.id"  class="bg-[#D9D9D9] rounded p-4 flex gap-2 h-32">
              <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded-lg"/>
              <div class="flex-1">
                <h3 class="text-xs text-black">{{ item.name }}</h3>
                <span class="text-xs text-black">S/{{ item.price.toFixed(2) }}</span>
                <p class="text-xs text-black">{{ item.dimensions }}</p>
                <p class="text-xs text-black">{{ item.artisan }}</p>
                
                <div class="flex justify-between space-y-2">
                  <div class="flex gap-5">
                    <div class="flex items-center rounded-lg">
                      <button @click="decreaseQuantity(item)" 
                              class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700 mr-1 bg-[#3D3D3D]">
                        -
                      </button>
                      <span class="bg-[#3D3D3D] w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700">
                        {{ item.quantity }}
                      </span>
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
          <div class="bg-[#D9D9D9] rounded p-4 space-y-2">
            <div class="flex justify-between">
              <span class="text-black text-xs">Sub total</span>
              <span class="text-black text-xs">S/{{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-black text-xs">Gastos de envío</span>
              <span class="text-black text-xs">S/{{ shippingCost.toFixed(2) }}</span>
            </div>
            <div v-if="discount > 0" class="flex justify-between text-green-500 text-xs">
              <span>Descuento</span>
              <span>-S/{{ discount.toFixed(2) }}</span>
            </div>
          </div>

          <div class="bg-[#D9D9D9] rounded p-4">
            <div class="h-3 flex justify-between text-black text-xs">
              <span>Total</span>
              <span class="text-black">S/{{ total.toFixed(2) }}</span>
            </div>
          </div>
          
          <!-- Checkout Button -->
          <button @click="openConfirmModal"
                  class="w-32 h-8 text-white rounded bg-[#3D3D3D] text-xs"
                  :disabled="cartItems.length === 0">
            Realizar compra
          </button>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 w-full bg-black border-t border-gray-800">
      <div class="flex justify-around p-3">
        <button @click="goTotienda" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <Store class="h-6 w-6" />
        </button>
        <button @click="goToDescuentos" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <BadgePercent class="h-6 w-6" />
        </button>
        <button @click="goToHome" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <HomeIcon class="h-6 w-6" />
        </button>
        <button @click="goToCarritoCompras" class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
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
          <button @click="addOrder" 
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
      <img src="../assets/img/check.png" alt="Success Check">
      
      <h1 class="text-xl text-center mb-4 text-black">
        ¡Compra realizada con exito!
      </h1>
      
      <div class="flex space-x-3 mb-4">
        <div v-for="n in 10" :key="n" class="w-2.5 h-2.5 bg-[#A3A3A3] transform rotate-45"></div>
      </div>
      
      <p class="text-sm text-center mb-2 text-black">
        Gracias por apoyar a los artesanos peruanos, puedes revisar tu compra en la opción de
      </p>
      
      <button @click="goToCompras" class="bg-[#A3A3A3] text-white px-6 py-1 rounded mb-4">
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Trash2Icon, MenuIcon, SearchIcon, HomeIcon, UserIcon, 
  Store, BadgePercent, ShoppingCart, HeartIcon,Briefcase,NotepadText,TicketPercent,SettingsIcon,MessageSquare,
  Headset
} from 'lucide-vue-next'

// API configuration
const API_BASE_URL = 'http://localhost:5001'
const API_HEADERS = {
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}

// API functions with better error handling
const fetchVouchers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/vouchers`, {
      method: 'GET',
      headers: API_HEADERS
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.data || [] // Retorna el array de vouchers desde data.data
  } catch (error) {
    console.error('Error fetching vouchers:', error)
    throw new Error('No se pudieron cargar los cupones')
  }
}

const removeItem = async (itemId) => {
  try {
    isLoading.value = true;
    const response = await fetch(`${API_BASE_URL}/orders/removeFromCart/${itemId}`, {
      method: 'PUT',
      headers: API_HEADERS
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el producto: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 214) {
      // Actualizar el estado local solo si la eliminación fue exitosa
      cartItems.value = cartItems.value.filter(item => item.id !== itemId);
      console.log('Producto eliminado exitosamente');
      
      // Recargar los datos del carrito para asegurar sincronización
      await loadCartData();
    } else {
      throw new Error('Error al eliminar el producto del carrito');
    }

  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    error.value = 'Error al eliminar el producto del carrito';
  } finally {
    isLoading.value = false;
  }
};

const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'GET',
      headers: API_HEADERS
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    

    if (data.data && data.data.carrito) {
      return data.data.carrito.map(id => ({
        productId: typeof id === 'object' ? id.$oid || id : id,
        quantity: 1  // Cantidad por defecto
      }))
    }
    return []
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw new Error('No se pudieron cargar las órdenes')
  }
}


const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: API_HEADERS
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    // Asegurarse de devolver el array de productos desde data.data
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('Formato de datos de productos inválido')
    }
    return data.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('No se pudieron cargar los productos')
  }
}

const router = useRouter()
const validVouchers = ref({})
const isDrawerOpen = ref(false)
const couponCode = ref('')
const appliedCoupon = ref(null)
const shippingCost = ref(20)
const showConfirmModal = ref(false)
const showSuccessScreen = ref(false)
const cartItems = ref([])
const isLoading = ref(true)
const error = ref(null)

// Load cart data with proper error handling
const loadCartData = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    // Fetch all required data concurrently
    const [vouchersData, ordersData, productsData] = await Promise.all([
      fetchVouchers(),
      fetchOrders(),
      fetchProducts()
    ]);

    // Process vouchers
    validVouchers.value = vouchersData.reduce((acc, voucher) => {
      acc[voucher.codigo] = voucher.descuento / 100;
      return acc;
    }, {});

    // Map orders to products with better error handling
    cartItems.value = ordersData
      .filter(order => order && (order.productId || order)) // Asegurarse que el order existe
      .map(order => {
        const orderId = typeof order === 'string' ? order : order.productId;
        
        const product = productsData.find(p => 
          p._id === orderId || 
          p._id === (orderId.$oid || orderId) || 
          p._id.toString() === orderId.toString()
        );

        if (!product) {
          console.warn(`Producto no encontrado para el ID: ${orderId}`);
          return null;
        }

        return {
          id: product._id,
          name: product.nombre,
          price: product.precio,
          dimensions: product.categoria,
          artisan: product.artesanoId,
          image: product.fotos?.[0] || '',
          quantity: order.quantity || 1,
          stock: product.stock
        };
      })
      .filter(Boolean); // Eliminar productos null

  } catch (err) {
    error.value = err.message || 'Error al cargar los datos del carrito';
    console.error('Error en la configuración del carrito:', err);
  } finally {
    isLoading.value = false;
  }
};

// Load data on mount
onMounted(() => {
  loadCartData()
})

// Computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity
    return sum + (isNaN(itemTotal) ? 0 : itemTotal)
  }, 0)
})

const discount = computed(() => {
  if (!appliedCoupon.value) return 0
  const voucherDiscount = validVouchers.value[appliedCoupon.value] || 0
  return appliedCoupon.value === 'ENVIOGRATIS' 
    ? shippingCost.value 
    : subtotal.value * voucherDiscount
})

const total = computed(() => 
  Math.max(0, subtotal.value + shippingCost.value - discount.value)
)

// Verificación adicional para el botón de compra
const canPurchase = computed(() => {
  return cartItems.value.length > 0 && 
         cartItems.value.every(item => item.quantity <= item.stock)
})

// Methods
const applyCoupon = () => {
  const code = couponCode.value.toUpperCase()
  if (validVouchers.value[code]) {
    appliedCoupon.value = code
    alert('¡Cupón aplicado exitosamente!')
  } else {
    alert('Cupón inválido')
  }
  couponCode.value = ''
}

const increaseQuantity = (item) => {
  if (item.quantity < Math.min(10, item.stock)) {
    item.quantity++
  } else {
    alert('No hay suficiente stock disponible')
  }
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}



const retryLoad = () => {
  loadCartData()
}

// Navigation methods
const goToHome = () => router.push("/tallerMes")
const goTotienda = () => router.push("/tallerYtiendas")
const goToDescuentos = () => router.push("/descuentos")
const goToUser = () => router.push("/user")





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

// Menu items
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
  isDrawerOpen.value = !isDrawerOpen.value
}

const openConfirmModal = () => {
  showConfirmModal.value = true

}

const addOrder = async () => {
  try {
    const products = await fetchOrders();
    const bodyReq = {
      productos:[]
    };
    products.forEach(element => {
      const obj = {
        productoId:element.productId,
        cantidad:element.quantity
      };
      bodyReq.productos.push(obj);
    });
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: API_HEADERS,
      body:JSON.stringify(bodyReq)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    showConfirmModal.value = false
    showSuccessScreen.value = true
    const data = await response.json()
    return data; 
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw new Error('No se pudieron cargar las órdenes')
  }
}

const confirmPurchase = () => {
  showConfirmModal.value = false
  showSuccessScreen.value = true
}
</script>

<style>
@font-face {
  font-family: 'Bellota';
  src: url('@/assets/font/bellota/Bellota-Italic.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
  font-display: swap;
}

.bellota-font {
  font-family: 'Bellota', sans-serif;
  font-style: italic;
}

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