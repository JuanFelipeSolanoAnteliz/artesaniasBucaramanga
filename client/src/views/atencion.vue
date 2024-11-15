<template>
  <div class="h-screen bg-white flex flex-col overflow-hidden">
    <!-- Header with diamond background -->
    <div class="relative h-20 flex-shrink-0">
      <div class="triangle"></div>

      <div @click="goBack" class="absolute top-1 left-[3px] mt-4"> <!-- Move left more with negative value -->
        <img 
          src="../assets/img/flechaB.svg" 
          alt="Volver"
          class="w-4 h-4" 
        />
      </div>
        
      <!-- Title with diamond background -->
      <div class="absolute w-full top-1/2 -translate-y-1/2">
        <img 
          src="../assets/img/RectangleA.svg" 
          alt="Background"
          class="absolute left-1/2 -translate-x-1/2 w-16 h-16" 
        />
        <h1 class="text-xl font-medium relative z-10 text-center pt-1">
          Atención al
          <br />
          cliente
        </h1>
      </div>
    </div>
    <br>

    <!-- Main content -->
    <div class="flex-1 px-4 pt-4 pb-8 overflow-y-auto">
      <!-- FAQ Section -->
      <div class="mb-6">
        <h2 class="text-left text-base font-medium ml-1.5 text-lg font-medium mb-4">Preguntas frecuentes</h2>
        
        <div class="space-y-3">
          <button class="w-full text-left p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm">
            ¿Cómo compro en la app?
          </button>
          <button class="w-full text-left p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm">
            ¿Cómo me inscribo en un taller?
          </button>
          <button class="w-full text-left p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm">
            ¿Cómo escaneo el QR interactivo?
          </button>
          <button class="w-full text-left p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm">
            ¿Cómo cambio la moneda en la app?
          </button>
          <button class="w-full text-left p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm">
            ¿Cómo reporto un problema?
          </button>
        </div>
      </div>

      <!-- Personalized support section -->
      <div>
        <h2 class="text-left text-base font-medium ml-1.5 text-lg font-medium mb-4">¿Necesitas atención personalizada? habla con nuestro equipo de soporte</h2>
        
        <div @click="goToChat" class="space-y-3">
          <button class="w-full text-left p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center text-sm">
            <img 
              src="../assets/img/chat.svg" 
              alt="Chat"
              class="w-6 h-6 mr-3"
            />
            Empieza un chat
          </button>
          <button class="w-full text-left p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center text-sm">
            <img 
              src="../assets/img/call.svg" 
              alt="Llamada"
              class="w-6 h-6 mr-3"
            />
            Programa una llamada
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToChat = () => {
  router.push("/chat");
};
const goBack = () => {
  router.back();
}
</script>

<style scoped>
/* Fix for viewport height to ensure it works properly on mobile */
.h-screen {
  height: 100vh;
  height: -webkit-fill-available;
}

/* Smooth scrolling for iOS */
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
}

/* Remove iOS button styling */
button {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

/* Prevent text scaling */
html {
  -webkit-text-size-adjust: 100%;
}

.triangle {
  position: absolute;
  top: 3;
  left: 0;
  width: 0;
  height: 0;
  border-left: 32px solid #D9D9D9; /* Color gris más oscuro */
  border-bottom: 30px solid transparent;
  border-top: 28px solid transparent;
}

/* Adjust font sizes for mobile devices */
@media (max-width: 400px) {
  h1, h2 {
    font-size: 18px;
  }
  button {
    font-size: 14px;
  }
}
</style>
