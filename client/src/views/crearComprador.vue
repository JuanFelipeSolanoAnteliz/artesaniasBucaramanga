<template>
  <div class="form-container">
    <button class="back-button">
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
        <label>Correo electrónico*</label>
        <input type="email" v-model="email" class="form-input">
      </div>

      <div class="form-group">
        <label>Confirma tu correo*</label>
        <input type="email" v-model="emailConfirmation" class="form-input">
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

const username = ref('')
const email = ref('')
const emailConfirmation = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const gender = ref('')
const day = ref('')
const month = ref('')
const year = ref('')
</script>

<style scoped>
.form-container {
  min-height: 90vh;
  background: white;
  padding: 10px;
  position: relative;
  overflow: hidden;
  align-items: center;
}

</style>
