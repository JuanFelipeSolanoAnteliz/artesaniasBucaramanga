<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <button class="p-2 hover:bg-gray-100 rounded-full" @click="goBack">
          <ChevronLeftIcon class="h-6 w-6 text-gray-600" />
        </button>
        <h1 class="ml-2 text-lg font-medium text-gray-900">Compras realizadas</h1>
      </header>
  
      <!-- Purchase History -->
      <div class="px-4 py-3 space-y-4">
        <!-- Purchase Items -->
        <div v-for="purchase in purchases" :key="purchase.id" class="bg-white rounded-lg p-4 shadow-sm">
          <div class="flex gap-4">
            <img 
              :src="purchase.image" 
              :alt="purchase.name"
              class="w-20 h-20 object-cover rounded-lg"
            />
            <div class="flex-1">
              <h2 class="font-medium text-gray-900 text-left">{{ purchase.name }}</h2>
              <p class="text-sm text-gray-500 text-left">{{ purchase.price }}</p>
              <button 
                class="mt-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <InfoIcon class="h-4 w-4" />
                Ver detalles del producto
              </button>
            </div>
            <button class="text-gray-400 hover:text-gray-600">
              <BookmarkIcon class="h-6 w-6" />
            </button>
          </div>
        </div>
  
        <!-- Continue Shopping Section -->
        <div class="mt-6">
          
          <h2 class=" text-left font-medium text-gray-900 mb-4">Sigue viendo más artesanías</h2>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="product in suggestedProducts" :key="product.id" class="bg-white rounded-lg overflow-hidden">
              <div class="relative aspect-square">
                <img 
                  :src="product.image" 
                  :alt="product.name"
                  class="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div class="p-3">
                <h3 class="text-sm font-medium text-gray-900 line-clamp-2 text-left">{{ product.name }}</h3>
                <p class="text-sm text-gray-600 mt-1 text-left">{{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ChevronLeftIcon, InfoIcon, BookmarkIcon } from 'lucide-vue-next'
  
  const purchases = ref([
    {
      id: 1,
      name: 'Vasija pequeña con diseño de flor',
      price: 'S/. 25.00',
      image: '/placeholder.svg?height=80&width=80'
    },
    {
      id: 2,
      name: 'Bolso negro con diseño de gorro',
      price: 'S/. 35.00',
      image: '/placeholder.svg?height=80&width=80'
    }
  ])
  
  const suggestedProducts = ref([
    {
      id: 1,
      name: 'Taller de arte Anaq Aqllu',
      price: 'S/. 45.00',
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      id: 2,
      name: 'Delantal negro',
      price: 'S/. 30.00',
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      id: 3,
      name: 'Camisa artesanal',
      price: 'S/. 55.00',
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      id: 4,
      name: 'Vestido tradicional',
      price: 'S/. 75.00',
      image: '/placeholder.svg?height=200&width=200'
    }
  ])
  
  const goBack = () => {
    // Implement navigation logic here
    console.log('Navigate back')
  }
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
  