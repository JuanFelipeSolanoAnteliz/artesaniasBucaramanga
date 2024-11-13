<template>
    <div class="min-h-screen bg-white">
      <!-- Header with back button -->
      <div class="relative h-64  inset-x-0 top-0">
        <img 
          :src="product.bannerImage || '/placeholder.svg?height=256&width=384'" 
          alt="Banner"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 ">
          <div class="flex ">
            <img src="../assets/img/backNofondo.png" alt="">


            <h1 class=" text-white  text-center bg-[#3D3D3D] h-8 w-52 justify-between ml-14 rounded-lg">{{ product.artisan }}</h1>
          </div>
          
          <div class="absolute bottom-0 text-white">
            
            <p class="text-sm  bg-[#3D3D3D] w-full p-4 underline decoration-solid inset-x-0 bottom-0">
              Conoce la historia detrás de este taller artesanal y conoce como producen sus textiles
            </p>
          </div>
        </div>
      </div>
  
      <!-- Artesanías Title -->
      <div class="flex justify-center  relative z-10 ">
        <div class="px-8 py-2  bg-[#D9D9D9] top-4">
          <h2 class="text-lg  text-black ">Artesanías</h2>
        </div>
      </div>
  
      <!-- Search Bar -->
      <div class="px-4 py-6">
        <div class="relative">
          <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-black" />
          <input
            type="search"
            placeholder="Buscar producto o palabra clave..."
            class="w-full bg-[#D9D9D9] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none"
          />
          <button class="absolute right-3 top-2">
            <SlidersHorizontal class="h-5 w-5 text-black" />
          </button>
        </div>
      </div>
  
      <!-- Products Grid -->
      <div class="px-4 grid grid-cols-2 gap-4 mb-20">
        <div
          v-for="item in workshopProducts"
          :key="item.id"
          class="bg-white rounded-lg overflow-hidden"
        >
          <div class="p-2 bg-black rounded-t-lg">
            <h3 class="text-sm font-medium text-white">{{ item.name }}</h3>
            <p class="text-xs text-gray-300">S/{{ item.price }}</p>
            <p class="text-xs text-gray-300">{{ item.artisan }}</p>
          </div>
          <img 
            :src="item.image" 
            :alt="item.name"
            class="w-full h-40 object-cover"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ArrowLeft, SearchIcon, SlidersHorizontal } from 'lucide-vue-next'
  import { useRouter } from 'vue-router'

    const router = useRouter()

    const goBack = () => {
    router.back()
    } 

  const props = defineProps({
    productId: {
      type: Number,
      required: true
    }
  })
  
  // Simulated product data
  const product = ref({
    id: 1,
    name: 'Tapiz Chumpi Andino III',
    artisan: 'Taller Awaq Ayllus',
    bannerImage: '../assets/img/perfile.png',
    description: 'Conoce la historia detrás de este taller artesanal y conoce como producen sus textiles'
  })
  
  // Simulated workshop products
  const workshopProducts = ref([
    {
      id: 1,
      name: 'Tapiz Chumpi Andino III',
      price: '600',
      artisan: 'Taller Awaq Ayllus',
      image: '../assets/img/perfile.png'
    },
    {
      id: 2,
      name: 'Cartuchera Flores I',
      price: '30',
      artisan: 'Taller Awaq Ayllus',
      image: '../assets/img/perfile.png'
    },
    {
      id: 3,
      name: 'Tapiz Floral',
      price: '450',
      artisan: 'Taller Awaq Ayllus',
      image: '../assets/img/perfile.png'
    },
    {
      id: 4,
      name: 'Tapiz Geométrico',
      price: '500',
      artisan: 'Taller Awaq Ayllus',
      image: '../assets/img/perfile.png'
    },
    {
      id: 1,
      name: 'Tapiz Chumpi Andino III',
      price: '600',
      artisan: 'Taller Awaq Ayllus',
      image: '../assets/img/perfile.png'
    },
    {
      id: 2,
      name: 'Cartuchera Flores I',
      price: '30',
      artisan: 'Taller Awaq Ayllus',
      image: '../assets/img/perfile.png'
    },
    {
      id: 3,
      name: 'Tapiz Floral',
      price: '450',
      artisan: 'Taller Awaq Ayllus',
      image: '../assets/img/perfile.png'
    },
    {
      id: 4,
      name: 'Tapiz Geométrico',
      price: '500',
      artisan: 'Taller Awaq Ayllus',
      image: '../assets/img/perfile.png'
    }
  ])
  
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>