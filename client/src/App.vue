<template>
  <div id="app">
    <chat />
  </div>
</template>

<script>
const chat = require('./components/chat.vue'); // Usar CommonJS para importar

module.exports = {
  components: {
    chat
  }
};
</script>

<style>
/* Estilos generales de tu aplicación */
</style>