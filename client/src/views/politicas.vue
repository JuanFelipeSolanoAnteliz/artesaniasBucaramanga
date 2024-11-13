<template>
    <div class="form-container">
      <button @click="goBack" class="back-button" aria-label="Volver">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
  
      <form @submit.prevent="handleSubmit" class="terms-form">
        <div class="checkbox-group">
          <label class="checkbox-label">
            <div class="checkbox-container">
              <input 
                type="checkbox" 
                v-model="privacyPolicy"
                class="checkbox-input"
              >
              <span class="custom-checkbox">
                <svg v-if="privacyPolicy" class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
            <span class="checkbox-text">
              He leído y acepto la <a href="#" class="link">Política de privacidad</a>*
            </span>
          </label>
  
          <label class="checkbox-label">
            <div class="checkbox-container">
              <input 
                type="checkbox" 
                v-model="terms"
                class="checkbox-input"
              >
              <span class="custom-checkbox">
                <svg v-if="terms" class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
            <span class="checkbox-text">
              He leído y acepto los <a href="#" class="link">Términos y condiciones</a>*
            </span>
          </label>
  
          <label class="checkbox-label">
            <div class="checkbox-container">
              <input 
                type="checkbox" 
                v-model="promotions"
                class="checkbox-input"
              >
              <span class="custom-checkbox">
                <svg v-if="promotions" class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
            <span class="checkbox-text">
              Acepto que me envíen promociones y eventos a mi número de celular o correo electronicos
            </span>
          </label>
        </div>
  
        <button @click="goToHome" type="submit" class="register-button">
          Registrarse
        </button>
      </form>
  
      <img src="../assets/img/Group(1).svg" alt="" class="decoration-triangle" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  
  const router = useRouter()
  
  const goToHome = () => {
    router.push("/tallerMes")
  }


const goBack = () => {
router.back()
}
  
  const privacyPolicy = ref(false)
  const terms = ref(false)
  const promotions = ref(false)
  
  const handleSubmit = () => {
    if (!privacyPolicy.value || !terms.value) {
      alert('Debes aceptar la política de privacidad y los términos y condiciones')
      return
    }
    // Handle form submission
  }
  </script>
  
  <style scoped>
  .form-container {
    min-height: 80vh;
    background: white;
    padding: 20px;
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
  
  .terms-form {
    max-width: 400px;
    margin: 60px auto 20px;
    position: relative;
    z-index: 1;
  }
  
  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
  }
  
  .checkbox-container {
    position: relative;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
  
  .checkbox-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .custom-checkbox {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border: 2px solid #000;
    border-radius: 4px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .check-icon {
    width: 20px;
    height: 20px;
    color: #000;
  }
  
  .checkbox-text {
    font-size: 14px;
    line-height: 1.4;
  }
  
  .link {
    color: inherit;
    text-decoration: underline;
  }
  
  .register-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
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
    left: 0;
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
  
    .terms-form {
      max-width: 100%;
    }
  }
  </style>