<template>
  <div class="bg-white h-screen flex flex-col">
    <!-- Workshop Image and Title -->
    <div class="relative h-2/5">
      <div class="triangle"></div>

      <div class="absolute top-0 left-[-1px] mt-4"> <!-- Move left more with negative value -->
        <img 
          src="../assets/img/flecha.svg" 
          alt="Volver"
          class="w-5 h-5" 
        />
      </div>
    
      <!-- Barra con el título de Taller de cerámica artesanal (fondo gris más oscuro) -->
      <div class="absolute bottom-0 left-0 right-0 bg-[#3D3D3D] text-white p-2">
        <img 
          src="../assets/img/RB.svg" 
          alt="rentangleS"
          class="absolute top-0 left-0 w-5 h-15" 
        />

        <!-- Título del Taller con la fuente Bellota-Bold -->
        <h1 class="text-left text-white text-lg ml-4 font-semibold">Taller de cerámica artesanal</h1>
      </div>
    </div>

    <!-- Workshop Content -->
    <div class="flex-1 px-4 py-3 space-y-3 overflow-y-auto text-sm">
      <p class="text-left text-sm leading-snug">
        En este taller dado por los artesanos de Cerámicas Tater Vera aprenderán a usar la arcilla para crear cosas para el hogar con diseños típicos ayacuchanos.
      </p>

      <div>
        <h2 class="text-left text-base font-semibold mb-1">Para el público en general</h2>
        <p class="text-left text-xs text-gray-500 italic leading-tight">
          *los niños menores de 8 años se recomienda que estén acompañados de un adulto
        </p>
      </div>

      <div class="space-y-2 text-sm">
        <div class="flex">
          <span class="font-medium mr-1">Duración:</span>
          <span>2 meses</span>
        </div>
        <div class="flex">
          <span class="font-medium mr-1">Fecha de inicio:</span>
          <span>8 de Julio</span>
        </div>
        <div class="flex">
          <span class="font-medium mr-1">Horario:</span>
          <span>4 a 6 PM cada sábado</span>
        </div>
        <div class="flex">
          <span class="font-medium mr-1">Materiales:</span>
          <span>Materiales dados en clase</span>
        </div>
        <div class="flex">
          <span class="font-medium mr-1">Modalidad:</span>
          <span>Presencial</span>
        </div>
        <div class="flex">
          <span class="font-medium mr-1">Lugar:</span>
          <span>En el Ministerio de Cultura, Lima, Perú</span>
        </div>
      </div>
    </div>

    <!-- Registration Button -->
    <div class="p-4">
      <button class="w-full bg-[#D9D9D9] rounded-lg py-3 px-4 flex items-center justify-between text-sm">
        <div class="flex items-center">
          <img src="../assets/img/page.svg" alt="" class="w-6 h-6 mr-2" />
          <span class="font-medium text-base">Inscribirse al taller</span>
        </div>
        <span class="text-gray-500 text-xs">*Cupos limitados</span>
      </button>
    </div>
  </div>
</template>

<script setup>
// Component logic here if needed
</script>

<style scoped>
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
}

.triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 28px solid #3D3D3D; /* Color gris más oscuro */
  border-bottom: 28px solid transparent;
  border-top: 28px solid transparent;
}


/* Aplica la fuente Bellota-Bold solo al título del taller */
h1 {
  font-family: 'Bellota-Bold', sans-serif;
}
</style>
