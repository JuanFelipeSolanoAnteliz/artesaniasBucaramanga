<template>
  <button @click="goBack" class="back-button">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  </button>
  <div class="form-container">
    <form @submit.prevent="handleSubmit" class="registration-form">
      <div class="form-group">
        <span class="helper-text">*Crea un nombre de usuario de mínimo 5 y máximo de 12 caracteres</span>
        <label>Nombre de usuario*</label>
        <input type="text" v-model="username" class="form-input" required>
      </div>

      <div class="form-group">
        <label>Número de celular*</label>
        <div class="phone-input-group">
          <select v-model="countryCode" class="country-select">
            <option value="+57">+57</option>
          </select>
          <input type="tel" v-model="phone" class="form-input phone-input" required>
        </div>
      </div>

      <div class="form-group">
        <label>Confirma tu celular*</label>
        <div class="phone-input-group">
          <select v-model="confirmCountryCode" class="country-select">
            <option value="+57">+57</option>
          </select>
          <input type="tel" v-model="phoneConfirmation" class="form-input phone-input" required>
        </div>
      </div>

      <div class="form-group">
        <label>Contraseña*</label>
        <input type="password" v-model="password" class="form-input" required>
        <span class="helper-text">Recuerda crear una contraseña difícil de adivinar</span>
      </div>

      <div class="form-group">
        <label>Confirma tu contraseña*</label>
        <input type="password" v-model="passwordConfirmation" class="form-input" required>
      </div>

      <div class="form-group">
        <label>Sexo</label>
        <select v-model="gender" class="form-select">
          <option value="" disabled selected>Seleccionar</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div class="form-group">
        <label>Fecha de nacimiento</label>
        <div class="date-selects">
          <select v-model="day" class="date-select">
            <option value="" disabled selected>DD</option>
            <option v-for="n in 31" :key="`day-${n}`" :value="n">{{ n.toString().padStart(2, '0') }}</option>
          </select>
          <select v-model="month" class="date-select">
            <option value="" disabled selected>MM</option>
            <option v-for="n in 12" :key="`month-${n}`" :value="n">{{ n.toString().padStart(2, '0') }}</option>
          </select>
          <select v-model="year" class="date-select">
            <option value="" disabled selected>YYYY</option>
            <option v-for="n in 100" :key="`year-${n}`" :value="2024-n">{{ 2024-n }}</option>
          </select>
        </div>
      </div>

      <button type="submit" class="continue-button">
        Continuar
      </button>
    </form>

    <img src="../assets/img/Group.svg" alt="" class="decoration-triangle" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const countryCode = ref('+57')
const confirmCountryCode = ref('+57')
const phone = ref('')
const phoneConfirmation = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const gender = ref('')
const day = ref('')
const month = ref('')
const year = ref('')

const validateForm = () => {
  if (username.value.length < 3 || username.value.length > 12) {
    throw new Error('El nombre de usuario debe tener entre 5 y 12 caracteres')
  }
  
  if (phone.value !== phoneConfirmation.value) {
    throw new Error('Los números de teléfono no coinciden')
  }
  
  if (password.value !== passwordConfirmation.value) {
    throw new Error('Las contraseñas no coinciden')
  }
  
  if (!phone.value || !password.value || !username.value) {
    throw new Error('Por favor completa todos los campos requeridos')
  }

  if (!gender.value) {
    throw new Error('Por favor selecciona un género')
  }

  if (!day.value || !month.value || !year.value) {
    throw new Error('Por favor completa la fecha de nacimiento')
  }
}

const handleSubmit = async () => {
  try {
    validateForm()

    const userData = {
      userName: username.value,
      nombre: username.value,
      correo: '', 
      contraseña: password.value,
      fotoPerfil: '',
      direccion: '',
      telefono: countryCode.value + phone.value,
      sexo: gender.value,
      fechaNacimiento: `${year.value}-${month.value.toString().padStart(2,'0')}-${day.value.toString().padStart(2,'0')}`
    }

    const response = await fetch('http://localhost:5001/users/createAndAuth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      throw new Error('Error al crear usuario')
    }

    const result = await response.json()
    console.log('Usuario creado:', result)
    
    router.push('/politicas')

  } catch (error) {
    console.error('Error:', error)
    alert(error.message)
  }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.form-container {
  min-height: 80vh;
  background: white;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.back-button {
  background: gray;
  border: none;
  padding: 10px;
  cursor: pointer;
  left: 10px;
}

.registration-form {
  max-width: 400px;
  margin: 10px auto;
  position: relative;
  z-index: 1;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #000;
}

.helper-text {
  display: block;
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.form-input,
.form-select,
.date-select {
  width: 100%;
  padding: 12px;
  border: none;
  background: #D9D9D9;
  border-radius: 4px;
  font-size: 14px;
}

.phone-input-group {
  display: flex;
  gap: 8px;
}

.country-select {
  width: 80px;
  padding: 12px;
  border: none;
  background: #D9D9D9;
  border-radius: 4px;
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  padding-right: 32px;
}

.phone-input {
  flex: 1;
}

.date-selects {
  display: flex;
  gap: 10px;
}

.date-select {
  flex: 1;
}

.continue-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  padding: 12px 24px;
  background: none;
  border: none;
  color: #000;
  font-size: 14px;
  cursor: pointer;
  margin-left: 55%;
  text-decoration: underline;
}

.decoration-triangle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 200px;
  pointer-events: none;
  z-index: 0;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  padding-right: 32px;
}

@media only screen 
  and (device-width: 414px) 
  and (device-height: 896px) 
  and (-webkit-device-pixel-ratio: 2) {
  .form-container {
    padding: 16px;
  }

  .registration-form {
    max-width: 100%;
  }

  .form-input,
  .form-select,
  .date-select {
    padding: 14px;
  }
}
</style>