const indexRouter = require('./server/views/indexRouter');
const express = require('express');
const { join } = require('path');
require('dotenv').config();
const userRouter = require('./server/router/userRouter');
const productRouter = require('./server/router/productRouter');
const voucherRouter = require('./server/router/voucherRouter');
const workshopsRouter = require('./server/router/workshopRouter');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./server/helper/connect');
require('./server/middleware/passportSetup');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
connectDB();

app.use("/", indexRouter);
app.use('/users',userRouter);
app.use('/products', productRouter);
app.use('/vouchers',voucherRouter);
app.use('/workshops',workshopsRouter);

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'client/dist/index.html'));
});



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
 

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});



app.listen(config, () => {
    console.log(`Server running at http://${config.host}:${config.port}`);
});

 
