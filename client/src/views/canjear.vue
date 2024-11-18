<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <div class="relative py-4">
      <div class="triangle"></div>
      <div class="absolute top-1 left-[3px] mt-4">
        <img @click="goBack" src="../assets/img/flechaB.svg" alt="Volver" class="w-4 h-4"/>
      </div>
      <div  @click="goBack"  class="relative text-center z-[60]">
        <img
          src="../assets/img/RectangleA.svg"
          alt="Background"
          class="absolute left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 w-20 h-20"
        />
        <h1 class="text-xl top-[-1px] font-medium relative z-[50]">
          Canjear<br/>cupón
        </h1>
      </div>
    </div>

    <!-- Main content -->
    <div class="px-6 pt-8">
      <!-- Question text -->
      <div class="mb-6">
        <p class="text-lg">¿Cuentas con algún cupón de descuento?</p>
        <p class="text-left text-base font-medium ml-1.5 text-lg">Canjealo aquí</p>
      </div>

      <!-- Search input -->
      <div class="bg-gray-200 rounded-lg flex items-center p-2 mb-8">
        <img 
          :src="ticket" 
          alt="Cupón" 
          class="w-8 h-8 ml-2"
        />
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Busca tu cupón"
          class="flex-1 bg-transparent px-3 py-2 outline-none"
        />
        <button 
          @click="validateCoupon" 
          class="bg-gray-800 text-white px-4 py-2 rounded-md text-sm ml-[-20px]"
        >
          Validar
        </button>
      </div>

      <!-- Vouchers section -->
      <div v-if="!error">
        <h2 class="text-left text-base font-medium ml-1.5 text-lg font-medium mb-2">
          Cupones vigentes
        </h2>
        <p class="text-left text-base font-medium ml-1.5 text-gray-500 text-sm mb-6">
          *Usar antes de la fecha de vencimiento
        </p>

        <!-- Loading state -->
        <div v-if="loading" class="text-center py-4">
          Cargando cupones...
        </div>

        <!-- Vouchers list -->
        <div v-else-if="filteredVouchers.length > 0">
          <div 
            v-for="voucher in filteredVouchers" 
            :key="voucher._id" 
            class="bg-gray-100 rounded-lg overflow-hidden flex h-[140px] mb-4"
          >
            <img
              :src="ticket"
              alt="Ticket"
              class="w-[150px] h-[140px] object-cover"
            />
            <div class="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="text-left text-sm font-medium">
                  {{ voucher.descuento }}% de descuento
                </h3>
                <p class="text-left text-xs text-gray-600 mt-1">
                  Código: {{ voucher.codigo }}
                </p>
                <p class="text-left text-xs text-gray-600">
                  Fecha de vencimiento: {{ formatDate(voucher.fechaExpiracion) }}
                </p>
              </div>
              <button 
                @click="useVoucher(voucher)" 
                class="bg-gray-800 text-white px-3 py-1 rounded-md text-xs self-start"
              >
                Usar cupón
              </button>
            </div>
          </div>
        </div>

        <!-- No results -->
        <div v-else class="text-center py-4 text-gray-500">
          No se encontraron cupones disponibles
        </div>
      </div>

      <!-- Error state -->
      <div v-else class="text-center py-4 text-red-500">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ticket from "../assets/img/ticket-sale-svgrepo-com.svg";

const router = useRouter();
const vouchers = ref([]);
const searchTerm = ref('');
const loading = ref(true);
const error = ref(null);

// Computed property for filtered vouchers
const filteredVouchers = computed(() => {
  return vouchers.value.filter(voucher => 
    voucher.codigo.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// Fetch vouchers from API
const fetchVouchers = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    const response = await fetch('http://localhost:5001/vouchers', {
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      }
    });
    
    const data = await response.json();
    
    if (data.status === 200) {
      vouchers.value = data.data;
    } else {
      error.value = 'Error al cargar los cupones';
    }
  } catch (err) {
    error.value = 'Error al conectar con el servidor';
    console.error('Error fetching vouchers:', err);
  } finally {
    loading.value = false;
  }
};

// Format date helper
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

// Navigation functions
const goBack = () => {
  router.back();
};

const goToCarrito = () => {
  router.push("/carritoCompras");
};

// Voucher actions
const validateCoupon = () => {
  // Add validation logic here
  goToCarrito();
};

const useVoucher = (voucher) => {
  // Add voucher usage logic here
  goToCarrito();
};

// Fetch vouchers on component mount
onMounted(() => {
  fetchVouchers();
});
</script>

<style scoped>
input::placeholder {
  color: #666;
}

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
</style>