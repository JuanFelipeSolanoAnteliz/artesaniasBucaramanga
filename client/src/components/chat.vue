<template>
  <div>
    <h1>Chat App</h1>
    <input v-model="sender" placeholder="Tu nombre" />
    <input v-model="receiver" placeholder="Nombre del receptor" />
    <input v-model="message" placeholder="Mensaje" />
    <button @click="sendMessage" :disabled="!sender || !receiver || !message">Enviar</button>
    <ul ref="messageList">
      <li v-for="(msg, index) in messages" :key="index">
        <strong>{{ msg.sender }}:</strong> {{ msg.message }}
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
    this.socket = io('http://localhost:5001');
    this.socket.on('receiveMessage', (data) => {
      this.messages.push({ sender: data.sender, message: data.message });
      this.$nextTick(() => {
        this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight;
      });
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
ul {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
}

li {
  margin: 5px 0;
}

input {
  margin: 5px;
  padding: 10px;
  width: calc(33% - 20px);
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>