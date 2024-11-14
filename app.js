const indexRouter = require('./server/views/indexRouter');
const express = require('express');
const { join } = require('path');
const dotenv =  require('dotenv').config();
const userRouter = require('./server/router/userRouter');
const productRouter = require('./server/router/productRouter');
const voucherRouter = require('./server/router/voucherRouter');
const workshopsRouter = require('./server/router/workshopRouter');
const orderRouter = require('./server/router/paymentsRouter');
const session = require('express-session');
const passport = require('passport');
const sessionConfig = require('./server/middleware/sessionConfig');
require('./server/middleware/passportSetup');
const connectDB = require('./server/helper/connect');

const app = express();

app.use(sessionConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", indexRouter);
app.use('/users',userRouter);
app.use('/products', productRouter);
app.use('/vouchers',voucherRouter);
app.use('/workshops',workshopsRouter);
app.use('/orders',orderRouter);

app.use(express.static(join(__dirname, 'client/dist')));
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'client/dist/index.html'));
});

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session()); // Asegúrate de que esta línea esté habilitada
 
connectDB()
// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

const config = {
    port:process.env.EXPRESS_PORT,
    host:process.env.EXPRESS_HOST_NAME,
} 
 
app.listen(config, () => {
    console.log(`Server running at http://${config.host}:${config.port}`);
});

 
