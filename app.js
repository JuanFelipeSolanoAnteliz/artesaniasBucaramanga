require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const userRouter = require('./server/router/userRouter'); 
const connectDB = require('./server/helper/connect'); 
require('./server/middleware/passportSetup');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
connectDB();

// Configuración de la sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000
    }
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session()); // Asegúrate de que esta línea esté habilitada

// Rutas de la API
app.use('/users', userRouter); 

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Configuración del servidor
const config = {
    port: process.env.EXPRESS_PORT || 5001,
    host: process.env.EXPRESS_HOST_NAME || 'localhost'
};

app.listen(config.port, () => {
    console.log(`Server running at http://${config.host}:${config.port}`);
});