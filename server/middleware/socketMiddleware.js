const Chat = require('../model/chatModel');

const socketMiddleware = (io) => {
    io.on('connection', (socket) => {
        console.log('Nuevo usuario conectado');

        socket.on('sendMessage', async (data) => {
            const { sender, receiver, message } = data;

            let chat = await Chat.findOne({ sender, receiver });
            if (!chat) {
                chat = new Chat({ sender, receiver, messages: [] });
            }

            chat.messages.push({ text: message, timestamp: new Date() });
            await chat.save();

            socket.to(receiver).emit('receiveMessage', { sender, message });
        });

        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });
    });
};

module.exports = socketMiddleware;