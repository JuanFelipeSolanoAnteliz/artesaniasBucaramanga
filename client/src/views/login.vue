<template>
  <div class="form-container">
    <img src="../assets/img/back.png" alt="">
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label>Nombre de usuario, celular o correo</label>
        <input
          type="text"
          v-model="identifier"
          class="form-input"
          required
        >
      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          v-model="password"
          class="form-input"
          required
        >
      </div>
      <button  type="submit" class="login-button">
        Iniciar sesión
      </button>
      <a href="#" class="forgot-password">
        ¿Olvidaste tu contraseña?
      </a>
    </form>
    <img src="../assets/img/Group.svg" alt="" class="decoration-triangle" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const identifier = ref('')
const password = ref('')

const goToPoliticas = () => router.push("/politicas")

const handleSubmit = async () => {
  try {
    // Determinar tipo de identificador
    const loginData = {
      password: password.value
    }
    
    // Validar si es email
    if (identifier.value.includes('@')) {
      loginData.correo = identifier.value
    } 
    // Validar si es teléfono (solo números)
    else if (/^\d+$/.test(identifier.value)) {
      loginData.telefono = identifier.value
    } 
    // Si no es email ni teléfono, es username
    else {
      loginData.userName = identifier.value
    }
    
    const response = await axios.post('http://localhost:5001/users/loginAndAuth', loginData)
    
    if (response.status === 202 && response.token) {
      router.push("/politicas")
    }
    console.log(response)
  } catch (error) {
    console.error('Error en el login:', error)
  }
}
</script>

<style scoped>
.form-container {
  min-height: 100vh;
  background: white;
  position: relative;
  overflow: hidden;
}

.back-button {
  background: #D9D9D9;
  border: none;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
}

.login-form {
  max-width: 400px;
  margin: 60px auto 20px;
  position: relative;
  z-index: 1;
}

.form-group {
  padding: 25px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #000;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: none;
  background: #D9D9D9;
  border-radius: 4px;
  font-size: 14px;
}

.login-button {
  display: block;
  width: auto;
  background: none;
  border: none;
  color: #000;
  font-size: 14px;
  cursor: pointer;
  margin: 30px auto;
  text-decoration: underline;
}

.forgot-password {
  display: block;
  text-align: center;
  color: #000;
  text-decoration: underline;
  font-size: 14px;
  margin-top: 20px;
}

.decoration-triangle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 200px;
  pointer-events: none;
  z-index: 0;
}

/* iPhone 11 specific styles */
@media only screen
  and (device-width: 414px)
  and (device-height: 896px)
  and (-webkit-device-pixel-ratio: 2) {
  .form-container {
    padding: 16px;
  }
  
  .login-form {
    max-width: 100%;
  }
  
  .form-input {
    padding: 14px;
  }
}
</style>