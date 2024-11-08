const indexRouter = require('./server/views/indexRouter');
const express = require('express');
const { join } = require('path');
const dotenv = require('dotenv').config();
const userRouter = require('./server/router/userRouter');
const productRouter = require('./server/router/productRouter');
const voucherRouter = require('./server/router/voucherRouter');
const workshopsRouter = require('./server/router/workshopRouter');
const session = require('express-session');
const passport = require('passport');
require('./server/middleware/passportSetup');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'client/dist')));


app.use("/", indexRouter);
app.use('/users',userRouter);
app.use('/products', productRouter);
app.use('/vouchers',voucherRouter);
app.use('/workshops',workshopsRouter);

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'client/dist/index.html'));
});



let config = {
    port: process.env.EXPRESS_PORT || 5001,
    host: process.env.EXPRESS_HOST_NAME || 'localhost'
};

app.listen(config, () => {
    console.log(`Server running at http://${config.host}:${config.port}`);
});

 