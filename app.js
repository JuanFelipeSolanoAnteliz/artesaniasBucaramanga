require('dotenv').config();
const express = require('express');
const { join } = require('path');
const userRouter = require('./server/router/userRouter'); 
const indexRouter = require('./server/views/indexRouter');
const connectDB = require('./server/helper/connect'); 

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'client/dist')));

// Conectar a MongoDB
connectDB();

// Routes
app.use("/", indexRouter);
app.use('/users', userRouter); 

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'client/dist/index.html'));
});

const config = {
    port: process.env.EXPRESS_PORT || 5001,
    host: process.env.EXPRESS_HOST_NAME || 'localhost'
};

app.listen(config.port, () => {
    console.log(`Server running at http://${config.host}:${config.port}`);
});