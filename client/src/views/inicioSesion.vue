<template>
    <div class="registration-screen">
      <div class="content">
        <h1 class="title">
          Inicia sesion y continua viendo tus artesanías favoritas
        </h1>
  
  <div class="buttons">
    <button @click="handleGithubLogin" class="social-button github">
    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.301 3.438 9.801 8.207 11.398.6.11.793-.261.793-.577v-2.265c-3.338.727-4.039-1.612-4.039-1.612-.546-1.388-1.333-1.761-1.333-1.761-1.088-.743.083-.728.083-.728 1.2.083 1.832 1.267 1.832 1.267 1.07 1.833 2.809 1.3 3.492.992.107-.777.418-1.3.759-1.597-2.667-.3-5.467-1.334-5.467-5.922 0-1.308.47-2.381 1.246-3.222-.125-.303-.54-1.521.118-3.168 0 0 1.007-.324 3.3 1.23 1.185-.33 2.448-.495 3.697-.5 1.248.006 2.511.17 3.696.5 2.292-1.554 3.299-1.23 3.299-1.23.658 1.647.243 2.865.118 3.168.778.84 1.246 1.914 1.246 3.222 0 4.603-2.806 5.613-5.487 5.907.429.368.819 1.095.819 2.211v3.267c0 .316.188.693.798.577C20.564 21.8 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
    Regístrate con GitHub
  </button>

  <button @click="handleDiscordLogin" class="social-button discord">
    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
    Regístrate con Discord
  </button>

  <button @click="handleGoogleLogin" class="social-button gmail">
    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
    </svg>
    Regístrate con Gmail
  </button>

  <button @click="goToLoguin" class="social-button user">
    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
    Inicia sesión con cuenta de Ruraq Maki
  </button>
</div>

  
      </div>
    </div>
  </template>


<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const API_URL = 'http://localhost:5001/users'

// Estado para manejar errores
const error = ref(null)

// Funciones de navegación
const goToLoguin = () => {
  router.push("/loguin")
}

const goToCrearTelefono = () => {
  router.push("/crearTelefono")
}

const handleGithubLogin = () => {
  try {
    window.location.href = `${API_URL}/auth/github`
  } catch (err) {
    error.value = 'Error al intentar autenticar con GitHub'
    console.error(err)
  }
}

const handleDiscordLogin = () => {
  try {
    window.location.href = `${API_URL}/auth/discord`
  } catch (err) {
    error.value = 'Error al intentar autenticar con Discord'
    console.error(err)
  }
}

const handleGoogleLogin = () => {
  try {
    window.location.href = `${API_URL}/auth/google`
  } catch (err) {
    error.value = 'Error al intentar autenticar con Google'
    console.error(err)
  }
}
</script>

  
  <style scoped>
  .registration-screen {
    min-height: 100vh;
    width: 100%;
    background-image: url('../assets/img/Pantalla 2.svg');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
  }
  
  .registration-screen::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .content {
    position: relative;
    width: 100%;
    max-width: 400px;
    z-index: 1;
  }
  
  .title {
    color: white;
    text-align: center;
    font-size: 24px;
    margin-bottom: 40px;
    line-height: 1.4;
  }
  
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 40px;
  }
  
  .social-button {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    border: none;
    background: white;
    color: #333;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 93%;
  }
  
  .icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
  
  .facebook {
    background: white;
    color: black;
  }
  
  .discord {
    background: white;
    color: black;
  }
  
  .gmail {
    background: white;
    color: black;
  }
  
  .login-link {
    text-align: center;
    color: white;
  }
  
  .login-link p {
    margin-bottom: 8px;
  }
  
  .link {
    color: white;
    text-decoration: underline;
    font-weight: bold;
  }
  
  /* iPhone 11 specific styles */
  @media only screen 
    and (device-width: 414px) 
    and (device-height: 896px) 
    and (-webkit-device-pixel-ratio: 2) {
    .title {
      font-size: 22px;
    }
    
    .social-button {
      padding: 14px 20px;
    }
  }
  </style>