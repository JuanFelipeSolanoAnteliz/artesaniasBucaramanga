const indexRouter = require('./server/views/indexRouter');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
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
const httpServer = createServer(app);

app.use(sessionConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5001", 
      methods: ["GET", "POST","PUT","DELETE"]
    }
  });

app.use("/", indexRouter);
app.use('/users',userRouter);
app.use('/products', productRouter);
app.use('/vouchers',voucherRouter);
app.use('/workshops',workshopsRouter);
app.use('/orders',orderRouter);

app.use(express.static(join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'client', 'dist', 'index.html'));
  });
  

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session()); // Asegúrate de que esta línea esté habilitada
 
connectDB()
// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

const users = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('register user', (userId) => {
    users.set(socket.id, userId);
    socket.join(userId);
    console.log(`User ${userId} registered`);
  });

  socket.on('chat message', (msg) => {
    const userId = users.get(socket.id);
    console.log(`Message from manolo: ${msg}`);
    console.log(msg,'este es el log del mensaje en app')
    socket.broadcast.emit('chat message', { userId, msg });
  });

  socket.on('disconnect', () => {
    const userId = users.get(socket.id);
    users.delete(socket.id);
    console.log(`User ${userId} disconnected`);
  });
});

const config = {
    port:process.env.EXPRESS_PORT,
    host:process.env.EXPRESS_HOST_NAME,
} 
 
httpServer.listen(config, () => {
    console.log(`Server running at http://${config.host}:${config.port}`);
});

console.log('Socket.IO server is set up and running!');