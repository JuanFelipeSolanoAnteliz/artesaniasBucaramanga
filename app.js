require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const userRouter = require('./server/router/userRouter'); 
const connectDB = require('./server/helper/connect'); 
require('./server/middleware/passportSetup');
const http = require('http');
const socketIo = require('socket.io');
const Chat = require('./server/model/chatModel');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Middleware para manejar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRouter); 

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    socket.on('sendMessage', async (data) => {
        const { sender, receiver, message } = data;

        // Buscar el chat existente o crear uno nuevo
        let chat = await Chat.findOne({ sender, receiver });
        if (!chat) {
            chat = new Chat({ sender, receiver, messages: [] });
        }

        // Agregar el mensaje al array de mensajes
        chat.messages.push({ text: message, timestamp: new Date() });
        await chat.save();

        // Emitir el mensaje a ambos usuarios
        socket.emit('receiveMessage', { sender, message });
        socket.to(receiver).emit('receiveMessage', { sender, message });
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

const config = {
    port: process.env.EXPRESS_PORT || 5001,
    host: process.env.EXPRESS_HOST_NAME || 'localhost'
};

server.listen(config.port, () => {
    console.log(`Server running at http://${config.host}:${config.port}`);
});