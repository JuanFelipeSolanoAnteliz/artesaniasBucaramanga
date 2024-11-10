<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <!-- Background Triangle using CSS, positioned at the left side -->
        <div class="triangle"></div>
      
        <!-- Back button with flecha image positioned above the triangle -->
        <div class="absolute top-0 left-[-1px] mt-4"> <!-- Move left more with negative value -->
          <img 
            src="../assets/img/flecha.svg" 
            alt="Volver"
            class="w-5 h-5" 
          />
        </div>
    
        <!-- Chat Icon and Title with margin adjustment -->
        <div class="ml-10 flex items-center gap-2"> <!-- Increased margin-left here -->
          <img 
            src="../assets/img/chatB.svg" 
            alt="Chat Icon"
            class="w-6 h-6" 
          />
          <h1 class="text-lg font-medium text-gray-900">Chat con Taller Awaq Ayllus</h1>
        </div>
      </header>
    
      <!-- Chat Messages -->
      <div class="p-4 space-y-4 pb-20">
        <div v-for="message in messages" :key="message.id" 
             :class="['max-w-[80%] rounded-lg p-3', 
                      message.isSender ? 'ml-auto bg-gray-900 text-white' : 'bg-gray-100 text-gray-900']">
          {{ message.text }}
        </div>
      </div>
    
      <!-- Input Area -->
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div class="flex gap-2">
          <input
            type="text"
            v-model="newMessage"
            placeholder="Mandar mensaje a Taller Awaq Ayllus"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
            @keyup.enter="sendMessage"
          />
          <button 
            @click="sendMessage"
            class="p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800"
          >
            <SendIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { SendIcon } from 'lucide-vue-next'
  
  const messages = ref([
    { id: 1, text: "Hola, ¿en qué puedo ayudarte?", isSender: false },
    { id: 2, text: "Hola, quisiera información sobre los talleres", isSender: true },
  ])
  
  const newMessage = ref('')
  
  const sendMessage = () => {
    if (newMessage.value.trim()) {
      messages.value.push({
        id: messages.value.length + 1,
        text: newMessage.value,
        isSender: true
      })
      newMessage.value = ''
    }
  }
  
  const goBack = () => {
    // Implement navigation logic here
    console.log('Navigate back')
  }
  </script>
  
  <style scoped>
  /* Create a triangle with the base on the left side and gray color */
  .triangle {
    position: absolute;
    top: 0;  /* Adjust to the top of the screen */
    left: 0;
    width: 0;
    height: 0;
    border-left: 30px solid #2d3748; /* Smaller size and gray color */
    border-bottom: 30px solid transparent; /* Smaller size */
    border-top: 30px solid transparent;  /* Smaller size */
  }
  
  /* Additional styles for the header */
  header {
    position: relative; /* This makes the header container the reference for absolute positioning */
  }
  </style>
  