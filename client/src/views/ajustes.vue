<template>
    <div class="min-h-screen bg-white flex flex-col">
      <!-- Header with diamond background -->
      <div class="relative py-4">
        <!-- Back button with diamond background -->
        <div class="absolute left-4 top-1/2 -translate-y-1/2">
          <img 
            src="../assets/img/Rectangle.svg" 
            alt="Background"
            class="w-14 h-10" 
          />
          <button @click="goBack" class="absolute left-2 top-1/2 -translate-y-1/2">
            <img 
              src="../assets/img/flecha.svg" 
              alt="Volver"
              class="w-6 h-6" 
            />
          </button>
        </div>
        
        <!-- Title with diamond background -->
        <div class="relative text-center">
          <img 
            src="../assets/img/RectangleA.svg" 
            alt="Background"
            class="absolute left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 w-20 h-20" 
          />
          <h1 class="text-xl top-2 font-medium relative z-10">
            Ajustes
          </h1>
        </div>
      </div>
      <br>
      <!-- Main content -->
      <div class="flex-1 px-4 pt-4 pb-6 overflow-hidden">
        <!-- Global Section -->
        <section class="mb-4">
          <h2 class="text-left text-base font-medium ml-1.5 text-lg font-medium mb-3">Global</h2>
          <div class="bg-gray-200 rounded-lg p-3 space-y-2">
            <div class="flex justify-between items-center">
              <span>Cambiar país y región</span>
              <span class="text-gray-500">Canadá, Toronto</span>
            </div>
            <div class="flex justify-between items-center">
              <span>Cambiar idioma</span>
              <span class="text-gray-500">Español</span>
            </div>
            <div class="flex justify-between items-center">
              <span>Cambiar moneda</span>
              <span class="text-gray-500">PEN</span>
            </div>
          </div>
        </section>
  
        <!-- Notifications Section -->
        <section class="mb-4">
          <h2 class="text-left text-base font-medium ml-1.5 text-lg font-medium mb-3">Notificaciones</h2>
          <div class="bg-gray-200 rounded-lg p-3 space-y-2">
            <div class="flex justify-between items-center">
              <span>Mostrar notificaciones de compras</span>
              <label class="relative inline-block w-12 h-6">
                <input type="checkbox" class="hidden peer" />
                <span class="absolute inset-0 rounded-full bg-gray-400 peer-checked:bg-black transition-colors"></span>
                <span class="absolute cursor-pointer w-5 h-5 bg-white rounded-full left-0.5 top-0.5 transition-transform peer-checked:translate-x-6"></span>
              </label>
            </div>
            <div class="flex justify-between items-center">
              <span>Mostrar notificaciones de descuentos</span>
              <label class="relative inline-block w-12 h-6">
                <input type="checkbox" class="hidden peer" />
                <span class="absolute inset-0 rounded-full bg-gray-400 peer-checked:bg-black transition-colors"></span>
                <span class="absolute cursor-pointer w-5 h-5 bg-white rounded-full left-0.5 top-0.5 transition-transform peer-checked:translate-x-6"></span>
              </label>
            </div>
            <div class="flex justify-between items-center">
              <span>Mostrar notificaciones de talleres</span>
              <label class="relative inline-block w-12 h-6">
                <input type="checkbox" class="hidden peer" />
                <span class="absolute inset-0 rounded-full bg-gray-400 peer-checked:bg-black transition-colors"></span>
                <span class="absolute cursor-pointer w-5 h-5 bg-white rounded-full left-0.5 top-0.5 transition-transform peer-checked:translate-x-6"></span>
              </label>
            </div>
            <div class="flex justify-between items-center">
              <span>Sonido de notificaciones</span>
              <label class="relative inline-block w-12 h-6">
                <input type="checkbox" class="hidden peer" />
                <span class="absolute inset-0 rounded-full bg-gray-400 peer-checked:bg-black transition-colors"></span>
                <span class="absolute cursor-pointer w-5 h-5 bg-white rounded-full left-0.5 top-0.5 transition-transform peer-checked:translate-x-6"></span>
              </label>
            </div>
          </div>
        </section>
  
        <!-- Legal Section -->
        <section class="mb-4">
          <h2 class="text-left text-base font-medium ml-1.5 text-lg font-medium mb-3">Legal</h2>
          <div class="bg-gray-200 rounded-lg p-3 space-y-2">
            <div class="text-left text-base font-medium ml-1.5 cursor-pointer">
              <span>Política de privacidad</span>
            </div>
            <div class="text-left text-base font-medium ml-1.5 cursor-pointer">
              <span>Información legal</span>
            </div>
            <div class="text-left text-base font-medium ml-1.5 cursor-pointer">
              <span>Libro de reclamaciones</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  const goBack = () => {
    // Add navigation logic here
    console.log('Go back clicked')
  }
  </script>
  
  <style scoped>
  .bg-gray-200 {
    background-color: #E5E7EB;
  }
  </style>
  