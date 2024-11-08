<template>
  <div class="splash-screen">
    <h1 src="../assets/font/bellota/Bellota-Bold.ttf" class="splash-text">Ruraq Maki</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  // Agregar el estilo para la fuente
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Bellota';
      src: url('../assets/font/bellota/Bellota-Bold.ttf') format('truetype');
      font-weight: bold;
      font-style: normal;
    }
  `;
  document.head.appendChild(style);

  // Configurar el temporizador para la redirección
  setTimeout(() => {
    router.push('/registro');
  }, 5000); // 5000 milisegundos = 5 segundos
});
</script>

<style scoped>
.splash-screen {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../assets/img/Group 3.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: black; 
}

.splash-text {
  font-family: 'Bellota', sans-serif;
  color: white;
  font-size: 2.5rem;
  letter-spacing: 0.05em;
}

@media (min-width: 768px) {
  .splash-text {
    font-size: 3.75rem;
  }
}
</style>