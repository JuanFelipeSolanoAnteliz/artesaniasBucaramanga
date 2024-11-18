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
            :src="userData.fotoPerfil || '../assets/img/perfile.png'"
            alt="Profile"
            class="w-12 h-12 rounded-full"
          />
          <div>
            <h3 class="font-semibold">{{ userData.userName }}</h3>
          </div>
        </div>

        <nav class="space-y-4">
          <a 
            v-for="(item, index) in menuItems" 
            :key="index" 
            @click="item.onClick"
            class="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-800"
          >
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

    <main>
      <div class="text-black p- pt-28">
        <div class="">
          <div class="relative flex flex-col items-center">
            <div class="absolute top-0 text-center">Foto perfil</div>
            <img 
              :src="userData.fotoPerfil || '../assets/img/perfile.png'" 
              class="w-40 h-40 object-cover mt-6" 
              alt="Foto de perfil"
            >
          </div>
        </div>
    
        <div class="p-6 space-y-4">
          <!-- Usuario -->
          <div class="flex items-center justify-between">
            <h2 class="text-black text-sm">Usuario:</h2>
            <div class="flex items-left space-x-2">
              <div v-if="editingField === 'userName'" class="flex items-center ">
                <input 
                  type="text"
                  v-model="tempValue"
                  @blur="handleUpdate('userName')"
                  @keyup.enter="handleUpdate('userName')"
                  class="bg-[#D9D9D9] px-12 py-1 text-sm text-black max-w-40 overflow-hidden"
                  ref="editInput"
                />
              </div>
              <span v-else class="bg-[#D9D9D9] px-12 py-1 text-sm text-black">
                {{ userData.userName }}
              </span>
              <button @click="startEditing('userName', userData.userName)" class="text-black">
                <PencilIcon class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Nombre -->
          <div class="flex items-center justify-between">
            <h2 class="text-black text-sm">Nombre:</h2>
            <div class="flex items-left space-x-2">
              <div v-if="editingField === 'nombre'" class="flex items-center ">
                <input 
                  type="text"
                  v-model="tempValue"
                  @blur="handleUpdate('nombre')"
                  @keyup.enter="handleUpdate('nombre')"
                  class="bg-[#D9D9D9] px-12 py-1 text-sm text-black max-w-40 overflow-hidden"
                  ref="editInput"
                />
              </div>
              <span v-else class="bg-[#D9D9D9] px-12 py-1 text-sm text-black">
                {{ userData.nombre }}
              </span>
              <button @click="startEditing('nombre', userData.nombre)" class="text-black">
                <PencilIcon class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Correo -->
          <div class="flex items-center justify-between">
            <h2 class="text-black text-sm">Correo:</h2>
            <div class="flex items-left space-x-2">
              <div v-if="editingField === 'correo'" class="flex items-center overflow-hidden">
                <input 
                  type="email"
                  v-model="tempValue"
                  @blur="handleUpdate('correo')"
                  @keyup.enter="handleUpdate('correo')"
                  class="bg-[#D9D9D9] px-12 py-1 text-sm text-black max-w-20 "
                  ref="editInput"
                />
              </div>
              <span v-else class="bg-[#D9D9D9] px-12 py-1 text-sm text-black">
                {{ userData.correo }}
              </span>
              <button @click="startEditing('correo', userData.correo)" class="text-black">
                <PencilIcon class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Teléfono -->
          <div class="flex items-center justify-between ">
            <h2 class="text-black text-sm">Celular:</h2>
            <div class="flex items-center space-x-2">
              <span class="bg-[#D9D9D9] px-2 py-1 rounded text-sm ml-2 text-black">+57</span>
              <div v-if="editingField === 'telefono'" class="flex items-center ">
                <input 
                  type="tel"
                  v-model="tempValue"
                  @blur="handleUpdate('telefono')"
                  @keyup.enter="handleUpdate('telefono')"
                  class="bg-[#D9D9D9] px-12 py-1 text-sm text-black max-w-40 overflow-hidde"
                  ref="editInput"
                />
              </div>
              <span v-else class="bg-[#D9D9D9] px-3 py-1 rounded text-sm text-black">
                {{ userData.telefono }}
              </span>
              <button @click="startEditing('telefono', userData.telefono)" class="text-black">
                <PencilIcon class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Sexo y Fecha de nacimiento -->
          <div class="flex">
            <div class="flex items-center">
              <h2 class="text-sm text-black">Sexo:</h2>
              <div class="flex items-center space-x-2">
                <div v-if="editingField === 'sexo'" class="flex items-center ">
                  <select 
                    v-model="tempValue"
                    @blur="handleUpdate('sexo')"
                    @change="handleUpdate('sexo')"
                    class="bg-[#D9D9D9] px-3 py-1 rounded text-sm text-black"
                    ref="editInput"
                  >
                    <option value="masculino">M</option>
                    <option value="femenino">F</option>
                    <option value="otro">O</option>
                  </select>
                </div>
                <span v-else class="bg-[#D9D9D9] px-3 py-1 rounded text-sm ml-2 text-black max-w-40 overflow-hidden">
                  {{ userData.sexo?.charAt(0).toUpperCase() }}
                </span>
                <button @click="startEditing('sexo', userData.sexo)" class="text-black">
                  <PencilIcon class="h-5 w-5" />
                </button>
              </div>
            </div>

            <div class="flex ml-2">
              <h2 class="text-sm text-black">Fecha de nacimiento:</h2>
              <div class="flex items-center space-x-2 w-40">
                <div v-if="editingField === 'fechaNacimiento'" class="flex items-center ">
                  <input 
                    type="date"
                    v-model="tempValue"
                    @blur="handleUpdate('fechaNacimiento')"
                    @change="handleUpdate('fechaNacimiento')"
                    class="bg-[#D9D9D9] px-1 py-1 rounded text-sm text-black w-30 max-w-40 overflow-hidden"
                    ref="editInput"
                  />
                </div>
                <span v-else class="bg-[#D9D9D9] px-1 py-1 rounded text-sm text-black w-30">
                  {{ formatDate(userData.fechaNacimiento) }}
                </span>
                <button @click="startEditing('fechaNacimiento', userData.fechaNacimiento)" class="text-black">
                  <PencilIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Dirección -->
          <div class="flex items-center justify-between">
            <h2 class="text-black text-sm">Dirección:</h2>
            <div class="flex items-left space-x-2">
              <div v-if="editingField === 'direccion'" class="flex items-center">
                <input 
                  type="text"
                  v-model="tempValue"
                  @blur="handleUpdate('direccion')"
                  @keyup.enter="handleUpdate('direccion')"
                  class="bg-[#D9D9D9] px-12 py-1 text-sm text-black"
                  ref="editInput"
                />
              </div>
              <span v-else class="bg-[#D9D9D9] px-12 py-1 text-sm text-black">
                {{ userData.direccion }}
              </span>
              <button @click="startEditing('direccion', userData.direccion)" class="text-black">
                <PencilIcon class="h-5 w-5" />
              </button>
            </div>
          </div>

          <div class="space-y-3">
          <h2 class="text-sm text-black">Métodos de pago</h2>
          <div class="bg-[#D9D9D9] p-2 rounded text-black">
            <span>Visa Mastercard</span>
          </div>
          <button class="w-full bg-[#D9D9D9] p-3 rounded text-left text-gray-400">
            Añadir método de pago
          </button>
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
          <ShoppingCart @click="goToCarritoCompras" class="h-6 w-6" />
        </button>
        <button class="flex flex-col items-center bg-[#3D3D3D] h-10 w-10 rounded-full justify-center">
          <UserIcon class="h-6 w-6" />
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
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
  MessageSquare,
  SettingsIcon,
  PencilIcon
} from 'lucide-vue-next';

const router = useRouter();
const isDrawerOpen = ref(false);
const selectedCategory = ref(null);

// Add these new refs for editing functionality
const editingField = ref(null);
const tempValue = ref('');
const editInput = ref(null);

const userData = ref({
  userName: '',
  nombre: '',
  correo: '',
  telefono: '',
  fotoPerfil: '',
  direccion: '',
  sexo: '',
  fechaNacimiento: ''
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')} / ${(date.getMonth() + 1).toString().padStart(2, '0')} / ${date.getFullYear().toString().slice(-2)}`;
};

const fetchUserData = async () => {
  try {
    let config = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    }
    const response = await fetch(`http://localhost:5001/users/getUser`, config);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    userData.value = data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Updated startEditing function
const startEditing = async (field, currentValue) => {
  editingField.value = field;
  tempValue.value = currentValue;
  await nextTick();
  if (editInput.value) {
    editInput.value.focus();
  }
};

// Updated handleUpdate function
const handleUpdate = async (field) => {
  if (!tempValue.value.trim()) {
    editingField.value = null;
    tempValue.value = '';
    return;
  }

  try {
    const updateData = {
      [field]: tempValue.value
    };

    const response = await fetch('http://localhost:5001/users/updateUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    // Update local state
    userData.value[field] = tempValue.value;
    console.log('Field updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
  }

  // Reset editing state
  editingField.value = null;
  tempValue.value = '';
};

onMounted(() => {
  fetchUserData();
});

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const selectCategory = (categoryName) => {
  selectedCategory.value = selectedCategory.value === categoryName ? null : categoryName;
};

// Navigation functions
const goToHome = () => router.push("/tallerMes");
const goToTienda = () => router.push("/tallerYtiendas");
const goToCarritoCompras = () => router.push("/carritoCompras");
const goToFavoritos = () => router.push("/artesanias");
const goToCompras = () => router.push("/comprasR");
const goToTalleres = () => router.push("/talleres");
const goToCupon = () => router.push("/canjear");
const goToAjustes = () => router.push("/ajustes");
const goToComentarios = () => router.push("/comentarios");
const goToAtencion = () => router.push("/atencion");

const menuItems = [
  { label: 'Lista de Favoritos', icon: HeartIcon, onClick: goToFavoritos },
  { label: 'Compras', icon: Briefcase, onClick: goToCompras },
  { label: 'Talleres', icon: NotepadText, onClick: goToTalleres },
  { label: 'Canjear cupón', icon: TicketPercent, onClick: goToCupon },
  { label: 'Ajustes', icon: SettingsIcon, onClick: goToAjustes },
  { label: 'Comentarios', icon: MessageSquare, onClick: goToComentarios },
  { label: 'Atención al cliente', icon: Headset, onClick: goToAtencion }
];

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products;
  return products.filter(product => product.category === selectedCategory.value);
});
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