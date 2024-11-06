<template>
    <div class="registration-screen">
      <div class="content">
        <h1 class="title">
          Regístrate ahora y obtén<br>
          las mejores promociones<br>
          en artesanías bumanguesas
        </h1>
  
        <div class="buttons">
          <button class="social-button facebook">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"/>
            </svg>
            Regístrate con Facebook
          </button>
  
          <button class="social-button discord">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Regístrate con Discord
          </button>
  
          <button class="social-button gmail">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
            </svg>
            Regístrate con Gmail
          </button>
        </div>
  
        <div class="login-link">
          <p>¿Ya tienes una cuenta?</p>
          <a href="#" class="link">Inicia sesión</a>
        </div>
      </div>
    </div>
  </template>
  
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
    width: 100%;
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