<template>
  <div class="form-container">
      <button @click="goBack" class="back-button">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>

    <form @submit.prevent="handleSubmit" class="registration-form">
      <div class="form-group">
        <label>Nombre de usuario*</label>
        <input type="text" v-model="username" class="form-input">
        <span class="helper-text">*Crea un nombre de usuario de mínimo 5 y máximo de 12 caracteres</span>
      </div>

      <div class="form-group">
        <label>Número de celular*</label>
        <div class="phone-input-group">
          <select v-model="countryCode" class="country-select">
            <option value="+51">+51</option>
          </select>
          <input type="tel" v-model="phone" class="form-input phone-input">
        </div>
      </div>

      <div class="form-group">
        <label>Confirma tu celular*</label>
        <div class="phone-input-group">
          <select v-model="confirmCountryCode" class="country-select">
            <option value="+51">+51</option>
          </select>
          <input type="tel" v-model="phoneConfirmation" class="form-input phone-input">
        </div>
      </div>

      <div class="form-group">
        <label>Contraseña*</label>
        <input type="password" v-model="password" class="form-input">
        <span class="helper-text">Recuerda crear una contraseña difícil de adivinar</span>
      </div>

      <div class="form-group">
        <label>Confirma tu contraseña*</label>
        <input type="password" v-model="passwordConfirmation" class="form-input">
      </div>

      <div class="form-group">
        <label>Sexo</label>
        <select v-model="gender" class="form-select">
          <option value="" disabled selected>Seleccionar</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="O">Otro</option>
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
const countryCode = ref('+51')
const confirmCountryCode = ref('+51')
const phone = ref('')
const phoneConfirmation = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const gender = ref('')
const day = ref('')
const month = ref('')
const year = ref('')

const handleSubmit = () => {

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
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  top: 10px;
  left: 10px;

}

.registration-form {
  max-width: 400px;
  margin: 20px auto;
  position: relative;
  z-index: 1;
}

.form-group {
  margin-bottom: 20px;
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
  margin-left: auto;
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