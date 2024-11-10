<template>
  <div class="min-h-screen bg-white">
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
          class="absolute left-1/2 top-9 -translate-x-1/2 -translate-y-1/2 w-20 h-20" 
        />
        <h1 class="text-xl top-2 font-medium relative z-10">
          Canjear
          <br />
          cupón
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

      <!-- Coupon input -->
      <div class="bg-gray-200 rounded-lg flex items-center p-2 mb-8">
        <img 
          src="../assets/img/ticket.svg" 
          alt="Cupón"
          class="w-8 h-8 ml-2" 
        />
        <input
          type="text"
          placeholder="Ingresa tu cupón"
          class="flex-1 bg-transparent px-3 py-2 outline-none"
        />
        <button class="bg-gray-800 text-white px-4 py-2 rounded-md text-sm">
          Validar
        </button>
      </div>

      <!-- Valid coupons section -->
      <div>
        <h2 class="text-left text-base font-medium ml-1.5 text-lg font-medium mb-2">Cupones vigentes</h2>
        <p class="text-left text-base font-medium ml-1.5 text-gray-500 text-sm mb-6">*Usar antes de la fecha de vencimiento</p>

        <!-- Coupon card -->
        <div class="bg-gray-100 rounded-lg overflow-hidden flex h-[150px]">
          <img
            src="https://via.placeholder.com/150x150"
            alt="Taller Awaq Ayllus"
            class="w-[150px] h-[150px] object-cover"
          />
          <div class="p-3 flex-1 flex flex-col justify-between">
            <div>
              <h3 class="text-left text-sm font-medium">
                50% de descuento en cartucheras del Taller Awaq Ayllus
              </h3>
              <p class="text-left text-xs text-gray-600 mt-1">
                Fecha de vencimiento: 4/9/23
              </p>
            </div>
            <button class="bg-gray-800 text-white px-3 py-1 rounded-md text-xs self-start">
              Usar cupón
            </button>
          </div>
        </div>
      </div>
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
input::placeholder {
  color: #666;
}
</style>