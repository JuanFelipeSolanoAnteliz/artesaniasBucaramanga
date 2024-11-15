<template>
  <div class="min-h-screen bg-white">
    <!-- Header with diamond background -->
    <div class="relative py-4">
      <!-- Back button with diamond background -->
      <div class="triangle"></div>

<div @click="goBack" class="absolute top-1 left-[3px] mt-4"> <!-- Move left more with negative value -->
  <img 
    src="../assets/img/flechaB.svg" 
    alt="Volver"
    class="w-4 h-4" 
  />
</div>

      
      <!-- Title with diamond background -->
      <div class="relative text-center">
        <img 
          src="../assets/img/RectangleA.svg" 
          alt="Background"
          class="absolute left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 w-20 h-20" 
        />
        <h1 class="text-xl top-[-1px] font-medium relative z-10">
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
        <button class="bg-gray-800 text-white px-4 py-2 rounded-md text-sm ml-[-20px]">
          Validar
        </button>
      </div>
      <br>
      <!-- Valid coupons section -->
      <div>
        <h2 class="text-left text-base font-medium ml-1.5 text-lg font-medium mb-2">Cupones vigentes</h2>
        <p class="text-left text-base font-medium ml-1.5 text-gray-500 text-sm mb-6">*Usar antes de la fecha de vencimiento</p>

        <!-- Coupon card -->
        <div class="bg-gray-100 rounded-lg overflow-hidden flex h-[140px]">
          <img
            src="https://via.placeholder.com/150x140"
            alt="Taller Awaq Ayllus"
            class="w-[150px] h-[140px] object-cover"
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
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
}
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
  border-left: 32px solid #D9D9D9; /* Color gris más oscuro */
  border-bottom: 30px solid transparent;
  border-top: 28px solid transparent;
}
</style>