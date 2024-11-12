<template>
    <div>
      <h1>Chat App</h1>
      <input v-model="sender" placeholder="Tu nombre" />
      <input v-model="receiver" placeholder="Nombre del receptor" />
      <input v-model="message" placeholder="Mensaje" />
      <button @click="sendMessage">Enviar</button>
      <ul>
        <li v-for="(msg, index) in messages" :key="index">
          {{ msg.sender }}: {{ msg.message }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { io } from 'socket.io-client';
  
  export default {
    data() {
      return {
        sender: '',
        receiver: '',
        message: '',
        messages: [],
        socket: null
      };
    },
    created() {
      // Conectar al servidor de Socket.io
      this.socket = io('http://localhost:5001'); // Asegúrate de que esta URL sea correcta
      this.socket.on('receiveMessage', (data) => {
        this.messages.push(data); // Agregar el mensaje recibido a la lista
      });
    },
    methods: {
      sendMessage() {
        if (this.sender && this.receiver && this.message) {
          const messageData = {
            sender: this.sender,
            receiver: this.receiver,
            message: this.message
          };
          this.socket.emit('sendMessage', messageData);
          this.message = ''; // Limpiar el campo de mensaje
        } else {
          alert('Por favor, completa todos los campos.');
        }
      }
    },
    beforeUnmount() {
      // Desconectar el socket al destruir el componente
      if (this.socket) {
        this.socket.disconnect();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Añade aquí tus estilos CSS */
  </style>