<template>
    <div class="h-screen bg-white flex flex-col overflow-hidden">
      <!-- Header with diamond background -->
      <div class="relative h-20 flex-shrink-0">
        <!-- Back button with diamond background -->
        <div class="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <img 
            src="../assets/img/Rectangle.svg" 
            alt="Background"
            class="w-12 h-8" 
          />
          <button @click="goBack" class="absolute left-2 top-1/2 -translate-y-1/2">
            <img 
              src="../assets/img/flecha.svg" 
              alt="Volver"
              class="w-5 h-5" 
            />
          </button>
        </div>
        
        <!-- Title with diamond background -->
        <div class="absolute w-full top-7 -translate-y-1/2">
          <img 
            src="../assets/img/RectangleA.svg" 
            alt="Background"
            class="absolute left-1/2 -translate-x-1/2 w-16 h-16" 
          />
          <h1 class="text-lg top-3 font-medium relative z-10 text-center">
            Comentarios
            <br />
            a la app
          </h1>
        </div>
      </div>
  
      <!-- Scrollable content area -->
      <div class="flex-1 overflow-y-auto px-4 pb-4">
        <!-- Common problems section -->
        <h2 class="text-left text-base font-medium ml-1.5 text-lg font-medium mb-3 mt-2">Problemas frecuentes</h2>
        
        <div class="space-y-2 mb-4">
          <button class="w-full text-left p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm">
            La aplicación no carga de manera correcta
          </button>
          <button class="w-full text-left p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm">
            Errores al querer comprar en la aplicación
          </button>
          <button class="w-full text-left p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm">
            No puedo ver las imágenes de las tiendas y/o artesanías
          </button>
          <button class="w-full text-left p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm">
            No me permite usar un cupón de descuento
          </button>
          <button class="w-full text-left p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm">
            No me deja inscribirme a los talleres
          </button>
          <button class="w-full text-left p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm">
            El QR interactivo no funciona de manera correcta
          </button>
        </div>
  
        <!-- Other problems section -->
        <div class="mb-4">
          <h2 class="text-left text-base font-medium ml-1.5 text-lg font-medium mb-3">Otro</h2>
          <textarea
            placeholder="Describe aquí tu problema..."
            class="w-full h-20 p-3 bg-gray-200 rounded-lg resize-none text-sm"
          ></textarea>
        </div>
  
        <!-- Action buttons - Fixed at bottom -->
        <div class="flex justify-between space-x-3">
          <button class="flex-1 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
            Adjuntar captura
          </button>
          <button class="flex-1 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
            Enviar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const goBack = () => {
    // Add navigation logic here
  }
  </script>
  
  <style scoped>
  /* Viewport height fix for mobile browsers */
  .h-screen {
    height: 100vh;
    height: -webkit-fill-available;
  }
  
  /* Smooth scrolling for iOS */
  .overflow-y-auto {
    -webkit-overflow-scrolling: touch;
  }
  
  /* Remove default iOS styling */
  textarea {
    -webkit-appearance: none;
    appearance: none;
  }
  
  button {
    -webkit-tap-highlight-color: transparent;
  }
  
  /* Prevent text scaling */
  html {
    -webkit-text-size-adjust: 100%;
  }
  </style>
  