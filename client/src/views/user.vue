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

    <main>
      <div class="text-black p-0 pt-28">
        <!-- Profile Photo Section -->
        <div class="relative flex flex-col items-center mb-8">
          <div class="absolute top-0 text-center">Foto perfil</div>
          <img 
            :src="profileImageUrl" 
            class="w-40 h-40 object-cover mt-6 rounded-full"
            alt="Foto de perfil"
          />
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center p-6">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>

        <!-- User Info Form -->
        <div v-else class="p-6 space-y-4">
          <!-- Username Field -->
          <div class="flex items-center justify-between">
            <h2 class="text-black text-sm">Usuario:</h2>
            <div class="flex items-left space-x-2">
              <input
                v-if="editing.username"
                v-model="editedUser.username"
                @blur="handleUpdate('username')"
                @keyup.enter="handleUpdate('username')"
                class="bg-white border px-12 py-1 text-sm text-black rounded"
                :placeholder="user.username"
              />
              <span v-else class="bg-[#D9D9D9] px-12 py-1 text-sm text-black rounded">
                {{ user.username }}
              </span>
              <button 
                class="text-black hover:text-gray-600" 
                @click="toggleEdit('username')"
              >
                <PencilIcon class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Email Field -->
          <div class="flex items-center justify-between">
            <h2 class="text-black text-sm">Correo:</h2>
            <div class="flex items-left space-x-2">
              <input
                v-if="editing.email"
                v-model="editedUser.email"
                @blur="handleUpdate('email')"
                @keyup.enter="handleUpdate('email')"
                class="bg-white border px-12 py-1 text-sm text-black rounded"
                :placeholder="user.email"
                type="email"
              />
              <span v-else class="bg-[#D9D9D9] px-12 py-1 text-sm text-black rounded">
                {{ user.email }}
              </span>
              <button 
                class="text-black hover:text-gray-600" 
                @click="toggleEdit('email')"
              >
                <PencilIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
          <!-- Phone Field -->
          <div class="flex items-center justify-between">
            <h2 class="text-black text-sm">Celular:</h2>
            <div class="flex items-center space-x-2">
              <span class="bg-[#D9D9D9] px-2 py-1 rounded text-sm ml-2 text-black">
                {{ user.countryCode }}
              </span>
              <input
                v-if="editing.phone"
                v-model="editedUser.phone"
                @blur="handleUpdate('phone')"
                @keyup.enter="handleUpdate('phone')"
                class="bg-white border px-3 py-1 text-sm text-black rounded"
                :placeholder="user.phone || 'Ingresa tu numero'"
                type="tel"
              />
              <span v-else class="bg-[#D9D9D9] px-3 py-1 rounded text-sm text-black">
                {{ user.phone || 'Ingresa tu numero' }}
              </span>
              <button 
                class="text-black hover:text-gray-600" 
                @click="toggleEdit('phone')"
              >
                <PencilIcon class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Gender and Birthdate Row -->
          <div class="flex">
            <!-- Gender Field -->
            <div class="flex items-center">
              <h2 class="text-sm text-black">Sexo:</h2>
              <div class="flex items-center space-x-2">
                <input
                  v-if="editing.gender"
                  v-model="editedUser.gender"
                  @blur="handleUpdate('gender')"
                  @keyup.enter="handleUpdate('gender')"
                  class="bg-white border px-3 py-1 text-sm text-black w-8 rounded"
                  :placeholder="user.gender"
                />
                <span v-else class="bg-[#D9D9D9] px-3 py-1 rounded text-sm ml-2 text-black">
                  {{ user.gender }}
                </span>
                <button 
                  class="text-black hover:text-gray-600" 
                  @click="toggleEdit('gender')"
                >
                  <PencilIcon class="h-5 w-5" />
                </button>
              </div>
            </div>

            <!-- Birthdate Field -->
            <div class="flex ml-2">
              <h2 class="text-sm text-black">Fecha de nacimiento:</h2>
              <div class="flex items-center space-x-2 w-40">
                <input
                  v-if="editing.birthdate"
                  v-model="editedUser.birthdate"
                  @blur="handleUpdate('birthdate')"
                  @keyup.enter="handleUpdate('birthdate')"
                  class="bg-white border px-1 py-1 text-sm text-black w-30 rounded"
                  :placeholder="user.birthdate"
                  type="date"
                />
                <span v-else class="bg-[#D9D9D9] px-1 py-1 rounded text-sm text-black w-30">
                  {{ formatDate(user.birthdate) }}
                </span>
                <button 
                  class="text-black hover:text-gray-600" 
                  @click="toggleEdit('birthdate')"
                >
                  <PencilIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Payment Methods Section -->
          <div class="space-y-3">
            <h2 class="text-sm text-black">Métodos de pago</h2>
            <div class="bg-[#3D3D3D] p-3 rounded-md">
              <p class="text-xs text-white">México | MXN</p>
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                  <img 
                    src="../assets/img/campuslands.png" 
                    class="w-8 h-8" 
                    alt="Visa" 
                  />
                  <span class="text-sm text-white">Visa **** 1234</span>
                </div>
                <p class="text-xs text-white">Fecha de vencimiento 10/23</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
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
  MessageSquare,
  PencilIcon,
  SettingsIcon
} from 'lucide-vue-next';

// Router setup
const router = useRouter();

const goDetalleTaller = (id) => {
  router.push(`/detalleTaller/${id}`)
}

const goToHome = () => {
  router.push("/tallerMes")
}

const goToDescuentos = () => {
  router.push("/descuentos")
}

const goToCarritoCompras = () => {
  router.push("/carritoCompras")
}

const goToUser = () => {
  router.push("/user")
}

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

const goToTienda= () => {
  router.push("/tallerYtiendas")
}


// State management
const isDrawerOpen = ref(false);
const loading = ref(true);
const profileImageUrl = ref('../assets/img/perfile.png');

// User data management
const user = ref({
  username: '',
  email: '',
  phone: '',
  gender: '',
  birthdate: '',
  countryCode: '+57'
});

const editedUser = ref({ ...user.value });

const editing = ref({
  username: false,
  email: false,
  phone: false,
  gender: false,
  birthdate: false
});

// Menu items configuration

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
]

// API Configuration
const API_URL = 'http://localhost:5001';

// Navigation Functions
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};



// Utility Functions
const formatDate = (date) => {
  if (!date) return '';
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch {
    return date;
  }
};

// Edit Mode Functions
const toggleEdit = (field) => {
  Object.keys(editing.value).forEach(key => {
    if (key !== field) editing.value[key] = false;
  });
  editing.value[field] = !editing.value[field];
  if (editing.value[field]) {
    editedUser.value[field] = user.value[field];
  }
};

// API Functions
const handleUpdate = async (field) => {
  if (!editing.value[field] || editedUser.value[field] === user.value[field]) {
    editing.value[field] = false;
    return;
  }

  try {
    const response = await fetch(`${API_URL}/users/updateUser/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [field]: editedUser.value[field] })
    });

    if (!response.ok) {
      throw new Error('Failed to update user data');
    }

    user.value[field] = editedUser.value[field];
    editing.value[field] = false;

  } catch (error) {
    console.error('Error updating user data:', error);
    editedUser.value[field] = user.value[field];
  } // Correct closing brace here
};
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