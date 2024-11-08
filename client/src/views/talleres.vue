<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <button class="p-2 hover:bg-gray-100 rounded-full" @click="goBack">
          <ChevronLeftIcon class="h-6 w-6 text-gray-600" />
        </button>
        <h1 class="ml-2 text-lg font-medium text-gray-900">Talleres educativos</h1>
      </header>
  
      <!-- Search bar -->
      <div class="px-4 py-3">
        <div class="relative">
          <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="search"
            placeholder="Buscar talleres..."
            class="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>
  
      <!-- Workshop list -->
      <div class="px-4 py-2 space-y-4">
        <article 
          v-for="workshop in workshops" 
          :key="workshop.id" 
          class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
        >
          <img 
            :src="workshop.image" 
            :alt="workshop.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h2 class="text-lg font-semibold text-gray-900">{{ workshop.title }}</h2>
            <p class="mt-2 text-gray-600 text-sm">{{ workshop.description }}</p>
            <button 
              class="mt-3 w-full bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Conoce más sobre el taller
            </button>
          </div>
        </article>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ChevronLeftIcon, SearchIcon } from 'lucide-vue-next'
  
  const workshops = ref([
    {
      id: 1,
      title: 'Taller de bordado personalizado',
      description: 'Taller de bordado en el que aprenderás desde lo más básico hasta técnicas avanzadas de bordado.',
      image: '/placeholder.svg?height=200&width=400'
    },
    {
      id: 2,
      title: 'Taller de cerámica artesanal',
      description: 'En este taller aprenderás las técnicas básicas del modelado en arcilla y creación de piezas únicas.',
      image: '/placeholder.svg?height=200&width=400'
    },
    {
      id: 3,
      title: 'Taller de artesanía infantil',
      description: 'Un espacio creativo donde los niños aprenderán diferentes técnicas artesanales de forma divertida.',
      image: '/placeholder.svg?height=200&width=400'
    },
    {
      id: 4,
      title: 'Taller de pintura tradicional',
      description: 'Aprende técnicas tradicionales de pintura y desarrolla tu propio estilo artístico.',
      image: '/placeholder.svg?height=200&width=400'
    }
  ])
  
  const goBack = () => {
    // Implement navigation logic here
    console.log('Navigate back')
  }
  </script>
  
  <style scoped>
  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
  </style>